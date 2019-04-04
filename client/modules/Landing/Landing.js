import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Input, Row, Col, Menu } from 'antd';

const Search = Input.Search;

import { FormattedMessage } from 'react-intl';
import styles from './Landing.css';
import bigimage from './landing-page-bg.jpg';
import schoolsactivity from './schoolsactivity.png';
import OpList from '../Op/components/OpList';

// TODO replace this with getOps Action
const mockOps = [
  {
    cuid: '5c951c0a-3e91-436a-81ae-59ede453672a',
    title: 'Growing in the garden',
    subtitle: 'Growing digitally in the garden',
    imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
    description: 'Project to grow something in the garden',
    duration: '15 Minutes',
    location: 'Newmarket, Auckland',
    status: 'draft',
  },
  {
    cuid: '5c951c0a-3e91-436a-81ae-59ede453672b',
    title: 'The first 100 metres',
    subtitle: 'Launching into space',
    imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
    description: 'Project to build a simple rocket that will reach 100m',
    duration: '2 hours',
    location: 'Albany, Auckland',
    status: 'draft',
  },
];

export class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false,
      buttonDisabled: true,
      buttonLabel: 'Disabled' };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  onClickButton = () => {
    const togl = !this.state.buttonDisabled;
    this.setState({ buttonDisabled: togl, buttonLabel: togl ? 'Disabled' : 'Not Disabled' });
  }
  onclickCard = () => {
    // eslint-disable-next-line no-alert
    alert('Card Clicked');
  }

 

  render() {
    return (
      <div>
        <section className={styles.hero} >
          <img src={bigimage} alt="Welcome" />
          <div className={styles.herocard} >
            <h1>
              <FormattedMessage id="BeAwesome" defaultMessage="Become a Volunteer" description="First call to action on the landing page" />
            </h1>
            <p>
              <FormattedMessage
                id="BeAwesomeSub"
                defaultMessage="Volunteer your time to help the next generation of inventors accomplish epic projects."
                description="Subheading for call to action on the landing page"
              />
            </p>
            <Search
              placeholder="try 'launching rockets' "
              enterButton="Search"
              size="large"
              // eslint-disable-next-line no-console
              onSearch={value => console.log(value)}
            />
            <br /><br />
            <Button type="primary" shape="round" size="large" >
              <FormattedMessage
                id="BrowseRequests"
                defaultMessage="Browse Requests"
                description="Action button on landing page links to list of opportunities"
              />
            </Button>
          </div>
        </section>
        <div className={styles.rest} >
          <section className={styles.about} >
            <Row gutter={32}>
              <Col span={12}>
                <h2>
                  <FormattedMessage
                    id="SupportUs"
                    defaultMessage="Support Innovation in the classroom."
                    description="Sub heading for the call to action section of the landing page"
                  />
                </h2>
                <p>
                  <FormattedMessage
                    id="AboutUs"
                    // eslint-disable-next-line max-len
                    defaultMessage="Voluntarily is a platform that connects you with classrooms to teach science, technology, engineering, entrepreneurship, arts and design with the help of engaging content supplied by New Zealand’s leading innovators in educational content. "
                    description="body text of the about Voluntarily section."
                  />
                </p>
                <Button type="primary" shape="round" size="large" >
                  <FormattedMessage
                    id="LearnMore"
                    defaultMessage="Learn More"
                    description="Action button to learn more about Voluntari.ly"
                  />
                </Button>

              </Col>
              <Col span={12} >
                <img src={schoolsactivity} alt="About" />
              </Col>
            </Row>
          </section>
          <section>
            <h2>
              <FormattedMessage
                id="UpcomingOpportunities"
                defaultMessage="Happening soon"
                description="Section title on landing page before list of opportunities"
              />
            </h2>
            <OpList
              ops={mockOps}
            />
          </section>
        </div>

        <nav>
          <Menu mode="horizontal" theme="dark" >
            <Menu.Item><Link to="/acts" >Activities</Link></Menu.Item>
            <Menu.Item><Link to="/ops" >Opportunities</Link></Menu.Item>
            <Menu.Item><Link to="/people" >People</Link></Menu.Item>
            <Menu.Item><Link to="/orgs" >Organisations</Link></Menu.Item>
            <Menu.Item><Link to="/showcase" >Showcase</Link></Menu.Item>
          </Menu>
        </nav>
      </div>
    );
  }
}

Landing.propTypes = {
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(Landing);
