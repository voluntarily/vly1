/**
 * Show hello world
 */

const greet = 'hello from Voluntari.ly V0.0.1';

export function getGreeting(req, res) {
  return res.status(200)
    .json({ message: greet });
}
