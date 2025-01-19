import { Lightning } from '@lightningjs/sdk'

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      Label: {
        mountX: 0.5,
        mountY: 0.45,
        x: (w) => w / 2,
        y: (h) => h / 2,
        text: {
          fontSize: 14,
        },
      },
    }
  }

  set labelColor(value) {
    this.tag('Label').color = value
  }
  set backgroundColor(value) {
    this.color = value
  }
  set label(value) {
    if (typeof value === 'string') {
      value = {
        text: value,
      }
    }
    this.tag('Label').text = value
  }

  _focus() {
    this.patch({
      smooth: {
        w: 100 * 1.5,
        h: 50 * 1.5,
      },
    })
  }

  _unfocus() {
    this.patch({
      smooth: {
        w: 100,
        h: 50,
      },
    })
  }
}
