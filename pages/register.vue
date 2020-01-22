<template>
  <div class="registration-form">
    <div v-if="step === 1">
      <form
        method="post"
        @submit.prevent="registerAccount"
      >
        <b-col xl="12" lg="12">
          <b-row class="headline bold">
            <b-col xl="12" lg="12" class="text-center">
              Register Account
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" offset-xl="4" offset-lg="4" class="mt-5 pl-0">
          <b-row>
            <b-col xl="2" lg="2">
              <div class="rectangle-box-active" />
            </b-col>
            <b-col xl="2" lg="2">
              <div class="rectangle-box" />
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" class="mt-4">
          <b-row class="mt-5">
            <b-col xl="6" lg="6">
              <b-form-group
                label="First Name"
              >
                <b-form-input
                  v-model="form.first_name"
                  v-validate="{required: true}"
                  name="first_name"
                  type="text"
                />
                <!-- Local Handler -->
                <div
                  v-for="(error, index) in errors.collect('first_name')"
                  :key="`first_name-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
              <!-- End Local Handler -->
              </b-form-group>
            </b-col>
            <b-col xl="6" lg="6">
              <b-form-group
                label="Last Name"
              >
                <b-form-input
                  v-model="form.last_name"
                  v-validate="{required: true}"
                  name="last_name"
                  type="text"
                />
                <!-- Local Handler -->
                <div
                  v-for="(error, index) in errors.collect('last_name')"
                  :key="`last_name-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End Local Handler -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col xl="12" lg="12">
              <b-form-group
                label="Mobile Number"
              >
                <VuePhoneNumberInput
                  v-model="form.mobileFormatted"
                  v-validate="{required: true}"
                  name="mobileFormatted"
                  :only-countries="['PH']"
                  default-country-code="PH"
                  clearable
                  @update="onUpdate"
                />
                <!-- Local Handler -->
                <div
                  v-for="(error, index) in errors.collect('mobileFormatted')"
                  :key="`mobileFormatted-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End Local Handler -->
                <!-- API Handler -->
                <div
                  v-for="(error, index) in collected_errors.mobile"
                  :key="`mobile-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End API Handler -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col xl="6" lg="6">
              <b-form-group
                label="Password"
              >
                <input
                  ref="password"
                  v-model="form.password"
                  v-validate="{required: true}"
                  name="password"
                  type="password"
                  class="form-control"
                />
                <!-- Local Handler -->
                <div
                  v-for="(error, index) in errors.collect('password')"
                  :key="`password-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
              <!-- End Local Handler -->
              </b-form-group>
            </b-col>
            <b-col xl="6" lg="6">
              <b-form-group
                label="Confirm Password"
              >
                <b-form-input
                  v-model="form.confirm_password"
                  v-validate="{required: true, confirmed:form.password}"
                  name="confirm_password"
                  type="password"
                />
                <!-- Local Handler -->
                <div
                  v-for="(error, index) in errors.collect('confirm_password')"
                  :key="`confirm_password-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End Local Handler -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col xl="4" lg="4" offset-xl="1" offset-lg="1" class="pl-0">
              <nuxt-link to="/login/">
                <b-button variant="info" size="lg" block>
                  Back to Login
                </b-button>
              </nuxt-link>
            </b-col>
            <b-col xl="4" lg="4" offset-xl="2" offset-lg="2" class="pl-0">
              <b-button type="submit" variant="primary" size="lg" block :disabled="is_disabled">
                Next
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </form>
    </div>
    <div v-if="step === 2">
      <form
        method="post"
        @submit.prevent="verificationOTP"
      >
        <b-col xl="12" lg="12">
          <b-row class="headline bold">
            <b-col xl="12" lg="12" class="text-center">
              Register account
            </b-col>
          </b-row>
          <b-row class="headline-basic black text-center mt-3">
            We sent a One - Time Password (OTP Pin) to your mobile phone. To proceed, please verify your account by typing your received OTP.
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" offset-xl="4" offset-lg="4" class="mt-5 pl-0">
          <b-row>
            <b-col xl="2" lg="2">
              <div class="rectangle-box-active" />
            </b-col>
            <b-col xl="2" lg="2">
              <div class="rectangle-box-active" />
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" class="mt-5">
          <b-row>
            <b-col xl="10" lg="10" offset-xl="1" offset-lg="1" class="pl-0">
              <b-form-group
                label="One Time Password"
                class="mt-5 mb-5"
              >
                <b-form-input
                  v-model="form.otp"
                  v-validate="{required: true}"
                  name="otp"
                  type="text"
                />
                <!-- Local Handler -->
                <div
                  v-for="(error, index) in errors.collect('otp')"
                  :key="`otp-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End Local Handler -->
                <!-- API Handler -->
                <div
                  v-for="(error, index) in collected_errors.otp"
                  :key="`otp-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End API Handler -->
              </b-form-group>
            </b-col>
            <b-col xl="4" lg="4" offset-xl="2" offset-lg="2" class="pl-0">
              <b-button variant="info" size="lg" block :disabled="is_disabled" @click="resendRequestOTP">
                Resend SMS
              </b-button>
            </b-col>
            <b-col xl="4" lg="4" class="pl-0">
              <b-button type="submit" variant="primary" size="lg" block :disabled="is_disabled">
                Continue
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </form>
    </div>
  </div>
</template>
<script>

import VuePhoneNumberInput from 'vue-phone-number-input'
import { Validator } from 'vee-validate'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

const dict = {
  custom: {
    first_name: {
      required: 'First Name is required'
    },
    last_name: {
      required: 'Last Name is required'
    },
    mobileFormatted: {
      required: 'Mobile Number is required'
    },
    password: {
      required: 'Password is required'
    },
    confirm_password: {
      required: 'Confirm Password is required',
      confirmed: 'Password confirmation does not match.'
    },
  }
}

Validator.localize('en', dict)
export default {
  middleware: ['unauthenticated'],
  layout: 'register',
  components: {
    VuePhoneNumberInput
  },
  data () {
    return {
      step: 1,
      is_disabled: false,
      form: {
        first_name: '',
        last_name: '',
        mobile: '',
        mobileFormatted: '',
        password: '',
        confirm_password: '',
        otp: ''
      },
      collected_errors: []
    }
  },
  methods: {
    onUpdate (payload) {
      this.form.mobile = payload.formattedNumber
    },
    registerAccount () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.form.username = this.form.mobile
          this.is_disabled = true
          await this.$store.dispatch('createRegister', this.form)
          this.submitted = this.$store.getters.createdRegister
          this.is_disabled = false

          // Redirect to list if there's no form error(s)
          if (this.submitted.status === 'FULFILLED') {
            this.step++
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
    },
    resendRequestOTP () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.is_disabled = true
          await this.$store.dispatch('createRequestOTP', this.form)
          this.submitted = this.$store.getters.createdRequestOTP
          this.is_disabled = false

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
    },
    verificationOTP () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.is_disabled = true
          await this.$store.dispatch('createActivate', this.form)
          this.submitted = this.$store.getters.createdActivate
          this.is_disabled = false

          // Redirect to list if there's no form error(s)
          if (this.submitted.status === 'FULFILLED') {
            this.$swal({
              title: '',
              text: '',
              type: 'success',
            }).then(() => this.$router.push({ path: '/login/' }))
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
    .rectangle-box-active {
        width: 56px;
        height: 8px;
        border-radius: 2px;
        background-color: var(--mid-blue);
    }
    .rectangle-box {
        width: 56px;
        height: 8px;
        border-radius: 2px;
        background-color: var(--very-light-pink);
    }
</style>
