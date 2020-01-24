'use strict'

module.exports.trace = label => data => {
  const message = typeof data === 'string'
    ? data
    : JSON.stringify(data, null, 2)
  console.log(label, message)
  return data
}
