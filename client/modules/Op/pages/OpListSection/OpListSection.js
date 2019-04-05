/*
  Smart component. Given a filter gets a list of opportunities
  and displays them in a grid. Clicking on a panel links to a
  details page. 
*/
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import OpList from '../../components/OpList';
// Import Actions
import { fetchOps } from '../../OpActions';
import { getOps } from '../../OpReducer';

class OpListSection extends Component {
  // constructor(props) {
  //   super(props);
  // }

  /* Once loaded get the list given by the filter
     if no filter then get everything on offer
  */
  componentDidMount() {
    this.props.dispatch(fetchOps());
  }

  // handleAddOp = (name, about, type) => {
  //   this.setState({ showCreateOpWidget: false });
  //   this.props.dispatch(addOpRequest({ name, about, type }));
  // };

  render() {
    return (
      <section>
        <h2>Heading showing filter here</h2>
        <OpList
          ops={this.props.ops}
        />
      </section>
    );
  }
}

// Actions required to provide data for this component to render in server side.
OpListSection.need = [() => { return fetchOps(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    ops: getOps(state),
  };
}

OpListSection.propTypes = {
  ops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// OpListSection.contextTypes = {
//   router: PropTypes.object,
// };

export default connect(mapStateToProps)(OpListSection);
