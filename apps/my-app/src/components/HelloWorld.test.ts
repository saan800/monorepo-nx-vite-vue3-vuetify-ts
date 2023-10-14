import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'

import HelloWorld from '@/components/HelloWorld.vue'
//import vuetify from '@/plugins/vuetify'

const vuetify = createVuetify({})

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      global: {
        plugins: [vuetify]
      },
      props: { msg: 'Hello Vitest' }
    })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
