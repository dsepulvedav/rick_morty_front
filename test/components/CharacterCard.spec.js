import { shallowMount } from '@vue/test-utils'
import CharacterCard from '@/components/CharacterCard.vue'

describe('Components -> CharacterCard', () => {
    test('should be render', () => {
        const wrapper = shallowMount(CharacterCard)
        expect(wrapper.vm).toBeTruthy()
    })

    test('should be render with prop', () => {
        const wrapper = shallowMount(CharacterCard, {
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
    })
});