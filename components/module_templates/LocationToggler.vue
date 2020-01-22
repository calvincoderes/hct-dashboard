<template>
  <div id="location-toggler-wrapper">
    <div id="location-toggler">
      <b-form-select
        v-model="location"
        class="float-left pr-3 cursor-pointer"
        :options="locations"
        @change="handleLocationChange"
      />
    </div>
  </div>
</template>

<script>
// const endpoint = process.env.REST_API_ENDPOINT

export default {
  data () {
    return {
      location: null,
      locations: [],
    }
  },
  mounted () {
    let locationId = 0
    if (this.$store.getters.auth && this.$store.getters.auth.assistant_details) {
      const details = this.$store.getters.auth.assistant_details
      const locations = details.locations
      const defaultLocation = details.default_location

      if (locations.length) {
        for (const index in locations) {
          if (locations[index].id === defaultLocation) {
            locationId = locations[index].id
            break
          }
        }
      }
      if (locationId) {
        this.location = locationId
      }
      this.locations = []
      for (const key in locations) {
        this.locations.push({
          text: `${locations[key].name} (${locations[key].service_type})`,
          value: locations[key].id,
        })
      }
    }
  },
  methods: {
    handleLocationChange (value) {
      this.$axios.put(`/auth/default_location/`, { location_id: value })
        .then((response) => {
          window.location.reload()
        }).catch((e) => { this.errorHandler(e) })
    },
    errorHandler (e) {
      const data = e.response.data
      const details = typeof data.details !== 'undefined' ? data.details : 'Something went wrong'
      const type = e.response.status === 400 ? 'warning' : 'error'

      this.$swal({ title: 'Oops!', text: details, type })
    }
  }
}
</script>

<style lang="scss">
  #location-toggler-wrapper {
    margin: 0 auto;
    margin-top: 10px;
    z-index: 99999;
    width: 230px;

    #location-toggler {
      select.custom-select {
        background: #000000;
        color: #ffffff;
        border: 1px solid var(--brownish-grey);
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.16);
        box-shadow: 0 2px 20px 0 var(--black-16);
      }
    }
  }
</style>
