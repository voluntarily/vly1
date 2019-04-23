/* Dumb React component Shows contents of an opportunity
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Markdown from 'markdown-to-jsx';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';

export function PersonDetail({ person }) {
  return (
    <div>
      <Helmet moniker={person.moniker} />
      <Row type="flex" align="top">
        <Col // these settings put the image first on narrow pages.
          sm={{ span: 24, order: 1 }}
          md={{ span: 12, order: 2 }}
        >
          <img style={{ width: '100%' }} src={person.avatar} alt={person.moniker} />
        </Col>
        <Col
          sm={{ span: 24, order: 2 }}
          md={{ span: 12, order: 1 }}
        >
          <h1>{person.moniker}</h1>
          <p>{person.name}</p>
          <dl>
            <dt>
              <FormattedMessage
                id="phone"
                defaultMessage="phone"
                description="label for phone number on persons profile"
              />
            </dt>
            <dd>{person.phone}</dd>
            <dt>
              <FormattedMessage
                id="email"
                defaultMessage="email"
                description="label for email address on persons profile"
              />
            </dt>
            <dd>{person.email}</dd>
            <dt>
              <FormattedMessage
                id="gender"
                defaultMessage="Gender"
                description="label for Gender on persons profile"
              />
            </dt>
            <dd>{person.gender}</dd>
            <dt>
              <FormattedMessage
                id="status"
                defaultMessage="Status"
                description="label for status on persons profile"
              />
            </dt>
            <dd>{person.status}</dd>
            <dt>
              <FormattedMessage
                id="role"
                defaultMessage="Role"
                description="label for role on persons profile"
              />
            </dt>
            <dd>{person.role}</dd>
          </dl>
          <h3>About</h3>
          <Markdown children={person.about ? person.about : 'tell us something about yourself.'} />
        </Col>
      </Row>
    </div>
  );
}

/*
const personSchema = new Schema({
  cuid: { type: 'String', required: true },
  name: { type: 'String', required: true }, // long full name
  moniker: String, // how we should address you - eg. Andrew
  about: String, // person description
  email: { type: 'String', required: true }, // person@example.com
  phone: { type: 'String', required: true }, // +64 27 7031007
  gender: { type: 'String' }, // whatever they want to write.
  password: { type: 'String' }, // encoded
  language: { type: String, default: 'EN', lowercase: true }, // en, mi, fr etc
  avatar: String,   // url to image
  role: {
    type: 'String',
    required: true,
    enum: ['admin', 'op-provider', 'volunteer', 'content-provider', 'tester'],
  },
  // used to indicate whether people show up in searches.
  status: {
    type: 'String',
    required: true,
    default: 'active',
    enum: ['active', 'inactive', 'hold'],
  },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});
*/

PersonDetail.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    moniker: PropTypes.string,

  }).isRequired,
};

export default PersonDetail;
