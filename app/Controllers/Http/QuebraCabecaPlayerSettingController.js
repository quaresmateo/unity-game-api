'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with quebracabecaplayersettings
 */
class QuebraCabecaPlayerSettingController {
  /**
   * Show a list of all quebracabecaplayersettings.
   * GET quebracabecaplayersettings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  async create({ request, response }) {}

  async store({ request, response, auth }) {}

  /**
   * Display a single quebracabecaplayersetting.
   * GET quebracabecaplayersettings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing quebracabecaplayersetting.
   * GET quebracabecaplayersettings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update quebracabecaplayersetting details.
   * PUT or PATCH quebracabecaplayersettings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a quebracabecaplayersetting with id.
   * DELETE quebracabecaplayersettings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = QuebraCabecaPlayerSettingController
