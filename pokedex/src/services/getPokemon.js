import axios from "axios";
//Método de captura das informações do pokemon baseado no nome dado de entrada
export default async (nome) => {
    let array = [];
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/'+nome+'/');
    array = data;
    return array;
};