'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThemesUsersSchema extends Schema {
  up() {
    this.create('themes_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('theme_id').unsigned()
      table.timestamps()

      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('theme_id').references('themes.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('themes_users')
  }
}

module.exports = ThemesUsersSchema
