import React from 'react';
import Filter from './components/Filter'
import Persons from './components/Persons'
import numberService from './services/numbers'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      msg: '',
      type: 'success'
    }
  }


  componentDidMount() {
    numberService
    .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  exists = (name) => {
    return this.state.persons.find(person => person.name === name);
  }
  confirmNewName = (person) => {
    numberService
      .create(person)
      .then(newNumber => {
        person.id = newNumber.id
        this.setState({
          persons: this.state.persons.concat(person),
          newNumber: '',
          newName: '',
          filter:'',
          msg:person.name + ' puhelinnumero lisätty.',
          type:'success' 
        })
        this.hideNotification()
      })
  }
  hideNotification = () =>  {
    setTimeout(() => {
      this.setState({msg: ''})
    }, 3000)
  }
  addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if(this.exists(this.state.newName) && window.confirm(this.state.newName + " on jo listalla, korvataanko vanha numero uudella?")) {
      const person = this.state.persons.find(n => n.name === this.state.newName)
      const changedPerson = { ...person, number: this.state.newNumber }
      const id = person.id
      numberService
        .update(id, changedPerson)
        .then(changedPerson => {
          const persons = this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: persons.concat(changedPerson),
            msg:person.name + ' numero päivitetty.',
            type:'success'
          })
          this.hideNotification()
        })
        .catch(error => {
          this.setState({ 
            persons: this.state.persons.filter(n => n.id !== id),
            msg:person.name + ' puhelinnumero on jo poistettu palvelimelta',
            type:'error' 
          })
          this.hideNotification()
        })
    } else if(!this.exists(this.state.newName)) {
      this.confirmNewName(nameObject)
    } else {
      return false
    }
    
   

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

  removeItem = (id) => {
    return () => {
      const person = this.state.persons.find(n => n.id === id)
      if (window.confirm("Poistetaanko " + person.name)) { 
        numberService
        .remove(id)
        .then(deletedList => {
          const persons = this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: persons,
            msg:person.name + ' numero poistettu.',
            type:'success'
          })
          this.hideNotification()
        })
        .catch(error => {
          this.setState({ 
            persons: this.state.persons.filter(n => n.id !== id),
            msg:'Henkilön ' + person.name + ' puhelinnumero on jo poistettu palvelimelta',
            type:'error' 
          })
          this.hideNotification()
        })
        
      }
      
    }
  }

  render() {
    const namesToShow =
      this.state.filter === '' ?
        this.state.persons :
        this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1 )

    return (
      <div>
        <Notification type={this.state.type} msg={this.state.msg} />
        <h1>Puhelinluettelo</h1>
        <h2>Lisää uusi / muuta olemassa olevaa numeroa</h2>
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
        <h3>Numerot</h3>
        
        {namesToShow.map(person =>
          <Persons
            id={person.id}
            number={person.number}
            key={person.id+person.name+"__"}
            name={person.name}
            removeHandler={this.removeItem(person.id)}
          />
        )}
          
      </div>
    )
  }
}

export default App