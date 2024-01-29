class Switchable {
  async isOn () {
    const status = await this.status()

    return status.Status.Power === 1
  }

  async on () {
    return this.command('power', '1')
  }

  async off () {
    return this.command('power', '0')
  }

  static async detect (obj, status) {
    return Boolean(status.Status && typeof status.Status.Power === 'number')
  }
}

export default Switchable
