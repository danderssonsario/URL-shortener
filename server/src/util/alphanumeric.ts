/**
 * Generates an random alphanumeric string.
 */
export const generateString = (length: Number) => {
  let randomString = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return randomString
}