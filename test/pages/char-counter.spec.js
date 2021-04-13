import { shallowMount } from '@vue/test-utils'
import CharCounterPage from '@/pages/char-counter.vue'
import Vuetify from 'vuetify';
import EpisodeCard from '@/components/EpisodeCard.vue'
import LocationCard from '@/components/LocationCard.vue'
import CharacterCard from '@/components/CharacterCard.vue'

const vuetify = new Vuetify();

describe('Char Counter Page', () => {

    const build = async () => {
        const wrapper = shallowMount(CharCounterPage,{
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

    it('contains episode cards', async done => {
        const {wrapper} = await build()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findComponent(EpisodeCard)).toBeTruthy()
            done()
        })
    })
    
    it('contains location cards', async done => {
        const {wrapper} = await build()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findComponent(LocationCard)).toBeTruthy()
            done()
        })
    })

    it('contains character cards', async done => {
        const {wrapper} = await build()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findComponent(CharacterCard)).toBeTruthy()
            done()
        })
    })
})