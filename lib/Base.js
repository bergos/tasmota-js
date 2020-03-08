const { resolve } = require('path')
const { URL } = require('url')
const fetch = require('nodeify-fetch')
const { addFeatures } = require('./features')

class Base {
  constructor (url, { user, password, features = [] } = {}) {
    this.url = url
    this.user = user
    this.password = password

    addFeatures(this, features)
  }

  async command (command, value) {
    return this.commands([[command, value]])
  }

  async commands (commands) {
    const url = new URL(this.url)

    url.pathname = resolve(url.pathname, 'cm')

    if (this.user && this.password) {
      url.searchParams.append('user', this.user)
      url.searchParams.append('password', this.password)
    }

    const commandString = commands.map(([key, value]) => `${key} ${value}`).join(';')

    url.searchParams.append('cmnd', commandString)

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  }

  async status () {
    return this.command('status', '0')
  }
}

module.exports = Base
