<template>
  <v-app>
    <v-main>
      <Desktop-Layout/>
    </v-main>
  </v-app>
</template>

<script>
import DesktopLayout from './components/DesktopLayout';

export default {
  name: 'App',

  components: {
    DesktopLayout,
  },

  data: () => ({
    //
  }),
};
</script>
