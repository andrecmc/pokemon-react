import React, { Component} from 'react'
import Button from '@material-ui/core/Button'

class Details extends Component {

   constructor() {
         super();
         this.loading=false;
         this.state = {
            details: []
         };
   }

   componentDidMount() {
      const { number } = this.props.match.params
      
      this.loading=true
      fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
         .then(res => res.json())
         .then((data) => {
            this.loading=false
             this.setState({ details: data })
         })
         .catch(console.log)
   }
   
   render() {
      var pokemonDetails=this.state.details
    return (
         <div style={{padding:32}}>
            <hr/>
            <h1>Pokemon Details:</h1>
            <h2>Name: {pokemonDetails.name ? pokemonDetails.name : ''}</h2>
            <h2>Height: {pokemonDetails.height} (dm) / {pokemonDetails.height*10} (cm)</h2>
            <h2>Weight: {pokemonDetails.weight} (hg) / {pokemonDetails.weight/10} (kg)</h2>

            <img src={pokemonDetails.sprites ? pokemonDetails.sprites.front_default : ''} alt=""/>
            <img src={pokemonDetails.sprites ? pokemonDetails.sprites.back_default : ''} alt=""/>
            <hr/>
            <Button variant="contained" href="/" size="large">Home</Button>
        </div>
    )
   }
};

export default Details
