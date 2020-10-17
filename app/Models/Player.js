'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Player extends Model {
  groups() {
    return this.belongsToMany('App/Models/Group').pivotTable('groups_players')
  }

  static get dates() {
    return super.dates.concat(['date_of_birth'])
  }
}

module.exports = Player
