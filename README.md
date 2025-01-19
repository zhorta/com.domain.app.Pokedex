# Pokedex

## com.domain.app.Pokedex

### Getting started

> Before you follow the steps below, make sure you have the
> [Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.

## Exercise:

#### Single Page Application format:

- Horizontal Menu at the top of the view
- 3 buttons to populate the Menu
- solid background color (black)

The intent is to obtain an app on screen, with which the user may interact with
in order to have some basic properties modified:

#### All buttons:

- when focused: expands 1.5 in size
- when unfocused: shrinks back to normal size
- 50px spacing between each button
- 100px width (except for the dynamic ones)

#### Button #1:

- yellow color, rounded corners, "Button #1" as text
- when clicked: display a vertical menu below it and be able to navigate in there:
  - vertical 10 item list, below the horizontal list
  - items all using the same shape:
    - purple color, rounded corners, black borders, text should be "one, two, three... ten"
    - each item container should adjust its width to its text
  - no navigation required for this vertical list

### Button #2:

- blue color, rounded corners, "Button #2" as text
- when clicked: generates a vertical list of 10 colored squares (random colors)
  - when each square is focused:
    - display a black border around the square
    - change the background app color to match the focused square
  - should allow navigation back to the main horizontal menu

### Button #3:

#### API request handling:

Initial request: https://pokeapi.co/api/v2/pokemon/

- red color, squared corners, "Button #3" as text
- when clicked:
  - display a wide 4x5 grid with black borders
  - each grid item is a square shape with text using the pokemon names from above API request
  - the shapes should have random colors
  - static grid design, no focusable/clickable elements

### Extra points:

- Improve the solution by replacing the square shapes with the actual pokemon images, derived from above API request
- Any extra improvements are accepted, as long as the minimal requirements are met (for extra credit)

### User interaction must only resort to:

- keyboard arrow keys
- enter/return key

The code should include only one JS Framework:

https://lightningjs.io/l2landing (version v2.0)

- no CSS or any other JS library/framework should be used (but vanilla JS if required, will be considered)
- the code must run without any exceptions on Google Chrome
- the code must be indented and commented where relevant

- submitting the exercise may be done as follows:
  - via Github/Gitlab/Bitbucket/etc
  - via zip file, downloadable from an accessible online source (or as an email attachment)
