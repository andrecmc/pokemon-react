import React, { Component} from 'react'
import Button from '@material-ui/core/Button'

class Pokemons extends Component {

   constructor() {
         super();
         this.loading=false;
         this.state = {
            results: []
         };
         this.offset=0;
         this.limit=20;
         this.total=0;
         this.emptyResults=[];
         for (var i=0; i<this.limit; i++) {
            this.emptyResults.push({"name":""})
         }
         this.last=0
   }

   componentDidMount() {
          //const { number } = this.props.match.params
          var n=parseInt(this.props.match.params.number, 10)
          if (Number.isNaN(n)) {
             n=0
          }

          this.offset=n
          this.loading=true
          this.setState({results:this.emptyResults})
          
          fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
            .then(res => res.json())
            .then((data) => {
                for(var i=0; i<data.results.length; i++){
                  var url=data.results[i].url;
                  var split=url.split('/');
                  var pokemonId=split[split.length - 2];
                  data.results[i].id = pokemonId;
                }
                this.total=data.count;
                  if (this.offset>this.total) {
                     this.offset=0
                  }
                this.last=Math.floor(this.total/this.limit)*this.limit

                this.loading=false
                this.setState({results: data.results});
            })
            .catch(console.log)
   }

   render() {
      var previousIndex=this.offset - this.limit
      if (previousIndex <0) previousIndex=0
      var nextIndex=this.offset
      if (nextIndex+this.limit<this.total) {
         nextIndex=this.offset + this.limit         
      }


    if (!this.loading) {
       return (
           <div style={{padding:32}}>
               <h1>Pokemon List:</h1>
               <hr/>
               {this.state.results.map((pokemon,index) => (
                  <div key={pokemon.id}><a href={`/details/${pokemon.id}`}><h2>{index+this.offset+1} {pokemon.name}"</h2></a></div>
               ))}
               <hr/>
               <Button variant="contained" href={`/pokemons/0`} size="large">First</Button>
               <span> </span>
               <Button variant="contained" href={`/pokemons/${previousIndex}`} size="large">Previous</Button>
               <span> {this.offset + 1} {this.offset + this.limit} </span>
               <Button variant="contained" href={`/pokemons/${nextIndex}`} size="large">Next</Button>
               <span> </span>
               <Button variant="contained" href={`/pokemons/${this.last}`} size="large">Last</Button>
               <div>Number of Items={this.total}</div>
           </div>
       )
    } else {
       return(<div><h2>Loading</h2></div>)
    }
   }
};

export default Pokemons
