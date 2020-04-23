import axios from "axios";
export default async (filtro) => {
    let array = [];
    let a = [];
    let b = [];
    let tipo = [];
    //let regiao = [];
    let { data } = await axios.get('https://pokeapi.co/api/v2/type/');
    let tipos = data;
    //data = await axios.get('https://pokeapi.co/api/v2/pokedex/');
    //let regioes = data.data;

    //Em caso de multipla pesquisa
    filtro = filtro.split('&');
    console.log("Filtro",filtro);
    //Separando os tipos
    for(let i = 0;i<filtro.length;i++){
        for(let j = 0;j<parseInt(tipos.count);j++){
            if(filtro[i] == tipos.results[j].name){
                tipo.push(filtro[i]);
            }
        }
    }
    //Se a pesquisa for por 2 tipos
    if(tipo.length == 2){
        console.log("Tipos",tipo);
        data = await axios.get('https://pokeapi.co/api/v2/type/'+tipo[0]+'/');
        let data1 = data.data;
        data  = await axios.get('https://pokeapi.co/api/v2/type/'+tipo[1]+'/');
        let data2 = data.data;
        console.log(data1);
        console.log(data2);
        for(let i=0;i<data1.pokemon.length;i++){
            a = (data1.pokemon[i].pokemon);
            for(let j=0;j<data2.pokemon.length;j++){
                b = (data2.pokemon[j].pokemon);
                if(a.name == b.name){
                    array.push(a);
                }
            }
        }
    //Se a pesquisa for por 1 tipo
    }else if(tipo.length == 1){
        const { data } = await axios.get('https://pokeapi.co/api/v2/type/'+tipo[0]+'/');
        for(let i=0;i<data.pokemon.length;i++){
            a = (data.pokemon[i].pokemon);
            array[i] = a;
        }
    }
    //Se filtro muda para vazio
    if(filtro == ''){
        data = await axios.get(`https://pokeapi.co/api/v2/pokedex/2/`);
        data = data.data;
        for(let i=0;i<data.pokemon_entries.length;i++){
            a = (data.pokemon_entries[i].pokemon_species);
            array[i] = a;
            a=[];
        }
    }
    return array;
};