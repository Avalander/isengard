const model = require('./model')
const {
  connect,
  insertData,
} = require('./init')

module.exports = ({
  host,
  port,
  username,
  password,
  db_name,
}) => {
  const db = connect({
    host,
    port,
    username,
    password,
    db_name,
  })
  const {
    Pony,
    Quote,
  } = model(db)

  return insertData({ Pony, Quote })
    .then(() => ({
      db,
      Pony,
      Quote,
    }))
}
