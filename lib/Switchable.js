const Base = require('./Base')

class Switchable extends Base {
  isOn () {
    return this.command('power').then(result => result.POWER === 'ON')
  }

  on () {
    return this.command('power', 'on')
  }

  off () {
    return this.command('power', 'off')
  }
}

module.exports = Switchable
