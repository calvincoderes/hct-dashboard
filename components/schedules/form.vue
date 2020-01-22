<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12" class="pt-3 pr-5">
      <b-card
        footer-tag="footer"
      >
        <b-row>
          <b-col cols="12" xs="12">
            <h3 v-if="$route.params.schedule_id">
              Update Schedule
            </h3>
            <h3 v-else>
              Add Schedule
            </h3>
            <form
              method="post"
              class="mt-4"
              @submit.prevent="handleSubmit"
            >
              <!-- FAILED REQUEST HANDLER -->
              <b-row v-if="submitted.status === 'REJECTED'">
                <b-col xs="12">
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
                <!-- <b-col cols="12" xl="12" lg="12">
                  <b-form-group label="Location">
                    <b-form-select
                      v-model="form.location"
                      v-validate="{required: true}"
                      size="lg"
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
                <b-col cols="12" xl="12" lg="12">
                  <b-form-group label="Day">
                    <b-form-select
                      v-model="form.day"
                      v-validate="{required: true}"
                      size="lg"
                      name="day"
                      :options="days_list"
                    />
                    <div
                      v-for="(error, index) in errors.collect('day')"
                      :key="`day-${index}`"
                      class="errors"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <b-col cols="12" xl="12" lg="12">
                  <b-row>
                    <b-col xl="4" lg="4">
                      <b-form-group label="From">
                        <vue-timepicker v-model="from_time" style="height: 20px;" format="HH:mm:ss" />
                      </b-form-group>
                    </b-col>
                    <b-col xl="4" lg="4">
                      <b-form-group label="To">
                        <vue-timepicker v-model="to_time" style="height: 20px;" format="HH:mm:ss" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col xl="12" lg="12">
                  <hr>
                  <div slot="footer">
                    <b-row>
                      <b-col md="12">
                        <div class="form-inline float-right">
                          <nuxt-link :to="{path: '/service_providers/'+ $route.params.provider_id +'/schedules/', query: $route.query}" class="mr-2">
                            <b-button pill variant="outline-info" size="sm" right>
                              <chevrons-left-icon size="1x" /> Back to list
                            </b-button>
                          </nuxt-link>
                          <b-button type="submit" pill variant="outline-success" size="sm" class="mr-2">
                            <save-icon size="1x" /> Save
                          </b-button>
                          <b-button type="reset" pill variant="outline-danger" size="sm">
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
import VueTimepicker from 'vue2-timepicker'
import DaysMixin from '~/utils/mixins/days.js'
import 'vue2-timepicker/dist/VueTimepicker.css'
import FormDefaultLoader from '~/components/loading_states/FormDefaultLoader.vue'
export default {
  components: {
    VueTimepicker,
    FormDefaultLoader
  },
  mixins: [DaysMixin],
  data () {
    return {
      formStatus: 'NO_ACTION',
      collected_errors: [],
      // locations: [],
      from_time: { HH: '00', mm: '00', ss: '00' },
      to_time: { HH: '00', mm: '00', ss: '00' },
      form: { location: '', day: '', from_time: '', to_time: '' },
      submitted: { status: 'NO_ACTIONS' },
    }
  },
  async created () {
    if (this.$route.params.schedule_id) {
      // Retrieve the data in edit mode
      await this.$store.dispatch('retrieveSchedule', { id: this.$route.params.schedule_id })
      const retrieved = this.$store.getters.retrievedSchedule
      this.formStatus = retrieved.status
      // If retrieval is successfull, populate the form
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res
        const from = data.from_time.split(':')
        const to = data.to_time.split(':')

        this.from_time = { HH: from[0], mm: from[1], ss: from[2] }
        this.to_time = { HH: to[0], mm: to[1], ss: to[2] }

        this.form = {
          location: data.location.id,
          day: data.day,
          provider: data.provider.user.id
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
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'id' in this.$route.params ? 'Update Schedule' : 'Add Schedule',
    }
  },
  methods: {
    // Handle form submission
    handleSubmit () {
      this.$validator.validateAll().then(async (result) => {
        const from = this.from_time
        const to = this.to_time

        this.form.from_time = (from.HH + ':' + from.mm + ':' + from.ss)
        this.form.to_time = (to.HH + ':' + to.mm + ':' + to.ss)
        this.form.provider = this.$route.params.provider_id

        if (result) {
          // If id parameter is exisiting (update mode)
          if ('schedule_id' in this.$route.params) {
            await this.$store.dispatch('updateSchedule', {
              id: this.$route.params.schedule_id,
              data: this.form,
            })
            this.submitted = this.$store.getters.updatedSchedule
          } else {
            // Create record
            await this.$store.dispatch('createSchedule', this.form)
            this.submitted = this.$store.getters.createdSchedule
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
<style>
  .display-time > input[readonly] {
    background: var(--white);
  }
  .display-time {
    height: 35px !important;
  }
</style>
