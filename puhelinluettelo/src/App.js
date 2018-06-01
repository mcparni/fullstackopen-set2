import React from 'react';
import Filter from './components/Filter'
import Persons from './components/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [ 
          { name: 'Arto Hellas', number: '040-1123456' },
          { name: 'Martti Tienari', number: '040-1223456' },
          { name: 'Arto Järvinen', number: '040-1233456' },
          { name: 'Lea Kutvonen', number: '040-1234456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
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
      newNumber: '',
      filter: '' 
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value.toLowerCase() })
  }

  render() {
    const namesToShow =
      this.state.filter === '' ?
        this.state.persons :
        this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1 )

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        
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
          <Persons namesToShow={namesToShow} />
      </div>
    )
  }
}

export default App