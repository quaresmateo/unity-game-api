'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class MediaControllert {
  index({ request, response }) {}

  async create({ request, response }) {}

  async store({ request, response }) {}

  async show({ params, request, response }) {}

  async edit({ params, request, response }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = MediaControllert
