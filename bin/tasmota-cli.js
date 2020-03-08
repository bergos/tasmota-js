#!/usr/bin/env node

const program = require('commander')
const Tasmota = require('..')

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

program
  .command('status <url>')
  .action(async url => {
    try {
      const device = new Tasmota(url)

      console.log(await device.status())
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('on <url>')
  .action(async url => {
    try {
      const device = new Tasmota(url, { features: ['Switchable'] })

      await device.on()
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('off <url>')
  .action(async url => {
    try {
      const device = new Tasmota(url, { features: ['Switchable'] })

      await device.off()
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('is-on <url>')
  .action(async url => {
    try {
      const device = new Tasmota(url, { features: ['Switchable'] })

      console.log(await device.isOn())
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('color <url>')
  .option('-r, --red [value]', 'red')
  .option('-g, --green [value]', 'green')
  .option('-b, --blue [value]', 'blue')
  .option('-c, --cold [value]', 'cold')
  .option('-w, --warm [value]', 'warm')
  .action(async (url, options) => {
    try {
      const device = new Tasmota(url, { features: ['Light'] })

      await device.color(parseColor(options))
    } catch (err) {
      console.error(err)
    }
  })

program.parse(process.argv)
