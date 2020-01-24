'use strict'

const initDb = require('db')
const { trace } = require('utils')
const loadConfig = require('load-env')

const db_config = loadConfig()


const main = ({ db, Pony, Quote }) =>
  Quote
    .findAll({
      where: { pony_id: 1 },
      include: [{
        model: Pony,
        attributes: [
          'name',
          'avatar',
        ],
      }],
    })
    .then(trace('Quote'))


initDb(db_config)
  .then(main)
  .then(() => process.exit())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
