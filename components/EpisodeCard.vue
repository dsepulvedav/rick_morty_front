<template>
  <v-card class="ma-2">
    <v-card-title>
      {{ episode.name }}
    </v-card-title>
    <v-card-text>
      <div class="pa-5">
        <v-row>
          Episode: <strong>{{episode.episode}}</strong>
        </v-row>
        <v-row>
          Air date: <strong>{{episode.air_date}}</strong>
        </v-row>
        <v-row>
          Characters: <strong>{{episode.characters.length}}</strong>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'EpisodeCard',
  props: [
    'episode'
  ],
})

</script>