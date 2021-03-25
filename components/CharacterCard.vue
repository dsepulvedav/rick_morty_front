<template>
  <v-card class="mx-2">
    <v-card-title>
      {{ character.name }}
    </v-card-title>
    <v-card-text>
      <div class="pa-5">
        <v-row>
          Species: <strong>{{character.species}}</strong>
        </v-row>
        <v-row>
          Gender: <strong>{{character.gender}}</strong>
        </v-row>
        <v-row>
          Origin: <strong>{{character.origin.name}}</strong>
        </v-row>
        <v-row>
          Appears in: <strong>{{character.episode.name}} episodes</strong>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'CharacterCard',
  props: [
    'character'
  ],
})

</script>