import React from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }
  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }
  handleFilterState = (event) => {
    this.setState({ filter: event.target.value.toLowerCase() })
  }
  filterView = () => {
    let _countries = []
    let filteredCountries = []
    if(this.state.countries.length !== 0) {
      _countries = this.state.countries.map(country =>  ({name: country.name, flag: country.flag,capital:country.capital,population:country.population}))
      filteredCountries = _countries.filter(country => country.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1)
    }
    return filteredCountries
  }
  handleClick= (event) => {
    let country = event.target.getAttribute('data-country')    
    this.setState({ filter: country.toLowerCase() })
  }

  
  render() {
    const countriesToShow = this.filterView()
    return (
      
      <div>  
        <div>
          <Filter value={this.state.filter} onChange={this.handleFilterState} />      
        </div>
        <div>
          {countriesToShow.length > 10 ? (
            <div>
              <p>Too many matches, specify another filter</p>
            </div>
          ) : (
            <div>
              <Countries handleClick={this.handleClick} countriesToShow={countriesToShow} />
            </div>
          )}
        </div>
      </div>

    );
  }
}

export default App;
