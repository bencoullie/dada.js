import { serve } from 'https://deno.land/std@0.159.0/http/server.ts'

const port = 1337

const handler = async (request: Request): Promise<Response> => {
  if (request.url.includes('main.js')) {
    const mainScript = await Deno.readTextFile('./src/main.js')

    return new Response(mainScript, {
      headers: {
        'content-type': 'application/javascript',
      },
    })
  }

  const indexFile = await Deno.readTextFile('./src/index.html')

  return new Response(indexFile, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  })
}

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)

await serve(handler, { port })
