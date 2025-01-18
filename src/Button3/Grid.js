import { Lightning } from '@lightningjs/sdk'

export default class Grid extends Lightning.Component {
  static _template() {
    return {
      w: 400,
      y: 50 * 1.5 + 10,
      rect: true,
      shader: {
        type: Lightning.shaders.Outline,
        width: 1,
        color: 0xff000000,
      },
    }
  }
}
