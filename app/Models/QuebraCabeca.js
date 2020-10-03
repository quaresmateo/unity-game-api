'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuebraCabeca extends Model {
  media() {
    return this.hasOne('App/Models/Media')
  }

  player() {
    return this.hasOne('Model/App/Player')
  }

  category() {
    return this.hasOne('Model/App/Category')
  }
}

module.exports = QuebraCabeca
