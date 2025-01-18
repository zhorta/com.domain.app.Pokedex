import { Lightning } from '@lightningjs/sdk'

export default class PokemonSquare extends Lightning.Component {
  static _template() {
    return {
      w: 100,
      h: 100,
      rect: true,
      color: 0xfff26510,
      Image: {
        w: 80,
        h: 80,
        mount: 0.5,
        x: (w) => w / 2,
        y: (h) => h / 2,
        shader: {
          type: Lightning.shaders.Outline,
          width: 0,
        },
      },
      Label: {
        shader: {
          type: Lightning.shaders.Outline,
          width: 0,
        },
        mountY: 1,
        mountX: 0.5,
        y: (h) => h,
        x: (w) => w / 2,
        color: 0xff000000,
        text: {
          fontSize: 14,
        },
      },
    }
  }

  set label(value) {
    {
      if (typeof value === 'string') {
        value = {
          text: value,
        }
      }
      this.tag('Label').text = value
    }
  }

  set imageUrl(value) {
    this.tag('Image').patch({ src: value })
  }

  set squareColor(value) {
    this.color = value
  }
}
