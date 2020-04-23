import axios from "axios";
export default async (nome) => {
    let first = '';
    let array = [];
    let link = '';
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+nome+'/');
    link = data.evolution_chain.url;
    const data2 = await axios.get(link);
    let evolucao = data2.data.chain;
    first = evolucao.species.name;
    array[0] = first;
    evolucao = evolucao.evolves_to;
    //Se não tem família
    if(!evolucao[0]){
        return array;
    }
    //Tratamento para multiplas evoluções. Ex: eevee
    if(evolucao.length > 1){
        let a = [];
        for(let i = 0; i<evolucao.length;i++){
            a.push(evolucao[i].species.name);
        }
        array.push(a);
        return array;
    }
    array.push(evolucao[0].species.name);
    evolucao = evolucao[0].evolves_to;
    //Se evolui apenas 1 vez
    if(!evolucao[0]){
        return array;
    }
    //Tratamento para familias como poliwag, oddish ...
    if(evolucao.length > 1){
        let a = [];
        for(let i = 0; i<evolucao.length;i++){
            a.push(evolucao[i].species.name);
        }
        array.push(a);
        return array;
    }
    array.push(evolucao[0].species.name);
    return array;
};