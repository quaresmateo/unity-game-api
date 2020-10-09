'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
  players() {
    return this.belongsToMany('App/Models/Player').pivotTable('groups_players')
  }
}

module.exports = Group
