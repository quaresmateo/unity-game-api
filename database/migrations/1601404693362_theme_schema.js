'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThemeSchema extends Schema {
  up() {
    this.create('themes', (table) => {
      table.increments()
      table.string('name', 120).notNullable()
      table.integer('user_id').unsigned()
      table.timestamps()

      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('themes')
  }
}

module.exports = ThemeSchema
