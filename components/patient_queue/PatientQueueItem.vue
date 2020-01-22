<template>
  <b-row v-if="Object.keys(result).length">
    <b-col cols="3">
      <template v-if="result.in_clinic">
        <fa
          v-if="result.pinned"
          v-b-tooltip.hover
          title="Un-pin"
          :icon="['fas', 'bookmark']"
          @click="handleSortOrder(result, false)"
        />
        <bookmark-icon
          v-else
          v-b-tooltip.hover
          title="Pin"
          size="1.25x"
          @click="handleSortOrder(result, true)"
        />
      </template>
      <div class="small">
        <div v-if="result.appointment_type === 'online'">
          <b-badge pill variant="primary">
            <globe-icon size="1x" /> ONLINE
          </b-badge>
        </div>
        <div v-else-if="result.appointment_type === 'manual'">
          <b-badge pill variant="info">
            <edit-icon size="1x" /> MANUAL
          </b-badge>
        </div>
        <div v-else>
          <b-badge pill variant="success">
            <book-icon size="1x" /> WALK-IN
          </b-badge>
        </div>
      </div>
      <div class="headline-4">
        {{ result.in_clinic ? sort : '-' }}
      </div>
      <div :id="`popover-${result.id}`" class="result-more-action">
        <more-horizontal-icon size="1x" />
      </div>
      <b-popover :target="`popover-${result.id}`" triggers="hover" placement="right">
        <nuxt-link :to="`/history/${result.id}`">
          <b-btn
            pill
            variant="outline-success"
            size="sm"
            block
            class="mb-2"
          >
            <search-icon size="1x" /> View Appointment
          </b-btn>
        </nuxt-link>
        <b-btn
          pill
          variant="outline-danger"
          size="sm"
          block
          @click="handleCancelAppointment(result.id)"
        >
          <x-circle-icon size="1x" /> Cancel Appointment
        </b-btn>
      </b-popover>
    </b-col>
    <b-col cols="9">
      <div class="patient-queue-details">
        <div v-b-tooltip.hover :title="result.patient_name" class="headline-5 ellipsis mb-1">
          {{ result.patient_name }}
        </div>
        <b-row class="mb-3">
          <b-col cols="9">
            <div :class="`service-type-${result.location.service_type}`">
              {{ result.location.service_type }}
            </div>
            <span class="small-gb-11">
              {{ result.service_name || '-' }}
            </span>
          </b-col>
          <b-col cols="3">
            <b-form-checkbox
              v-if="result.appointment_type === 'online' || result.appointment_type === 'manual'"
              v-model="inClinic"
              v-b-tooltip.hover
              title="In-Clinic"
              class="float-right"
              switch
              button-variant="success"
              :checked="result.in_clinic"
              @change="handleInClinic($event, result.id)"
            />
            <b-form-checkbox
              v-else
              v-b-tooltip.hover
              title="In-Clinic"
              class="float-right"
              switch
              disabled
              :checked="true"
            />
          </b-col>
        </b-row>
        <b-row v-if="prioritization === 'time'" class="mb-1">
          <b-col cols="12">
            <clock-icon size="1x" />
            <span class="small-gb-11">
              {{ result.time_from | prettyTime }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col cols="12">
            <div v-if="result.service_type === 'home'" class="patient-queue-row-details small-gb-11">
              <map-pin-icon size="1x" />
              {{ result.complete_address }}
            </div>
            <div v-else class="patient-queue-row-details small-gb-11">
              <map-pin-icon size="1x" />
              {{ `${result.location.address_1 || ''} ${result.location.address_2 || ''} ${result.location.city_name || ''} ${result.location.zone_name || ''}, ${result.location.country_name || ''}` }}
            </div>
          </b-col>
        </b-row>
        <b-row v-if="result.note" class="mb-1">
          <b-col cols="12">
            <div class="patient-queue-row-details small-gb-11">
              <message-square-icon size="1x" />
              {{ result.note }}
            </div>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'

const endpoint = process.env.REST_API_ENDPOINT

export default {
  filters: {
    prettyTime (value) {
      if (value) {
        return moment(value, 'HH:mm:ss').format('h:mm A')
      }
      return ''
    }
  },
  props: {
    result: {
      type: Object,
      default: () => {}
    },
    prioritization: {
      type: String,
      default: ''
    },
    sort: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      inClinic: false
    }
  },
  mounted () {
    this.inClinic = this.result.in_clinic
  },
  methods: {
    handleSortOrder (value, pin) {
      const ids = []
      let firstIds = []
      $(`.patient-queue-item-${this.result.provider}`).each((index, row) => {
        const id = Number($(row).data('id'))
        ids.push(id)
        if (id === value.id) {
          firstIds = [...ids]
        }
      })
      setTimeout(() => {
        if (pin) {
          const lastIds = _.xor(ids, firstIds)
          this.$axios.put(`${endpoint}/assistant/appointments/sort_order_bulk/`, {
            ids: firstIds.join(','),
            last_ids: lastIds.join(','),
            pin_last_id: pin,
          }).then((response) => {
            this.$emit('refresh-provider-appointments', true)
          }).catch((e) => { this.errorHandler(e) })
        } else {
          this.$axios.put(`${endpoint}/assistant/appointments/${value.id}/pin/`, {
            pinned: false
          }).then((response) => {
            this.$emit('refresh-provider-appointments', true)
          }).catch((e) => { this.errorHandler(e) })
        }
      }, 100)
    },
    handleInClinic (checked, id) {
      this.$axios.put(`${endpoint}/assistant/appointments/${id}/in_clinic/`, {
        in_clinic: checked
      }).then((response) => {
        this.$emit('refresh-provider-appointments', true)
      }).catch((e) => {
        this.errorHandler(e)
        this.inClinic = false
      })
    },
    handleCancelAppointment (id) {
      // const dismiss = false
      this.$swal({
        title: 'Appointment Cancellation',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        text: 'What\'s the reason?',
        type: 'warning',
        showCancelButton: true,
      })
        .then((result) => {
          if (result.value) {
            this.$axios.put(`${endpoint}/assistant/appointments/${id}/cancel/`, { note: result.value })
              .then((response) => {
                this.$emit('refresh-provider-appointments', true)
                this.$swal({ title: 'Success', text: 'Appointment has been successfully cancelled', type: 'success' })
              })
              .catch((e) => {
                this.errorHandler(e)
              })
          } else if (typeof result.dismiss === 'undefined') {
            this.$swal({ title: 'Error', text: 'Note is required', type: 'error' })
              .then(() => {
                this.handleCancelAppointment(id)
              })
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
