import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  //change the filters for pets
  onChangeType = (newFilter) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: newFilter
      }
    })
  }
  //change state to reflect what pets are available
  onFindPetsClick = () => {
    let type = this.state.filters.type
    fetch(`/api/pets${type === 'all' ? '': `?type=${type}`}`)
    .then((response) => {
      return response.json();
    })
    .then((fetchedPets) => {
      this.setState({
        pets:  fetchedPets
      })
    });
  }
  //takes in a pet id, changes pets state to adopted
  onAdoptPet = (petId) => {
    const newPets = this.state.pets.map(pet => {
      if(pet.id === petId){
        pet.isAdopted = true
        return pet
      }else{
        return pet}
      } )
    this.setState({
      pets: newPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
