import { Lightning } from '@lightningjs/sdk'

export default class VerticalMenuItem extends Lightning.Component {
  static _template() {
    return {
      color: 0xffb25db0,
      h: 30,
      rect: true,
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 10,
        stroke: 2,
        strokeColor: 0xff000000,
      },
      Label: {
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 0,
          stroke: 0,
        },
        mountY: 0.5,
        mountX: 0.5,
        y: (h) => h / 2,
        x: (w) => w / 2,
        color: 0xff000000,
        text: {
          fontSize: 14,
        },
      },
    }
  }
  _focus() {
    this.patch({
      smooth: { color: 0xff763ffc, w: 200 },
      Label: {
        smooth: { color: 0xfff526a5 },
      },
    })
  }
  _unfocus() {
    this.patch({
      smooth: { color: 0xffb25db0 },
    })
  }

  set label(value) {
    if (typeof value === 'string') {
      value = {
        text: value,
      }
    }
    this.tag('Label').text = value
  }

  get padding() {
    return this._padding || 10
  }

  set padding(num) {
    this._padding = num
  }

  _init() {
    const label = this.tag('Label')
    label.on('txLoaded', () => {
      if (this.w < label.renderWidth + this.padding * 2) {
        this.w = label.renderWidth + this.padding * 2
      }
    })
  }
}
