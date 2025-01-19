import { Lightning, Utils } from '@lightningjs/sdk'

import MenuItem from './MenuItem'

import VerticalMenu from './Button1/VerticalMenu'
import VerticalMenuItem from './Button1/VerticalMenuItem'

import VerticalSquares from './Button2/VerticalSquares'
import Square from './Button2/Square'

import Grid from './Button3/Grid'
import PokemonSquare from './Button3/PokemonSquare'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: 1800,
        h: 900,
        rect: true,
        color: 0xff000000,
      },
      Menu: {
        w: 400,
        h: 200,
        mountX: 0.5,
        x: 1800 / 2,
      },
    }
  }
  _init() {
    this._setState('Menu')
    this.horizontalIndex = 0
    this.verticalIndex = 0
    this.isVerticalMenuOn = false
    this.isVerticalSquaresOn = false
    this.isPokemonOn = false

    this.API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

    this.squareColors = []
    this.pokemons = [[], []]
    this.pokemonImages = []

    const buttons = []
    const backgroundColors = ['0xfffbb03b', '0xff409cf5', '0xffd85828']
    const labelColors = ['0xffffffff', '0xffffffff', '0xffffffff']
    const hasRoundedCorners = [true, true, false]

    this.fetchPokemon()

    for (let i = 0; i < backgroundColors.length; i++) {
      buttons.push({
        type: MenuItem,
        x: i * 150,
        labelColor: labelColors[i],
        backgroundColor: backgroundColors[i],
        label: `Button #${i + 1}`,
        texture: hasRoundedCorners[i]
          ? Lightning.Tools.getRoundRect(100, 50, 10)
          : Lightning.Tools.getRoundRect(100, 50, 0),
      })
    }
    this.tag('Menu').children = buttons
  }

  static _states() {
    return [
      class VerticalSquares extends this {
        _getFocused() {
          if (this.isVerticalSquaresOn) {
            return this.tag('Menu').children[1].children[1].children[this.verticalIndex]
          }
          return null
        }
      },
      class Menu extends this {
        _getFocused() {
          return this.tag('Menu').children[this.horizontalIndex]
        }
      },
      // class List extends this {
      //   _getFocused() {
      //     return this.tag('List')
      //   }
      // },
    ]
  }

  _handleRight() {
    if (this.horizontalIndex === 2) {
      this.horizontalIndex = 0
    } else {
      this.horizontalIndex += 1
    }
    if (this.isVerticalMenuOn) {
      this.tag('Menu').children[0].childList.removeAt(1)
      this.isVerticalMenuOn = false
    }
    if (this.isVerticalSquaresOn) {
      this.tag('Menu').children[1].childList.removeAt(1)
      this.isVerticalSquaresOn = false
      this._setState('Menu')
    }

    if (this.isPokemonOn) {
      this.tag('Menu').childList.removeAt(3)
      this.isPokemonOn = false
    }
  }

  _handleLeft() {
    if (this.horizontalIndex === 0) {
      this.horizontalIndex = 2
    } else {
      this.horizontalIndex -= 1
    }

    if (this.isVerticalMenuOn) {
      this.tag('Menu').children[0].childList.removeAt(1)
      this.isVerticalMenuOn = false
    }

    if (this.isVerticalSquaresOn) {
      this.tag('Menu').children[1].childList.removeAt(1)
      this.isVerticalSquaresOn = false
      this._setState('Menu')
    }

    if (this.isPokemonOn) {
      this.tag('Menu').childList.removeAt(3)
      this.isPokemonOn = false
    }
  }

  _handleUp() {
    if (this.verticalIndex === 0) {
      this.verticalIndex = 9
    } else {
      this.verticalIndex -= 1
    }

    if (this.isVerticalSquaresOn) {
      this.tag('Background').patch({
        color: this.squareColors[this.verticalIndex],
      })
    }
  }

  _handleDown() {
    if (this.verticalIndex === 9) {
      this.verticalIndex = 0
    } else {
      this.verticalIndex += 1
    }

    if (this.isVerticalSquaresOn) {
      this.tag('Background').patch({
        color: this.squareColors[this.verticalIndex],
      })
    }
  }

  _handleEnter() {
    if (this.horizontalIndex === 0 && !this.isVerticalMenuOn) {
      this.displayVerticalMenu()
    } else if (this.horizontalIndex === 1 && !this.isVerticalSquaresOn) {
      this.displayVerticalSquares()
      this.tag('Background').patch({
        color: this.squareColors[this.verticalIndex],
      })
    } else if (this.horizontalIndex === 2 && !this.isPokemonOn) {
      this.displayPokemonGrid()
    }
  }

  // _getFocused() {
  //   return this.tag('Menu').children[this.horizontalIndex]
  // }

  displayVerticalMenu() {
    const verticalMenu = this.stage.c({ type: VerticalMenu })
    verticalMenu.index = this.verticalIndex
    const menuItems = []
    const menuOptions = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'height',
      'nine',
      'ten',
    ]
    for (let i = 0; i < menuOptions.length; i++) {
      menuItems.push({
        type: VerticalMenuItem,
        y: i * 40,
        label: menuOptions[i],
      })
    }
    verticalMenu.children = menuItems
    this.tag('Menu').children[0].add(verticalMenu)
    this.isVerticalMenuOn = true
  }

  displayVerticalSquares() {
    const verticalSquares = this.stage.c({ type: VerticalSquares })
    verticalSquares.index = this.verticalIndex

    const squares = []
    for (let i = 0; i < 10; i++) {
      this.squareColors.push(this.generateRandomColor())
    }
    for (let i = 0; i < 10; i++) {
      squares.push({
        type: Square,
        y: i * 50,
        squareColor: this.squareColors[i],
      })
    }
    verticalSquares.children = squares
    this.isVerticalSquaresOn = true
    this.tag('Menu').children[1].add(verticalSquares)
    this._setState('VerticalSquares')
  }

  displayPokemonGrid() {
    const pokemonGrid = this.stage.c({ type: Grid })
    const pokemonSquares = []
    let test = 0
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        pokemonSquares.push({
          type: PokemonSquare,
          x: (100 + 2) * j,
          y: (100 + 2) * i,
          label: this.pokemons[i][j].name,
          squareColor: this.generateRandomColor(),
          imageUrl: this.pokemonImages[test],
        })
        test += 1
      }
    }
    pokemonGrid.children = pokemonSquares
    this.tag('Menu').childList.add(pokemonGrid)
    this.isPokemonOn = true
  }

  generateRandomColor() {
    return '0xff' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
  }

  arrayToMatrix(array, columns) {
    const matrix = []
    for (let i = 0; i < array.length; i += columns) {
      matrix.push(array.slice(i, i + columns))
    }
    return matrix
  }

  async fetchPokemon() {
    try {
      const response = await fetch(this.API_BASE_URL)

      if (!response.ok) {
        throw new Error(`Error! ${response.status}`)
      }

      const data = await response.json()
      this.pokemons = this.arrayToMatrix(data.results, 4)

      for (let line of this.pokemons) {
        for (const pokemon of line) {
          try {
            const details = await fetch(pokemon.url)

            if (!details.ok) {
              throw new Error(`Error details! ${details.status}`)
            }

            const detailsData = await details.json()

            try {
              const imageResponse = await fetch(detailsData.forms[0].url)

              if (!imageResponse.ok) {
                throw new Error(`Error image! ${imageResponse.status}`)
              }

              const imageData = await imageResponse.json()
              this.pokemonImages.push(imageData.sprites.front_default)
            } catch (error) {
              console.log(`Error! ${error.message}`)
            }
          } catch (error) {
            console.log(`Error! ${error.message}`)
          }
        }
      }
    } catch (error) {
      console.log(`Error! ${error.message}`)
    }
  }
}
