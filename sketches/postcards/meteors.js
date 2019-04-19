/**
 * Another postcard design.
 * Also shamelessly adapted from https://canvas-cards.glitch.me/#meteor-selector
 */

import canvasSketch from 'canvas-sketch'
import colors from '../../colors'
import {
  randomElement,
  randomFloat,
  randomInt
} from '../../util'

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
  return ({ context, width, height, trimWidth, trimHeight, bleed }) => {
    const purple = '#21172A'
    // Yellow, tan, orange
    const c = ['#FCF811', '#FFFFDD', '#FD675B']

    // Set the background color
    context.fillStyle = purple
    context.fillRect(
      0,
      0,
      width,
      height
    )

    // rotate the canvas 45 degrees to give the meteors a slant
    context.save()
    context.translate(trimWidth / 2, trimHeight / 2)
    context.rotate((-30 * Math.PI) / 180)
    context.translate(-trimWidth / 2, -trimHeight / 2)

    // draw some tails
    let step = (trimWidth + 1) / 72
    for (let i = 0; i < trimWidth + 0.5; i += step) {
      // draw left to right at random y coordinates
      // randomly pick a width, tail length, and color
      let x = i - 0.5
      let y = randomFloat(-0.5, trimHeight + 0.5)
      let tailWidth = randomFloat(step * 0.05, step * 0.5)
      let length = randomFloat(1, 2)
      let color = randomElement(c)

      context.beginPath()
      // create the gradient from the tip of the meteor to
      // the end of its tail
      let gradient = context.createLinearGradient(x, y, x, y + length)
      gradient.addColorStop(0.1, 'rgba(232, 21, 91, 0.1')
      gradient.addColorStop(1, color)

      // draw the meteor at coords
      context.fillStyle = gradient
      context.fillRect(x, y, tailWidth, length)
    }

    // reset canvas to normal oreintation
    context.restore()
    // Set a white border
    context.strokeStyle = colors.white
    context.lineWidth = bleed
    context.strokeRect(0, 0, width, height)
  }
}

canvasSketch(sketch, settings)
