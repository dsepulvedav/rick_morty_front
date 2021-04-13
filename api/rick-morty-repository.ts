import { Character } from "~/models/character"
import { Episode } from "~/models/episode"
import { Location } from "~/models/Location"


export default ($axios: any) => ({
  
  getAllEpisodes(cursor: string, query: string, data = [] as Episode[]) : Promise<Episode[]>{
    const nextPage = cursor ? cursor.split('/').pop()! : ''
    const url = nextPage ? `episode/${nextPage}` : `episode/?name=${query}`
    return $axios.get(url)
      .then((response: any) => {
        data.push(...response.data.results)
          if (!response.data.info.next ) return data
          return this.getAllEpisodes(response.data.info.next, query, data)
      })
  },

  getAllCharacters(cursor: string, query: string, data = [] as Character[]) : Promise<Character[]>{
    const nextPage = cursor ? cursor.split('/').pop()! : ''
    const url = nextPage ? `character/${nextPage}` : `character/?name=${query}`
    return $axios.get(url)
      .then((response: any) => {
        data.push(...response.data.results)
          if (!response.data.info.next ) return data
          return this.getAllCharacters(response.data.info.next, query, data)
      })
  },

  getAllLocations(cursor: string, query: string, data = [] as Location[]) : Promise<Location[]>{
    const nextPage = cursor ? cursor.split('/').pop()! : ''
    const url = nextPage ? `location/${nextPage}` : `location/?name=${query}`
    return $axios.get(url)
      .then((response: any) => {
        data.push(...response.data.results)
          if (!response.data.info.next ) return data
          return this.getAllLocations(response.data.info.next, query, data)
      })
  },
})
