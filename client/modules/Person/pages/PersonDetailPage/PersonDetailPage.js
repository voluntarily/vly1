import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Popconfirm, message, Divider } from 'antd';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PersonDetail from '../../components/PersonDetail/PersonDetail';
import { fetchPerson, deletePersonRequest } from '../../PersonActions';
import { getPerson } from '../../PersonReducer';

export class PersonDetailPage extends Component {

  componentDidMount() {
    // TODO this cuid may not need fetching if its in the store already
    // but on page reload it does.
    if (!this.props.person) {
      this.props.fetchPerson(this.props.params.cuid);
    }
  }
  handleDeletePerson = () => {
    const person = this.props.person;
    this.props.deletePersonRequest(person.cuid);
    // after this the page content is invalid. so we need to move on.
      // this.props.history.push('/');
  };

  cancel = () => {
    message.error('Delete Cancelled');
  }

  render() {
    let content;
    if (this.props.person) {
      content =
        (<div>
          <PersonDetail person={this.props.person} />
          <Divider />
          <a href={`mailto:${this.props.person.email}`}>
            <Button type="primary" shape="round" >
              <FormattedMessage id="contactPerson" defaultMessage="Contact person" description="Button to show interest in an person on PersonDetails page" />
            </Button>
          </a>
          &nbsp;
          <Link to={`/person/${this.props.person.cuid}/edit`} >
            <Button type="secondary" shape="round" >
              <FormattedMessage id="editPerson" defaultMessage="Edit" description="Button to edit an person on PersonDetails page" />
            </Button>
          </Link>
          &nbsp;
          <Popconfirm title="Confirm removal of this person." onConfirm={this.handleDeletePerson} onCancel={this.cancel} okText="Yes" cancelText="No">
            <Button type="danger" shape="round" >
              <FormattedMessage id="deletePerson" defaultMessage="Remove Request" description="Button to remove an person on PersonDetails page" />
            </Button>
          </Popconfirm>
          <br /><small>visible buttons here depend on user role</small>
        </div>);
    } else {
      content =
        (<div>
          <h2>Sorry this Person is no longer available</h2>
          <Link to={'/people'} >Search for some more</Link>

          {/* <Link to={'/ops/0/edit'} >create a new person</Link> */}
          {/* <PersonDetailForm /> */}
        </div>);
    }
    return (content);
  }
}

// Actions required to provide data for this component to render in server side.
PersonDetailPage.need = [params => {
  return fetchPerson(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    person: getPerson(state, props.params.cuid),
  };
}

PersonDetailPage.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    moniker: PropTypes.string,
    about: PropTypes

  }).isRequired,
  params: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
  }),
  fetchPerson: PropTypes.func.isRequired,
  deletePersonRequest: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { fetchPerson, deletePersonRequest }
  )(PersonDetailPage);
