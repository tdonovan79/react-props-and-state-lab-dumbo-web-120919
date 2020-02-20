import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {


  render() {
    let currentPets = this.props.pets
    const petCards = currentPets.map(pet => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet} />
    ))

    return <div className="ui cards">{petCards}</div>
  }
}

export default PetBrowser
