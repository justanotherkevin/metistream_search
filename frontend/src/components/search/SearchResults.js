import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Patient from './Patient';

export default class SearchResults extends Component {
  render() {
    return (
      <div className="search-results-wrapper">
        <div className="results-header">
          <h5>Results</h5>
          <div className="display-style">
            <i className="grid material-icons">apps</i>
            <i className="active row material-icons">signal_cellular_alt</i>
          </div>
        </div>
        <div className="results-patients-wrapper row">
          {this.props.searchResults.map((patient, i) => (
            <Patient
              key={`${i}${patient.name}`}
              patient={patient}
              searchTerm={this.props.searchTerm}
            />
          ))}
        </div>
      </div>
    );
  }
}
SearchResults.propTypes = {
  searchResults: PropTypes.array,
};
