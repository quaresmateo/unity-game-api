'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CucaFrescaPlayerSettingSchema extends Schema {
  up() {
    this.create('cuca_fresca_player_settings', (table) => {
      table.increments()
      table.integer('player_id').unsigned().notNullable()
      table.integer('game_id').unsigned().notNullable()
      table.string('selected_theme', 20)
      table.integer('pair_numbers')
      table.integer('display_time')
      table.string('background_color_card', 20)
      table.string('background_color_game', 20)
      table.string('label_text', 20)
      table.string('label_sound', 20)
      table.string('label_color', 20)
      table.integer('attempt_number')
      table.integer('match_time')
      table.timestamps()

      table.foreign('player_id').references('players.id').onDelete('cascade')
      table.foreign('game_id').references('games.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('cuca_fresca_player_settings')
  }
}

module.exports = CucaFrescaPlayerSettingSchema
