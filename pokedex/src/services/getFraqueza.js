import axios from "axios";
//Método de captura das fraquezas/vantagens baseado na combinação de tipos dado de entrada
export default async (entrada) => {
    /* 
    -3 = 0x dano 
    -2 = 1/4x dano
    -1 = 1/2x dano
    0 = 1x dano
    1 = 2x dano
    2 = 4x dano
    */
    let resultado = [];
    let tam = 0;

    //Tratamento dos tipos de "xxx / xxx" para ["xxx","xxx"]
    let tipos = entrada.replace(" ","").replace(" ","").split('/');

    //Busca todos os tipos na api para criar um array de tipos inicializando o dano em 0
    let { data } = await axios.get('https://pokeapi.co/api/v2/type/');
    resultado = data.results;
    tam = data.count;
    for(let i = 0;i<tam;i++){
        resultado[i].url = 0;
    }

    //Para cada tipo do pokemon, incrementa suas fraquezas e vantagens
    for(let k = 0;k<tipos.length;k++){
        data = await axios.get('https://pokeapi.co/api/v2/type/'+tipos[k]+'/');
        let data1 = data.data;
        for(let j = 0;j<tam;j++){        
            for(let i = 0;i<data1.damage_relations.double_damage_from.length;i++){
                if(data1.damage_relations.double_damage_from[i].name == resultado[j].name){
                    resultado[j].url++;
                }
            }
            for(let i = 0;i<data1.damage_relations.half_damage_from.length;i++){
                if(data1.damage_relations.half_damage_from[i].name == resultado[j].name){
                    resultado[j].url--;
                }
            }
            for(let i = 0;i<data1.damage_relations.no_damage_from.length;i++){
                if(data1.damage_relations.no_damage_from[i].name == resultado[j].name){
                    resultado[j].url = resultado[j].url - 3;
                }
            }
        }
    }
    //Retorna array "[{name:xxxx,url:0},{name:xxxx,url:0},...]"
    return resultado;
};