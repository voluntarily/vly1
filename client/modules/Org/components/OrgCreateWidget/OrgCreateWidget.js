import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Select from 'react-select';

// Import Style
import styles from './OrgCreateWidget.css';

const options = [
  { value: 'admin', label: 'Administrator' },
  { value: 'corporate', label: 'Volunteer Provider' },
  { value: 'school', label: 'School' },
  { value: 'charity', label: 'Charity' },
  { value: 'content-provider', label: 'Activity Provider' },
];

export class OrgCreateWidget extends Component {

  constructor(props) {
    super(props);
    this.state = { categoryValue: [] };
  }

  handleSelectChange = value => {
    this.setState({ categoryValue: value });
    console.log(`Option selected:`, value);

  };

  addOrg = () => {
    const nameRef = this.refs.name;
    const aboutRef = this.refs.about;
    const typeRef = this.state.categoryValue; // this.refs.type;
    if (nameRef.value && aboutRef.value && typeRef.value) {
      this.props.addOrg(nameRef.value, aboutRef.value, typeRef.value);
      nameRef.value = aboutRef.value = typeRef.value = '';
    }
  };


  render() {
    const cls = `${styles.form} ${(this.props.showAddOrg ? styles.appear : '')}`;
    
    return (
      <div className={cls}>
        <div className={styles['form-type']}>
          <h2 className={styles['form-about']}><FormattedMessage id="createNewOrg" /></h2>
          <input placeholder={this.props.intl.messages.orgName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.orgAbout} className={styles['form-field']} ref="about" />
          <Select
            // value={selectedOption}
            onChange={this.handleSelectChange}
            options={options}
            className={styles['form-field']} ref="type"
            placeholder={this.props.intl.messages.orgType}
          />
          <a className={styles['org-submit-button']} href="#" onClick={this.addOrg}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

OrgCreateWidget.propTypes = {
  addOrg: PropTypes.func.isRequired,
  showAddOrg: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(OrgCreateWidget);
