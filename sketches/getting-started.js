// Import the Library
import canvasSketch from 'canvas-sketch'

// Specify some output parameters
const settings = {
  // Enable an animation loop
  animate: true,
  // Set the loop duration to 3
  duration: 3,
  // Use a small size for better GIF file size
  dimensions: [ 256, 256 ],
  // Optionally specify a frame rate, defaults to 30
  fps: 30
}

const sketch = () => {
  return {
    render ({ context, width, height, playhead }) {
      // Fill the canvas with pink
      context.fillStyle = 'pink'
      context.fillRect(0, 0, width, height)

      // Get a seamless 0..1 value for our loop
      const t = Math.sin(playhead * Math.PI)

      // Animate the thickness with 'playhead' prop
      const thickness = Math.max(5, Math.pow(t, 0.55) * width * 0.5)

      // Rotate with PI to create a seamless animation
      const rotation = playhead * Math.PI

      // Draw a rotating white rectangle around the center
      const cx = width / 2
      const cy = height / 2
      const length = height * 0.5
      context.fillStyle = 'white'
      context.save()
      context.translate(cx, cy)
      context.rotate(rotation)
      context.fillRect(-thickness / 2, -length / 2, thickness, length)
      context.restore()
    },

    unload () {
      // Dispose of side-effects
      clearInterval(timer)
      window.removeEventListener('click', onClick)
    }
  }
}

canvasSketch(sketch, settings)
