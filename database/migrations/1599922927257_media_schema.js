'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaSchema extends Schema {
  up() {
    this.create('media', (table) => {
      table.increments()
      table.string('extension').notNullable()
      table.string('name').notNullable()
      table.string('local_layout').notNullable()
      table.integer('theme_id').unsigned()
      table.timestamps()

      table.foreign('theme_id').references('themes.id').onDelete()
    })
  }

  down() {
    this.drop('media')
  }
}

module.exports = MediaSchema
