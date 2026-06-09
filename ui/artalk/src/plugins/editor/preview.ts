import './preview.scss'

import EditorPlugin from './_plug'
import type PlugKit from './_kit'
import $t from '@/i18n'

export default class Preview extends EditorPlugin {
  private isPlugPanelShow = false
  private resizeObserver?: ResizeObserver
  private trackedImages = new WeakSet<HTMLImageElement>()

  constructor(kit: PlugKit) {
    super(kit)

    this.kit.useMounted(() => {
      this.usePanel(`<div class="atk-editor-plug-preview"></div>`)

      // initialize plug button
      this.useBtn(
        `<i aria-label="${$t('preview')}"><svg fill="currentColor" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></i>`,
      )
    })
    this.kit.useUnmounted(() => {
      this.stopObservingTextarea()
    })

    // 内容变更：立即重渲染并同步，保证删除图片后能立刻进入“等待回弹”状态
    this.kit.useEvents().on('content-updated', () => {
      if (!this.isPlugPanelShow) return
      this.updateContent()
      this.syncHeights()
      // textarea 的自适应有 80ms 延迟，这里稍后再同步一次，跟上其最终高度
      window.setTimeout(() => this.syncHeights(), 100)
    })

    // textarea 高度变化时同步（确保两者高度始终一致）
    this.kit.useEvents().on('editor-height-changed', () => {
      this.isPlugPanelShow && this.syncHeights()
    })

    this.usePanelShow(() => {
      this.isPlugPanelShow = true
      this.updateContent()
      this.syncHeights()
      this.startObservingTextarea()
    })
    this.usePanelHide(() => {
      this.isPlugPanelShow = false
      this.stopObservingTextarea()
    })
  }

  updateContent() {
    if (!this.$panel) return
    this.$panel.innerHTML = this.kit.useEditor().getContentMarked()
    this.watchImagesLoad()
  }

  /** 监听预览中图片的加载完成事件，加载后再同步一次高度（图片有真实尺寸后才能正确测高） */
  private watchImagesLoad() {
    if (!this.$panel) return
    const imgs = this.$panel.querySelectorAll('img')
    imgs.forEach((img) => {
      if (img.complete || this.trackedImages.has(img)) return
      this.trackedImages.add(img)
      const onSettle = () => {
        if (this.isPlugPanelShow) this.syncHeights()
      }
      img.addEventListener('load', onSettle, { once: true })
      img.addEventListener('error', onSettle, { once: true })
    })
  }

  /**
   * 仅同步预览框自身高度：取「预览自然高」与「textarea 当前高」的最大值。
   * 不再反向写 textarea 的高度，避免与 textarea 自身的 adaptive 形成抖动循环
   * （插入图片后，textarea 每次输入会在「文本高」与「图片高」之间反复跳动）。
   */
  private syncHeights() {
    if (!this.$panel) return
    const $ta = this.kit.useUI().$textarea

    const prevInlineHeight = this.$panel.style.height
    this.$panel.style.height = 'auto'
    const previewNatural = this.$panel.scrollHeight
    this.$panel.style.height = prevInlineHeight

    const target = Math.max(previewNatural, $ta.offsetHeight)
    if (target <= 0) return

    if (this.$panel.offsetHeight !== target) {
      this.$panel.style.height = `${target}px`
    }
  }

  /** 监听 textarea 尺寸变化，保持预览框高度跟随 */
  private startObservingTextarea() {
    if (this.resizeObserver || typeof ResizeObserver === 'undefined') return
    const $ta = this.kit.useUI().$textarea
    this.resizeObserver = new ResizeObserver(() => this.syncHeights())
    this.resizeObserver.observe($ta)
  }

  private stopObservingTextarea() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = undefined
    }
  }
}
