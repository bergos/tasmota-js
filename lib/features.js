import Light from './Light.js'
import PowerMeter from './PowerMeter.js'
import Switchable from './Switchable.js'

const featureList = {
  Light,
  PowerMeter,
  Switchable
}

function addFeature (obj, name) {
  const feature = featureList[name]

  if (!feature) {
    return
  }

  Object.getOwnPropertyNames(feature.prototype).forEach(property => {
    if (property !== 'constructor') {
      obj[property] = feature.prototype[property]
    }
  })
}

function addFeatures (obj, names) {
  names.forEach(name => {
    addFeature(obj, name)
  })
}

async function detectFeatures (obj) {
  const status = await obj.status()

  for (const [name, feature] of Object.entries(featureList)) {
    if (typeof feature.detect !== 'function') {
      continue
    }

    if (await feature.detect(obj, status)) {
      addFeature(obj, name)
    }
  }
}

export {
  addFeature,
  addFeatures,
  detectFeatures
}
