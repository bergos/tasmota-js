const featureList = {
  Light: require('./Light'),
  PowerMeter: require('./PowerMeter'),
  Switchable: require('./Switchable')
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

module.exports = {
  addFeature,
  addFeatures,
  detectFeatures
}
