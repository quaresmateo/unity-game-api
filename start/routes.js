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
  Route.get('/me', 'UserController.me').middleware('auth')
  Route.get('/usuarios/:id', 'UserController.show').middleware('auth')
  Route.get('/usuarios', 'UserController.index').middleware('auth')
  Route.put('/usuarios/:id', 'UserController.update').middleware('auth')
  Route.delete('/usuarios/:id', 'UserController.destroy').middleware('auth')

  // Player routes
  Route.post('/jogadores', 'PlayerController.store').middleware('auth')
  Route.get('/jogadores', 'PlayerController.index').middleware('auth')
  Route.get('/jogadores/:id', 'PlayerController.show').middleware('auth')
  Route.put('/jogadores/:id', 'PlayerController.update').middleware('auth')
  Route.delete('/jogadores/:id', 'PlayerController.destroy').middleware('auth')

  // Themes routes
  Route.post('/temas', 'ThemeController.store').middleware('auth')
  Route.get('/temas', 'ThemeController.index').middleware('auth')
  Route.get('/temas/:id', 'ThemeController.show').middleware('auth')
  Route.put('/temas/:id', 'ThemeController.update').middleware('auth')
  Route.delete('/temas/:id', 'ThemeController.destroy').middleware('auth')

  // Institution routes
  Route.post('/instituicoes', 'InstitutionController.store').middleware('auth')
  Route.get('/instituicoes', 'InstitutionController.index')
  Route.get('/instituicoes/:id', 'InstitutionController.show').middleware(
    'auth'
  )
  Route.put('/instituicoes/:id', 'InstitutionController.update').middleware(
    'auth'
  )
  Route.delete('/instituicoes/:id', 'InstitutionController.destroy').middleware(
    'auth'
  )

  // Groups routes
  Route.post('/grupos', 'GroupController.store').middleware('auth')
  Route.get('/grupos', 'GroupController.index').middleware('auth')
  Route.get('/grupos/:id', 'GroupController.show').middleware('auth')
  Route.put('/grupos/:id', 'GroupController.update').middleware('auth')
  Route.delete('/grupos/:id', 'GroupController.destroy').middleware('auth')

  // Category routes
  Route.post('/categorias', 'CategoryController.store').middleware('auth')
  Route.get('/categorias', 'CategoryController.index').middleware('auth')
  Route.get('/categorias/:id', 'CategoryController.show').middleware('auth')
  Route.put('/categorias/:id', 'CategoryController.update').middleware('auth')
  Route.delete('/categorias/:id', 'CategoryController.destroy').middleware(
    'auth'
  )

  // Media routes
  Route.post('/midias/tema/:theme_id', 'MediaController.store').middleware(
    'auth'
  )
  ;('auth')
  Route.get(
    '/midias/tema/:theme_id/:type',
    'MediaController.index'
  ).middleware()
  Route.delete('/midias', 'MediaController.destroy').middleware('auth')
  Route.put('/midias', 'MediaController.update').middleware('auth')
}).prefix('api/v1')
