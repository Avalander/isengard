'use strict'

const Sequelize = require('sequelize')

module.exports = db => {
  const Pony = db.define('pony', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('Alicorn', 'Unicorn', 'Pegasus', 'Earth Pony'),
    },
    avatar: {
      type: Sequelize.STRING,
    },
  }, {
    underscored: true,
  })

  const Quote = db.define('quote', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    episode: Sequelize.STRING,
    pony_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Pony,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  }, {
    underscored: true,
  })

  Quote.belongsTo(Pony)

  return {
    Pony,
    Quote,
  }
}
