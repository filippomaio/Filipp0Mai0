import axios from "axios";
//Método de captura de lista dos pokemons contidos na pokedex de kanto
export default async () => {
    let array = [];
    let a = [];

    //Regatando da api e tratando cada pokemon separadamente em um array para remover informações a mais
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokedex/2/`);
    for(let i=0;i<data.pokemon_entries.length;i++){
        a = (data.pokemon_entries[i].pokemon_species);
        array[i] = a;
        a=[];
    }
    
    return array;
};