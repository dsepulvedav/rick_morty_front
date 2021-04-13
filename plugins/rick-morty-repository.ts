import createRepository from '~/api/rick-morty-repository'

export default (ctx: any, inject: any) => {
 // Here we will do it
    const repository = createRepository(ctx.$axios)

    const repositories = {
        characters  : repository.getCharacters,
        episodes    : repository.getEpisodes,
        locations   : repository.getLocations
    }

    inject('repositories', repositories)
}