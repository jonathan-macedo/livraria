import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../config/prisma'

export const routeAutor = async (app: FastifyInstance) => {
  app.get('/author', async () => {
    const authors = await prisma.author.findMany()

    return { authors }
  })

  app.post('/author', async (request) => {
    const bodySchema = z.object({
      name: z.string().toLowerCase(),
    })

    const { name } = bodySchema.parse(request.body)

    const newAuthor = await prisma.author.create({
      data: {
        name,
      },
    })

    return {
      newAuthor,
    }
  })
}
