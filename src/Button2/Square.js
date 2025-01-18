import { Lightning } from '@lightningjs/sdk'

export default class Square extends Lightning.Component {
  static _template() {
    return {
      h: 40,
      w: 40,
      rect: true,
    }
  }

  set squareColor(value) {
    this.color = value
  }

  _focus() {
    this.patch({
      shader: {
        type: Lightning.shaders.Outline,
        width: 1,
        color: 0xff000000,
      },
    })
  }

  _unfocus() {
    this.patch({
      shader: {
        type: Lightning.shaders.Outline,
        width: 0,
      },
    })
  }
}
