'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuebraCabecaPlayerSettingSchema extends Schema {
  up() {
    this.create('quebra_cabeca_player_settings', (table) => {
      table.increments()
      table.integer('number_of_rows').unsigned()
      table.integer('number_of_columns').unsigned()
      table
        .enu('difficulty_level', [1, 2, 3, 4, 5])
        .notNullable()
        .comment(
          '1: muito fácil, 2: fácil, 3: normal, 4: difícil, 5: muito difícil'
        )
      table.integer('image_id').unsigned().comment('Background do quebracabeça')
      table.integer('player_id').unsigned()
      table.integer('game_id').unsigned()
      table.timestamps()

      table.foreign('image_id').references('images.id').onDelete('cascade')
      table.foreign('player_id').references('players.id').onDelete('cascade')
      table.foreign('game_id').references('games.id').onDelete('cascade')
    })
  }

  down() {
    this.drop('quebra_cabeca_player_settings')
  }
}

module.exports = QuebraCabecaPlayerSettingSchema
