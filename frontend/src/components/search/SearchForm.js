import React, { Component } from 'react';
import TagsInput from './TagsInput';
import SearchIcon from '../../assets/imgs/search-solid';

export default class SearchForm extends Component {
  formSubmit = e => {
    e.preventDefault();
    console.log('form submit', e.target);
  };
  render() {
    return (
      <div className="search-form-wrapper">
        <h2>What are you looking for?</h2>
        <form action="" id="user-search" onSubmit={this.formSubmit}>
          <div className="row top-search">
            <input type="search" />
            <button>
              <SearchIcon />
            </button>
          </div>

          <div className="search-option">
            <div className="row">
              <select name="date" form="user-search">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <TagsInput placeholder="Filter" />
            </div>

            <div className="row">
              <select name="cohorts" form="user-search">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <TagsInput placeholder="Your Cohorts" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
