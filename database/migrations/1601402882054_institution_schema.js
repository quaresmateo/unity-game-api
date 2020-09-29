'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionSchema extends Schema {
  up() {
    this.create('institutions', (table) => {
      table.increments()
      table.string('name', 120).notNullable()
      table
        .string('user_id', 120)
        .notNullable()
        .comment('necessário para identificar quem criou a instituição')
      table.timestamps()

      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('institutions')
  }
}

module.exports = InstitutionSchema
