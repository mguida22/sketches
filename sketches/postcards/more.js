/**
 * Another postcard
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
  // horizontal
  orientation: 'landscape',
  // Include 1/8 inch 'bleed' to the dimensions above
  bleed: 1 / 8
}


const sketch = () => {
  const SEED = 1000
  const STEP = 1 / 16

  return ({ context, width, height, trimWidth, trimHeight, bleed }) => {
    // Set a white border
    context.strokeStyle = colors.white
    context.lineWidth = bleed
    context.strokeRect(0, 0, width, height)

    // Set the background color
    context.fillStyle = colors.indigo
    context.fillRect(
      bleed,
      bleed,
      trimWidth,
      trimHeight
    )

    const drawLine = (from, to, color) => {
      context.moveTo(...from)
      context.lineTo(...to)
      context.strokeStyle = color
      context.lineWidth = 1 / 80
      context.stroke()
    }

    const draw = (from, to, count) => {
      if (to[0] < bleed || to[0] > trimWidth) {
        return
      } else if (to[1] < bleed || to[1] > trimHeight) {
        return
      } else {
        drawLine(from, to, colors.red)

        let currStep = STEP * count
        // x: + - - +
        // y: + + - -
        let x = to[0] + ((count % 4 === 0) || (count % 4 === 3) ? -1 * currStep : currStep)
        let y = to[1] + ((count % 4) < 2 ? currStep : -1 * currStep)
        console.log(x, y)
        draw(
          to,
          [x, y],
          count += 1
        )
      }
    }

    draw(
      [width / 2, height / 2],
      [width / 2 - STEP, height / 2 - STEP],
      1
    )
  }
}

canvasSketch(sketch, settings)
