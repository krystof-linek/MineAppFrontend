<template>
    <v-footer color="orange">
        <v-row justify="center" no-gutters>
            <v-btn v-for="link in Footerlinks" :key="link" color="black" text rounded class="my-2">
                {{ link }}
            </v-btn>
            
            <v-col class="py-4 text-center black--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>Kryštof Linek</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>
<script>
export default {
  
    data: () => ({
        Footerlinks: [
            'Domů',
            'Něco o nás',
            'Admin Tým',
            'Služby',
            'Kontakty',
        ],
    }),    
}
</script>
