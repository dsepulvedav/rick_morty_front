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
import { Location } from '~/models/Location';
import { calculateDuration } from '~/utils/timeUtils'
import { Episode } from '~/models/episode';
import { Character } from '~/models/character';

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

      locationCount: 0,
      episodeCount: 0,
      characterCount: 0,

      locationResults: <Location[]>[],
      episodeResults: <Episode[]>[],
      characterResults: <Character[]>[],
      startTime: new Date(),
      finishTime: new Date(),
    }
  },
  mounted() {
    this.startTime = new Date();
    this.getLocations();
    this.getEpisodes();
    this.getCharacters();
  },
  methods: {
    
    getLocations() {
      this.getAllLocations('').then(
        resLocations => {
          this.locationResults = resLocations;
          const arrMatches = this.locationResults
            .map( i => i.name )
            .reduce( (a, b) => `${a}${b}`).toLowerCase()
            .match(/l/g);
          this.locationCount = (arrMatches || []).length;
        }
      )
      .catch( err => {
        console.error('ERROR in getAllLocations()', err);
      }).finally(() => this.finishTime = new Date());
    },
    getAllLocations(cursor: string, data = [] as Location[]) : Promise<Location[]>{
      const nextPage = cursor ? cursor.split('/').pop()! : ''
      const url = nextPage ? `location/${nextPage}` : `location/?name=${this.locationQuery}`
      return this.$axios.get(url)
        .then(response => {
          data.push(...response.data.results)
            if (!response.data.info.next ) return data
            return this.getAllLocations(response.data.info.next, data)
        })
    },


    getEpisodes() {
      this.getAllEpisodes('').then(
        resEpisodes => {
          this.episodeResults = resEpisodes;
          const arrMatches = this.episodeResults
            .map( i => i.name )
            .reduce( (a, b) => `${a}${b}`).toLowerCase()
            .match(/l/g);
          this.episodeCount = (arrMatches || []).length;
        }
      )
      .catch( err => {
        console.error('ERROR in getAllEpisodes()', err);
      }).finally(() => this.finishTime = new Date());
    },
    getAllEpisodes(cursor: string, data = [] as Episode[]) : Promise<Episode[]>{
      const nextPage = cursor ? cursor.split('/').pop()! : ''
      const url = nextPage ? `episode/${nextPage}` : `episode/?name=${this.episodeQuery}`
      return this.$axios.get(url)
        .then(response => {
          data.push(...response.data.results)
            if (!response.data.info.next ) return data
            return this.getAllEpisodes(response.data.info.next, data)
        })
    },

    getCharacters() {
      this.getAllCharacters('').then(
        resCharacters => {
          this.characterResults = resCharacters;
          const arrMatches = this.characterResults
            .map( i => i.name )
            .reduce( (a, b) => `${a}${b}`).toLowerCase()
            .match(/l/g);
          this.characterCount = (arrMatches || []).length;
        }
      )
      .catch( err => {
        console.error('ERROR in getAllCharacters()', err);
      }).finally(() => this.finishTime = new Date());
    },
    getAllCharacters(cursor: string, data = [] as Character[]) : Promise<Character[]>{
      const nextPage = cursor ? cursor.split('/').pop()! : ''
      const url = nextPage ? `character/${nextPage}` : `character/?name=${this.characterQuery}`
      return this.$axios.get(url)
        .then(response => {
          data.push(...response.data.results)
            if (!response.data.info.next ) return data
            return this.getAllCharacters(response.data.info.next, data)
        })
    },


  },
})

</script>