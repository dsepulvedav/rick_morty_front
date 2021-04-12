import { shallowMount } from '@vue/test-utils'
import EpisodeCard from '@/components/EpisodeCard.vue'

describe('Components -> EpisodeCard', () => {
    test('should be render', () => {
        const wrapper = shallowMount(EpisodeCard)
        expect(wrapper.vm).toBeTruthy()
    })

    /* test('should be render with prop', () => {
        const wrapper = shallowMount(EpisodeCard, {
            propsData: {
                character: {
                    name: 'David',
                    species: 'Human',
                    gender: 'Male',
                    origin: {
                        name: 'Earth'
                    },
                    episode: [
                        '1',
                        '2',
                        '3'
                    ]
                }
            }
        })
        expect(wrapper.vm).toBeTruthy()
    }) */
});