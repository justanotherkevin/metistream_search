import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <div className="navbar flex-row-cc">
          <div className="logo" />
          <div className="sub-nav">
            <ul className="flex-row-cc">
              <li className="active">Search</li>
              <li>Insights</li>
              <li>Data</li>
            </ul>
          </div>

          <div className="user-info flex-row-cc">
            <span className="gear flex-row-cc">
              <i className="material-icons">settings</i>
            </span>
            <span className="name">
              Paul Murphy
              <i className="material-icons">chevron_right</i>
            </span>
            <span className="img" />
          </div>
        </div>
      </div>
    );
  }
}
