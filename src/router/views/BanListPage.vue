<template>
  <v-card class="pb-5 mx-auto" rounded="lg" width="90%">
    <v-card-title class="orange">
      BanList
    </v-card-title>
    
    <v-card class="transparent mx-10 mt-5" outlined>

      <v-row justify="center" align="center">
        <v-col cols="5" class="text-center">
          <v-btn class="black white--text" :disabled="activeList == 'temporary'" @click="changeList('temporary')">
            Dočasné
          </v-btn>
          <v-btn class="black white--text mx-5" :disabled="activeList == 'permanent'" @click="changeList('permanent')">
            Permanentní
          </v-btn>
          <v-btn class="black white--text mr-5" :disabled="activeList == 'ip'" @click="changeList('ip')">
            IP
          </v-btn>
          <v-btn rounded class="black white--text" @click="loadAllLists()">
            <v-icon>mdi-sync</v-icon>
          </v-btn>
        </v-col>
        
        <v-col cols="7">
          <v-text-field color="black" ouutlined v-model="search" outlined hide-details prepend-inner-icon="mdi-magnify" label="Vyhledat"></v-text-field>
        </v-col>
      </v-row>

      <v-card v-if="isLoading" class="transparent mt-2" outlined>
        <v-skeleton-loader light
          type="table"
        ></v-skeleton-loader>
      </v-card>
                   
      <v-data-table v-if="activeList == 'temporary' && !isLoading" :sort-by.sync="temporaryListSortBy" :sort-desc.sync="sortDesc" no-data-text="Zatím nebyl udělen žádný ban" class="transparent" :headers="headersBanListTemporary" :items="banListTemporary" hide-default-header :search="search" :items-per-page="-1"
        :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        'items-per-page-text':'počet položek na stránce',
        'items-per-page-options': [5, 10, 15, 20, -1],
        'items-per-page-all-text': 'Všechny',
        'page-text': '{0}-{1} z {2}'
      }">

        <template v-slot:header>
          <thead class="v-data-table-header">
            <tr>
              <th class="text-uppercase text-center">Hráč</th>
              <th class="text-uppercase text-center">Datum a čas</th>
              <th class="text-uppercase text-center">Trvaní</th>
              <th class="text-uppercase text-center">Důvod</th>
              <th class="text-uppercase text-center">Udělil</th>
              <th class="text-uppercase text-center">Vyprší za</th>
              <th class="text-uppercase text-center">Akce</th>
            </tr>
          </thead>
        </template>
                                
        <template v-slot:item="row">
          <tr>
            <td>
              <v-avatar rounded="0" class="mr-5">
                <v-img :src='"https://minotar.net/avatar/" + row.item.name'></v-img>
              </v-avatar>

              <span>{{row.item.name}}</span>
            </td>
            <td class="text-center">{{getDate(row.item.created)}}</td>
            <td class="text-center">{{getDuration(row.item.created, row.item.expires)}}</td>
            <td class="text-center">{{row.item.reason}}</td>
            <td>
              <v-avatar rounded="0" class="mr-5">
                <v-img :src='"https://minotar.net/avatar/" + removePrefix(row.item.source)'></v-img>
              </v-avatar>

              <span :class="row.item.source == 'Console' ? 'red--text font-weight-bold' : ''">{{row.item.source == "Console" ? "Server" : removePrefix(row.item.source) }}</span>
            </td>
            <td :class="getExpirate(row.item.expires) == 'vypršel' ? 'red--text font-weight-bold text-center' : 'text-center'">{{getExpirate(row.item.expires)}}</td>
            <td class="text-center">
              <v-btn class="mx-2" fab dark small color="blue" @click="$router.push({name: 'testRecord', params: { id_record: row.item.id_record}});">
                  <v-icon dark>mdi-note-search</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
<!-- PERMA LIST -->
      <v-data-table v-if="activeList == 'permanent' && !isLoading" :sort-by.sync="permaListSortBy" :sort-desc.sync="sortDesc" no-data-text="Zatím nebyl udělen žádný ban" class="transparent" :headers="headersBanList" :items="banListPermanents" hide-default-header :search="search" :items-per-page="-1"
        :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        'items-per-page-text':'počet položek na stránce',
        'items-per-page-options': [5, 10, 15, 20, -1],
        'items-per-page-all-text': 'Všechny',
        'page-text': '{0}-{1} z {2}'
      }">

        <template v-slot:header>
          <thead class="v-data-table-header">
            <tr>
              <th class="text-uppercase text-center">Hráč</th>
              <th class="text-uppercase text-center">Datum a čas</th>
              <th class="text-uppercase text-center">Důvod</th>
              <th class="text-uppercase text-center">Udělil</th>
              <th class="text-uppercase text-center">Akce</th>
            </tr>
          </thead>
        </template>
                                
        <template v-slot:item="row">
          <tr>
            <td>
              <v-avatar rounded="0" class="mr-5">
                <v-img :src='"https://minotar.net/avatar/" + row.item.name'></v-img>
              </v-avatar>

              <span>{{row.item.name}}</span>
            </td>
            <td class="text-center">{{getDate(row.item.created)}}</td>
            <td class="text-center">{{row.item.reason}}</td>
            <td>
              <v-avatar rounded="0" class="mr-5">
                <v-img :src='"https://minotar.net/avatar/" + removePrefix(row.item.source)'></v-img>
              </v-avatar>

              <span :class="row.item.source == 'Console' ? 'red--text font-weight-bold' : ''">{{row.item.source == "Console" ? "Server" : removePrefix(row.item.source) }}</span>
            </td>
            <td class="text-center">
              <v-btn class="mx-2" fab dark small color="blue" @click="$router.push({name: 'testRecord', params: { id_record: row.item.id_record}});">
                  <v-icon dark>mdi-note-search</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
<!-- IP LIST -->
      <v-data-table v-if="activeList == 'ip' && !isLoading" class="transparent" no-data-text="Zatím nebyl udělen žádný ban" :headers="headersBanList" :items="banListPermanents" hide-default-header :search="search" :items-per-page="-1"
        :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        'items-per-page-text':'počet položek na stránce',
        'items-per-page-options': [5, 10, 15, 20, -1],
        'items-per-page-all-text': 'Všechny',
        'page-text': '{0}-{1} z {2}'
      }">

        <template v-slot:header>
          <thead class="v-data-table-header">
            <tr>
              <th class="text-uppercase text-center">Hráč</th>
              <th class="text-uppercase text-center">Datum</th>
              <th class="text-uppercase text-center">Důvod</th>
              <th class="text-uppercase text-center">Udělil</th>
              <th class="text-uppercase text-center">Akce</th>
            </tr>
          </thead>
        </template>
                                
        <template v-slot:item="row">
          <tr>
            <td>
              <v-avatar rounded="0" class="mr-5">
                <v-img :src='"https://minotar.net/avatar/" + row.item.name'></v-img>
              </v-avatar>

              <span>{{row.item.name}}</span>
            </td>
            <td class="text-center">{{row.item.created}}</td>
            <td class="text-center">{{row.item.reason}}</td>
            <td>
              <v-avatar rounded="0" class="mr-5">
                <v-img :src='"https://minotar.net/avatar/" + removePrefix(row.item.source)'></v-img>
              </v-avatar>

              <span :class="row.item.source == 'Console' ? 'red--text font-weight-bold' : ''">{{row.item.source == "Console" ? "Server" : removePrefix(row.item.source) }}</span>
            </td>
            <td class="text-center">
              <v-btn class="mx-2" fab dark small color="blue" @click="$router.push({name: 'testRecord', params: { id_record: row.item.id_record}});">
                  <v-icon dark>mdi-note-search</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>
<script>

  export default {

    data () {
      return {
        isLoading: true,

        banListTemporary: null,
        banListPermanents: null,

        search: "",
        activeList: "temporary",

        temporaryListSortBy: 'expires',
        sortDesc: true,

        headersBanListTemporary: [
          { align: 'start', filterable: true, value: 'name',},
          { sortable: true, value: 'expires'},
        ],

        permaListSortBy: 'created',

        headersBanList: [
          { align: 'start', filterable: true, value: 'name',},
          { filterable: true, value: 'source'},
        ],

      }
    },
    watch:{
      banListTemporary(val){
        if (val != null && this.banListPermanents != null){
          this.isLoading = false;
        } else
          this.isLoading = true;
      },
      banListPermanents(val){
        if (val != null && this.banListTemporary != null){
          this.isLoading = false;
        } else
          this.isLoading = true;
      },
    },
    methods: {
      async loadAllPermanentBans(){
        try{
          const response = await this.$http.get(`/banlist/permanent`);

          if (response.status == 200){
            this.banListPermanents = response.data;
          }
  
        } catch(e){
          console.log(e);
        }
      },
      async loadAllTemporaryBans(){
        try{
          const response = await this.$http.get(`/banlist/temporary`);

          if (response.status == 200){
            this.banListTemporary = response.data;
          }
  
        } catch(e){
          console.log(e);
        }
      },
      loadAllLists(){
        this.banListTemporary = null;
        this.banListPermanents = null;

        this.loadAllPermanentBans();
        this.loadAllTemporaryBans();
       

      },
      removePrefix(nickname){

        if (nickname == "Console")
          return nickname;

        let regexArray = nickname.match("^§.(.+)§.$");

        if (regexArray != null){
          nickname = regexArray[1];
          return nickname;
        }
      },
      changeList(type){
        if (type == "temporary"){
          this.loadAllPermanentBans();
          this.activeList = "temporary";
        }

        if (type == "permanent"){
          this.loadAllPermanentBans();
          this.activeList = "permanent";
        } 

        if (type == "ip"){
          this.loadAllPermanentBans();
          this.activeList = "ip";
        } 
      },
      getDate(date){
        let array = date.split(' ');

        if (array != null){

          date = array[0];

          let time = array[1];

          array = date.split('-');

          date = array[2] + '.' + array[1] + '.' + array[0];

          if (time != null){
            array = time.split('.')

            date += ' ' + array[0];
          }

          return date;

        }
      },
      getDuration(date_start, date_end){
        let array = date_start.split(' ');

        if (array != null){
          date_start = array[0] + 'T' + array[1]; 
        }

        array = date_end.split(' ');

        if (array != null){
          date_end = array[0] + 'T' + array[1]; 
        }

        if (date_start != null && date_end != null){
          date_start = new Date(date_start);
          date_end = new Date(date_end);

          var dateDiff = date_end - date_start;

          let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));

          if (days != 0)
            dateDiff -= days * (1000 * 60 * 60 * 24);

          let hours = Math.floor(dateDiff / (1000 * 60 * 60));

          if (hours != 0)
            dateDiff -= hours * (1000 * 60 * 60);

          let minutes = Math.floor(dateDiff / (1000 * 60));

          if (days == 0 && hours == 0)
            return minutes + ' min'
          else if (days == 0)
            return hours + ' hod ' + minutes + ' min'
          else
            return days + ' d ' + hours + ' hod ' + minutes + ' min'

        }
      },
      getExpirate(date_end){

        let array = date_end.split(' ');

        if (array != null){
          date_end = array[0] + 'T' + array[1]; 
        }

        if (date_end != null){
          let date_now = new Date();
          date_end = new Date(date_end);

          var dateDiff = date_end - date_now;

          if (dateDiff <= 0)
            return "vypršel";

          let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));

          if (days != 0)
            dateDiff -= days * (1000 * 60 * 60 * 24);

          let hours = Math.floor(dateDiff / (1000 * 60 * 60));

          if (hours != 0)
            dateDiff -= hours * (1000 * 60 * 60);

          let minutes = Math.floor(dateDiff / (1000 * 60));

          if (days == 0 && hours == 0)
            return minutes + ' min'
          else if (days == 0)
            return hours + ' hod ' + minutes + ' min'
          else
            return days + ' d ' + hours + ' hod ' + minutes + ' min'

        }
      },
    },
    mounted(){
      this.loadAllLists();
    }
  }
</script>