import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from '../../components/search/SearchForm';
import SearchResults from '../../components/search/SearchResults';
export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      patientsName: [],
      searchResults: [],
    };
  }
  componentDidMount() {
    let current = this;
    if (typeof Storage !== 'undefined') {
      // Code for localStorage/sessionStorage.
      if (sessionStorage.patientsName) {
        // save a API
        console.log('saved an api');
        let patientsName = JSON.parse(sessionStorage.patientsName);
        this.setState({ patientsName });
      } else {
        // call to get all users
        console.log('called to get all users');
        axios
          .get('/api/users/all')
          .then(function(res) {
            const patientsName = res.data.map(patient => patient.name);
            current.setState({ patientsName });
            sessionStorage.patientsName = JSON.stringify(patientsName);
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    } else {
      // Sorry! No Web Storage support..
      console.log(`Sorry! No Web Storage support..`);
      axios
        .get('/api/users/all')
        .then(function(res) {
          const patientsName = res.data.map(patient => patient.name);
          current.setState({ patientsName });
          sessionStorage.patientsName = JSON.stringify(patientsName);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
  setSearchResults = array => {
    this.setState({ searchResults: array });
  };
  render() {
    return (
      <div className="search-page-wrapper">
        <SearchForm
          patientsName={this.state.patientsName}
          setSearchResults={this.setSearchResults}
        />
        {this.state.searchResults && (
          <SearchResults searchResults={this.state.searchResults} />
        )}
      </div>
    );
  }
}
