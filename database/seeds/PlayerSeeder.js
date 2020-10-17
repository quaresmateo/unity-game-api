'use strict'

/*
|--------------------------------------------------------------------------
| PlayerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PlayerSeeder {
  async run() {
    return await Factory.model('App/Models/Player').createMany(5)
  }
}

module.exports = PlayerSeeder
