import React from 'react';
import './index.scss';
import Footer from "../../publicComponents/Footer"

class About extends React.Component {
  render() {
    return (
      <div className="About">
        关于1236
        <Footer  History={this.props.history} selectedTab='redTab'  />
      </div>
    );
  }
}

export default About;