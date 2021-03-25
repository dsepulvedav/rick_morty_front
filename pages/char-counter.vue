<template>

<v-container>
  <v-row class="my-5">
    <v-col>
      <h1>Char counter</h1>
      <h4>Program duration: {{ programDuration }} milliseconds</h4>
    </v-col>
  </v-row>

  <v-row>
    <v-col><h3>Locations with '{{locationQuery}}' matches</h3></v-col>
    <v-col>
      {{locationCount}} locations
    </v-col>
  </v-row>
  <v-row class="mb-8">
    <v-col>
      <v-slide-group v-if="locationResults.length" show-arrows>
        <v-slide-item v-bind:key="location.name" v-for="location in locationResults">
          <LocationCard :location="location" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </v-row>

  <v-row>
    <v-col><h3>Episodes with '{{episodeQuery}}' matches</h3></v-col>
    <v-col>
      {{episodeCount}} episodes
    </v-col>
  </v-row>
  <v-row class="mb-5">
    <v-col>
      <v-slide-group v-if="episodeResults.length" show-arrows>
        <v-slide-item v-bind:key="episode.name" v-for="episode in episodeResults">
          <EpisodeCard :episode="episode" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </v-row>

  <v-row>
    <v-col><h3>Characters with '{{characterQuery}}' matches</h3></v-col>
    <v-col>
      {{characterCount}} characters
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-slide-group v-if="characterResults.length" show-arrows>
        <v-slide-item v-bind:key="character.name" v-for="character in characterResults">
          <CharacterCard :character="character" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </v-row>
</v-container>

</template>

<script lang="ts">

import Vue from 'vue'
import LocationCard from '~/components/LocationCard.vue';
import EpisodeCard from '~/components/EpisodeCard.vue';
import CharacterCard from '~/components/CharacterCard.vue';
import { calculateDuration } from '~/utils/timeUtils'

export default Vue.extend({
  components: {
    LocationCard,
    EpisodeCard,
    CharacterCard
  },
  computed: {
    programDuration(): number {
      return calculateDuration(this.startTime, this.finishTime);
    }
  },
  data() {
    return {
      locationQuery: 'l',
      episodeQuery: 'e',
      characterQuery: 'c',

      locationCount: null,
      episodeCount: null,
      characterCount: null,

      locationResults: [],
      episodeResults: [],
      characterResults: [],
      startTime: new Date(),
      finishTime: new Date(),
    }
  },
  mounted() {
    this.startTime = new Date();
    this.getAllLocations();
    this.getAllEpisodes();
    this.getAllCharacters();
  },
  methods: {
    getAllLocations() {
      this.$axios.get(`location/?name=${this.locationQuery}`).then(
        resLocations => {
          this.locationCount = resLocations.data.info.count;
          this.locationResults = resLocations.data.results;
        }
      ).catch( err => {
        console.error('ERROR in getAllLocations()', err);
      }).finally(() => this.finishTime = new Date());
    },
    getAllEpisodes() {
      this.$axios.get(`episode/?name=${this.episodeQuery}`).then(
        resEpisodes => {
          this.episodeCount = resEpisodes.data.info.count;
          this.episodeResults = resEpisodes.data.results;
        }
      ).catch( err => {
        console.error('ERROR in getAllLocations()', err);
      }).finally(() => this.finishTime = new Date());
    },
    getAllCharacters() {
      this.$axios.get(`character/?name=${this.characterQuery}`).then(
        resCharacters => {
          this.characterCount = resCharacters.data.info.count;
          this.characterResults = resCharacters.data.results;
        }
      ).catch( err => {
        console.error('ERROR in getAllLocations()', err);
      }).finally(() => this.finishTime = new Date());
    }
  },
})

</script>