import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import debounce from '../../helpers/debounce';
import TagsInput from './TagsInput';
import SearchIcon from '../../assets/imgs/search-solid';
import {
  alphanumeric,
  sanitarize,
  hideOnClickOutside,
} from '../../helpers/helper';

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
  componentDidMount() {}
  inputChange = e => {
    if (alphanumeric(e.target.value)) {
      const betterStr = sanitarize(e.target.value);
      // find matching patient names
      const matched = this.findMatches(betterStr, this.props.patientsName);
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
      this.props.setSearchTerm(betterStr);
      this.setState({
        input: betterStr,
        matched,
      });
    } else {
      // incorrect input => show zero match
      this.setState({
        matched: [],
      });
    }
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
      li.classList.add('suggest-patient');
      li.innerHTML = `${string}`;
      ul.appendChild(li);
    });
    return ul;
  };
  clickSuggestion = e => {
    const current = this;
    if (e.target.classList.contains('suggest-patient')) {
      const input = e.target.innerHTML;
      const matched = [];
      this.searchInput.current.value = input;
      this.props.setSearchTerm(input);
      this.setState({ input, matched }, () => {
        current.formSubmit();
      });
    }
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

            <div
              className={`suggestion ${
                this.state.matched.length === 0 ? 'hide' : 'show'
              }`}
              ref={this.suggestion}
              onClick={this.clickSuggestion}
            />
          </div>

          <div className="search-option">
            <div className="row">
              <div className="user-select flex-row-cc">
                <span>Date</span>
                <i className="material-icons">chevron_right</i>
              </div>

              <TagsInput placeholder="Filter" />
            </div>

            <div className="row">
              <div className="user-select flex-row-cc">
                <span>Cohorts</span>
                {/* <ul>
                  <li className="swing-in-top-fwd">111111</li>
                  <li>22222</li>
                  <li>333333</li>
                </ul> */}
                <i className="material-icons">chevron_right</i>
              </div>

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
