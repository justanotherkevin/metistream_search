import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from '../../components/search/SearchForm';
import SearchResults from '../../components/search/SearchResults';
export default class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      patientsName: [],
      searchResults: [
        {
          _id: {
            $oid: '5c5afb29a44b34532227c72b',
          },
          type: 'patient',
          cohorts: [
            'Administrator',
            'Officer',
            'Developer',
            'Designer',
            'Designer',
          ],
          bookmarked: [],
          name: 'Blake Gislason',
          email: 'test@test.test',
          password: 'test123',
          details:
            'Blake Gislason is et ut nisi recusandae possimus dolores corrupti ut vitae. Blake Gislason is fuga mollitia esse provident in ut.',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/craigrcoles/128.jpg',
          date: {
            $date: '2019-02-06T15:20:09.863Z',
          },
          __v: 0,
        },
        {
          _id: {
            $oid: '5c5afb29a44b34532227c72c',
          },
          type: 'patient',
          cohorts: ['Engineer', 'Architect', 'Planner', 'Officer', 'Planner'],
          bookmarked: [],
          name: 'Deborah Shanahan',
          email: 'test@test.test',
          password: 'test123',
          details:
            'Deborah Shanahan is aliquid maiores a ut qui deleniti inventore qui alias exercitationem. Deborah Shanahan is necessitatibus placeat totam.',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/iamkarna/128.jpg',
          date: {
            $date: '2019-02-06T15:20:09.864Z',
          },
          __v: 0,
        },
      ],
    };
  }
  componentDidMount() {
    let current = this;
    if (typeof Storage !== 'undefined') {
      // Code for localStorage/sessionStorage.
      if (sessionStorage.metistream) {
        // save a API
        let patientsName = JSON.parse(sessionStorage.patientsName);
        this.setState({ patientsName });
      } else {
        // call to get all users
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
  render() {
    return (
      <div className="search-page-wrapper">
        <SearchForm />
        {this.state.searchResults && (
          <SearchResults searchResults={this.state.searchResults} />
        )}
      </div>
    );
  }
}
