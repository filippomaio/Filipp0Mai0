import axios from "axios";
export default async (nome) => {
    let array = [];
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+nome+'/');
    array = data;
    return array;
};