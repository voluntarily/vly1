import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Import Selectors
import ActCreateWidget from '../../components/ActCreateWidget/ActCreateWidget';
// Import Components
import ActList from '../../components/ActList';
// Import Actions
import { addActRequest, deleteActRequest, fetchActs } from '../../ActActions';
import { getActs } from '../../ActReducer';
import { Button } from 'antd';

class ActListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { showCreateActWidget: false };
  }

  componentDidMount() {
    this.props.dispatch(fetchActs());
  }
  handleActCreate = () => {
    this.setState({ showCreateActWidget: true });
  };
  handleCancelAct = () => {
    this.setState({ showCreateActWidget: false });
  };

  handleDeleteAct = act => {
    if (confirm('Do you want to delete this activity')) { // eslint-disable-line
      this.props.dispatch(deleteActRequest(act));
    }
  };

  handleAddAct = (title, description, type) => {
    this.setState({ showCreateActWidget: false });
    this.props.dispatch(addActRequest({ title, description, type }));
  };

  render() {
    return (
      <div>
        <h1>Activities</h1>
        <div>
          {
            this.state.showCreateActWidget
            ? <ActCreateWidget addAct={this.handleAddAct} cancelAct={this.handleCancelAct} />
            : <Button type="primary" onClick={this.handleActCreate} >Add Activity</Button>
          }
        </div>
        <ActList
          handleDeleteAct={this.handleDeleteAct}
//          showAddAct={this.props.showAddAct}
          acts={this.props.acts}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
ActListPage.need = [() => { return fetchActs(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    acts: getActs(state),
  };
}

ActListPage.propTypes = {
  acts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imgUrl: PropTypes.any,
    description: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

ActListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(ActListPage);
