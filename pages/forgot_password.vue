<template>
  <div class="forgot-password-form">
    <div v-if="step === 1">
      <form
        method="post"
        @submit.prevent="requestOTP"
      >
        <b-col xl="12" lg="12">
          <b-row class="headline bold">
            <b-col xl="12" lg="12" class="text-center">
              Forgot Password
            </b-col>
          </b-row>
          <b-row class="headline-basic black text-center">
            Please enter your mobile number so we can help you with your password
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" offset-xl="3" offset-lg="3" class="mt-5 pl-0">
          <b-row>
            <b-col xl="2" lg="2">
              <div class="rectangle-box-active" />
            </b-col>
            <b-col xl="2" lg="2">
              <div class="rectangle-box" />
            </b-col>
            <b-col xl="2" lg="2">
              <div class="rectangle-box" />
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" class="mt-5">
          <b-row>
            <b-col xl="10" lg="10" offset-xl="1" offset-lg="1" class="pl-0">
              <b-form-group
                label="Mobile Number"
                class="mt-5 mb-5"
              >
                <VuePhoneNumberInput
                  v-model="form.mobileFormatted"
                  v-validate="{required: true}"
                  name="mobileFormatted"
                  :only-countries="['PH']"
                  :error="hasErrorActive"
                  default-country-code="PH"
                  clearable
                  @update="onUpdate"
                />
                <!-- Local Handler -->
                <div v-if="mobile_errors" class="errors">
                  {{ mobile_errors }}
                </div>
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
                  v-for="(error, index) in collected_errors.details"
                  :key="`mobile-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End API Handler -->
              </b-form-group>
            </b-col>
            <b-col xl="4" lg="4" offset-xl="1" offset-lg="1" class="pl-0">
              <nuxt-link to="/login/">
                <b-button variant="info" size="lg" block>
                  Back to Login
                </b-button>
              </nuxt-link>
            </b-col>
            <b-col xl="4" lg="4" offset-xl="2" offset-lg="2" class="pl-0">
              <b-button type="submit" variant="primary" size="lg" block :disabled="is_disabled">
                Reset Password
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
              Forgot Password
            </b-col>
          </b-row>
          <b-row class="headline-basic black text-center mt-3">
            We sent a One - Time Password (OTP Pin) to your email. To proceed, please verify your account by typing your received OTP.
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" offset-xl="3" offset-lg="3" class="mt-5 pl-0">
          <b-row>
            <b-col xl="2" lg="2">
              <div class="rectangle-box-active" />
            </b-col>
            <b-col xl="2" lg="2">
              <div class="rectangle-box-active" />
            </b-col>
            <b-col xl="2" lg="2">
              <div class="rectangle-box" />
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
    <div v-if="step === 3">
      <form
        method="post"
        @submit.prevent="forgotPassword"
      >
        <b-col xl="12" lg="12">
          <b-row class="headline bold">
            <b-col xl="12" lg="12" class="text-center">
              Forgot Password
            </b-col>
          </b-row>
          <b-row class="headline-basic black text-center mt-3">
            We sent a One - Time Password (OTP Pin) to your mobile phone. To proceed, please verify your account by typing your received OTP.
          </b-row>
        </b-col>
        <b-col xl="12" lg="12" offset-xl="3" offset-lg="3" class="mt-5 pl-0">
          <b-row>
            <b-col xl="2" lg="2">
              <div class="rectangle-box-active" />
            </b-col>
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
                label="Password"
                class="mt-5 mb-5"
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
                <!-- API Handler -->
                <div
                  v-for="(error, index) in collected_errors.password"
                  :key="`password-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End API Handler -->
              </b-form-group>
              <b-form-group
                label="Confirm Password"
                class="mt-5 mb-5"
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
                <!-- API Handler -->
                <div
                  v-for="(error, index) in collected_errors.confirm_password"
                  :key="`confirm_password-${index}`"
                  class="errors"
                >
                  {{ error }}
                </div>
                <!-- End API Handler -->
              </b-form-group>
            </b-col>
            <b-col xl="8" lg="8" offset-xl="2" offset-lg="2" class="pl-0">
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
  layout: 'forgot_password',
  components: {
    VuePhoneNumberInput
  },
  data () {
    return {
      mobile_errors: '',
      hasErrorActive: false,
      step: 1,
      is_disabled: true,
      form: {
        mobile: '',
        mobileFormatted: '',
        purpose: 'reset_password',
        otp: '',
        password: '',
        confirm_password: ''
      },
      submitted: { status: 'NO_ACTIONS' },
      collected_errors: []
    }
  },
  methods: {
    onUpdate (payload) {
      // Mobile Number Handler
      this.mobile_errors = ''
      if (payload.isValid) {
        this.hasErrorActive = false
        this.is_disabled = false
      } else {
        this.is_disabled = true
        if (payload.phoneNumber !== null) {
          this.mobile_errors = 'Invalid Mobile Number'
          this.hasErrorActive = true
        }
      }

      this.form.mobile = payload.formattedNumber
    },
    requestOTP () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.is_disabled = true
          await this.$store.dispatch('createRequestOTP', this.form)
          this.submitted = this.$store.getters.createdRequestOTP
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
              type: 'success',
              showCancelButton: true,
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
          await this.$store.dispatch('createVerifyOTP', this.form)
          this.submitted = this.$store.getters.createdVerifyOTP
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
    forgotPassword () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.is_disabled = true
          await this.$store.dispatch('createForgotPassword', this.form)
          this.submitted = this.$store.getters.createdForgotPassword
          this.is_disabled = false

          // Redirect to list if there's no form error(s)
          if (this.submitted.status === 'FULFILLED') {
            this.$swal({
              title: '',
              text: 'Password has been successfully updated!',
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
