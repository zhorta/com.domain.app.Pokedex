import { Lightning } from '@lightningjs/sdk'

export default class VerticalSquares extends Lightning.Component {
  static _template() {
    return {
      w: 100 * 1.5,
      y: 50 * 1.5 + 10,
      rect: true,
    }
  }

  set index(value) {
    if (value < 0 || value >= this.children.length) {
      return
    }
    this._index = value
  }

  get index() {
    return this._index
  }
}
