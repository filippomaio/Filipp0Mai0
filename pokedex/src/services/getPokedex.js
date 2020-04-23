import axios from "axios";
export default async () => {
    let array = [];
    let a = [];
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokedex/2/`);
    for(let i=0;i<data.pokemon_entries.length;i++){
        a = (data.pokemon_entries[i].pokemon_species);
        array[i] = a;
        a=[];
    }
    return array;
};