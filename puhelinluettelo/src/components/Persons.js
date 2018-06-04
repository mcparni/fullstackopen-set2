import React from 'react';

class Persons extends React.Component {
  render() {
    return(
      <div>
        <p>{this.props.name}: {this.props.number} <button onClick={this.props.removeHandler}>poista</button></p>
        
      </div>
    )
  }
}

export default Persons