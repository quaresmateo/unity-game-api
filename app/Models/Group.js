'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
  players() {
    return this.belongsToMany('App/Models/Player').pivotTable('groups_players')
  }

  users() {
    return this.belongsToMany('App/Models/User').pivotTable('groups_users')
  }

  themes() {
    return this.belongsToMany('App/Models/Theme').pivotTable('groups_themes')
  }
}

module.exports = Group
