<template>
  <b-card class="appointment-form p-2">
    <div class="label-headline bold mt-4 mb-5 text-center">
      Appointment
    </div>
    <b-row>
      <b-col xs="12">
        <b-tabs align="center">
          <b-tab title="EXISTING PATIENT" active>
            <div class="p-3 walkin-patient-wrapper">
              <existing-patient
                @popup-toggle="onPopUpToggle"
                @provider-selected="onProviderSelected"
              />
            </div>
          </b-tab>
          <b-tab title="NEW PATIENT">
            <div class="p-3 walkin-patient-wrapper">
              <new-patient
                @popup-toggle="onPopUpToggle"
                @provider-selected="onProviderSelected"
              />
            </div>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import $ from 'jquery'
import ExistingPatient from '~/components/appointments/ExistingPatient.vue'
import NewPatient from '~/components/appointments/NewPatient.vue'

export default {
  components: {
    ExistingPatient,
    NewPatient
  },
  props: {
    popUp: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      modal: { okOnly: false, title: '', content: '' },
    }
  },
  mounted () {
    $(document).click((event) => {
      if (this.popUp &&
          !$(event.target).closest('.appointment-form').length &&
          !$(event.target).closest('.btn-appointment-form').length &&
          !$(event.target).closest('.swal2-container').length
      ) {
        this.$emit('popup-toggle', false)
      }
    })
  },
  methods: {
    // Pop-up patient queue toggle
    onPopUpToggle (value) {
      this.$emit('popup-toggle', value)
    },
    // Provider Selected
    onProviderSelected (value) {
      this.$emit('provider-selected', value)
    }
  }
}
</script>
