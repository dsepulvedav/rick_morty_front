<template>

<v-container>
  <v-row class="my-5">
    <div class="text-center highlight mx-auto">
      <h1>Char counter</h1>
      <h4>Program duration: {{ programDuration }} milliseconds</h4>
    </div>
  </v-row>

  <v-row class="mb-8">
    <v-col>
      <v-card color="rgb(0, 0, 0, 0.2)">
        <v-card-title>
          <h4 class="custom-title">Locations with '{{locationQuery}}' matches</h4>
          <v-spacer></v-spacer>
          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4">
              {{locationCount}}
            </v-avatar>
            locations
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-slide-group v-if="locationResults.length" show-arrows>
            <v-slide-item v-bind:key="location.name" v-for="location in locationResults">
              <LocationCard :location="location" />
            </v-slide-item>
          </v-slide-group>
          <v-slide-group v-else>
            <v-slide-item v-bind:key="i" v-for="i in loadingCards">
              <LoadingCard />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mb-8">
    <v-col>
      <v-card color="rgb(0, 0, 0, 0.2)">
        <v-card-title>
          <h4 class="custom-title">Episodes with '{{episodeQuery}}' matches</h4>
          <v-spacer></v-spacer>
          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4">
              {{episodeCount}}
            </v-avatar>
            episodes
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-slide-group v-if="episodeResults.length" show-arrows>
            <v-slide-item v-bind:key="episode.name" v-for="episode in episodeResults">
              <EpisodeCard :episode="episode" />
            </v-slide-item>
          </v-slide-group>
          <v-slide-group v-else>
            <v-slide-item v-bind:key="i" v-for="i in loadingCards">
              <LoadingCard />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mb-8">
    <v-col>
      <v-card color="rgb(0, 0, 0, 0.2)">
        <v-card-title>
          <h4 class="custom-title">Characters with '{{characterQuery}}' matches</h4>
          <v-spacer></v-spacer>
          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4">
              {{characterCount}}
            </v-avatar>
            characters
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-slide-group v-if="characterResults.length" show-arrows>
            <v-slide-item v-bind:key="character.name+index" v-for="(character, index) in characterResults">
              <CharacterCard :character="character" />
            </v-slide-item>
          </v-slide-group>
          <v-slide-group v-else>
            <v-slide-item v-bind:key="i" v-for="i in loadingCards">
              <LoadingCard />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</v-container>

</template>

<script lang="ts">

import Vue from 'vue'
import LoadingCard from '~/components/LoadingCard.vue';
import LocationCard from '~/components/LocationCard.vue';
import EpisodeCard from '~/components/EpisodeCard.vue';
import CharacterCard from '~/components/CharacterCard.vue';
import { Location } from '~/models/Location';
import { calculateDuration } from '~/utils/timeUtils'
import { Episode } from '~/models/episode';
import { Character } from '~/models/character';

export default Vue.extend({
  components: {
    LoadingCard,
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

      loadingCards: [1, 2, 3, 4, 5, 6, 7, 8]
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
            .match(new RegExp(this.locationQuery, 'g'));
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
          console.log({resEpisodes})
          const arrMatches = this.episodeResults
            .map( i => i.name )
            .reduce( (a, b) => `${a}${b}`).toLowerCase()
            .match(new RegExp(this.episodeQuery, 'g'));
          console.log({arrMatches})
          
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
            .match(new RegExp(this.characterQuery, 'g'));
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