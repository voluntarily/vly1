const Email = require('email-templates');
const path = require('path');
import { getTransport } from '../../../email/email';

/*
  format and send a verification email to the given address
*/
export const sendVerifyEmail = async (person) => {
  try {
    const transport = await getTransport();
    const email = new Email({
      message: {
        from: 'andrew@voluntari.ly',
      },
      // uncomment below to send emails in development/test env:
      send: true,
      transport,
      preview: {
        app: 'firefox',
        wait: false,
      },
      // transport: {
      //   jsonTransport: true,
      // }
    });

    return await email.send({
      template: path.join(__dirname, 'verify'),
      message: {
        to: person.email,
      },
      locals: {
        person,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return null;
};

