<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12" class="pt-3 pr-5">
      <b-card
        footer-tag="footer"
      >
        <b-row>
          <b-col cols="12" xs="12">
            <h3 v-if="$route.params.leave_id">
              Update Leave
            </h3>
            <h3 v-else>
              Add Leave
            </h3>
            <form
              method="post"
              class="mt-4"
              @submit.prevent="handleSubmit"
            >
              <b-row v-if="formStatus === 'PENDING' || formStatus === 'NO_ACTION'">
                <b-col cols="12" xs="12">
                  <form-default-loader />
                </b-col>
              </b-row>
              <b-row v-if="formStatus === 'FULFILLED'">
                <b-col cols="12" xl="12" lg="12">
                  <b-form-group label="Reason">
                    <b-form-textarea
                      v-model="form.note"
                      :required="true"
                      placeholder="Enter Notes"
                      rows="4"
                      max-rows="6"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" xl="12" lg="12">
                  <b-form-group label="Date from">
                    <div>
                      <date-picker v-model="form.date_from" :format="formatDates(form.date_from)" input-class="form-control" />
                    </div>
                    <b-row v-if="submitted.status === 'REJECTED'">
                      <b-col v-if="collected_errors.date_from" xs="12" class="mt-2">
                        <b-alert variant="danger" show>
                          {{ collected_errors.date_from.join() }}
                        </b-alert>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-col>
                <b-col cols="12" xl="12" lg="12">
                  <b-form-group label="Date to">
                    <div>
                      <date-picker v-model="form.date_to" :format="formatDates(form.date_to)" input-class="form-control" />
                    </div>
                    <b-row v-if="submitted.status === 'REJECTED'">
                      <b-col v-if="collected_errors.date_to" xs="12" class="mt-2">
                        <b-alert variant="danger" show>
                          {{ collected_errors.date_to.join() }}
                        </b-alert>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-col>
                <b-col xl="12" lg="12">
                  <hr>
                  <div slot="footer">
                    <b-row>
                      <b-col md="12">
                        <div class="form-inline float-right">
                          <nuxt-link :to="{path: '/service_providers/'+ $route.params.provider_id +'/leaves/', query: $route.query}" class="mr-2">
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
import moment from 'moment'
import DaysMixin from '~/utils/mixins/days.js'
import FormDefaultLoader from '~/components/loading_states/FormDefaultLoader.vue'
export default {
  components: {
    FormDefaultLoader
  },
  mixins: [DaysMixin],
  data () {
    return {
      formStatus: 'NO_ACTION',
      collected_errors: [],
      form: { date_from: '', date_to: '', note: '' },
      submitted: { status: 'NO_ACTIONS' },
    }
  },
  async created () {
    if (this.$route.params.leave_id) {
      // Retrieve the data in edit mode
      await this.$store.dispatch('retrieveLeave', { id: this.$route.params.leave_id })
      const retrieved = this.$store.getters.retrievedLeave
      this.formStatus = retrieved.status
      // If retrieval is successfull, populate the form
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res

        this.form = {
          date_from: data.date_from,
          date_to: data.date_to,
          note: data.note
        }
      }
    } else {
      this.formStatus = 'FULFILLED'
    }
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'id' in this.$route.params ? 'Update Leave' : 'Add Leave',
    }
  },
  methods: {
    formatDates (date) {
      if (date === null || date === '') {
        return null
      }
      return moment(date).format('YYYY-MM-DD')
    },
    // Handle form submission
    handleSubmit () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.form.provider = this.$route.params.provider_id
          this.form.date_from = this.formatDates(this.form.date_from)
          this.form.date_to = this.formatDates(this.form.date_to)

          // If id parameter is exisiting (update mode)
          if ('leave_id' in this.$route.params) {
            await this.$store.dispatch('updateLeave', {
              id: this.$route.params.leave_id,
              data: this.form,
            })
            this.submitted = this.$store.getters.updatedLeave
          } else {
            // Create record
            await this.$store.dispatch('createLeave', this.form)
            this.submitted = this.$store.getters.createdLeave
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
