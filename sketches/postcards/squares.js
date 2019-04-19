/**
 * A programatically generated postcard design.
 * Heavily inspired by https://canvas-cards.glitch.me/#varsarely-selector
 * (really 90% is exactly from there, I'm still learning how to do this)
 */

// Import the Library
import canvasSketch from 'canvas-sketch'
import colors from '../../colors'

// Specify some output parameters so if we want to print it looks good
const settings = {
  // 300 PPI for print resolution
  pixelsPerInch: 300,
  // All our dimensions and rendering units will use inches
  units: 'in',
  // size it for postcards
  dimensions: 'postcard',
  // Include 1/8 inch 'bleed' to the dimensions above
  bleed: 1 / 8
}

const sketch = () => {
  const createGrid = (width, height, gutter, squareSize) => {
    let points = []

    // sets up a grid of squares with padding on all sides, and gutters
    // in between each square

    // define a step as a gutter and a square
    const step = gutter + squareSize

    // calculate how many steps can fit into the space given
    // since the pattern begins and ends with a square, remove the space of one
    // gutter from our calculation
    const xLimit = Math.floor((width - gutter) / step)
    const yLimit = Math.floor((height - gutter) / step)

    // calculate how much extra space needs to be accounted for to center
    // the grid in the space given
    const xExtra = (width - gutter) % step
    const yExtra = (height - gutter) % step

    // split the extra padding between each side of the space given
    const xPadding = (xExtra * 0.5) + gutter
    const yPadding = (yExtra * 0.5) + gutter

    for (let x = xPadding; x < (xLimit * step); x += step) {
      for (let y = yPadding; y < (yLimit * step);  y += step) {
        // rotate some values
        let random = Math.random()
        let rotate = false
        if (random > 0.85) {
          rotate = true
        }

        // set some colors randomly. Same color as a background will
        // effectively hide a square
        let color = colors.white
        random = Math.random()
        if (random > 0.95) {
          color = colors.blue
        } else if (random > 0.90) {
          color = colors.pink
        }

        points.push({
          rotation: rotate,
          position: [x, y],
          color,
        })
      }
    }

    return points
  }

  return ({ context, width, height, trimWidth, trimHeight, bleed }) => {
    // setup
    const gutter = bleed * 0.75
    const squareSize = gutter * 2

    // Set the background to white
    context.fillStyle = colors.white
    context.fillRect(0, 0, width, height)

    // Set the inner region to a color, leaving a border
    context.fillStyle = colors.pink
    context.fillRect(
      bleed,
      bleed,
      trimWidth,
      trimHeight,
    )

    // make a grid of coordinates to work with
    const points = createGrid(trimWidth, trimHeight, gutter, squareSize)

    points.forEach(point => {
      const { position, rotation, color } = point
      const [x, y] = position

      // set the color
      context.fillStyle = color

      // Move the canvas origin point to where the square should be placed
      context.save()
      context.translate(x + bleed, y + bleed)
      context.beginPath()

      if (rotation) {
        context.translate(squareSize / 2, squareSize / 2)
        // let rotation = Math.random() * (30 - 20) + 20
        let rotation = 20
        context.rotate((rotation * Math.PI) / 180)
        context.rect(
          (-1 * squareSize) / 2,
          (-1 * squareSize) / 2,
          squareSize,
          squareSize
        )
        context.fill()
      } else {
        context.rect(0, 0, squareSize, squareSize)
        context.fill()
      }

      // after we draw our square, restore the origin point
      context.restore()
    })
  }
}

canvasSketch(sketch, settings)
