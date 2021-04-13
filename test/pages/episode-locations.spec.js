import { shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify';
import EpisodeLocationsPage from '@/pages/episode-locations.vue'
import EpisodeLocationCard from '@/components/EpisodeLocationCard.vue'
const vuetify = new Vuetify();

describe('Episode Locations Page', () => {

    const build = async () => {
        const wrapper = shallowMount(EpisodeLocationsPage,{
            mocks: {
              $vuetify: { breakpoint: {} }
            },
            vuetify
        })
        return { wrapper }
    }

    it('should be render', async () => {
        const {wrapper} = await build()
        expect(wrapper.vm).toBeTruthy()
    })

    it('contains episode location cards', async done => {
        const {wrapper} = await build()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findComponent(EpisodeLocationCard)).toBeTruthy()
            done()
        })
    })
})