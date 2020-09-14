'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlayerSchema extends Schema {
  up() {
    this.create('players', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .comment('id do profissional')
      table.string('fullname').notNullable()
      table.string('identification').notNullable().comment('RG/CPF')
      table.datetime('date_of_birth', { precision: 6 }).notNullable()
      table
        .enu('kind_of_handicap', [
          'visual',
          'física',
          'intelectual',
          'mental',
          'auditiva',
          'múltipla'
        ])
        .notNullable()
      table.string('diagnosis', ['longtext'])
      table.timestamps()

      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('players')
  }
}

module.exports = PlayerSchema
