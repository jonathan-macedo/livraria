import fastify from 'fastify'
import { routeAutor } from './infra/routes/author'
import { routeLivro } from './infra/routes/book'
import { routeCategoria } from './infra/routes/category'

const app = fastify()

app.register(routeLivro)
app.register(routeAutor)
app.register(routeCategoria)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server ruuning on http://localhost:3333')
  })
