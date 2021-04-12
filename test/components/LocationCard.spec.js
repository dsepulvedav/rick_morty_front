import { shallowMount } from '@vue/test-utils'
import LocationCard from '@/components/LocationCard.vue'

describe('Components -> LocationCard', () => {
    test('should be render', () => {
        const wrapper = shallowMount(LocationCard)
        expect(wrapper.vm).toBeTruthy()
    })
});