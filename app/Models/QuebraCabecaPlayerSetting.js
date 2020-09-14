'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuebraCabecaPlayerSetting extends Model {
  image() {
    return this.hasOne('App/Models/Image')
  }

  player() {
    return this.hasOne('Model/App/Player')
  }
}

module.exports = QuebraCabecaPlayerSetting
