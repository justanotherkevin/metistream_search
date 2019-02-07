import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Patient extends Component {
  render() {
    const { patient } = this.props;
    return (
      <div className="results-body">
        <div className="patient-header">
          <span className="type">{patient.type}</span>
          <span className="name">{patient.name}</span>
          <span className="booked">Flag</span>
        </div>
        <div className="patient-details">
          <div className="cohorts-wrapper">
            <span>Cohorts:</span>
            <div className="cohorts-container">
              {patient.cohorts.map((cohort, i) => (
                <span key={i} className="cohort-tag">
                  &lt;{cohort}&gt;
                </span>
              ))}
            </div>
          </div>
          <div className="details-wrapper">
            <span>Details:</span>
            <div className="details-container">
              <p>{patient.details}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Patient.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    details: PropTypes.string,
    cohorts: PropTypes.array,
  }),
};
