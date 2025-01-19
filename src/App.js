import { Lightning, Utils } from '@lightningjs/sdk'

import { generateRandomColor, arrayToMatrix } from './utils'

import MenuItem from './MenuItem'

import VerticalMenu from './components/Button1/VerticalMenu'
import VerticalMenuItem from './components/Button1/VerticalMenuItem'

import VerticalSquares from './components/Button2/VerticalSquares'
import Square from './components/Button2/Square'

import Grid from './components/Button3/Grid'
import PokemonSquare from './components/Button3/PokemonSquare'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: window.innerWidth,
        h: window.innerHeight,
        rect: true,
        color: 0xff000000,
      },
      Menu: {
        w: 400,
        h: 200,
        mountX: 0.5,
        x: window.innerWidth / 2,
      },
    }
  }
  _init() {
    this._setState('Menu')
    this.horizontalIndex = 0
    this.colorIndex = 0
    this.verticalIndex = 0
    this.isVerticalMenuOn = false
    this.isVerticalSquaresOn = false
    this.isPokemonOn = false

    this.API_BASE_URL = 'https://pokeapi.co/api/v2'

    this.squareColors = []
    this.pokemons = [[], []]

    const buttons = []
    const backgroundColors = ['0xfffbb03b', '0xff409cf5', '0xffd85828']
    const hasRoundedCorners = [true, true, false]

    this.fetchPokemons()

    // Creating the menu's buttons dynamically
    for (let i = 0; i < backgroundColors.length; i++) {
      buttons.push({
        type: MenuItem,
        tags: [`button${i + 1}`],
        x: i * 150,
        labelColor: 0xffffffff,
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
            return this.tag('Menu').children[1].children[1].children[this.colorIndex] // Accessing the colored square
          }
          return null
        }
      },
      // After reading the exercise description, I was not sure
      // whether or not I should add navigation through the vertical menu.
      // I added it, just in case
      class VerticalMenu extends this {
        _getFocused() {
          if (this.isVerticalMenuOn) {
            return this.tag('Menu').children[0].children[1].children[this.verticalIndex] // Accessing the vertical menu item
          }
          return null
        }
      },
      class Menu extends this {
        _getFocused() {
          return this.tag('Menu').children[this.horizontalIndex]
        }
      },
    ]
  }

  _handleRight() {
    this._setState('Menu')

    if (this.horizontalIndex === 2) {
      this.horizontalIndex = 0
    } else {
      this.horizontalIndex += 1
    }

    if (this.isVerticalMenuOn) {
      this.tag('Menu').children[0].childList.removeAt(1) // Removing the vertical menu
      this.isVerticalMenuOn = false
    }

    if (this.isVerticalSquaresOn) {
      this.tag('Menu').children[1].childList.removeAt(1) // Removing the colored squares
      this.isVerticalSquaresOn = false
    }

    if (this.isPokemonOn) {
      this.tag('Menu').childList.removeAt(3) // Removing the Pokemon grid
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
      this.tag('Menu').children[0].childList.removeAt(1) // Removing the vertical menu
      this.isVerticalMenuOn = false
    }

    if (this.isVerticalSquaresOn) {
      this.tag('Menu').children[1].childList.removeAt(1) // Removing the colored squares
      this.isVerticalSquaresOn = false
      this._setState('Menu')
    }

    if (this.isPokemonOn) {
      this.tag('Menu').childList.removeAt(3) // Removing the Pokemon grid
      this.isPokemonOn = false
    }
  }

  _handleUp() {
    if (this.isVerticalMenuOn || this.isVerticalSquaresOn) {
      const indexName = this.isVerticalMenuOn ? 'verticalIndex' : 'colorIndex'
      this[indexName] = this[indexName] === 0 ? 9 : this[indexName] - 1
    }

    if (this.isVerticalSquaresOn) {
      this.tag('Background').patch({
        color: this.squareColors[this.colorIndex], // Changing the background color depending on the selected square
      })
    }
  }

  _handleDown() {
    if (this.isVerticalMenuOn || this.isVerticalSquaresOn) {
      const indexName = this.isVerticalMenuOn ? 'verticalIndex' : 'colorIndex'
      this[indexName] = this[indexName] === 9 ? 0 : this[indexName] + 1
    }

    if (this.isVerticalSquaresOn) {
      this.tag('Background').patch({
        color: this.squareColors[this.colorIndex], // Changing the background color depending on the selected square
      })
    }
  }

  _handleEnter() {
    if (this.horizontalIndex === 0 && !this.isVerticalMenuOn) {
      this.displayVerticalMenu()
    } else if (this.horizontalIndex === 1 && !this.isVerticalSquaresOn) {
      this.displayVerticalSquares()
      this.tag('Background').patch({
        color: this.squareColors[this.colorIndex],
      })
    } else if (this.horizontalIndex === 2 && !this.isPokemonOn) {
      this.displayPokemonGrid()
    }
  }

  displayVerticalMenu() {
    const verticalMenu = this.stage.c({ type: VerticalMenu })
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
        tags: [`item${i}`],
        type: VerticalMenuItem,
        y: i * 40,
        label: menuOptions[i],
      })
    }
    verticalMenu.children = menuItems
    this.tag('Menu').tag('button1').add(verticalMenu)
    this.isVerticalMenuOn = true
    this._setState('VerticalMenu') // Setting the focus on the Vertical Menu
  }

  displayVerticalSquares() {
    const verticalSquares = this.stage.c({ type: VerticalSquares })

    const squares = []
    for (let i = 0; i < 10; i++) {
      this.squareColors.push(generateRandomColor())
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
    this._setState('VerticalSquares') // Setting the focus on the Vertical Squares
  }

  displayPokemonGrid() {
    const pokemonGrid = this.stage.c({ type: Grid })
    const pokemonSquares = []

    // I guess I could have used the lightning UI Grid...
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        pokemonSquares.push({
          type: PokemonSquare,
          x: (100 + 2) * j,
          y: (100 + 2) * i,
          label: this.pokemons[i][j].name,
          squareColor: generateRandomColor(),
          imageUrl: this.pokemons[i][j].image,
        })
      }
    }
    pokemonGrid.children = pokemonSquares
    this.tag('Menu').childList.add(pokemonGrid)
    this.isPokemonOn = true
  }

  async fetchPokemons() {
    try {
      const response = await fetch(`${this.API_BASE_URL}/pokemon`)

      if (!response.ok) {
        throw new Error(`Error! ${response.status}`)
      }

      const data = await response.json()

      const concatData = []
      for (let pokemon of data.results) {
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
            concatData.push({ ...pokemon, image: imageData.sprites.front_default })
          } catch (error) {
            console.log(`Error! ${error.message}`)
          }
        } catch (error) {
          console.log(`Error! ${error.message}`)
        }
      }
      this.pokemons = arrayToMatrix(concatData, 4)
    } catch (error) {
      console.log(`Error! ${error.message}`)
    }
  }
}
