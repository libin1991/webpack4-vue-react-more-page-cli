import React from 'react';
import './index.scss';
import Footer from "../../publicComponents/Footer"

class User extends React.Component  {
  render() {
    return (
      <div className="User">
        个人中心456
        <Footer  History={this.props.history} selectedTab='greenTab' />
      </div>
    );
  }
}

export default User;