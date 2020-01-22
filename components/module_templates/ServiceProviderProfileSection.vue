<template>
  <div>
    <b-row>
      <b-col xl="12" lg="12" class="headline-basic semi-bold black-grey">
        PROFILE SECTIONS
      </b-col>
      <b-col xl="12" lg="12" class="mt-3">
        <b-list-group class="module-vertical-nav">
          <b-list-group-item
            v-for="item in items"
            :key="item.page"
            class="label-headline pt-4 pb-4"
            :class="isActive(routeName, item.page) ? 'active-page' : 'pointer'"
            @click="handleRouteNameChange(routeName, providerId, item)"
          >
            {{ item.label }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="12" lg="12" class="mt-4">
        <hr class="mt-5 mb-5">
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="12" lg="12" class="mt-4">
        <nuxt-link to="/service_providers/">
          <b-button variant="info" size="lg" block>
            <chevrons-left-icon size="1x" /> Back to Service Providers
          </b-button>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>

export default {
  props: {
    page: { type: String, default: '' },
    providerId: { type: [Number, String], default: '' },
    routeName: { type: String, default: '' },
  },
  data () {
    return {
      items: [
        { page: '', label: 'Personal Information', routeName: 'service_providers-provider_id' },
        { page: 'schedules', label: 'Schedule', routeName: 'service_providers-provider_id-schedules' },
        { page: 'services', label: 'Services', routeName: 'service_providers-provider_id-services' },
        { page: 'appointments', label: 'Appointment History', routeName: 'service_providers-provider_id-appointments' },
        { page: 'leaves', label: 'Leaves', routeName: 'service_providers-provider_id-leaves' }
      ],
    }
  },
  methods: {
    handleRouteNameChange (routeName, providerId, item) {
      this.$router.push({ path: `/service_providers/${providerId}/${item.page}` })
    },
    isActive (routeName, page) {
      const parts = routeName.split('-')
      const routePage = parts[2] || ''
      console.log(routePage)
      return routePage === page
    }
  }
}
</script>
