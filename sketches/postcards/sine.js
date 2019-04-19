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

    const drawCircle = (translateCoords, arcParams, color) => {
      context.save()
      context.translate(...translateCoords)
      context.fillStyle = color
      context.beginPath()
      context.arc(...arcParams)
      context.fill()
      context.restore()
    }
    // draw left eye
    drawCircle(
      [(trimWidth / 4) + (bleed * 0.5), height / 2],
      [0, 0, 0.75, 0, 2 * Math.PI],
      colors.white
    )

    // draw left eye-ball
    drawCircle(
      [(trimWidth / 4) + (bleed * 0.5), height / 2],
      [0, 0, 0.25, 0, 2 * Math.PI],
      colors.black
    )

    // draw right eye
    drawCircle(
      [3 * (trimWidth / 4) + (bleed * 1.5), height / 2],
      [0, 0, 0.75, 0, 2 * Math.PI],
      colors.white
    )

    // draw right eye-ball
    drawCircle(
      [3 * (trimWidth / 4) + (bleed * 1.5), height / 2],
      [0, 0, 0.25, 0, 2 * Math.PI],
      colors.black
    )

    // draw some waves
    const step = trimWidth / 30
    const circleDiameter = bleed * 0.5
    for (let i = bleed + step; i < trimWidth; i += step) {
      // draw sine wave
      drawCircle(
        [i, height / 2],
        [0, Math.sin(i), circleDiameter, 0, 2 * Math.PI],
        colors.green
      )

      // draw cosine wave
      drawCircle(
        [i, height / 2],
        [0, Math.cos(i + 0.5 * Math.PI), circleDiameter, 0, 2 * Math.PI],
        colors.pink
      )
    }
  }
}

canvasSketch(sketch, settings)
