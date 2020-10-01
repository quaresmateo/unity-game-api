'use strict'

/*
|--------------------------------------------------------------------------
| InstitutionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class InstitutionSeeder {
  async run() {
    return await Factory.model('App/Models/Institution').createMany(5)
  }
}

module.exports = InstitutionSeeder
