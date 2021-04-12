import { shallowMount } from '@vue/test-utils'
import EpisodeLocationCard from '@/components/EpisodeLocationCard.vue'

describe('Components -> EpisodeLocationCard', () => {
    test('should be render', () => {
        const wrapper = shallowMount(EpisodeLocationCard)
        expect(wrapper.vm).toBeTruthy()
    })
});