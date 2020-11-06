'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Helpers = use('Helpers')
const Drive = use('Drive')
const Media = use('App/Models/Media')

class MediaController {
  async index({ params, request, response }) {
    const { type, theme_id } = params
    const { media_id, media_name, local_layout } = request.all()

    const medias = await Media.query()
      .where('type', type)
      .where('theme_id', theme_id)
      .whereId(media_id)
      .whereName(media_name)
      .whereLocalLayout(local_layout)
      .fetch()

    return response.json({
      message: 'Ok',
      data: medias
    })
  }

  async store({ params, request, response }) {
    const { theme_id } = params
    const { local_layout } = request.all()
    const file = request.file('file', {
      types: ['image', 'audio', 'video'],
      size: '10mb'
    })

    const { type, clientName: name } = file

    await file.move(Helpers.tmpPath(`/tema/${theme_id}/${type}/`))

    const src = `${Helpers.tmpPath(`/tema/${theme_id}/${type}/${name}`)}`

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

  async edit({ params, request, response }) {}

  async update({ params, request, response }) {}

  async destroy({ request, response }) {
    const { media_id, media_name, local_layout } = request.all()

    if (media_id || media_name || local_layout) {
      const medias = await Media.query()
        .whereId(media_id)
        .whereName(media_name)
        .whereLocalLayout(local_layout)
        .fetch()

      const media = medias.toJSON()[0]
      console.log(media)

      const fileName = media.name
      const fileId = media.id
      const targetMedia = await Media.find(fileId)
      await Drive.delete(targetMedia.src)
      await targetMedia.delete()

      return response.json({
        message: `${fileName} deletado`
      })
    }
    return response.status(404).json({
      message: 'Nenhum arquivo encontrado'
    })
  }
}

module.exports = MediaController
