<template>
  <v-row justify="center" align="center" class="mt-16">
    <v-col cols="12" sm="8" md="6">
        <span data-token-index="0"> 
            <pre>
 ██████ ██   ██ ██ ██████   █████  ██   ██ 
██      ██   ██ ██ ██   ██ ██   ██  ██ ██  
██      ███████ ██ ██████  ███████   ███   
██      ██   ██ ██ ██      ██   ██  ██ ██  
 ██████ ██   ██ ██ ██      ██   ██ ██   ██

░█▀▄░▀█▀░█▀▀░█░█░░░█▀█░█▀█░█▀▄░░░█▄█░█▀█░█▀▄░▀█▀░█░█░░░█▀▀░█░█░█▀█░█░░░█░░░█▀▀░█▀█░█▀▀░█▀▀
░█▀▄░░█░░█░░░█▀▄░░░█▀█░█░█░█░█░░░█░█░█░█░█▀▄░░█░░░█░░░░█░░░█▀█░█▀█░█░░░█░░░█▀▀░█░█░█░█░█▀▀
░▀░▀░▀▀▀░▀▀▀░▀░▀░░░▀░▀░▀░▀░▀▀░░░░▀░▀░▀▀▀░▀░▀░░▀░░░▀░░░░▀▀▀░▀░▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀
            </pre>
          </span>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
