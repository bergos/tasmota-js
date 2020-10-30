class PowerMeter {
  async power () {
    const status = await this.status()

    if (!status.StatusSNS || !status.StatusSNS.ENERGY) {
      return null
    }

    const energy = status.StatusSNS.ENERGY

    return {
      current: energy.Power,
      total: energy.Total,
      today: energy.Today
    }
  }

  static async detect (obj, status) {
    return Boolean(status.StatusSNS && status.StatusSNS.ENERGY)
  }
}

module.exports = PowerMeter
