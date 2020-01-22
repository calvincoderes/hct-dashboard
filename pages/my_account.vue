<template>
  <div class="my-account-form">
    <form
      method="post"
      @submit.prevent="handleSubmit"
    >
      <b-col xl="12" lg="12">
        <b-row class="headline bold">
          <b-col xl="12" lg="12" class="text-center">
            My Account
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="formStatus === 'NO_ACTION' || formStatus === 'PENDING'" xl="12" lg="12" class="mt-4">
        <b-row class="mt-4">
          <b-col cols="12" xl="12" lg="12">
            <profile-field-loader />
            <default-loader />
            <default-loader />
            <default-loader />
            <default-loader />
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="formStatus === 'FULFILLED'" xl="12" lg="12" class="mt-4">
        <b-row class="mt-5">
          <b-col cols="3" xl="3" lg="3" class="pr-1">
            <dropzone
              id="profileImage"
              ref="profileImage"
              :options="dropzoneOptions"
              :destroy-dropzone="true"
              @vdropzone-sending="sendingEvent"
            />
          </b-col>
          <b-col cols="9" xl="9" lg="9">
            <b-row>
              <b-col cols="3" xl="3" lg="3">
                <b-form-group label="Prefix">
                  <b-form-input
                    v-model="form.prefix"
                    name="prefix"
                    type="text"
                  />
                  <div
                    v-for="(error, index) in errors.collect('prefix')"
                    :key="`prefix-${index}`"
                    class="errors"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="5" xl="5" lg="5">
                <b-form-group label="* First Name">
                  <b-form-input
                    v-model="form.first_name"
                    v-validate="{required: true, alpha_spaces: true}"
                    name="first_name"
                    type="text"
                  />
                  <div
                    v-for="(error, index) in errors.collect('first_name')"
                    :key="`first_name-${index}`"
                    class="errors"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="4" xl="4" lg="4">
                <b-form-group label="Middle Name">
                  <b-form-input
                    v-model="form.middle_name"
                    v-validate="{alpha_spaces: true}"
                    name="middle_name"
                    type="text"
                  />
                  <div
                    v-for="(error, index) in errors.collect('middle_name')"
                    :key="`middle_name-${index}`"
                    class="errors"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="5" xl="5" lg="5">
                <b-form-group label="* Last Name">
                  <b-form-input
                    v-model="form.last_name"
                    v-validate="{required: true, alpha_spaces: true}"
                    name="last_name"
                    type="text"
                  />
                  <div
                    v-for="(error, index) in errors.collect('last_name')"
                    :key="`last_name-${index}`"
                    class="errors"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="3" xl="3" lg="3">
                <b-form-group label="Suffix">
                  <b-form-input
                    v-model="form.suffix"
                    name="suffix"
                    type="text"
                  />
                  <div
                    v-for="(error, index) in errors.collect('suffix')"
                    :key="`suffix-${index}`"
                    class="errors"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col xl="6" lg="6">
            <b-form-group
              label="* Username"
            >
              <b-form-input
                v-model="form.username"
                v-validate="{required: true}"
                name="username"
                type="text"
              />
              <!-- Local Handler -->
              <div
                v-for="(error, index) in errors.collect('username')"
                :key="`username-${index}`"
                class="errors"
              >
                {{ error }}
              </div>
              <!-- End Local Handler -->
            </b-form-group>
          </b-col>
          <b-col xl="6" lg="6">
            <b-form-group
              label="* Email"
            >
              <b-form-input
                v-model="form.email"
                v-validate="{required: true, email: true}"
                name="email"
                type="text"
              />
              <!-- Local Handler -->
              <div
                v-for="(error, index) in errors.collect('email')"
                :key="`email-${index}`"
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
                :error="hasErrorActive"
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
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="4" xl="4" lg="4">
            <b-form-group label="Region">
              <b-form-select
                v-model="form.zone"
                size="lg"
                :options="zones"
                @change="zoneHandler"
              />
              <div
                v-for="(error, index) in errors.collect('zone')"
                :key="`zone-${index}`"
                class="errors"
              >
                {{ error }}
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="4" xl="4" lg="4">
            <b-form-group label="City">
              <b-form-select
                v-model="form.city"
                size="lg"
                :options="cities"
              />
              <div
                v-for="(error, index) in errors.collect('city')"
                :key="`city-${index}`"
                class="errors"
              >
                {{ error }}
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="4" xl="4" lg="4">
            <b-form-group label="Barangay">
              <b-form-textarea
                v-model="form.barangay"
                rows="3"
                max-rows="6"
              />
              <div
                v-for="(error, index) in errors.collect('barangay')"
                :key="`barangay-${index}`"
                class="errors"
              >
                {{ error }}
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="12" xl="12" lg="12">
            <b-form-group label="Gender">
              <b-form-radio-group
                v-model="form.gender"
                :options="genders"
                buttons
                button-variant="outline-primary-original"
                name="genders"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="12" xl="12" lg="12">
            <b-form-group label="Civil Status">
              <b-form-radio-group
                v-model="form.civil_status"
                :options="civil_statuses"
                buttons
                button-variant="outline-primary-original"
                name="civil_statuses"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="12" xl="12" lg="12">
            <b-form-group label="Date of Birth">
              <div>
                <date-picker v-model="form.birth_date" :format="formatDates(form.birth_date)" input-class="form-control" />
              </div>
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
                v-validate="{confirmed:form.confirm_password}"
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
                v-validate="{confirmed:form.password}"
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
          <b-col xl="8" lg="8" offset-xl="2" offset-lg="2" class="pl-0">
            <b-button type="submit" variant="primary" size="lg" block :disabled="is_disabled">
              Update
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </form>
  </div>
</template>
<script>
import moment from 'moment'
import { Validator } from 'vee-validate'
import Dropzone from 'nuxt-dropzone'
import VuePhoneNumberInput from 'vue-phone-number-input'
import DefaultLoader from '~/components/loading_states/DefaultLoader.vue'
import ProfileFieldLoader from '~/components/loading_states/ProfileFieldLoader.vue'
import Resident from '~/utils/mixins/resident.js'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'nuxt-dropzone/dropzone.css'

const dict = {
  custom: {
    username: {
      required: 'Username is required'
    },
    email: {
      required: 'Email is required'
    },
    first_name: {
      required: 'First Name is required',
      alpha_spaces: 'May only contain Alphabetic Characters or Spaces'
    },
    middle_name: {
      alpha_spaces: 'May only contain Alphabetic Characters or Spaces'
    },
    last_name: {
      required: 'Last Name is required',
      alpha_spaces: 'May only contain Alphabetic Characters or Spaces'
    },
    mobileFormatted: {
      required: 'Mobile Number is required',
      min: 'Mobile Number must have 4 or more digits.'
    },
    password: {
      confirmed: 'Password does not match Confirm Password'
    },
    confirm_password: {
      confirmed: 'Confirm Password does not match Password'
    }
  }
}

Validator.localize('en', dict)

export default {
  middleware: ['authenticate'],
  components: {
    Dropzone,
    DefaultLoader,
    ProfileFieldLoader,
    VuePhoneNumberInput
  },
  mixins: [Resident],
  data () {
    return {
      formStatus: 'NO_ACTION',
      mobile_errors: '',
      hasErrorActive: false,
      dropzoneOptions: {
        url: `${process.env.REST_API_ENDPOINT}/images/`,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        maxFiles: 1,
        maxFilesize: 2,
        addRemoveLinks: true,
        headers: {
          Authorization: `${this.$store.getters.auth.token_type} ${this.$store.getters.auth.access_token}`,
          'Cache-Control': null,
          'X-Requested-With': null
        },
        success: (res) => {
          const response = JSON.parse(res.xhr.response)
          this.form.image = response.id
        },
      },
      collected_errors: [],
      is_disabled: false,
      zones: [],
      cities: [],
      form: {
        image: '',
        username: '',
        email: '',
        prefix: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        mobile: '',
        mobileFormatted: '',
        birth_date: null,
        gender: 'MALE',
        civil_status: 'SINGLE',
        zone: '',
        city: '',
        password: '',
        confirm_password: ''
      },
      submitted: { status: 'NO_ACTIONS' }
    }
  },
  mounted () {
    // Fetch data on-load
    this.fetch(this.$route.query)
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
    // Custom Fetch function, use to manipulate records
    async fetch (params = {}) {
      // fetch method came from vuex store actions
      await this.$store.dispatch('retrieveMyProfile')
      const retrieved = this.$store.getters.retrievedMyProfile
      // If retrieval is successfull, populate the form
      this.formStatus = retrieved.status
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res
        this.form = {
          image: data.image,
          username: data.username,
          email: data.email,
          prefix: data.prefix,
          first_name: data.first_name,
          middle_name: data.middle_name,
          last_name: data.last_name,
          suffix: data.suffix,
          mobileFormatted: data.mobile,
          mobile: data.mobile,
          zone: data.zone,
          city: data.city,
          birth_date: (data.birth_date ? data.birth_date : null),
          barangay: data.barangay,
          gender: data.gender,
          civil_status: data.civil_status,
        }

        // Image
        if (this.form.image !== null) {
          await this.$store.dispatch('retrieveImage', { id: this.form.image })
          const retrievedImage = this.$store.getters.retrievedImage
          // If retrieval is successfull, populate the form
          if (retrievedImage.status === 'FULFILLED') {
            const file = {
              size: 120,
              type: 'image/jpeg'
            }
            this.$refs.profileImage.manuallyAddFile(file, retrievedImage.res.image)
          }
        }

        if (this.form.zone !== null) {
          await this.$store.dispatch('fetchCities', { zone_id: this.form.zone })
          const fetched = this.$store.getters.fetchedCities
          // If retrieval is successfull, populate the form
          if (fetched.status === 'FULFILLED') {
            const cityData = fetched.res.results

            if (cityData.length === 0) {
              this.cities = [{ value: '', text: 'No Available Cities' }]
            }

            for (const index in cityData) {
              this.cities.push({ value: cityData[index].id, text: cityData[index].name })
            }
          }
        }
      }

      // Zones
      await this.$store.dispatch('fetchRegions')
      const fetchedRegions = this.$store.getters.fetchedRegions
      // If retrieval is successfull, populate the form
      if (fetchedRegions.status === 'FULFILLED') {
        const regionData = fetchedRegions.res.results
        for (const index in regionData) {
          this.zones.push({ value: regionData[index].id, text: regionData[index].name })
        }
      }
    },
    formatDates (date) {
      if (date === null || date === '') {
        return null
      }
      return moment(date).format('YYYY-MM-DD')
    },
    async zoneHandler (zone) {
      // Cities
      this.cities = []
      await this.$store.dispatch('fetchCities', { zone_id: zone })
      const fetched = this.$store.getters.fetchedCities
      // If retrieval is successfull, populate the form
      if (fetched.status === 'FULFILLED') {
        const cityData = fetched.res.results

        if (cityData.length === 0) {
          this.cities = [{ value: '', text: 'No Available Cities' }]
        }

        for (const index in cityData) {
          this.cities.push({ value: cityData[index].id, text: cityData[index].name })
        }
      }
    },
    sendingEvent (file, xhr, formData) {
      formData.append('image', file)
    },
    // Handle form submission
    handleSubmit () {
      this.$validator.validateAll().then(async (result) => {
        if (result && this.hasErrorActive === false) {
          this.is_disabled = true
          this.form.birth_date = this.formatDates(this.form.birth_date)
          this.collected_errors = []

          for (const key in this.form) {
            if (this.form.hasOwnProperty(key) && !this.form[key]) {
              delete this.form[key]
            }
          }

          // Create record
          await this.$store.dispatch('updateMyProfile', this.form)
          this.submitted = this.$store.getters.updatedMyProfile

          // Redirect to list if there's no form error(s)
          this.is_disabled = false
          if (this.submitted.status === 'FULFILLED') {
            this.$swal({
              title: '',
              text: '',
              type: 'success'
            }).then((result) => {
              window.location.reload()
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
  .vue-dropzone {
    padding: 0 !important;
  }

  .vue-dropzone > .dz-preview > .dz-remove {
    margin-left: 10px !important;
  }

  .dropzone .dz-preview.dz-image-preview {
    margin: 20px !important;
  }

</style>
