#!/usr/bin/env node

const program = require('commander')
const tasmota = require('..')

function parseColor (options) {
  const color = {}

  if (options.red) {
    color.red = parseInt(options.red)
  }

  if (options.green) {
    color.green = parseInt(options.green)
  }

  if (options.blue) {
    color.blue = parseInt(options.blue)
  }

  if (options.cold) {
    color.cold = parseInt(options.cold)
  }

  if (options.warm) {
    color.warm = parseInt(options.warm)
  }

  return color
}

function color (device, options) {
  return device.color(parseColor(options)).then(color => console.log(JSON.stringify(color)))
}

function current (device) {
  return device.current().then(current => console.log(JSON.stringify({ current })))
}

function isOn (device) {
  return device.isOn().then(isOn => console.log(JSON.stringify({ isOn })))
}

function off (device) {
  return device.off()
}

function on (device) {
  return device.on()
}

function power (device) {
  return device.power().then(power => console.log(JSON.stringify({ power })))
}

function voltage (device) {
  return device.voltage().then(voltage => console.log(JSON.stringify({ voltage })))
}

program
  .command('sonoff-basic <url> <command>')
  .action((url, command) => {
    return Promise.resolve().then(() => {
      const device = new tasmota.SonoffBasic(url)

      switch (command) {
        case 'is-on':
          return isOn(device)
        case 'off':
          return off(device)
        case 'on':
          return on(device)
      }
    }).catch(err => console.error(err))
  })

program
  .command('sonoff-b1 <url> <command>')
  .option('-r, --red [value]', 'red')
  .option('-g, --green [value]', 'green')
  .option('-b, --blue [value]', 'blue')
  .option('-c, --cold [value]', 'cold')
  .option('-w, --warm [value]', 'warm')
  .action((url, command, options) => {
    return Promise.resolve().then(() => {
      const device = new tasmota.SonoffB1(url)

      switch (command) {
        case 'is-on':
          return isOn(device)
        case 'off':
          return off(device)
        case 'on':
          return on(device)
        case 'color':
          return color(device, options)
      }
    }).catch(err => console.error(err))
  })

program
  .command('sonoff-pow <url> <command>')
  .action((url, command) => {
    return Promise.resolve().then(() => {
      const device = new tasmota.SonoffPow(url)

      switch (command) {
        case 'is-on':
          return isOn(device)
        case 'off':
          return off(device)
        case 'on':
          return on(device)
        case 'current':
          return current(device)
        case 'power':
          return power(device)
        case 'voltage':
          return voltage(device)
      }
    }).catch(err => console.error(err))
  })

program.parse(process.argv)
