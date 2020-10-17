'use strict'

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

Factory.blueprint('App/Models/Institution', (faker) => {
  const user_id = getRandomInt(1, 5)
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
  const role = userType[getRandomInt(1, 2)]

  return {
    fullname,
    username,
    email,
    role,
    profession: faker.word(),
    institution_id: getRandomInt(1, 5),
    password: '123456'
  }
})
