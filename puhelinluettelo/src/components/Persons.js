import React from 'react';

class Persons extends React.Component {
  render() {
    return(
      <div>
        {this.props.namesToShow.map(person => <p key={person.name + person.number}>{person.name}: {person.number}</p>)}
      </div>
    )
  }
}

export default Persons