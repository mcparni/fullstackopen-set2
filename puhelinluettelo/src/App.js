import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { 
          name: 'Arto Hellas', 
          number: '040-1231132'
        }
      ],
      newName: '',
      newNumber:''
    }
  }

  exists = (name,number) => {
    return this.state.persons.find(person => person.name === name && person.number === number);
  }

  addName = (event) => {
    event.preventDefault()

    if(this.exists(this.state.newName,this.state.newNumber))
      return false

    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(nameObject)

    this.setState({
      persons,
      newName: '',
      newNumber: '' 
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        
        <form onSubmit={this.addName}>
          <div>
            <input placeholder="nimi" value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            <input placeholder="numero" value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          {this.state.persons.map(person => <p key={person.name + person.number}>{person.name}: {person.number}</p>)}
      </div>
    )
  }
}

export default App