const Tasmota = require('..')

async function main () {
  const device = new Tasmota('http://192.168.1.28/', {
    features: ['Switchable', 'Light']
  })

  console.log('turn light off...')
  await device.off()

  await (new Promise(resolve => setTimeout(resolve, 5000)))

  console.log('turn light on...')
  await device.on()

  await (new Promise(resolve => setTimeout(resolve, 5000)))

  console.log('change light color...')
  await device.color({
    red: 0,
    green: 0,
    blue: 0,
    cold: 0,
    warm: 192
  })
}

main()
