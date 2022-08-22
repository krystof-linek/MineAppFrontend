<template>
  <div class="container">
          <iframe
            :src="`http://82.208.17.33:30873/`"
            width="100%"
            height="100"
            frameborder="0" >
           </iframe>

           <v-card rounded="lg" class="px-0 mx-0">
          <iframe
            :src="`http://82.208.17.33:30873/?worldname=world&mapname=surface&zoom=1&nopanel=true&hidechat=true&nocompass=true`"
            width="30%"
            frameborder="0" >
            
           </iframe>
    </v-card>
    <vue-friendly-iframe src="http://82.208.17.33:30873/?worldname=world&mapname=surface&zoom=1&nopanel=true&hidechat=true&nocompass=true" @load="onLoad"></vue-friendly-iframe>
    </div>
</template>
