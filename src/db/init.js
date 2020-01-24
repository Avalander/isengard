'use strict'

const Sequelize = require('sequelize')

const ponies = require('./ponies.data')
const quotes = require('./quotes.data')

module.exports.insertData = ({
  Pony,
  Quote,
}) => {
  const hashMapPonies = data =>
    data.reduce(
      (prev, { name, id }) =>
        Object.assign(prev, { [name]: id }),
      {}
    )
  
  const getQuotes = ponies => () =>
    quotes.map(({ pony, ...quote }) => ({
      ...quote,
      pony_id: ponies[pony],
    }))
  
  const initQuotes = ponies => Quote.sync({ force: true })
    .then(getQuotes(ponies))
    .then(data => Quote.bulkCreate(data, { returning: true }))

  const initPonies = () => Pony.sync({ force: true })
    .then(() => Pony.bulkCreate(ponies, { returning: true }))
    .then(hashMapPonies)
    .then(initQuotes)
  
  return initPonies()
}

module.exports.connect = ({
  host,
  port,
  username,
  password,
  db_name,
}) => new Sequelize(db_name, username, password, {
  host,
  port,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
