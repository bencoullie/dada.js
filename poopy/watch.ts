/**
 * watcher.ts
 */
// const watcher = Deno.watchFs('.')
// for await (const event of watcher) {
//   console.log('>>>> event', event)
//   // Example event: { kind: "create", paths: [ "/home/alice/deno/foo.txt" ] }
// }

// TODO Make this work

// define command used to create the subprocess
const cmd = ['pnpm', 'run', 'dev']

// create subprocess
const p = Deno.run({ cmd })

// eslint-disable-next-line no-console
console.log('p:', p.stdout)
