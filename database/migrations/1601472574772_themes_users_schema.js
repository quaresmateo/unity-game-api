'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThemesUsersSchema extends Schema {
  up () {
    this.create('themes_users', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('themes_users')
  }
}

module.exports = ThemesUsersSchema
