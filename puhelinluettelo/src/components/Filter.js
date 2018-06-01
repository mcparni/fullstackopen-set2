import React from 'react';

class Filter extends React.Component {
  render() {
    return(
      <p>
        <input placeholder="Rajaa hakua" value={this.props.value} onChange={this.props.onChange} />
      </p>
    )
  }
}

export default Filter