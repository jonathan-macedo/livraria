import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/prisma'

export const routeCategoria = async (app: FastifyInstance) => {
  app.get('/category', async () => {
    const categories = await prisma.category.findMany()

    return { categories }
  })

  app.post('/category', async (request) => {
    const bodySchema = z.object({
      name: z.string().toLowerCase(),
    })

    const { name } = bodySchema.parse(request.body)

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    })

    return {
      newCategory,
    }
  })
}
