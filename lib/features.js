const featureList = {
  Light: require('./Light'),
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

module.exports = {
  addFeature,
  addFeatures
}
