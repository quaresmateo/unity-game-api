'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsThemesSchema extends Schema {
  up () {
    this.create('groups_themes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('groups_themes')
  }
}

module.exports = GroupsThemesSchema
