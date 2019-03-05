const execa = require('execa');

const server = execa('node', ['dist/index.js'], ['cleanup']);

server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);

const test = execa('ava', ['-v'], ['cleanup']);

test.stdout.pipe(process.stdout);
test.stderr.pipe(process.stderr);

test
  .then(() => process.exit())
  .catch(() => process.exit(1));