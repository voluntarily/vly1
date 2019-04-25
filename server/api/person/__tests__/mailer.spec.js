import test from 'ava';
import { sendVerifyEmail } from '../emails/mailer';
import cuid from 'cuid';


test('Should send verification email to person', async t => {
  const person = {
    cuid: cuid(),
    name: 'Testy McTestFace',
    moniker: 'Testy',
    phone: '123 456789',
    email: 'andrew@omgtech.co.nz',
    role: 'tester',
  };

  const info = await sendVerifyEmail(person);
  t.true(info.accepted[0] === person.email);
  t.true(info.rejected.length === 0);
  t.regex(info.response, /250.*/, info.response);
});
