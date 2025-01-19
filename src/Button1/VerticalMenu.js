import { Lightning } from '@lightningjs/sdk'

export default class VerticalMenu extends Lightning.Component {
  static _template() {
    return {
      w: 100 * 1.5,
      y: 50 * 1.5 + 10,
      rect: true,
    }
  }

  _getFocused() {
    return this.children[this.index]
  }

  set index(value) {
    this._index = value
  }

  get index() {
    return this._index
  }
}
