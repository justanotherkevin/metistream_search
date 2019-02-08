import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import debounce from '../../helpers/debounce';
import TagsInput from './TagsInput';
import SearchIcon from '../../assets/imgs/search-solid';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.suggestion = React.createRef();
    this.searchInput = React.createRef();
    this.debouncedSubmit = debounce(this.formSubmit, 2000, true);
    this.state = {
      input: '',
      matched: [],
    };
  }
  inputChange = e => {
    // find matching patient names
    const matched = this.findMatches(e.target.value, this.props.patientsName);
    // put matched names into suggestion div
    const ul = this.createSuggestion(matched);
    let suggestionNode = this.suggestion.current;
    if (suggestionNode.childElementCount === 0) {
      // if theres is not suggestion,
      suggestionNode.appendChild(ul);
    } else {
      // replace the suggestion content,
      suggestionNode.replaceChild(ul, suggestionNode.childNodes[0]);
    }

    this.setState({
      input: e.target.value,
      matched,
    });
  };

  formSubmit = () => {
    const { input } = this.state;
    const { setSearchResults } = this.props;
    axios
      .get(`/api/users/search/${input}`)
      .then(function(res) {
        setSearchResults(res.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  findMatches = (wordToMatch, patientsName) => {
    return patientsName.filter(name => {
      const regex = new RegExp(wordToMatch, 'gi');
      return name.match(regex);
    });
  };
  createSuggestion = array => {
    let ul = document.createElement('ul');
    array.forEach(string => {
      let li = document.createElement('li');
      li.innerHTML = `<li>${string}</li>`;
      ul.appendChild(li);
    });
    return ul;
  };
  render() {
    return (
      <div className="search-form-wrapper">
        <h2>What are you looking for?</h2>
        <form
          action=""
          id="user-search"
          onSubmit={e => {
            e.preventDefault();
            this.debouncedSubmit();
          }}
        >
          <div className="row top-search">
            <input
              type="search"
              onChange={this.inputChange}
              ref={this.searchInput}
              required
            />
            <button onClick={this.debouncedSubmit} disabled={!this.state.input}>
              <SearchIcon />
            </button>
            <div className="suggestion" ref={this.suggestion} />
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
SearchForm.propTypes = {
  patientsName: PropTypes.array,
  setSearchResults: PropTypes.func,
};
