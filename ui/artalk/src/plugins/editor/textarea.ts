import EditorPlugin from './_plug'
import type PlugKit from './_kit'
import $t from '@/i18n'

export default class Textarea extends EditorPlugin {
  constructor(kit: PlugKit) {
    super(kit)

    const onKeydown = (e: KeyboardEvent) => this.onKeydown(e)
    const onInput = () => this.onInput()

    this.kit.useMounted(() => {
      // 占位符
      this.kit.useUI().$textarea.placeholder = this.kit.useConf().placeholder || $t('placeholder')

      // bind the event
      this.kit.useUI().$textarea.addEventListener('keydown', onKeydown)
      this.kit.useUI().$textarea.addEventListener('input', onInput)
    })

    this.kit.useUnmounted(() => {
      // unmount the event
      this.kit.useUI().$textarea.removeEventListener('keydown', onKeydown)
      this.kit.useUI().$textarea.removeEventListener('input', onInput)
    })

    this.kit.useEvents().on('content-updated', () => {
      // delay 80ms to prevent invalid execution
      window.setTimeout(() => {
        this.adaptiveHeightByContent()
      }, 80)
    })
  }

  // 按下 Tab 输入内容，而不是失去焦距
  private onKeydown(e: KeyboardEvent) {
    const keyCode = e.keyCode || e.which

    if (keyCode === 9) {
      e.preventDefault()
      this.kit.useEditor().insertContent('\t')
    }
  }

  private onInput() {
    this.kit.useEvents().trigger('content-updated', this.kit.useEditor().getContentRaw())
  }

  // Resize the textarea height by content
  public adaptiveHeightByContent() {
    const $ta = this.kit.useUI().$textarea
    // 临时禁用 transition，避免 height 过渡动画干扰 scrollHeight 的测量，
    // 否则内容减少时 textarea 高度无法正确回弹。
    const prevTransition = $ta.style.transition
    $ta.style.transition = 'none'

    const diff = $ta.offsetHeight - $ta.clientHeight
    $ta.style.height = '0px' // it's a magic. 若不加此行，内容减少，高度回不去
    $ta.style.height = `${$ta.scrollHeight + diff}px`

    // 强制 reflow 后再恢复 transition，确保新高度立即生效
    void $ta.offsetHeight
    $ta.style.transition = prevTransition

    // 通知预览框同步高度
    this.kit.useEvents().trigger('editor-height-changed', $ta.offsetHeight)
  }
}
