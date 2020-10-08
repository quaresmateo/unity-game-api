'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Theme extends Model {
  whoCreated() {
    return this.hasOne('App/Models/User')
  }
}

module.exports = Theme
