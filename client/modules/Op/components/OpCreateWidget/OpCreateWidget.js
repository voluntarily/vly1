import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as Button from '../../../../components/Button/Button';

// Import Style
import styles from './OpCreateWidget.css';

const options = [
  { value: 'admin', label: 'Administrator' },
  { value: 'corporate', label: 'Volunteer Provider' },
  { value: 'school', label: 'School' },
  { value: 'charity', label: 'Charity' },
  { value: 'content-provider', label: 'Activity Provider' },
];

export class OpCreateWidget extends Component {

  constructor(props) {
    super(props);
    this.state = { opType: options[1] };
  }

  handleChange = (opType) => {
    this.setState({ opType });
  }

  addOp = () => {
    const nameRef = this.refs.name;
    const aboutRef = this.refs.about;
    const opType = this.state.opType; // this.refs.type;
    if (nameRef.value && aboutRef.value && opType.value) {
      this.props.addOp(nameRef.value, aboutRef.value, opType.value);
      nameRef.value = aboutRef.value = '';
    }
  };

  cancelOp = () => {
    this.props.cancelOp();
  };

  render() {
    const cls = `${styles.form}  }`; // ${(this.props.showAddOp ? styles.appear : '')
    const { opType } = this.state;
    return (
      <div className={cls}>
        <div className={styles['form-type']}>
          <h2 className={styles['form-about']}><FormattedMessage id="createNewOp" /></h2>
          <input placeholder={this.props.intl.messages.opName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.opAbout} className={styles['form-field']} ref="about" />
          <Select
            value={opType}
            onChange={this.handleChange}
            options={options}
            className={styles['form-field']}
            placeholder={this.props.intl.messages.opType}
            name="opTypeSelect"
          />
          <Button.Primary className="submitOp" onClick={this.addOp} ><FormattedMessage id="submit" /></Button.Primary>
          <Button.Secondary className="cancelOp" onClick={this.cancelOp} ><FormattedMessage id="cancel" /></Button.Secondary>
        </div>
      </div>
    );
  }
}

OpCreateWidget.propTypes = {
  addOp: PropTypes.func.isRequired,
  cancelOp: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(OpCreateWidget);
