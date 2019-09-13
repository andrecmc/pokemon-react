// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const pokemonsFake={"count":964,"next":"https://pokeapi.co/api/v2/pokemon?offset=4&limit=4","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"}]}

const PlayerAPI = {

  loading: false,
  pokemonsData: [],
  details: [],

  all: function() {
          this.loading=true
          fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=-1')
            .then(res => res.json())
            .then((data) => {
                for(var i=0; i<data.results.length; i++){
                  var url=data.results[i].url;
                  var split=url.split('/');
                  var pokemonId=split[split.length - 2];
                  data.results[i].id = pokemonId;
                }
                console.log(data)
                this.pokemonsData=data
                this.loading=false
                return this.pokemonsData
            })
            .catch(console.log)
    },
  get: function(id) {
        fetch('https://pokeapi.co/api/v2/pokemon/1/')
            .then(res => res.json())
            .then((data) => {
               console.log(data)
                this.setState({ details: data })
            })
            .catch(console.log)
            
         return this.details
  }
}

export default PlayerAPI