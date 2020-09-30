'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsThemesSchema extends Schema {
  up() {
    this.create('groups_themes', (table) => {
      table.increments()
      table.integer('theme_id').insigned()
      table.integer('group_id').insigned()
      table.timestamps()

      table.foreign('theme_id').references('themes.id').onDelete('cascade')
      table.foreign('group_id').references('groups.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('groups_themes')
  }
}

module.exports = GroupsThemesSchema
