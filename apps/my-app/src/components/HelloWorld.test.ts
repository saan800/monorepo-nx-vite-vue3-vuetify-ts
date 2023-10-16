import { config, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import HelloWorld from '@/components/HelloWorld.vue'

// TODO: figure out how to do this globally for all test file
const vuetify = createVuetify({})
config.global.plugins.push(vuetify)

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Hello Vitest' }
    })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
