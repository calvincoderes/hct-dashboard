<template>
  <b-row v-if="Object.keys(provider).length">
    <b-col cols="12">
      <div
        class="current-appointment"
        :class="typeof provider.in_clinic !== 'undefined' && provider.in_clinic === false ? 'over' : ''"
      >
        <div v-if="current.status === 'FULFILLED' && current.res" :id="`popover-${current.res.id}`">
          <b-popover :target="`popover-${current.res.id}`" triggers="hover" placement="top">
            <div>
              <nuxt-link :to="`/history/${current.res.id}`">
                View Appointment
              </nuxt-link>
            </div>
          </b-popover>
          <div class="on-going">
            APPOINTMENT ONGOING #{{ current.res.id }}
          </div>
          <b-row>
            <b-col cols="12">
              <div class="label-headline bold px-4 pt-3">
                {{ current.res.patient_name }}
              </div>
              <div class="logo-sub px-4 pt-1">
                {{ current.res.service_name }}
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col cols="5">
              <div class="normal px-4 pt-3">
                Time Started:
              </div>
              <div class="normal semi-bold px-4 pt-1">
                {{ current.res.session_started | prettyTime }}
              </div>
            </b-col>
            <b-col cols="7">
              <div class="mt-4 px-4">
                <b-button
                  block
                  class="revert"
                  variant="outline-primary"
                  @click="handleCloseAppointment(current.res.id)"
                >
                  <x-icon size="1x" /> Close Session
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
        <div v-else-if="location && typeof provider.in_clinic !== 'undefined' && provider.in_clinic === false">
          <b-row>
            <b-col cols="12">
              <div class="p-4">
                <div class="text-center normal mt-5 mb-3">
                  <strong>DOCTOR NOT IN CLINIC</strong>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <div v-else>
          <b-row>
            <b-col cols="12">
              <div class="p-4">
                <div class="text-center normal mt-4 mb-3">
                  CURRENTLY VACANT
                </div>
                <div class="text-center">
                  <b-button
                    pill
                    size="md"
                    class="revert"
                    variant="primary"
                    @click="callNextPatient(provider)"
                  >
                    Call next patient
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import moment from 'moment'

const endpoint = process.env.REST_API_ENDPOINT

export default {
  filters: {
    prettyTime (value) {
      if (value) {
        return moment(value).format('HH:mm A')
      }
      return ''
    }
  },
  props: {
    provider: {
      type: Object,
      default: () => {}
    },
    location: {
      type: Number,
      default: 0
    },
    refresh: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      current: { status: 'NO_ACTION', res: '' },
    }
  },
  watch: {
    refresh (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchCurrentAppointment()
      }
    }
  },
  mounted () {
    this.fetchCurrentAppointment()
  },
  methods: {
    fetchCurrentAppointment () {
      this.current = { status: 'PENDING', res: '' }
      this.$axios.get(`${endpoint}/assistant/providers/${this.provider.provider_id}/current_appointment/`)
        .then((response) => {
          this.current = {
            status: 'FULFILLED',
            res: response.data
          }
        })
        .catch((e) => {
          this.current = { status: 'REJECTED', res: '' }
          this.errorHandler(e)
        })
    },
    handleCloseAppointment (id) {
      this.$swal({
        title: 'Confirmation',
        text: 'Are you sure to close this session?',
        type: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.$axios.put(`${endpoint}/assistant/appointments/${id}/close_appointment/`)
            .then((response) => {
              this.$emit('refresh-provider-appointments', true)
              this.current = { status: 'NO_ACTION', res: '' }
            })
            .catch((e) => { this.errorHandler(e) })
        }
      })
    },
    callNextPatient (provider) {
      this.$swal({
        title: 'Notify Next Patient?',
        text: 'Are you sure to notify next patient?',
        type: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.$axios.get(`${endpoint}/assistant/providers/${provider.provider_id}/next_appointments/`)
            .then((response) => {
              this.$swal({ title: 'Status', text: response.data.details[0], type: 'info' })
            })
            .catch((e) => { this.errorHandler(e) })
        }
      })
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

<style lang="scss" scoped>
.over {
  background: #e4e1e1;
}
</style>
