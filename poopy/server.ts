import { serve } from 'https://deno.land/std@0.159.0/http/server.ts'
import staticFiles from 'https://deno.land/x/static_files@1.1.6/mod.ts'

const port = 1337 as const

const serveFiles = (request: Request) => {
  return staticFiles('dist')({
    request,
    respondWith: (response: Response) => response,
  })
}

// TODO consider live reloading: https://deno.land/x/livereload@0.1.0

await serve((req) => serveFiles(req), { port })

console.log(`Poop application running. Access it at: http://localhost:${port}/`)
