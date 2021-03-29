<template>
  <v-card class="ma-2">
    <v-card-title>
      {{ location.name }}
    </v-card-title>
    <v-card-text>
      <div class="pa-5">
        <v-row>
          Type: <strong>{{location.type}}</strong>
        </v-row>
        <v-row>
          Dimension: <strong>{{location.dimension}}</strong>
        </v-row>
        <v-row>
          Residents: <strong>{{location.residents.length}}</strong>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'LocationCard',
  props: [
    'location'
  ],
})

</script>