const Switchable = require('./Switchable')

class SonoffPow extends Switchable {
  current () {
    return this.sensorData().then(result => result.StatusSNS.ENERGY.Current)
  }

  power () {
    return this.sensorData().then(result => result.StatusSNS.ENERGY.Power)
  }

  voltage () {
    return this.sensorData().then(result => result.StatusSNS.ENERGY.Voltage)
  }
}

module.exports = SonoffPow
