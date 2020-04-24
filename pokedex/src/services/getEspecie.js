import axios from "axios";
//Método de captura da espécie do pokemon baseado no nome dado de entrada
export default async (nome) => {
    let array = [];
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+nome+'/');
    array = data;
    return array;
};