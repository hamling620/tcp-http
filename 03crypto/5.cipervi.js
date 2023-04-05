const crypto = require('crypto')

const key = crypto.randomBytes(32)
const vi = crypto.randomBytes(16)

function encrypt (text, key, vi) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, vi)
  let encrypted = cipher.update(text, 'utf8')
  // encrypted += cipher.final('hex')
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString('hex')
}

function decrypt (encrypted, key, vi) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, vi)
  let decrypted = decipher.update(encrypted, 'hex')
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString('utf8')
}

const encrypted = encrypt('hamling', key, vi)
console.log(encrypted)
const decrypted = decrypt(encrypted, key, vi)
console.log(decrypted)
