'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsPlayersSchema extends Schema {
  up() {
    this.create('groups_players', (table) => {
      table.increments()
      table.integer('player_id').unsigned()
      table.integer('group_id').unsigned()
      table.timestamps()

      table.foreign('player_id').references('players.id').onDelete('cascade')
      table.foreign('group_id').references('groups.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('groups_players')
  }
}

module.exports = GroupsPlayersSchema
