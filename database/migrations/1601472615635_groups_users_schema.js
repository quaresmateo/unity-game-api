'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsUsersSchema extends Schema {
  up() {
    this.create('groups_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('group_id').unsigned()
      table.timestamps()

      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('group_id').references('groups.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('groups_users')
  }
}

module.exports = GroupsUsersSchema
