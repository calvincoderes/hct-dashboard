<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12">
      <b-card
        footer-tag="footer"
      >
        <b-row>
          <b-col cols="12" xs="12" lg="12">
            <h3 v-if="$route.params.service_id">
              Update Service
            </h3>
            <h3 v-else>
              Add Service
            </h3>
            <form
              method="post"
              class="mt-4"
              @submit.prevent="handleSubmit"
            >
              <!-- FAILED REQUEST HANDLER -->
              <b-row v-if="submitted.status === 'REJECTED'">
                <b-col cols="12">
                  <b-alert variant="danger" show>
                    <b-col v-for="error in collected_errors" :key="error.id" xl="12" lg="12">
                      {{ error.join() }}
                    </b-col>
                  </b-alert>
                </b-col>
              </b-row><!-- FAILED REQUEST HANDLER -->
              <b-row v-if="formStatus === 'PENDING' || formStatus === 'NO_ACTION'">
                <b-col cols="12" xs="12">
                  <form-default-loader />
                </b-col>
              </b-row>
              <b-row v-if="formStatus === 'FULFILLED'">
                <!-- <b-col cols="12" xs="12">
                  <b-form-group label="Location">
                    <b-form-select
                      v-model="form.location"
                      v-validate="{required: true}"
                      name="location"
                      :options="locations"
                    />
                    <div
                      v-for="(error, index) in errors.collect('location')"
                      :key="`location-${index}`"
                      class="errors"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col> -->
                <b-col cols="12" xs="12">
                  <b-form-group label="Service">
                    <b-form-select
                      v-model="form.service"
                      v-validate="{required: true}"
                      name="service"
                      :options="services"
                    />
                    <div
                      v-for="(error, index) in errors.collect('service')"
                      :key="`service-${index}`"
                      class="errors"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <b-col cols="12" xs="12">
                  <b-form-group label="Rate">
                    <b-form-input
                      v-model="form.rate"
                      v-validate="{required: true}"
                      placeholder="Rate"
                      name="rate"
                      type="text"
                    />
                    <div
                      v-for="(error, index) in errors.collect('rate')"
                      :key="`rate-${index}`"
                      class="errors"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <b-col xl="12" lg="12">
                  <hr>
                  <div slot="footer">
                    <b-row>
                      <b-col md="12">
                        <div class="form-inline float-right">
                          <nuxt-link :to="{path: '/service_providers/'+ $route.params.provider_id +'/services/', query: $route.query}" class="mr-2">
                            <b-button pill variant="outline-info" right>
                              <chevrons-left-icon size="1x" /> Back to list
                            </b-button>
                          </nuxt-link>
                          <b-button pill type="submit" variant="outline-success" class="mr-2">
                            <save-icon size="1x" /> Save
                          </b-button>
                          <b-button pill type="reset" variant="outline-danger">
                            <refresh-ccw-icon size="1x" /> Reset
                          </b-button>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </form>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import FormDefaultLoader from '~/components/loading_states/FormDefaultLoader.vue'
export default {
  components: {
    FormDefaultLoader
  },
  data () {
    return {
      formStatus: 'NO_ACTION',
      collected_errors: [],
      // locations: [],
      services: [],
      form: { location: '', service: '', rate: '' },
      submitted: { status: 'NO_ACTIONS' },
    }
  },
  async created () {
    if (this.$route.params.service_id) {
      // Retrieve the data in edit mode
      await this.$store.dispatch('retrieveService', { id: this.$route.params.service_id })
      const retrieved = this.$store.getters.retrievedService
      // If retrieval is successfull, populate the form
      this.formStatus = retrieved.status
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res
        this.form = {
          location: data.location.id,
          service: data.service.id,
          rate: data.rate
        }
      }
    } else {
      this.formStatus = 'FULFILLED'
    }

    // Set location value
    const details = this.$store.getters.auth.assistant_details
    this.form.location = details.default_location

    // Locations
    /* await this.$store.dispatch('fetchLocations')
    const fetched = this.$store.getters.fetchedLocations
    // If retrieval is successfull, populate the form
    if (fetched.status === 'FULFILLED') {
      const locationData = fetched.res.results
      for (const index in locationData) {
        this.locations.push({ value: locationData[index].id, text: locationData[index].name })
      }
    } */

    // Services
    await this.$store.dispatch('fetchAssistantServices')
    const fetchedLocations = this.$store.getters.fetchedAssistantServices
    // If retrieval is successfull, populate the form
    if (fetchedLocations.status === 'FULFILLED') {
      const servicesData = fetchedLocations.res.results
      for (const index in servicesData) {
        this.services.push({ value: servicesData[index].id, text: servicesData[index].name })
      }
    }
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'id' in this.$route.params ? 'Update Service' : 'Add Service',
    }
  },
  methods: {
    // Handle form submission
    handleSubmit () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.form.provider = this.$route.params.provider_id
          // If id parameter is exisiting (update mode)
          if ('service_id' in this.$route.params) {
            await this.$store.dispatch('updateService', {
              id: this.$route.params.service_id,
              data: this.form,
            })
            this.submitted = this.$store.getters.updatedService
          } else {
            // Create record
            await this.$store.dispatch('createService', this.form)
            this.submitted = this.$store.getters.createdService
          }

          // Redirect to list if there's no form error(s)
          if (this.submitted.status === 'FULFILLED') {
            this.$swal({
              title: '',
              text: '',
              type: 'success'
            })
          } else {
            // Async Validation
            const response = this.submitted.res
            this.collected_errors = response
            for (const key in response) {
              // Get fields with error and skip if field does not exists
              const field = this.$validator.fields.find({ name: key, scope: this.$options.scope })
              if (!field) { continue }

              // Show errors for each field
              for (const index in response[key]) {
                this.$validator.errors.add({
                  id: field.id,
                  field: key,
                  msg: response[key][index],
                  scope: this.$options.scope,
                })
                field.setFlags({
                  invalid: true,
                  valid: false,
                  validated: true,
                })
              }
            }
          }
        }
      })
    }
  }
}
</script>
