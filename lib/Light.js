const padStart = require('lodash/padStart')

class Light {
  async color ({ red, green, blue, cold, warm } = {}) {
    if (red || green || blue || cold || warm) {
      const color = [
        `${padStart((red || 0).toString(16), 2, '0')}`,
        `${padStart((green || 0).toString(16), 2, '0')}`,
        `${padStart((blue || 0).toString(16), 2, '0')}`,
        `${padStart((cold || 0).toString(16), 2, '0')}`,
        `${padStart((warm || 0).toString(16), 2, '0')}`
      ].join('')

      await this.command('color', color)
    }

    const status = await this.status()

    if (!status.StatusSTS || !status.StatusSTS.Color) {
      return null
    }

    const color = status.StatusSTS.Color

    return {
      red: parseInt(color.substring(0, 2), 16),
      green: parseInt(color.substring(2, 4), 16),
      blue: parseInt(color.substring(4, 6), 16),
      cold: parseInt(color.substring(6, 8), 16),
      warm: parseInt(color.substring(8, 10), 16)
    }
  }

  static async detect (obj, status) {
    return Boolean(status.StatusSTS && status.StatusSTS.Color)
  }
}

module.exports = Light
