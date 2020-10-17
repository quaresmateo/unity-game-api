'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupSchema extends Schema {
  up() {
    this.create('groups', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('user_id').unsigned()
      table.enu('group_type', ['players', 'users']).notNullable()
      table.timestamps()

      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('groups')
  }
}

module.exports = GroupSchema
