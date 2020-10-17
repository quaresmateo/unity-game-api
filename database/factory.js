'use strict'

const { get } = require('@adonisjs/lucid/src/Factory')

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

/**
 * Retorna números inteiros aleatórios de um interválo
 *
 * Padrão de 1 até 5
 */
function getRandomInt(min = 1, max = 6) {
  return Math.floor(Math.random() * (max - min)) + min
}

Factory.blueprint('App/Models/Institution', (faker) => {
  const user_id = getRandomInt()
  return {
    name: faker.word().toUpperCase(),
    user_id
  }
})

Factory.blueprint('App/Models/User', (faker) => {
  const fullname = faker.name({ middle: true, nationality: 'it' })
  const username =
    fullname.split(' ')[0].toLowerCase() +
    faker.string({ length: 3, pool: '_123456789' })
  const email =
    fullname
      .toLowerCase()
      .split(' ')
      .join(faker.string({ length: 1, pool: '_.' })) + '@email.com'
  const userType = ['responsible', 'professional']
  const role = userType[getRandomInt(0, 2)]

  return {
    fullname,
    username,
    email,
    role,
    profession: faker.word(),
    institution_id: getRandomInt(),
    password: '123456'
  }
})

Factory.blueprint('App/Models/Player', (faker) => {
  const fullname = faker.name({ middle: true, nationality: 'it' })
  const username =
    fullname.split(' ')[0].toLowerCase() +
    faker.string({ length: 3, pool: '_123456789' })
  const day = getRandomInt(1, 26)
  const month = getRandomInt(0, 12)
  const year = getRandomInt(2000, 2018)
  const date_of_birth = new Date(`${month}-${day}-${year}`)
  const koh_types = [
    'visual',
    'física',
    'intelectual',
    'mental',
    'auditiva',
    'múltipla'
  ]
  const kind_of_handicap = koh_types[getRandomInt(0, 6)]

  return {
    user_id: getRandomInt(),
    fullname,
    username,
    identification: faker.string({ length: 6, pool: '123456789' }),
    date_of_birth,
    kind_of_handicap,
    diagnosis: faker.paragraph({ setence: 3 })
  }
})
