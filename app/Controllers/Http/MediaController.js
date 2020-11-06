'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Helpers = use('Helpers')
const Drive = use('Drive')
const Media = use('App/Models/Media')

const fileOptions = {
  types: ['image', 'audio', 'video'],
  size: '10mb'
}

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
    const file = request.file('file', fileOptions)

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

  async update({ request, response }) {
    const {
      media_id,
      media_name,
      local_layout_param,
      local_layout
    } = request.all()

    const file = request.file('file', fileOptions)

    if (media_id || media_name || local_layout_param) {
      const medias = await Media.query()
        .whereId(media_id)
        .whereName(media_name)
        .whereLocalLayout(local_layout_param)
        .fetch()

      const media = medias.toJSON()[0]

      if (file) {
        const fileName = media.name
        const fileId = media.id
        const targetMedia = await Media.findOrFail(fileId)

        await file.move(
          Helpers.tmpPath(`/tema/${targetMedia.theme_id}/${file.type}/`, {
            rewrite: true
          })
        )
        // prettier-ignore
        const src = `${Helpers.tmpPath(`/tema/${targetMedia.theme_id}/${file.type}/${file.clientName}`)}`
        await Drive.delete(targetMedia.src)

        targetMedia.merge({
          src,
          local_layout,
          name: file.clientName,
          type: file.type
        })
        targetMedia.save()

        return response.json({
          message: `${fileName} atualizado`
        })
      } else if (local_layout) {
        const targetMedia = await Media.findOrFail(media.id)
        const mediaOldName = targetMedia.local_layout

        targetMedia.merge({ local_layout })
        targetMedia.save()

        return response.json({
          data: targetMedia,
          message: `Local de mídia '${mediaOldName}' foi atualizada para '${targetMedia.local_layout}'`
        })
      }
    }

    return response.status(404).json({
      message: 'Nenhum arquivo encontrado'
    })
  }

  async destroy({ request, response }) {
    const { media_id, media_name, local_layout } = request.all()

    if (media_id || media_name || local_layout) {
      const medias = await Media.query()
        .whereId(media_id)
        .whereName(media_name)
        .whereLocalLayout(local_layout)
        .fetch()

      const media = medias.toJSON()[0]

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
