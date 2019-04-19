/**
 * Simple gradient postcard.
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

    const step = trimWidth / 30
    const circleDiameter = bleed * 0.5
    for (let i = bleed + step; i < trimWidth; i += step) {
      context.save()
      context.translate(
        i,
        height / 2
      )

      // draw sine wave
      context.fillStyle = colors.red
      context.beginPath()
      context.arc(
        0,
        Math.sin(i),
        circleDiameter,
        0,
        2 * Math.PI
      )
      context.fill()

      // draw cosine wave
      context.fillStyle = colors.green
      context.beginPath()
      context.arc(
        0,
        Math.cos(i + 0.5 * Math.PI),
        circleDiameter,
        0,
        2 * Math.PI
      )
      context.fill()

      context.restore()
    }
  }
}

canvasSketch(sketch, settings)
