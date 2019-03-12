/** AVW DO NOT USE - write a full page profile form instead.  */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Select from 'react-select';

// Import Style
import styles from './PersonCreateWidget.css';

const options = [
  { value: 'volunteer', label: 'volunteer' },
  { value: 'op-provider', label: 'Teacher' },
  { value: 'content-provider', label: 'Activity Provider' },
  { value: 'tester', label: 'Tester' },
  { value: 'admin', label: 'Administrator' },
];

export class PersonCreateWidget extends Component {

  constructor(props) {
    super(props);
    this.state = { categoryValue: [] };
  }

  handleSelectChange = value => {
    this.setState({ categoryValue: value });
  };

  addPerson = () => {
    const nameRef = this.refs.name;
    const emailRef = this.refs.email;
    const roleRef = this.state.categoryValue; // this.refs.role;
    if (nameRef.value && emailRef.value && roleRef.value) {
      this.props.addPerson(nameRef.value, emailRef.value, roleRef.value);
      nameRef.value = emailRef.value = roleRef.value = '';
    }
  };


  render() {
    const cls = `${styles.form} ${(this.props.showAddPerson ? styles.appear : '')}`;

    return (
      <div className={cls}>
        <div className={styles['form-role']}>
          <h2 className={styles['form-email']}><FormattedMessage id="createNewPerson" /></h2>
          <input placeholder={this.props.intl.messages.personName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.personEmail} className={styles['form-field']} ref="email" />
          <Select
            // value={selectedOption}
            onChange={this.handleSelectChange}
            options={options}
            className={styles['form-field']} ref="role"
            placeholder={this.props.intl.messages.personRole}
          />
          <a className={styles['person-submit-button']} href="#" onClick={this.addPerson}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PersonCreateWidget.propTypes = {
  addPerson: PropTypes.func.isRequired,
  showAddPerson: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PersonCreateWidget);
