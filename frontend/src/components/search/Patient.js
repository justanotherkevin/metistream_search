import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Patient extends Component {
  componentDidMount() {
    const { patient, searchTerm } = this.props;
    const regex = new RegExp(searchTerm, 'gi');
    const name = patient.name.replace(
      regex,
      `<span class="hl">${searchTerm}</span>`
    );
    document.querySelector('span.name').innerHTML = name;
  }
  render() {
    const { patient, searchTerm } = this.props;
    const regex = new RegExp(searchTerm, 'gi');
    const name = patient.name.replace(
      regex,
      `<span class="hl">${searchTerm}</span>`
    );
    const details = patient.details.replace(
      regex,
      `<span class="hl">${searchTerm}</span>`
    );
    return (
      <div className="results-body">
        <div className="patient-header">
          <span className="type">{patient.type}</span>
          <span className="name" dangerouslySetInnerHTML={{ __html: name }} />
          <div className="booked">
            {/* <i class="material-icons">fiber_manual_record</i> */}
            <i className="material-icons">bookmark_border</i>
            {/* <i class="material-icons">bookmark</i> */}
          </div>
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
              <p dangerouslySetInnerHTML={{ __html: details }} />
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
