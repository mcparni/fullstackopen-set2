import React from 'react';

class Filter extends React.Component {
  render() {
    return(
      <p>
        <input placeholder="Find country" value={this.props.value} onChange={this.props.onChange} />
      </p>
    )
  }
}

export default Filter