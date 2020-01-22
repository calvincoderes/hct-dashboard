<template>
  <form
    method="post"
    @submit.prevent="handleSubmit"
  >
    <!-- FAILED REQUEST HANDLER -->
    <b-row>
      <b-col cols="12" class="mb-2">
        <input
          v-model="errorHandler"
          v-validate="{required: true}"
          type="hidden"
          name="errorHandler"
        />
        <div
          v-for="(error, index) in errors.collect('errorHandler')"
          :key="`errorHandler-${index}`"
          class="errors"
        >
          {{ error }}
        </div>
      </b-col>
    </b-row><!-- FAILED REQUEST HANDLER -->

    <!-- 1. Search Patient -->
    <b-form-group label="Search Patient *">
      <v-select
        v-model="form.patient"
        v-validate="{required: true}"
        name="patient"
        :filterable="false"
        :options="patients"
        @search="handleSearchPatient"
      >
        <template slot="no-options">
          No Result
        </template>
        <template slot="option" slot-scope="option">
          <b-img
            rounded="circle"
            class="mr-1"
            :width="24"
            :height="24"
            :src="option.user.image_url || imagePlaceholder"
            alt=""
          />
          {{ option.user.full_name }}
        </template>
        <template slot="selected-option" slot-scope="option">
          <b-img
            rounded="circle"
            class="mr-1"
            :width="24"
            :height="24"
            :src="option.user.image_url || imagePlaceholder"
            alt=""
          />
          {{ option.user.full_name }}
        </template>
      </v-select>
      <div
        v-for="(error, index) in errors.collect('patient')"
        :key="`patient-${index}`"
        class="errors"
      >
        {{ error }}
      </div>
    </b-form-group><!-- 1. Search Patient -->

    <!-- 2. Appointment Type -->
    <b-form-group v-if="typeof form.patient === 'object'" label="Select Appointment Type *">
      <b-form-select
        v-model="form.appointment_type"
        v-validate="{required: true}"
        name="appointment_type"
        :options="appointmentTypes"
        @change="handleAppointmentType"
      />
      <div
        v-for="(error, index) in errors.collect('appointment_type')"
        :key="`appointment_type-${index}`"
        class="errors"
      >
        {{ error }}
      </div>
    </b-form-group><!-- 2. Appointment Type -->

    <!-- 3. Provider -->
    <b-form-group v-if="form.appointment_type" label="Select Doctor *">
      <v-select
        v-model="form.provider"
        v-validate="{required: true}"
        name="provider"
        :options="providers"
        @input="handleProviderChange"
      />

      <div
        v-for="(error, index) in errors.collect('provider')"
        :key="`name-${index}`"
        class="errors"
      >
        {{ error }}
      </div>
    </b-form-group><!-- 3. Provider -->

    <!-- 4. Date and Time -->
    <b-form-group v-if="form.appointment_type === 'manual'" label="Choose Date and Time">
      <input
        v-model="form.datetime"
        v-validate="{required: true}"
        type="hidden"
        name="datetime"
      />
      <vue-ctk-date-time-picker
        v-model="form.datetime"
        format="YYYY-MM-DD HH:mm"
        color="#8f3d86"
        :enabled-dates="enabledDates"
        :min-date="minDate"
        :max-date="maxDate"
        :no-button-now="true"
        :no-label="true"
        :right="true"
      />
      <div
        v-for="(error, index) in errors.collect('datetime')"
        :key="`name-${index}`"
        class="errors"
      >
        {{ error }}
      </div>
    </b-form-group><!-- 4. Date and Time -->

    <!-- 5 Services -->
    <b-form-group v-if="form.provider" label="Select Service *">
      <b-form-select
        v-model="form.service"
        v-validate="{required: true}"
        name="service"
        :options="services"
        @change="handleServiceChange"
      />
      <div
        v-for="(error, index) in errors.collect('service')"
        :key="`service-${index}`"
        class="errors"
      >
        {{ error }}
      </div>
    </b-form-group><!-- 5, Services -->

    <!-- 6. Locations -->
    <b-form-group v-if="form.service" label="Select Location *">
      <b-form-select
        v-model="form.location"
        v-validate="{required: true}"
        name="location"
        :options="locations"
        @change="handleLocationChange"
      />
      <div
        v-for="(error, index) in errors.collect('location')"
        :key="`location-${index}`"
        class="errors"
      >
        {{ error }}
      </div>
    </b-form-group><!-- 6. Locations -->

    <!-- 7. Complete Address -->
    <template v-if="form.location && form.datetime">
      <b-form-group v-if="form.location.service_type === 'home'" label="Enter Patient's Appointment Address *">
        <b-form-textarea
          v-model="form.completedAddress"
          v-validate="{required: true}"
          placeholder="Complete Address"
          name="completedAddress"
          rows="3"
          max-rows="6"
        />
        <div
          v-for="(error, index) in errors.collect('completedAddress')"
          :key="`completedAddress-${index}`"
          class="errors"
        >
          {{ error }}
        </div>
      </b-form-group>
    </template><!-- 7. Complete Address -->

    <!-- Form Footer -->
    <div slot="footer">
      <b-row>
        <b-col md="12" class="mt-3">
          <div class="form-inline">
            <b-button
              type="submit"
              variant="outline-primary"
              size="lg"
              block
              class="mr-2"
            >
              <save-icon size="1x" /> Save
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div><!-- Form Footer -->
  </form>
</template>

<script>
import { Validator } from 'vee-validate'
import BookingMixin from '~/utils/mixins/booking.js'

Validator.localize('en', {
  custom: {
    patient: { required: 'Patient is required' },
    location: { required: 'Location is required' },
    service: { required: 'Service is required' },
    provider: { required: 'Provider is required' },
    datetime: { required: 'Date and Time is required' },
    completedAddress: { required: 'Complete Address is required' }
  }
})

export default {
  mixins: [BookingMixin],
  data () {
    return {
      form: {
        patient: '',
        service: null,
        provider: null,
        location: null,
        datetime: '',
        completedAddress: '',
      },
      submitted: { status: 'NO_ACTIONS' },
      avatarMainProps: { blank: true, blankColor: '#777', width: 24, height: 24 },
      errorHandler: true,
    }
  },
  methods: {
    // Handle form submission
    handleSubmit () {
      this.errorHandler = true
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const form = {}
          if (typeof this.form.patient !== 'object') {
            const field = this.$validator.fields.find({ name: 'patient', scope: this.$options.scope })
            this.flagError(field, 'patient', 'Record does not exists')
          } else {
            const datetime = this.form.datetime
            const parts = datetime.split(' ')

            Object.assign(form, {
              user: this.form.patient.user.id,
              provider: this.form.provider.id,
              service: this.form.service,
              location: this.form.location.id,
              date: parts[0],
              time: parts[1],
              appointment_type: this.form.appointment_type,
            })
            if (this.form.completedAddress) {
              Object.assign(form, {
                complete_address: this.form.completedAddress
              })
            }
          }
          await this.$store.dispatch('createWalkInAppointment', form)
          this.submitted = this.$store.getters.createdWalkInAppointment

          // Redirect to list if there's no form error(s)
          if (this.submitted.status === 'FULFILLED') {
            this.$swal({
              title: 'Success',
              text: 'Walk-in appointment has been successfully updated!',
              type: 'success',
            })
            this.$emit('popup-toggle', false)
            this.$emit('provider-selected', this.form.provider)
          } else {
            // Async Validation
            const response = this.submitted.res
            for (const key in response) {
              // Get fields with error and skip if field does not exists
              const field = this.$validator.fields.find({ name: key, scope: this.$options.scope })
              if (!field) {
                // Catch the error and pass it to provider
                const errorHandlerField = this.$validator.fields.find({ name: 'errorHandler', scope: this.$options.scope })

                // Show errors for each field
                for (const index in response[key]) {
                  if (index === 'username') {
                    continue
                  }
                  const errorMessage = Array.isArray(response[key][index]) ? response[key][index].join(', ') : response[key][index]
                  this.flagError(errorHandlerField, 'errorHandler', errorMessage)
                }
                continue
              }

              // Show errors for each field
              for (const index in response[key]) {
                const errorMessage = Array.isArray(response[key][index]) ? response[key][index].join(', ') : response[key][index]
                this.flagError(field, key, errorMessage)
              }
            }
          }
        }
      })
    },
  }
}
</script>
