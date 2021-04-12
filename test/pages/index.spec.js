import { shallowMount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

describe('Index Page', () => {

    const build = () => {
        const wrapper = shallowMount(IndexPage)
        return { wrapper }
    }

    test('should be render', () => {
        const {wrapper} = build()
        expect(wrapper.vm).toBeTruthy()
    })
})