import createRepository from '~/api/rick-morty-repository'

export default (ctx: any, inject: any) => {
 // Here we will do it
    const repository = createRepository(ctx.$axios)

    const repositories = {
        characters  : repository.getAllCharacters,
        episodes    : repository.getAllEpisodes,
        locations   : repository.getAllLocations
    }

    inject('repositories', repositories)
}