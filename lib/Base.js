const fetch = require('isomorphic-fetch')
const url = require('url')

class Base {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  command (command, value) {
    const valueString = typeof value === 'undefined' ? '' : `%20${value}`
    const commandUrl = url.resolve(this.baseUrl, `cm?cmnd=${command}${valueString}`)

    return fetch(commandUrl).then(res => res.text()).then(dirtyJson => {
      try {
        return JSON.parse(dirtyJson)
      } catch (err) {
        return null
      }
    })
  }

  sensorData () {
    return this.command('status', '8')
  }
}

module.exports = Base
