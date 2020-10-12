'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Theme extends Model {
  whoCreated() {
    return this.hasOne('App/Models/User')
  }

  groups() {
    return this.belongsToMany('App/Models/Group').pivotTable('groups_themes')
  }
}

module.exports = Theme
