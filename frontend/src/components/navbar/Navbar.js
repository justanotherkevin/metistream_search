import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <div className="navbar flex-row-rc">
          <div className="logo" />
          <div className="sub-nav">
            <ul>
              <li className="active">Search</li>
              <li>Insights</li>
              <li>Data</li>
            </ul>
          </div>

          <div className="user-info flex-row-cc">
            <span className="gear">⚙️</span>
            <span className="name">Paul Murphy</span>
            <span className="img">img</span>
          </div>
        </div>
      </div>
    );
  }
}
