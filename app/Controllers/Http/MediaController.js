'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Helpers = use('Helpers')
const Media = use('App/Models/Media')

class MediaController {
  async index({ params, request, response }) {
    const { type, theme_id } = params

    const medias = await Media.query()
      .where('type', type)
      .where('theme_id', theme_id)
      .fetch()

    return response.json({
      message: 'Ok',
      data: medias
    })
  }

  async create({ request, response }) {}

  async store({ params, request, response }) {
    const { theme_id } = params
    const { local_layout } = request.all()
    const file = request.file('file', {
      types: ['image', 'audio', 'video'],
      size: '10mb'
    })

    const { type, clientName: name } = file

    await file.move(
      Helpers.resourcesPath(`/assets/tema/${theme_id}/${type}/`),
      { overwrite: true }
    )

    const src = `${Helpers.resourcesPath(
      `/assets/tema/${theme_id}/${type}/${name}`
    )}`

    if (file.error()) {
      const media = await Media.create({
        name,
        type,
        local_layout,
        src,
        theme_id
      })

      return response.json({
        message: 'Criado',
        data: media
      })
    }
  }

  async show({ params, request, response }) {}

  async edit({ params, request, response }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = MediaController
