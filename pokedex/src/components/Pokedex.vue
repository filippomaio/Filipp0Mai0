<template>
  <v-app class="app">

    <!-- Layout Desktop - Breakpoints: XL, LG, MD-->
    <v-row style="margin-top:-12px" v-show="$vuetify.breakpoint.xl || $vuetify.breakpoint.lg || $vuetify.breakpoint.md">
      <div class="pokedex">
        <v-col>
          <!-- Filtro -->
          <v-app-bar dark>
            <v-row>
              <v-text-field id="filtro" style="padding-top: 36px" label="Filter" solo></v-text-field>
            </v-row> 
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="carregarLista()"><v-icon>mdi-magnify</v-icon></v-btn>              
          </v-app-bar>

          <!-- Pokedex -->
          <v-list dark nav class="lista">
            <div v-for="p in pokemons" :key="p.id">
              <v-list-item v-on:click="select($event)" :key="p.id" v-if="parseInt(p.url.split('/')[6]) <= 151">
                <v-list-item-avatar><img :src="require('../assets/sprites/'+ p.name +'.gif')"></v-list-item-avatar>            
                <v-list-item-title>{{ p.name }}</v-list-item-title>                     
              </v-list-item>
            </div>
          </v-list>
        </v-col>
      </div>
      <v-content>
        <v-container fluid>
          <!-- Informações do pokemon selecionado -->
          <div id="pokemonSelecionado" v-if="nome != ''">
            <v-card class="dados" dark max-height="100vh">
              <v-container>
                <v-col>
                  <v-row>
                    <!-- Nome -->                   
                    <center class="titulo">{{titleize(nome)}}</center>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-row justify="space-between">                                                
                        <v-col>
                          <!-- Dados simples da Pokedex -->
                          <center class="subtitulo">Pokedex Data</center>
                          <table>
                            <tbody>
                              <tr><th>National Nº</th><td>{{nacional}}</td></tr>
                              <tr><th>Species</th><td>{{especie.genera[2].genus}}</td></tr>

                              <!-- Tratamento de cores para os tipos -->
                              <tr><th>Type</th>
                              <td>
                                <div v-if="tipos.split('/')[0].includes('normal')" class="type normal">normal</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('fighting')" class="type fighting">fighting</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('flying')" class="type flying">flying</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('poison')" class="type poison">poison</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('ground')" class="type ground">ground</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('rock')" class="type rock">rock</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('bug')" class="type bug">bug</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('ghost')" class="type ghost">ghost</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('steel')" class="type steel">steel</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('fire')" class="type fire">fire</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('water')" class="type water">water</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('grass')" class="type grass">Grass</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('electric')" class="type electric">electric</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('psychic')" class="type psychic">psychic</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('ice')" class="type ice">ice</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('dragon')" class="type dragon">dragon</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('dark')" class="type dark">dark</div>&nbsp;
                                <div v-if="tipos.split('/')[0].includes('fairy')" class="type fairy">fairy</div>&nbsp;
                                
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('normal')" class="type normal">normal</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('fighting')" class="type fighting">fighting</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('flying')" class="type flying">flying</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('poison')" class="type poison">poison</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('ground')" class="type ground">ground</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('rock')" class="type rock">rock</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('bug')" class="type bug">bug</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('ghost')" class="type ghost">ghost</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('steel')" class="type steel">steel</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('fire')" class="type fire">fire</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('water')" class="type water">water</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('grass')" class="type grass">Grass</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('electric')" class="type electric">electric</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('psychic')" class="type psychic">psychic</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('ice')" class="type ice">ice</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('dragon')" class="type dragon">dragon</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('dark')" class="type dark">dark</div>&nbsp;
                                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('fairy')" class="type fairy">fairy</div>&nbsp;
                                
                              </td></tr>
                              <tr><th>Height</th><td>{{altura}} m</td></tr>
                              <tr><th>Weight</th><td>{{peso}} kg</td></tr>
                              <tr><th>Abilities</th>
                              <td><div v-for="h in habilidades" :key="h.id">{{h}}</div></td></tr>
                              <tr><th>Local Nº</th>
                                <td>{{especie.pokedex_numbers[3].entry_number}} <small class="legenda">(Red/Blue/Yellow)</small>
                                <br>{{especie.pokedex_numbers[2].entry_number}} <small class="legenda">(Gold/Silver/Crystal)</small>
                                <br>{{especie.pokedex_numbers[3].entry_number}} <small class="legenda">(FireRed/LeafGreen)</small>
                                <br>{{especie.pokedex_numbers[1].entry_number}} <small class="legenda">(HeartGold/SoulSilver)</small>
                                <br>{{especie.pokedex_numbers[0].entry_number}} <small class="legenda">(X/Y — Central Kalos)</small>
                                <br>{{especie.pokedex_numbers[3].entry_number}} <small class="legenda">(Let's Go Pikachu/Let's Go Eevee)</small></td>
                              </tr>
                            </tbody>
                          </table>
                        </v-col>
                        <!-- Dados de treino e incubação (Com diferenciação de tamanhos de telas)-->
                        <v-col v-show="$vuetify.breakpoint.xl || $vuetify.breakpoint.lg">
                          <div id="arte"><img width="360px" height="336px" v-bind:src="require('../assets/art/'+ nome +'.png')"></div>
                        </v-col>
                        <v-col v-show="$vuetify.breakpoint.xl">
                          <center class="subtitulo">Training</center>
                          <table>
                            <tbody>
                              <tr><th>Catch Rate</th><td>{{especie.capture_rate}}</td></tr>
                              <tr><th>Base Friendship</th><td>{{especie.base_happiness}}</td></tr>
                              <tr><th>Base Exp</th><td>{{xp}}</td></tr>
                              <tr><th>Growth Rate</th><td>{{especie.growth_rate.name}}</td></tr>
                            </tbody>
                          </table>
                          <br><br><br><br>
                          <center class="subtitulo">Breeding</center>
                          <table>
                            <tbody>
                              <tr><th>Egg Groups</th>
                              <td><div v-for="e in especie.egg_groups" :key="e.id">{{e.name}}</div></td></tr>
                              <tr><th>Egg Cycles</th><td>{{especie.hatch_counter}}</td></tr>
                            </tbody>
                          </table>
                        </v-col>
                      </v-row>                      
                      <v-row v-show="$vuetify.breakpoint.md">
                        <div id="arte"><img width="360px" height="336px" v-bind:src="require('../assets/art/'+ nome +'.png')"></div>
                      </v-row>
                      <v-row v-show="$vuetify.breakpoint.md || $vuetify.breakpoint.lg">
                        <v-col>
                          <center class="subtitulo">Training</center>
                          <table>
                            <tbody>
                              <tr><th>Catch Rate</th><td>{{especie.capture_rate}}</td></tr>
                              <tr><th>Base Friendship</th><td>{{especie.base_happiness}}</td></tr>
                              <tr><th>Base Exp</th><td>{{xp}}</td></tr>
                              <tr><th>Growth Rate</th><td>{{especie.growth_rate.name}}</td></tr>
                            </tbody>
                          </table>
                        </v-col>
                        <v-col>
                          <center class="subtitulo">Breeding</center>
                          <table>
                            <tbody>
                              <tr><th>Egg Groups</th>
                              <td><div v-for="e in especie.egg_groups" :key="e.id">{{e.name}}</div></td></tr>
                              <tr><th>Egg Cycles</th><td>{{especie.hatch_counter}}</td></tr>
                            </tbody>
                          </table>
                        </v-col>
                      </v-row>
                      <!-- Stats do pokemon (Cores personalizadas de acordo com o potencial de cada stat) -->
                      <v-row>
                        <v-col>
                        <center class="subtitulo">Base Stats</center>
                          <table>
                            <tbody>                              
                              <tr><th>HP</th><td>{{hp}}</td><td class="cellbar">
                                <div v-if="hp < 50" class="barchant orange" :style="{width: hp*100/250+'%'}"></div>
                                <div v-if="hp >= 50 && hp < 100" class="barchant yellow" :style="{width: hp*100/250+'%'}"></div>
                                <div v-if="hp >= 100 && hp < 150" class="barchant green" :style="{width: hp*100/250+'%'}"></div>
                                <div v-if="hp >= 150" class="barchant blue" :style="{width: hp*100/250+'%'}"></div>
                              </td></tr>                              
                              <tr><th>Attack</th><td>{{ataque}}</td><td class="cellbar">
                                <div v-if="ataque < 50" class="barchant orange" :style="{width: ataque*100/180+'%'}"></div>
                                <div v-if="ataque >= 50 && ataque < 100" class="barchant yellow" :style="{width: ataque*100/180+'%'}"></div>
                                <div v-if="ataque >= 100 && ataque < 150" class="barchant green" :style="{width: ataque*100/180+'%'}"></div>
                                <div v-if="ataque >= 150" class="barchant blue" :style="{width: ataque*100/180+'%'}"></div>
                              </td></tr>
                              <tr><th>Defense</th><td>{{defesa}}</td><td class="cellbar">
                                <div v-if="defesa < 50" class="barchant orange" :style="{width: defesa*100/180+'%'}"></div>
                                <div v-if="defesa >= 50 && defesa < 100" class="barchant yellow" :style="{width: defesa*100/180+'%'}"></div>
                                <div v-if="defesa >= 100 && defesa < 150" class="barchant green" :style="{width: defesa*100/180+'%'}"></div>
                                <div v-if="defesa >= 150" class="barchant blue" :style="{width: defesa*100/180+'%'}"></div>
                              </td></tr>
                              <tr><th>Sp. Atk</th><td>{{spAtaque}}</td><td class="cellbar">
                                <div v-if="spAtaque < 50" class="barchant orange" :style="{width: spAtaque*100/180+'%'}"></div>
                                <div v-if="spAtaque >= 50 && spAtaque < 100" class="barchant yellow" :style="{width: spAtaque*100/180+'%'}"></div>
                                <div v-if="spAtaque >= 100 && spAtaque < 150" class="barchant green" :style="{width: spAtaque*100/180+'%'}"></div>
                                <div v-if="spAtaque >= 150" class="barchant blue" :style="{width: spAtaque*100/180+'%'}"></div>
                              </td></tr>
                              <tr><th>Sp. Def</th><td>{{spDefesa}}</td><td class="cellbar">
                                <div v-if="spDefesa < 50" class="barchant orange" :style="{width: spDefesa*100/180+'%'}"></div>
                                <div v-if="spDefesa >= 50 && spDefesa < 100" class="barchant yellow" :style="{width: spDefesa*100/180+'%'}"></div>
                                <div v-if="spDefesa >= 100 && spDefesa < 150" class="barchant green" :style="{width: spDefesa*100/180+'%'}"></div>
                                <div v-if="spDefesa >= 150" class="barchant blue" :style="{width: spDefesa*100/180+'%'}"></div>
                              </td></tr>
                              <tr><th>Speed</th><td>{{velocidade}}</td><td class="cellbar">
                                <div v-if="velocidade < 50" class="barchant orange" :style="{width: velocidade*100/180+'%'}"></div>
                                <div v-if="velocidade >= 50 && velocidade < 100" class="barchant yellow" :style="{width: velocidade*100/180+'%'}"></div>
                                <div v-if="velocidade >= 100 && velocidade < 150" class="barchant green" :style="{width: velocidade*100/180+'%'}"></div>
                                <div v-if="velocidade >= 150" class="barchant blue" :style="{width: velocidade*100/180+'%'}"></div>
                              </td></tr>
                            </tbody>
                          </table>
                        </v-col>
                      </v-row>
                      <!-- Fraquezas (Cores personalizadas) -->
                      <v-row>
                        <v-col>
                          <center class="subtitulo">Type Defenses</center>
                        </v-col>
                      </v-row>
                      <v-col>
                        <center><table class="type-table">
                          <tbody>
                            <tr>
                              <th><a class="defense normal">Nor</a></th>
                              <th><a class="defense fighting">Fig</a></th>
                              <th><a class="defense flying">Fly</a></th>
                              <th><a class="defense poison">Poi</a></th>
                              <th><a class="defense ground">Gro</a></th>
                              <th><a class="defense rock">Roc</a></th>
                              <th><a class="defense bug">Bug</a></th>
                              <th><a class="defense ghost">Gho</a></th>
                              <th><a class="defense steel">Ste</a></th>
                              <th><a class="defense fire">Fir</a></th>
                              <th><a class="defense water">Wat</a></th>
                              <th><a class="defense grass">Gra</a></th>
                              <th><a class="defense electric">Ele</a></th> 
                              <th><a class="defense psychic">Psy</a></th> 
                              <th><a class="defense ice">Ice</a></th> 
                              <th><a class="defense dragon">Dra</a></th> 
                              <th><a class="defense dark">Dar</a></th>                               
                              <th><a class="defense fairy">Fai</a></th>
                            </tr>
                            <tr>
                              <td v-for="f in fraqueza" :key="f.id">
                                <a v-if="f.url == 0 && f.name != 'shadow' && f.name != 'unknown'" class="defense fx-100"></a>
                                <a v-if="f.url == 1" class="defense fx-200">2</a>
                                <a v-if="f.url == 2" class="defense fx-400">4</a>
                                <a v-if="f.url == -1" class="defense fx-50">1/2</a>
                                <a v-if="f.url == -2" class="defense fx-25">1/4</a>
                                <a v-if="f.url <= -3" class="defense fx-0">0</a> 
                              </td>                         
                            </tr>
                          </tbody>
                        </table></center>
                      </v-col>
                      <!-- Cadeia de evolução (Normal e Shiny) -->
                      <v-row>
                        <v-col>
                          <center class="subtitulo">Evolution Chart</center>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                        </v-col>
                        <v-col>
                          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ evolucao[0] +'.png')"></div>
                        </v-col>
                        <v-col v-if="evolucao[1] && typeof evolucao[1] == 'string'">
                          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ evolucao[1] +'.png')"></div>
                        </v-col>
                        <v-col v-if="evolucao[1] && typeof evolucao[1] == 'object'">
                          <div v-for="e in evolucao[1]" :key="e.id">
                            <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ e +'.png')"></div>
                          </div>
                        </v-col>
                        <v-col v-if="evolucao[2] && typeof evolucao[2] == 'string'">
                          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ evolucao[2] +'.png')"></div>
                        </v-col>
                        <v-col v-if="evolucao[2] && typeof evolucao[2] == 'object'">
                          <div v-for="e in evolucao[2]" :key="e.id">
                            <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ e +'.png')"></div>
                          </div>
                        </v-col>
                        <v-col>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                        </v-col>
                        <v-col>
                          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ evolucao[0] +'.png')"></div>
                        </v-col>
                        <v-col v-if="evolucao[1] && typeof evolucao[1] == 'string'">
                          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ evolucao[1] +'.png')"></div>
                        </v-col>
                        <v-col v-if="evolucao[1] && typeof evolucao[1] == 'object'">
                          <div v-for="e in evolucao[1]" :key="e.id">
                            <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ e +'.png')"></div>
                          </div>
                        </v-col>
                        <v-col v-if="evolucao[2] && typeof evolucao[2] == 'string'">
                          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ evolucao[2] +'.png')"></div>
                        </v-col>
                        <v-col v-if="evolucao[2] && typeof evolucao[2] == 'object'">
                          <div v-for="e in evolucao[2]" :key="e.id">
                            <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ e +'.png')"></div>
                          </div>
                        </v-col>
                        <v-col>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-container>
            </v-card>
          </div>
        </v-container>
      </v-content>
    </v-row>

    <!-- Layout Mobile - Breakpoints: XS, SM -->
    <div v-show="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs">

      <v-app-bar color=" accent-4" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-text-field id="filtroMobile" style="padding-top: 30px"></v-text-field>
        <v-btn v-on:click="carregarLista()" icon><v-icon>mdi-magnify</v-icon></v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute dark temporary>
        <v-list dark nav class="lista">
          <div v-for="p in pokemons" :key="p.id">
            <v-list-item v-on:click="select($event)" :key="p.id" v-if="parseInt(p.url.split('/')[6]) <= 151">
              <v-list-item-avatar><img :src="require('../assets/sprites/'+ p.name +'.gif')"></v-list-item-avatar>            
              <v-list-item-title>{{ p.name }}</v-list-item-title>                     
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>

      <v-card dark v-if="nome != ''">
        <v-row>                   
          <center class="titulo">{{titleize(nome)}}</center>
        </v-row>
        <v-row><v-col>
          <div id="arte"><img width="360px" height="336px" v-bind:src="require('../assets/art/'+ nome +'.png')"></div>
        </v-col></v-row>
        <v-row><v-col>
          <center class="subtitulo">Pokedex Data</center>
          <table>
            <tbody>
              <tr><th>National Nº</th><td>{{nacional}}</td></tr>
              <tr><th>Species</th><td>{{especie.genera[2].genus}}</td></tr>
              <tr><th>Type</th>
              <td>
                <div v-if="tipos.split('/')[0].includes('normal')" class="type normal">normal</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('fighting')" class="type fighting">fighting</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('flying')" class="type flying">flying</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('poison')" class="type poison">poison</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('ground')" class="type ground">ground</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('rock')" class="type rock">rock</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('bug')" class="type bug">bug</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('ghost')" class="type ghost">ghost</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('steel')" class="type steel">steel</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('fire')" class="type fire">fire</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('water')" class="type water">water</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('grass')" class="type grass">Grass</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('electric')" class="type electric">electric</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('psychic')" class="type psychic">psychic</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('ice')" class="type ice">ice</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('dragon')" class="type dragon">dragon</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('dark')" class="type dark">dark</div>&nbsp;
                <div v-if="tipos.split('/')[0].includes('fairy')" class="type fairy">fairy</div>&nbsp;
                
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('normal')" class="type normal">normal</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('fighting')" class="type fighting">fighting</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('flying')" class="type flying">flying</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('poison')" class="type poison">poison</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('ground')" class="type ground">ground</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('rock')" class="type rock">rock</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('bug')" class="type bug">bug</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('ghost')" class="type ghost">ghost</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('steel')" class="type steel">steel</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('fire')" class="type fire">fire</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('water')" class="type water">water</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('grass')" class="type grass">Grass</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('electric')" class="type electric">electric</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('psychic')" class="type psychic">psychic</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('ice')" class="type ice">ice</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('dragon')" class="type dragon">dragon</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('dark')" class="type dark">dark</div>&nbsp;
                <div v-if="tipos.split('/').length > 1 && tipos.split('/')[1].includes('fairy')" class="type fairy">fairy</div>&nbsp;
                
              </td></tr>
              <tr><th>Height</th><td>{{altura}} m</td></tr>
              <tr><th>Weight</th><td>{{peso}} kg</td></tr>
              <tr><th>Abilities</th>
              <td><div v-for="h in habilidades" :key="h.id">{{h}}</div></td></tr>
              <tr><th>Local Nº</th>
                <td>{{especie.pokedex_numbers[3].entry_number}} <small class="legenda">(Red/Blue/Yellow)</small>
                <br>{{especie.pokedex_numbers[2].entry_number}} <small class="legenda">(Gold/Silver/Crystal)</small>
                <br>{{especie.pokedex_numbers[3].entry_number}} <small class="legenda">(FireRed/LeafGreen)</small>
                <br>{{especie.pokedex_numbers[1].entry_number}} <small class="legenda">(HeartGold/SoulSilver)</small>
                <br>{{especie.pokedex_numbers[0].entry_number}} <small class="legenda">(X/Y — Central Kalos)</small>
                <br>{{especie.pokedex_numbers[3].entry_number}} <small class="legenda">(Let's Go Pikachu/Let's Go Eevee)</small></td>
              </tr>
            </tbody>
          </table>
        </v-col></v-row>
        <v-row><v-col>
          <center class="subtitulo">Training</center>
          <table>
            <tbody>
              <tr><th>Catch Rate</th><td>{{especie.capture_rate}}</td></tr>
              <tr><th>Base Friendship</th><td>{{especie.base_happiness}}</td></tr>
              <tr><th>Base Exp</th><td>{{xp}}</td></tr>
              <tr><th>Growth Rate</th><td>{{especie.growth_rate.name}}</td></tr>
            </tbody>
          </table>
        </v-col></v-row>
        <v-row><v-col>
          <center class="subtitulo">Breeding</center>
          <table>
            <tbody>
              <tr><th>Egg Groups</th>
              <td><div v-for="e in especie.egg_groups" :key="e.id">{{e.name}}</div></td></tr>
              <tr><th>Egg Cycles</th><td>{{especie.hatch_counter}}</td></tr>
            </tbody>
          </table>
        </v-col></v-row>
        <v-row><v-col>
          <center class="subtitulo">Base Stats</center>
          <table>
            <tbody>                              
              <tr><th>HP</th><td>{{hp}}</td><td class="cellbar">
                <div v-if="hp < 50" class="barchant orange" :style="{width: hp*100/250+'%'}"></div>
                <div v-if="hp >= 50 && hp < 100" class="barchant yellow" :style="{width: hp*100/250+'%'}"></div>
                <div v-if="hp >= 100 && hp < 150" class="barchant green" :style="{width: hp*100/250+'%'}"></div>
                <div v-if="hp >= 150" class="barchant blue" :style="{width: hp*100/250+'%'}"></div>
              </td></tr>                              
              <tr><th>Attack</th><td>{{ataque}}</td><td class="cellbar">
                <div v-if="ataque < 50" class="barchant orange" :style="{width: ataque*100/180+'%'}"></div>
                <div v-if="ataque >= 50 && ataque < 100" class="barchant yellow" :style="{width: ataque*100/180+'%'}"></div>
                <div v-if="ataque >= 100 && ataque < 150" class="barchant green" :style="{width: ataque*100/180+'%'}"></div>
                <div v-if="ataque >= 150" class="barchant blue" :style="{width: ataque*100/180+'%'}"></div>
              </td></tr>
              <tr><th>Defense</th><td>{{defesa}}</td><td class="cellbar">
                <div v-if="defesa < 50" class="barchant orange" :style="{width: defesa*100/180+'%'}"></div>
                <div v-if="defesa >= 50 && defesa < 100" class="barchant yellow" :style="{width: defesa*100/180+'%'}"></div>
                <div v-if="defesa >= 100 && defesa < 150" class="barchant green" :style="{width: defesa*100/180+'%'}"></div>
                <div v-if="defesa >= 150" class="barchant blue" :style="{width: defesa*100/180+'%'}"></div>
              </td></tr>
              <tr><th>Sp. Atk</th><td>{{spAtaque}}</td><td class="cellbar">
                <div v-if="spAtaque < 50" class="barchant orange" :style="{width: spAtaque*100/180+'%'}"></div>
                <div v-if="spAtaque >= 50 && spAtaque < 100" class="barchant yellow" :style="{width: spAtaque*100/180+'%'}"></div>
                <div v-if="spAtaque >= 100 && spAtaque < 150" class="barchant green" :style="{width: spAtaque*100/180+'%'}"></div>
                <div v-if="spAtaque >= 150" class="barchant blue" :style="{width: spAtaque*100/180+'%'}"></div>
              </td></tr>
              <tr><th>Sp. Def</th><td>{{spDefesa}}</td><td class="cellbar">
                <div v-if="spDefesa < 50" class="barchant orange" :style="{width: spDefesa*100/180+'%'}"></div>
                <div v-if="spDefesa >= 50 && spDefesa < 100" class="barchant yellow" :style="{width: spDefesa*100/180+'%'}"></div>
                <div v-if="spDefesa >= 100 && spDefesa < 150" class="barchant green" :style="{width: spDefesa*100/180+'%'}"></div>
                <div v-if="spDefesa >= 150" class="barchant blue" :style="{width: spDefesa*100/180+'%'}"></div>
              </td></tr>
              <tr><th>Speed</th><td>{{velocidade}}</td><td class="cellbar">
                <div v-if="velocidade < 50" class="barchant orange" :style="{width: velocidade*100/180+'%'}"></div>
                <div v-if="velocidade >= 50 && velocidade < 100" class="barchant yellow" :style="{width: velocidade*100/180+'%'}"></div>
                <div v-if="velocidade >= 100 && velocidade < 150" class="barchant green" :style="{width: velocidade*100/180+'%'}"></div>
                <div v-if="velocidade >= 150" class="barchant blue" :style="{width: velocidade*100/180+'%'}"></div>
              </td></tr>
            </tbody>
          </table>
        </v-col></v-row>
        <v-row>
          <v-col>
            <center class="subtitulo">Type Defenses</center>
          </v-col>
        </v-row>
        <v-col>
          <center><table class="type-table">
            <tbody>
              <tr>
                <th><a class="defense normal">Nor</a></th>
                <th><a class="defense fighting">Fig</a></th>
                <th><a class="defense flying">Fly</a></th>
                <th><a class="defense poison">Poi</a></th>
                <th><a class="defense ground">Gro</a></th>
                <th><a class="defense rock">Roc</a></th>
                <th><a class="defense bug">Bug</a></th>
                <th><a class="defense ghost">Gho</a></th>
                <th><a class="defense steel">Ste</a></th>
           
              </tr>
              <tr>
                <td v-for="index in 9" :key="index">
                  <a v-if="fraqueza[index].url == 0 && fraqueza[index].name != 'shadow' && fraqueza[index].name != 'unknown'" class="defense fx-100"></a>
                  <a v-if="fraqueza[index].url == 1" class="defense fx-200">2</a>
                  <a v-if="fraqueza[index].url == 2" class="defense fx-400">4</a>
                  <a v-if="fraqueza[index].url == -1" class="defense fx-50">1/2</a>
                  <a v-if="fraqueza[index].url == -2" class="defense fx-25">1/4</a>
                  <a v-if="fraqueza[index].url <= -3" class="defense fx-0">0</a> 
                </td>                         
              </tr>
              <tr>
                <th><a class="defense fire">Fir</a></th>
                <th><a class="defense water">Wat</a></th>
                <th><a class="defense grass">Gra</a></th>
                <th><a class="defense electric">Ele</a></th> 
                <th><a class="defense psychic">Psy</a></th> 
                <th><a class="defense ice">Ice</a></th> 
                <th><a class="defense dragon">Dra</a></th> 
                <th><a class="defense dark">Dar</a></th>                               
                <th><a class="defense fairy">Fai</a></th>
              </tr>
              <tr>
                <td v-for="index in 9" :key="index">
                  <a v-if="fraqueza[index+9].url == 0 && fraqueza[index].name != 'shadow' && fraqueza[index].name != 'unknown'" class="defense fx-100"></a>
                  <a v-if="fraqueza[index+9].url == 1" class="defense fx-200">2</a>
                  <a v-if="fraqueza[index+9].url == 2" class="defense fx-400">4</a>
                  <a v-if="fraqueza[index+9].url == -1" class="defense fx-50">1/2</a>
                  <a v-if="fraqueza[index+9].url == -2" class="defense fx-25">1/4</a>
                  <a v-if="fraqueza[index+9].url <= -3" class="defense fx-0">0</a> 
                </td>                         
              </tr>
            </tbody>
          </table></center>
        </v-col>
        <v-row><v-col>
          <center class="subtitulo">Evolution Chart</center>
        </v-col></v-row>
        <v-row>                      
          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ evolucao[0] +'.png')"></div>          
          <div v-if="evolucao[1] && typeof evolucao[1] == 'string'">
            <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ evolucao[1] +'.png')">
          </div>
          <div v-if="evolucao[1] && typeof evolucao[1] == 'object'">
            <div v-for="e in evolucao[1]" :key="e.id">
              <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ e +'.png')">
            </div>
          </div>
          <div v-if="evolucao[2] && typeof evolucao[2] == 'string'">
            <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ evolucao[2] +'.png')">
          </div>
          <div v-if="evolucao[2] && typeof evolucao[2] == 'object'">
            <div v-for="e in evolucao[2]" :key="e.id">
              <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/'+ e +'.png')">
            </div>
          </div>                       
        </v-row>
        <v-row>                      
          <div><img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ evolucao[0] +'.png')"></div>          
          <div v-if="evolucao[1] && typeof evolucao[1] == 'string'">
            <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ evolucao[1] +'.png')">
          </div>
          <div v-if="evolucao[1] && typeof evolucao[1] == 'object'">
            <div v-for="e in evolucao[1]" :key="e.id">
              <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ e +'.png')">
            </div>
          </div>
          <div v-if="evolucao[2] && typeof evolucao[2] == 'string'">
            <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ evolucao[2] +'.png')">
          </div>
          <div v-if="evolucao[2] && typeof evolucao[2] == 'object'">
            <div v-for="e in evolucao[2]" :key="e.id">
              <img v-bind:src="('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/'+ e +'.png')">
            </div>
          </div>                       
        </v-row>
      </v-card>
    </div>

    <loading :loading="loading" /> 
  </v-app>
</template>

<script>
import getPokedex from "../services/getPokedex.js";
import getPokemon from "../services/getPokemon.js";
import getPokemonByFilter from "../services/getPokemonByFilter.js";
import getEvolucao from "../services/getEvolucao.js";
import getEspecie from "../services/getEspecie.js";
import getFraqueza from "../services/getFraqueza.js";
import loading from "./loading";
export default {
  name: 'Pokedex',
  data() {
    return {
      pokemons: [],
      nome: '',
      arte: '',
      shiny: '',
      tipos:'',
      altura:'',
      peso:'',
      numero:'',
      habilidades:[],
      nacional:'',
      xp:'',
      hp:'',
      ataque:'',
      defesa:'',
      spAtaque:'',
      spDefesa:'',
      velocidade:'',
      evolucao: [],
      especie: [],
      fraqueza:[],
      loading: false,
      drawer: false,
      group: null,
    }    
  },
  components: { loading },
  mounted() {
    this.getData();
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    async getData() {
      //consumindo a pokedex
      const data = await getPokedex();
      
      //Todos pokemons da KantoDex
      this.pokemons = data;
    },

    async select(event){
      this.drawer = false
      
      // Buscando e Tratando o nome
      let targetId = event.currentTarget.innerHTML;
      this.nome = targetId.split('>')[4].split('<')[0];
      
      //Iniciando o layout de loading
      this.loading = true;

      //Resgatando dados do pokemon
      const dados = await getPokemon(this.nome);
      this.tipos = dados.types[0].type.name;

      //Tratando tipos duplos
      if(dados.types.length > 1){
        this.tipos = this.tipos+' / '+ dados.types[1].type.name;
      }

      //Resgatando vantagens/fraquezas
      const fraquezas = await getFraqueza(this.tipos);
      this.fraqueza = fraquezas;

      //Importando para o objeto as informações
      this.altura = dados.height/10;
      this.peso = dados.weight/10;
      this.numero = dados.id;
      this.velocidade = dados.stats[0].base_stat;
      this.spDefesa = dados.stats[1].base_stat;
      this.spAtaque = dados.stats[2].base_stat;
      this.defesa = dados.stats[3].base_stat;
      this.ataque = dados.stats[4].base_stat;
      this.hp = dados.stats[5].base_stat;
      this.xp = dados.base_experience;
      this.nacional = dados.order;

      //Tratando múltiplas habilidades
      this.habilidades = [];
      for(let i=0;i<dados.abilities.length;i++){
        this.habilidades.push(dados.abilities[i].ability.name);
      }

      //Resgatando dados da especie do pokemon
      const especies = await getEspecie(this.nome);
      this.especie = especies;

      //Resgatando dados das evoluções do pokemon
      const evolucoes = await getEvolucao(this.nome);
      console.log(evolucoes);
      this.evolucao = evolucoes;

      //Encerrando o layout de loading
      this.loading = false;
    },
    async carregarLista() {
      //Importando lista de pokemons pelo tipo dado no filtro (desktop) ou filtro (mobile)
      if(document.getElementById("filtro").value != ''){
        const data = await getPokemonByFilter(document.getElementById("filtro").value);
        this.pokemons = data;
      }
      if(document.getElementById("filtroMobile").value != ''){
        const data = await getPokemonByFilter(document.getElementById("filtroMobile").value);
        this.pokemons = data;
      }
    },
    titleize(text) {
      //Método para deixar em Maiúsculo a Primeira letra de cada palavra e o resto em minúsculo (Usada no nome do pokemon selecionado)
      var words = text.toLowerCase().split(" ");
      for (var a = 0; a < words.length; a++) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
      }
      return words.join(" ");
    }
  }, 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
th, td{
  padding: 4px 10px;
}
th {
  text-align: right;
  font-weight: normal;
  font-size: 0.875rem;
  color: #939393;
  white-space: nowrap;
  width: 1px;
}

.app{
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;
}
.pokedex{  
  height: 99vh;
  width: 40vh;
  display: flex;
}
.lista{
  overflow-y: scroll;
  height:94vh;
}
.dados{
  overflow-y: scroll;
  margin-top:10px;
  height:97vh;
  width: 95%;
  }

.titulo{
  width:100%;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
}

.subtitulo{
  width:100%;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2;
}

.legenda{
  color: #939393;
}

.cellbar{
  width: 100%;
  min-width: 250px;
}

.barchant{
  height: 0.75rem;
  border-radius: 4px;
  border: 1px solid #737373;
  border-color: rgba(0,0,0,0.15);
}

.orange{
  background-color: #ff7f0f;
}

.yellow{
  background-color: #ffdd57;
}

.green{
  background-color: #a0e515;
}

.blue{
  background-color: #00c2b8;
}

.type{
  display: inline-block;
  width: 66px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.2);
  color: #fff;
  font-size: 0.75rem;
  font-weight: normal;
  line-height: 1.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
  text-transform: uppercase;
  transition: opacity 0.4s;
}

.type-table{
  display: inline-block;
  margin: 0 0 0 -1px;
  border-collapse: collapse;
  border-spacing: 0;
}

.type-table th{
  padding: 0;
  border: 1px solid #222222;
}

.type-table td{
  padding: 0;
  border: 1px solid #222222;
}

.defense{
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.2);
  color: #fff;
  font-size: 0.625rem;
  font-weight: normal;
  line-height: 26px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
  text-transform: uppercase;
  transition: opacity 0.4s;
  margin-bottom: 0;
}

.normal{
  background-color: #aa9;
}
.fighting{
  background-color: #b54;
}
.flying{
  background-color: #89f;
}
.poison{
  background-color: #a59;
}
.ground{
  background-color: #db5;
}
.rock{
  background-color: #ba6;
}
.bug{
  background-color: #ab2;
}
.ghost{
  background-color: #66b;
}
.steel{
  background-color: #aab;
}
.fire{
  background-color: #f42;
}
.water{
  background-color: #39f;
}
.grass{
  background-color: #7c5;
}
.electric{
  background-color: #fc3;
}
.psychic{
  background-color: #f59;
}
.ice{
  background-color: #6cf;
}
.dragon{
  background-color: #76e;
}
.dark{
  background-color: #754;
}
.fairy{
  background-color: #e9e;
}

.fx-cell{
  padding: 0;
  border: 1px solid #222222;
  color: #ffffff;
  font-size: 0.625rem;
  width: 28px;
  height: 28px;
  line-height: 26px;
  text-align: center;
}
.fx-100{
  background-color: #ffffff;
}

.fx-50{
  background-color: #a40000;
}

.fx-25{
  background-color: #7c0000;
}

.fx-0{
  background-color: #2e3436;
}

.fx-200{
  background-color: #4e9a06;
}

.fx-400{
  background-color: #73d216;
}

</style>
