'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  category() {
    return this.hasOne('App/Models/Category')
  }

  QuebraCabecaPlayerSetting() {
    return this.hasOne('App/Models/QuebraCabecaPlayerSetting')
  }

  CucaFrescaPlayerSetting() {
    return this.hasOne('App/Models/CucaFrescaPlayerSetting')
  }
}

module.exports = Game
