import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../config/prisma'

export const routeLivro = async (app: FastifyInstance) => {
  app.get('/book', async () => {
    const books = await prisma.book.findMany()

    return { books }
  })

  app.post('/book', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string().toLowerCase(),
      numberPage: z.number(),
      publishingCompany: z.string().toLowerCase(),
      author: z.string().toLowerCase(),
      category: z.string().toLowerCase(),
    })

    const { name, numberPage, publishingCompany, author, category } =
      bodySchema.parse(request.body)

    const authorExist = await prisma.author.findFirst({
      where: {
        name: author,
      },
    })

    if (!authorExist) return reply.status(400)

    const categoryExist = await prisma.category.findFirst({
      where: {
        name: category,
      },
    })

    if (!categoryExist) return reply.status(400)

    const book = await prisma.book.create({
      data: {
        name,
        numberPage,
        publishingCompany,
        authorId: authorExist.id,
        categoryId: categoryExist.id,
      },
    })

    return { book }
  })

  // app.patch()
}
