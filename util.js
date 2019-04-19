export const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min
}

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomElement = (array) => {
  return array[randomInt(0, array.length)]
}
