import React from 'react';

class Countries extends React.Component {
  render() {
    const countries = this.props.countriesToShow
    return(
      <div>
        {countries.length === 1 ? (
            <div>
              {countries.map(country => 
                <div key={country.name}>
                <h2>{country.name}</h2>
                <p>capital : {country.capital}</p>
                <p>population : {country.population}</p>
                <img width="200" src={country.flag} alt={country.name} />
                </div>
              )}
            </div>
          ) : (
            <div>
              {countries.map(country => <div onClick={this.props.handleClick} key={country.name}><p data-country={country.name}>{country.name}</p></div>)}
            </div>
          )}   
      </div>
    )
  }
}

export default Countries