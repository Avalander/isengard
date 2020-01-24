const {
  existsSync,
  readFileSync,
  writeFileSync
} = require('fs')
const { resolve } = require('path')

module.exports = (file = resolve(__dirname, '..', '.env')) =>
  existsSync(file)
    ? readFile(file)
    : createFile(file)

const createFile = file => {
  writeFileSync(file, defaultFile)
  throw new Error(`File ${file} not found. Template file created.`)
}

const readFile = file => {
  const data = readFileSync(file, { encoding: 'utf8' })
  const params = Object.fromEntries(
    data.split('\n')
      .filter(isValidLine)
      .map(mapLine)
  )
  Object.assign(process.env, params)
  return params
}

const isValidLine = line =>
  line.includes('=')

const mapLine = line =>
  line.split('=')
    .map(x => x.trim())
    .map(x => isNaN(x)
      ? x
      : Number(x)
    )

const defaultFile =
`host =
port =
username =
password =
db_name =
`
