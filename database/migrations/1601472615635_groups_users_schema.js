'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsUsersSchema extends Schema {
  up () {
    this.create('groups_users', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('groups_users')
  }
}

module.exports = GroupsUsersSchema
