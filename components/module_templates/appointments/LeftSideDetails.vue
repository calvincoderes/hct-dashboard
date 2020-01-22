<template>
  <div id="component-wrapper">
    <!-- <b-col xl="12" lg="12">
      <b-button variant="outline-info" size="lg" class="text-left" @click="$router.go(-1)">
        <arrow-left-icon size="1.5x" class="custom-class" />
      </b-button>
    </b-col> -->

    <b-col xl="12" lg="12">
      <b-row>
        <b-col xl="3" lg="3" class="headline-basic bold black-grey mt-1">
          DETAILS
        </b-col>
        <b-col xl="9" lg="9">
          <hr>
        </b-col>
      </b-row>
    </b-col>
    <b-col xl="12" lg="12" class="label-headline bold">
      {{ appointment.location.name }}
    </b-col>
    <b-col xl="12" lg="12" class="mt-3">
      <b-row>
        <b-col cols="1" xl="1" lg="1" class="small-11">
          <map-pin-icon size="1.5x" class="custom-class" />
        </b-col>
        <b-col xl="10" lg="10" class="small-gb-11 pl-2 text-wrap">
          <template v-if="appointment.service_type === 'home'">
            {{ appointment.complete_address }}
          </template>
          <template v-else>
            {{ `${appointment.location.address_1 || ''} ${appointment.location.address_2 || ''} ${appointment.location.city_name || ''} ${appointment.location.zone_name || ''}, ${appointment.location.country_name || ''}` }}
          </template>
        </b-col>
      </b-row>
    </b-col>
    <b-col xl="12" lg="12" class="mt-2">
      <b-row>
        <b-col cols="1" xl="1" lg="1" class="small-11">
          <plus-square-icon size="1.5x" />
        </b-col>
        <b-col xl="10" lg="10" class="small-gb-11 pl-2">
          {{ appointment.service_name }}
        </b-col>
      </b-row>
    </b-col>
    <b-col xl="12" lg="12" class="mt-2">
      <b-row>
        <b-col cols="1" xl="1" lg="1" class="small-11">
          <clock-icon size="1.5x" />
        </b-col>
        <b-col xl="10" lg="10" class="small-gb-11 pl-2">
          {{ appointment.time_from | prettyTime }} to {{ appointment.time_to | prettyTime }}
        </b-col>
      </b-row>
    </b-col>
    <b-col xl="12" lg="12" class="mt-2">
      <b-row>
        <b-col cols="1" xl="1" lg="1" class="small-11">
          <flag-icon size="1.5x" />
        </b-col>
        <b-col xl="10" lg="10" class="small-gb-11 pl-2 text-uppercase">
          {{ appointment.status }}
        </b-col>
      </b-row>
    </b-col>
    <b-col xl="12" lg="12" class="mt-5">
      <b-row>
        <b-col xl="6" lg="6">
          <b-row>
            <b-col xl="12" lg="12" class="headline-basic black-40">
              Service Fee
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="12" lg="12" class="headline-basic-07-lt-space bold">
              ₱ {{ appointment.rate | toFixed }}
            </b-col>
          </b-row>
        </b-col>
        <!-- <b-col xl="6" lg="6">
          <b-button id="outline-primary-radius-type" variant="outline-primary" size="md" block>
            Settle Payment
          </b-button>
        </b-col> -->
      </b-row>
    </b-col>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  filters: {
    toFixed (value) {
      const number = Number(value)
      if (!isNaN(number)) {
        return number.toFixed(2)
      }
      return '0.00'
    },
    prettyTime (value) {
      if (value) {
        return moment(value, 'HH:mm:ss').format('h:mm A')
      }
      return ''
    },
  },
  props: {
    appointment: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
