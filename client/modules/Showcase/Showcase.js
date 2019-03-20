import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import styles from '../../main.css';

import * as Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
// import ActivityCard from '../Act/components/ActivityCard/ActivityCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import andrewImg from './img/andrew.jpeg';
import walterImg from './img/walter.jpeg';
import img1 from '../../components/CategoryCard/img/img1.png';
import img2 from '../../components/CategoryCard/img/img2.png';
import img3 from '../../components/CategoryCard/img/img3.png';
import img4 from '../../components/CategoryCard/img/img4.png';
import img5 from '../../components/CategoryCard/img/img5.png';
import img6 from '../../components/CategoryCard/img/img6.png';
import img7 from '../../components/CategoryCard/img/img7.png';
import img8 from '../../components/CategoryCard/img/img8.png';
import img9 from '../../components/CategoryCard/img/img9.png';
import imgA from '../../components/CategoryCard/img/imgA.png';
import imgB from '../../components/CategoryCard/img/imgB.png';
import imgC from '../../components/CategoryCard/img/imgC.png';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export class Showcase extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false,
      selectedOption: null,
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
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  render() {
    const { selectedOption } = this.state;

    // const testActivity1 = {
    //   title: 'Help us teach our robot army of roombas to clean our school',
    //   image: 'http://0.0.0.0:8000/89b08c89c639d60004ac5be688af9b52.jpeg',
    //   commitment: 'Whole day',
    // };
    // const testActivity2 = {
    //   title: 'Programming robots with Scratch',
    //   image: 'http://0.0.0.0:8000/3636679227674278e01035596ff30aab.jpeg',
    //   commitment: '2 hour',
    // };

    return (
      <div className={styles.container}>
        <h1>Typography Elements</h1>

        <h1>Heading 1 <small>Subheading</small></h1>
        <h2>Heading 2 <small>Subheading</small></h2>
        <h3>Heading 3 <small>Subheading</small></h3>
        <h4>Heading 4 <small>Subheading</small></h4>
        <h5>Heading 5 <small>Subheading</small></h5>
        <h6>Heading 6 <small>Subheading</small></h6>

        <h2>Divider</h2>
        <Divider />
        <p>Divider with width 200</p>
        <Divider width="200" />
        <h2>P body text paragraph</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis
        iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
        <p>Paragraph with <em>emphasis</em> and <strong>strong</strong></p>
        <h2>Lists</h2>
        <ul>
          <li>Apple</li>
          <li>Orange</li>
          <li>Strawberry</li>
        </ul>
        <ol>
          <li>Wake up</li>
          <li>Eat breakfast</li>
          <li>Go to work</li>
        </ol>
        <h2>Images</h2>
        <img src={andrewImg} alt="Andrew Watkins" />
        <img src={walterImg} alt="Walter Lim" />

        <h2>Code &amp; Quotations</h2>
        <p>This is some text with some inline <code>source code</code> and some keyboard <kbd>input</kbd>.</p>
        <pre>git clone http://voluntarily.github.com/vly1</pre>
        <blockquote cite="www.quotation.source">This is some text quoted from elsewhere.</blockquote>

        <h1>Layout Elements</h1>
        {/* <h2>Activity Cards</h2>
        <div className={styles.row}>

          <ActivityCard activity={testActivity1} onPress={this.onClickCard} />
          <ActivityCard activity={testActivity2} onPress={this.onClickCard} />
          <ActivityCard activity={testActivity1} onPress={this.onClickCard} />
          <ActivityCard activity={testActivity2} onPress={this.onClickCard} />
        </div> */}

        <h2>Category Cards</h2>
        <div className={styles.row}>
          <CategoryCard category={{ title: 'Coding', image: img1 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Robotics', image: img2 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Chemistry', image: img3 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Rocketry', image: img4 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Design', image: img5 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Teaching', image: img6 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Admin', image: img7 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Finance', image: img8 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Finance', image: img9 }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Finance', image: imgA }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Finance', image: imgB }} onPress={this.onClickCard} />
          <CategoryCard category={{ title: 'Finance', image: imgC }} onPress={this.onClickCard} />
        </div>

        <h1>Form Elements</h1>
        <h2>Buttons</h2>
        <Button.Primary disabled={!this.state.buttonDisabled} onClick={this.onClickButton}>Press Me</Button.Primary><br />
        <Button.Primary disabled={this.state.buttonDisabled} onClick={this.onClickButton} >{this.state.buttonLabel}</Button.Primary><br />
        <Button.Secondary>Secondary Button</Button.Secondary><br />
        <Button.Tertiary>Tertiary Button</Button.Tertiary>
        <h2>Special Buttons</h2>
        <Button.Success>Success Button</Button.Success><br />
        <Button.Warning>Warning Button</Button.Warning>

        <h2>Select</h2>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}

Showcase.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(Showcase);
