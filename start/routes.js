'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get(
    '/',
    () =>
      'API do Jogos Adaptáveis - Documentação disponível em  https://documenter.getpostman.com/view/6331039/TVCmQjYG'
  )

  // Auth routes
  Route.post('/login', 'UserController.login')
  Route.post('/usuario', 'UserController.store')

  // User routes
  Route.get('/usuario', 'UserController.show').middleware('auth')
  Route.get('/usuarios', 'UserController.index').middleware('auth')
  Route.put('/usuario', 'UserController.update').middleware('auth')

  // Player routes
  Route.post('/jogador', 'PlayerController.store').middleware('auth')
  Route.get('/jogadores', 'PlayerController.index').middleware('auth')

  // Institution routes
  Route.post('/instituicao', 'InstitutionController.store').middleware('auth')
  Route.put('/instituicao/:id', 'InstitutionController.update').middleware(
    'auth'
  )
  Route.delete('/instituicao/:id', 'InstitutionController.destroy').middleware(
    'auth'
  )
  Route.get('/instituicoes', 'InstitutionController.index')
}).prefix('api/v1')
