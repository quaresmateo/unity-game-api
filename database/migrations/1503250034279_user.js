'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('fullname', 120).notNullable()
      table.string('profession', 120)
      table
        .string('role', ['responsible', 'professional'])
        .defaultTo('professional')
      table.integer('institution_id').unsigned()
      table.timestamps()

      table
        .foreign('institution_id')
        .references('instituitions.id')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
