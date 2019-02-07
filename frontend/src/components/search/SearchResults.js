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
            <span className="grid">grid</span>
            <span className="row">row</span>
          </div>
        </div>
        <div className="results-patients-wrapper row">
          {this.props.searchResults.map((patient, i) => (
            <Patient key={`${i}${patient.name}`} patient={patient} />
          ))}
        </div>
      </div>
    );
  }
}
SearchResults.propTypes = {
  searchResults: PropTypes.array,
};
