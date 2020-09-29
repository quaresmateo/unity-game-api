'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MediaSchema extends Schema {
  up() {
    this.create('media', (table) => {
      table.increments()
      table.string('src').notNullable()
      table.string('title').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('images')
    this.drop('media')
  }
}

module.exports = MediaSchema
