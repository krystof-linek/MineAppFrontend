<template>

  <v-container fluid>
    <v-layout row wrap>

      <v-card v-if="userInfo != null" class="pb-5 mr-5" rounded="lg" width="75%">
        <v-card-title class="orange justify-center">
          Terminál
        </v-card-title>
    
        <v-card class="mx-10 mt-2 black overflow-y-auto" max-height="300">
          <v-card-text v-if="logLines.length != 0" class="ma-2 white--text" style="font-size: 70%">
            <div v-for="line in logLines" :key="line.line">
              <span>{{ line }}</span>
            </div>
          <span id="scroll_end"></span>
          </v-card-text> 
        </v-card>

        <v-card class="mx-10 mt-2 orange lighten-2">
          <v-form @submit.prevent="sendCommand" autocomplete="off">
            <v-row class="pa-0 ma-2" align="center">
              <v-col cols="10">
                <v-text-field solo @keydown.up="keymonitor(38)" @keydown.down="keymonitor(40)" label="Zadej příkaz" v-model="command" hide-details="auto"></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn class="white--text" type="submit" :disabled="command == ''" color="black">odeslat</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-card>

      <v-spacer></v-spacer>

      <v-card v-if="userInfo != null" class="pb-5" rounded="lg" width="20%" align="end">
        <v-card-title class="orange justify-center">
          Ovládací panel
        </v-card-title>
        <v-container fluid>
          <v-layout row wrap class="mt-2">

            <v-spacer></v-spacer>

            <v-btn class="white--text py-0" color="success" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fas fa-play</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn class="white--text" color="error" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fas fa-stop</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn class="white--text" color="warning" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fas fa-redo-alt</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

          </v-layout>

          <v-layout row wrap class="mt-7">

            <v-spacer></v-spacer>

            <v-btn class="white--text py-0" color="black" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fas fa-sun</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn class="white--text" color="black" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fas fa-moon</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn class="white--text" color="black" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>mdi-sync</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

          </v-layout>

          <v-layout row wrap class="mt-7">

            <v-spacer></v-spacer>

            <v-btn class="white--text py-0" color="black" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fa-solid fa-droplet-slash</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn class="white--text py-0" color="black" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fas fa-cloud-rain</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn class="white--text" color="black" width="3.5em" height="3.5em" @click="loadAllLists()">
              <v-icon>fas fa-thunderstorm</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

          </v-layout>

        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>

  export default {
    props: {
        userInfo: {default: null},
    },
    data () {
      return {
        timer: null,
        sseConection: null,

        logLines: [],

        logFile: [],

        time: new Date((new Date - 5 * 60 * 1000)).toLocaleTimeString('it-IT'),
        loadedLines: 0,

        componentKey: 0,

        messages: [],

        command: "",
        commandMemory: [],
        commandIndex: 0,
        commandActiveIndex: 0,

      }
    },
    updated(){
      this.scrollToEnd();
    },
    created() {
      //this.keymonitor();
      //this.setupStream();
    },
    methods:{
      async getServerLog(){
        try{
          const response = await this.$http.get(`/admin/stream4/${this.loadedLines}`);

          if (response.status == 200){

            const lineNumbers = response.data.lines.length;

            if (lineNumbers > 0){
              this.loadedLines = this.loadedLines + lineNumbers; 

              response.data.lines.forEach(line => {
                this.logLines.push(line);
              });

            }
          }

          

          /*

          if (response.status == 200){
            const logLines = response.data.lines;

            const linesNumber = response.data.lines.length;

            console.log(linesNumber);

            if (logLines.length > 0) {
              logLines.forEach(line => {
                this.logFile.push(line);
                if (linesNumber != 0)
                  this.loadedLines += response.data.lines.length;
                console.log(this.loadedLines)
                console.log(this.logFile)
              });
            }

          }
          */
          
        } catch(e){
          console.log(e);
        }
      },
      async sendCommand(){
        try{

          if (this.command != ""){

            await this.$http.post("/admin/exec/command", {nickname: this.userInfo.nickname, command: this.command});

            if (this.commandMemory.length == 10){
              if(this.commandIndex == 10)
                this.commandIndex = 0;

              this.commandMemory[this.commandIndex] = this.command;

              this.commandIndex = this.commandIndex + 1;
            } else {
              this.commandMemory.push(this.command);
            }

            this.command = "";
          }

        } catch(e){
          console.log(e.response.status)
        }
      },
      keymonitor(keyNumber) {
            
        if (keyNumber == 38) {
          if (this.commandActiveIndex >= this.commandMemory.length)
            this.commandActiveIndex = 0;
          else
            this.commandActiveIndex = this.commandActiveIndex + 1;
        }  
            
        if (keyNumber == 40) {
          if (this.commandActiveIndex <= this.commandMemory.length)
            this.commandActiveIndex = this.commandActiveIndex - 1;
          else
            this.commandActiveIndex = 0;
        }
        
        this.setCommandOfMemory();
      },
      setCommandOfMemory(){
        if (this.commandMemory.length != 0)
          this.command = this.commandMemory[this.commandActiveIndex];
      },
      scrollToEnd() { 
        const element = document.getElementById('scroll_end');

        element.scrollIntoView({behavior: "smooth", block: "end"});   
      },
      setTime(){
        this.time = new Date().toLocaleTimeString('it-IT') //it => pro format HH:MM:SS
          /*

          let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));

          if (days != 0)
            dateDiff -= days * (1000 * 60 * 60 * 24);

          let hours = Math.floor(dateDiff / (1000 * 60 * 60));

          if (hours != 0)
            dateDiff -= hours * (1000 * 60 * 60);

          let minutes = Math.floor(dateDiff / (1000 * 60));
          */

      },
      /*
      setupStream() {
        // Not a real URL, just using for demo purposes
        let event = new EventSourcePolyfill(`https://craftfun.cz/api/admin/stream3/${this.loadedLines}`, {
          headers: {
            Authorization: "Bearer " + this.$credentialsManager.getToken(),
          },
        });

        this.sseConection = event;
        
        event.addEventListener('message', event => {
            //console.log(event)
            let data = JSON.parse(event.data);
            //this.logFile.push(data);

            console.log(event)
            console.log(data)

            console.log(this.logFile.length)
          
            this.loadedLines += data.lines.length;
            console.log(this.loadedLines)
            //this.componentKey += 1;
            //console.log("Pocet radku" + this.logFile.length())
            //this.setTime();
        }, false);


        event.addEventListener('error', event => {
          if (event.readyState == EventSourcePolyfill.CLOSED) {
          console.log('Event was closed');
          console.log(EventSourcePolyfill);
          }
        }, false);
      }
      */
    },
    mounted(){
      this.getServerLog();

      this.timer = setInterval(() => {
        this.getServerLog();
      }, 3000)
      
    },
    beforeDestroy() {
      clearInterval(this.timer);
      //this.sseConection.close();
    }
  }
</script>
<style>
tr:hover td {
  background-color: #FFB74D;
}
</style>