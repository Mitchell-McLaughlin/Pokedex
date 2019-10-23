/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable vars-on-top */
import { LightningElement, track } from 'lwc';
import getPokemon from '@salesforce/apex/PokemonController.getPokemon';
import getPokemonById from '@salesforce/apex/PokemonController.getPokemonById';

export default class Pokedex extends LightningElement {
    @track pokemonList = [];
    @track error;
    @track selectedPokemon;
    @track showDetails;
    @track detailedPokemon;
    @track moves;
    
        
    connectedCallback() {
        this.showDetails = false;
        getPokemon()
            .then(result => {
                this.pokemonList = result;
            })
            .then(() => {
                var tmpList = [];
                for(var i = 0; i < this.pokemonList.length; i++){
                    var pokemon = {name: this.pokemonList[i].name.charAt(0).toUpperCase() + this.pokemonList[i].name.slice(1), 
                    url: this.pokemonList[i].url, id: this.pokemonList[i].url.substr(41).replace("/","").slice(0, -1)};
                    tmpList.push(pokemon);
                }
                tmpList.sort(function(a, b){
                    return a.id - b.id;
                });
                this.pokemonList = tmpList;
                
            }
            )
            .catch(error => {
                this.error = error;
            });
       
    }
    handleSelect(event) {
        this.showDetails = true;
        const pokemonId = event.detail;
        this.selectedPokemon = this.pokemonList.find(
            pokemon => pokemon.id === pokemonId
        );

        getPokemonById({id: this.selectedPokemon.id})
        .then(result => {
            this.detailedPokemon = result;
            console.log(result);
        })
        .catch(error => {
            console.log(this.error);
            this.error = error;
        });
        
    }
}