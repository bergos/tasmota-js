const padStart = require('lodash/padStart')
const Switchable = require('./Switchable')

class SonoffB1 extends Switchable {
  color ({ red, green, blue, cold, warm } = {}) {
    return Promise.resolve().then(() => {
      if (!(red || green || blue || cold || warm)) {
        return
      }

      const color = [
        `${padStart((red || 0).toString(16), 2, '0')}`,
        `${padStart((green || 0).toString(16), 2, '0')}`,
        `${padStart((blue || 0).toString(16), 2, '0')}`,
        `${padStart((cold || 0).toString(16), 2, '0')}`,
        `${padStart((warm || 0).toString(16), 2, '0')}`
      ].join('')

      return this.command('color', color)
    }).then(() => {
      return this.command('color').then(result => {
        const color = result.Color

        return {
          red: parseInt(color.substring(0, 2), 16),
          green: parseInt(color.substring(2, 4), 16),
          blue: parseInt(color.substring(4, 6), 16),
          cold: parseInt(color.substring(6, 8), 16),
          warm: parseInt(color.substring(8, 10), 16)
        }
      })
    })
  }
}

module.exports = SonoffB1
