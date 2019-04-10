import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { Button } from 'antd';


// Import Style
import styles from './ActCreateWidget.css';

const options = [
  { value: 'admin', label: 'Administrator' },
  { value: 'corporate', label: 'Volunteer Provider' },
  { value: 'school', label: 'School' },
  { value: 'charity', label: 'Charity' },
  { value: 'content-provider', label: 'Activity Provider' },
];

export class ActCreateWidget extends Component {

  constructor(props) {
    super(props);
    this.state = { actType: options[1] };
  }

  handleChange = (actType) => {
    this.setState({ actType });
  }

  addAct = () => {
    const titleRef = this.refs.title;
    const descriptionRef = this.refs.description;
    const actType = this.state.actType; // this.refs.type;
    if (titleRef.value && descriptionRef.value && actType.value) {
      this.props.addAct(titleRef.value, descriptionRef.value, actType.value);
      titleRef.value = descriptionRef.value = '';
    }
  };

  cancelAct = () => {
    this.props.cancelAct();
  };

  render() {
    const cls = `${styles.form}  }`; // ${(this.props.showAddAct ? styles.appear : '')
    const { actType } = this.state;
    return (
      <div className={cls}>
        <div className={styles['form-type']}>
          <h2 className={styles['form-description']}><FormattedMessage id="createNewAct" /></h2>
          <input placeholder={this.props.intl.messages.actName} className={styles['form-field']} ref="title" />
          <input placeholder={this.props.intl.messages.actAbout} className={styles['form-field']} ref="description" />
          <Select
            value={actType}
            onChange={this.handleChange}
            options={options}
            className={styles['form-field']}
            placeholder={this.props.intl.messages.actType}
            title="actTypeSelect"
          />
          <Button type="primary" className="submitAct" onClick={this.addAct} ><FormattedMessage id="submit" /></Button>
          <Button type="secondary" className="cancelAct" onClick={this.cancelAct} ><FormattedMessage id="cancel" /></Button>
        </div>
      </div>
    );
  }
}

ActCreateWidget.propTypes = {
  addAct: PropTypes.func.isRequired,
  cancelAct: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ActCreateWidget);
