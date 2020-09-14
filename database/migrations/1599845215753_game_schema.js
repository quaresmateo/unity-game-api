'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up() {
    this.create('games', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('category_id').unsigned().notNullable()
      table.timestamps()

      table
        .foreign('category_id')
        .references('categories.id')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('games')
  }
}

module.exports = GameSchema
