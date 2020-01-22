<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12">
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
      <b-card footer-tag="footer">
        <div v-if="formStatus === 'NO_ACTION'">
          <b-col cols="12" xs="12" class="mt-4">
            <div class="headline-3 semi-bold">
              Personal Information
            </div>
            <profile-field-loader />
          </b-col>
          <b-col xl="12" lg="12" class="mt-5">
            <b-row>
              <b-col xl="4" lg="4" class="headline-basic semi-bold black-grey mt-1">
                CONTACT INFORMATION
              </b-col>
              <b-col xl="8" lg="8">
                <hr>
              </b-col>
            </b-row>
            <default-loader />
          </b-col>
          <b-col xl="12" lg="12" class="mt-5">
            <b-row>
              <b-col xl="4" lg="4" class="headline-basic semi-bold black-grey mt-1">
                HOME ADDRESS
              </b-col>
              <b-col xl="8" lg="8">
                <hr>
              </b-col>
            </b-row>
            <default-loader />
            <default-loader />
          </b-col>
        </div>

        <div v-if="formStatus === 'FULFILLED'" :class="currentPage === 'index' || '' ? '' : 'display-none-class'" class="card-body">
          <b-row>
            <b-col cols="12" xs="12">
              <div class="headline-3 semi-bold">
                Personal Information
              </div>
              <form method="POST" class="mt-4" @submit.prevent="handleSubmit">
                <b-row>
                  <b-col cols="12" xl="12" lg="12">
                    <b-row>
                      <b-col cols="3" xl="3" lg="3" class="pr-0">
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
                        <b-row>
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
                      <b-col xl="12" lg="12">
                        <b-row>
                          <b-col xl="4" lg="4" class="headline-basic semi-bold black-grey mt-1">
                            CONTACT INFORMATION
                          </b-col>
                          <b-col xl="8" lg="8">
                            <hr>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row class="mt-4">
                      <b-col cols="6" xl="6" lg="6">
                        <b-form-group label="* Mobile Number">
                          <VuePhoneNumberInput
                            v-model="form.formattedNumber"
                            v-validate="{required: true}"
                            :error="hasErrorActive"
                            name="mobileFormatted"
                            :only-countries="['PH']"
                            default-country-code="PH"
                            clearable
                            @update="onUpdate"
                          />
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
                        </b-form-group>
                      </b-col>

                      <b-col cols="6" xl="6" lg="6">
                        <b-form-group label="* Email Address">
                          <b-form-input
                            v-model="form.email"
                            v-validate="{required: true}"
                            name="email"
                            type="email"
                          />
                          <div
                            v-for="(error, index) in errors.collect('email')"
                            :key="`email-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <b-row class="mt-5">
                      <b-col xl="12" lg="12">
                        <b-row>
                          <b-col xl="3" lg="3" class="headline-basic semi-bold black-grey mt-1">
                            HOME ADDRESS
                          </b-col>
                          <b-col xl="9" lg="9">
                            <hr>
                          </b-col>
                        </b-row>
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

                    <b-row class="mt-2">
                      <!-- <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="* Location">
                          <b-form-select
                            v-model="form.location"
                            v-validate="'required'"
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

                      <b-col cols="6" xl="6" lg="6">
                        <b-form-group label="Occupation">
                          <b-form-input
                            v-model="form.job"
                            type="text"
                          />
                          <div
                            v-for="(error, index) in errors.collect('job')"
                            :key="`job-${index}`"
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

                      <b-col cols="12" xl="12" lg="12" class="mt-4">
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

                      <b-col cols="12" xl="12" lg="12" class="mt-4">
                        <b-form-group label="Date of Birth">
                          <div>
                            <date-picker v-model="form.birth_date" :format="formatDates(form.birth_date)" input-class="form-control" />
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col xl="12" lg="12">
                    <hr>
                    <div slot="footer">
                      <b-row>
                        <b-col md="12">
                          <div class="form-inline float-right">
                            <b-button
                              type="submit"
                              variant="primary"
                              size="lg"
                              class="mr-2"
                              style="width:150px;"
                              :disabled="is_disabled"
                            >
                              Next <chevrons-right-icon size="1x" />
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
        </div>
        <div :class="currentPage === 'medical_information' ? '' : 'display-none-class'" class="card-body">
          <b-row>
            <b-col cols="12" xs="12">
              <div class="headline-3 semi-bold">
                Medical Information
              </div>
              <form method="POST" class="mt-4" @submit.prevent="handleSubmit">
                <b-row>
                  <b-col cols="12" xl="12" lg="12">
                    <b-row>
                      <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="Height">
                          <b-input-group append="cm">
                            <b-form-input
                              v-model="form.height"
                              type="text"
                              @keyup="computeBMI"
                            />
                          </b-input-group>
                          <div
                            v-for="(error, index) in errors.collect('height')"
                            :key="`height-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="Weight">
                          <b-input-group append="kg">
                            <b-form-input
                              v-model="form.weight"
                              type="text"
                              @keyup="computeBMI"
                            />
                          </b-input-group>
                          <div
                            v-for="(error, index) in errors.collect('weight')"
                            :key="`weight-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="BODY MASS INDEX">
                          <div class="label-headline black-88 semi-bold mt-2">
                            {{ form.bmi }}
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col xl="12" lg="12">
                        <b-row>
                          <b-col xl="3" lg="3" class="headline-basic semi-bold black-grey mt-1">
                            BLOOD PRESSURE
                          </b-col>
                          <b-col xl="9" lg="9">
                            <hr>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-4">
                      <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="Systolic">
                          <b-form-input
                            v-model="form.systolic"
                            name="systolic"
                            type="text"
                          />
                          <div
                            v-for="(error, index) in errors.collect('systolic')"
                            :key="`systolic-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="Diastolic">
                          <b-form-input
                            v-model="form.diastolic"
                            name="diastolic"
                            type="text"
                          />
                          <div
                            v-for="(error, index) in errors.collect('diastolic')"
                            :key="`diastolic-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="Blood Type">
                          <b-form-select
                            v-model="form.blood_type"
                            size="lg"
                            :options="blood_types"
                          />
                          <div
                            v-for="(error, index) in errors.collect('blood_type')"
                            :key="`blood_type-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col xl="12" lg="12">
                        <b-row>
                          <b-col xl="3" lg="3" class="headline-basic semi-bold black-grey mt-1">
                            BODY TEMPERATURE
                          </b-col>
                          <b-col xl="9" lg="9">
                            <hr>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-4">
                      <b-col cols="4" xl="4" lg="4">
                        <b-form-group label="In Celsius">
                          <b-input-group>
                            <b-form-input
                              v-model="form.temperature"
                              name="temperature"
                              type="text"
                            />
                          </b-input-group>
                          <div
                            v-for="(error, index) in errors.collect('temperature')"
                            :key="`temperature-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col xl="12" lg="12">
                        <b-row>
                          <b-col xl="4" lg="4" class="headline-basic semi-bold black-grey mt-1">
                            MEDICAL CONDITIONS
                          </b-col>
                          <b-col xl="8" lg="8">
                            <hr>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-4">
                      <b-col xl="8" lg="8">
                        <b-form-group label="Existing Condition">
                          <b-input-group>
                            <b-form-select
                              v-model="form.existing_condition"
                              size="lg"
                              :options="conditions"
                            />
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col xl="4" lg="4" class="mt-4 text-right">
                        <b-button variant="outline-primary" size="lg" class="headline-basic semi-bold" @click="addExistingCondition">
                          <plus-icon size="1.5x" class="custom-class" /> Add Existing Condition
                        </b-button>
                      </b-col>

                      <b-col xl="8" lg="8">
                        <b-form-group label="New Condition">
                          <b-input-group>
                            <b-form-input
                              v-model="form.condition"
                              name="condition"
                              type="text"
                            />
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col xl="4" lg="4" class="mt-4 text-right">
                        <b-button variant="outline-primary" size="lg" class="headline-basic semi-bold" @click="addCondition">
                          <plus-icon size="1.5x" class="custom-class" /> Add New Condition
                        </b-button>
                      </b-col>
                      <b-col xl="11" lg="11">
                        <b-table
                          :items="medical_conditions"
                          :fields="medical_condition_fields"
                          :no-local-sorting="true"
                          hover
                          responsive
                          head-variant="dark"
                          foot-clone
                          fixed
                        />
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col xl="12" lg="12">
                        <b-row>
                          <b-col xl="3" lg="3" class="headline-basic semi-bold black-grey mt-1">
                            MAINTAINING MEDS
                          </b-col>
                          <b-col xl="9" lg="9">
                            <hr>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-4">
                      <b-col xl="8" lg="8">
                        <b-form-group label="Medicine Name">
                          <b-input-group>
                            <b-form-input
                              v-model="form.medicine"
                              name="medicine"
                              type="text"
                            />
                          </b-input-group>
                          <div
                            v-for="(error, index) in errors.collect('medicine')"
                            :key="`medicine-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col xl="3" lg="3" class="mt-4 text-right">
                        <b-button variant="outline-primary" size="lg" class="headline-basic semi-bold" @click="addMedicine">
                          <plus-icon size="1.5x" class="custom-class" /> Add Medicine
                        </b-button>
                      </b-col>
                      <b-col xl="11" lg="11">
                        <b-table
                          :items="maintenances"
                          :fields="maintenance_fields"
                          :no-local-sorting="true"
                          hover
                          responsive
                          head-variant="dark"
                          foot-clone
                          fixed
                        />
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col xl="12" lg="12">
                        <b-row>
                          <b-col xl="3" lg="3" class="headline-basic semi-bold black-grey mt-1">
                            VACCINE
                          </b-col>
                          <b-col xl="9" lg="9">
                            <hr>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-4">
                      <b-col xl="5" lg="5">
                        <b-form-group label="Vaccine Name">
                          <b-input-group>
                            <b-form-input
                              v-model="form.vaccine"
                              name="vaccine"
                              type="text"
                            />
                          </b-input-group>
                          <div
                            v-for="(error, index) in errors.collect('vaccine')"
                            :key="`vaccine-${index}`"
                            class="errors"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col xl="4" lg="4">
                        <b-form-group label="Date Taken">
                          <div>
                            <date-picker v-model="vaccine_date_taken" :format="formatDates(vaccine_date_taken)" input-class="form-control" />
                          </div>
                        </b-form-group>
                      </b-col>
                      <b-col xl="3" lg="3" class="mt-4 text-right">
                        <b-button variant="outline-primary" size="lg" class="headline-basic semi-bold" @click="addVaccine">
                          <plus-icon size="1.5x" class="custom-class" /> Add Vaccine
                        </b-button>
                      </b-col>
                      <b-col xl="12" lg="12">
                        <b-table
                          :items="vaccines"
                          :fields="vaccine_fields"
                          :no-local-sorting="true"
                          hover
                          responsive
                          head-variant="dark"
                          foot-clone
                          fixed
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col xl="12" lg="12">
                    <hr>
                    <div slot="footer">
                      <b-row>
                        <b-col md="12">
                          <div class="form-inline float-left">
                            <b-button variant="info" size="lg" @click="backToPersonalInfo">
                              <chevrons-left-icon size="1x" /> Back to Personal Information
                            </b-button>
                          </div>
                          <div class="form-inline float-right">
                            <b-button type="submit" variant="primary" size="lg" class="mr-2" :disabled="is_disabled">
                              <save-icon size="1x" /> Save Information
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
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { Validator } from 'vee-validate'
import moment from 'moment'
import Dropzone from 'nuxt-dropzone'
import VuePhoneNumberInput from 'vue-phone-number-input'
import Resident from '~/utils/mixins/resident.js'
import ProfileFieldLoader from '~/components/loading_states/ProfileFieldLoader.vue'
import DefaultLoader from '~/components/loading_states/DefaultLoader.vue'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import 'nuxt-dropzone/dropzone.css'
const dict = {
  custom: {
    first_name: {
      required: 'First Name is required',
      alpha_spaces: 'May only contain Alphabetic Characters or Spaces'
    },
    middle_name: {
      alpha_spaces: 'May only contain Alphabetic Characters or Spaces'
    },
    email: {
      required: 'Email Address is required'
    },
    last_name: {
      required: 'Last Name is required',
      alpha_spaces: 'May only contain Alphabetic Characters or Spaces'
    },
    mobileFormatted: {
      required: 'Mobile Number is required',
      min: 'Mobile Number must have 4 or more digits.'
    },
    /* location: {
      required: 'Location is required'
    }, */
  }
}

Validator.localize('en', dict)

export default {
  components: {
    Dropzone,
    ProfileFieldLoader,
    DefaultLoader,
    VuePhoneNumberInput
  },
  mixins: [Resident],
  props: {
    currentPage: { type: String, default: '' }
  },
  data () {
    return {
      formStatus: 'NO_ACTION',
      mobile_errors: '',
      hasErrorActive: false,
      is_disabled: false,
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
      image_url: '',
      collected_errors: [],
      // locations: [],
      zones: [],
      cities: [],
      conditions: [],
      medical_condition_fields: [],
      medical_conditions: [],
      custom_medical_conditions: [],
      custom_medical_conditions_reference: [],
      existing_medical_conditions: [],
      maintenance_fields: [],
      maintenances: [],
      maintenances_data: [],
      vaccine_fields: [],
      vaccines: [],
      vaccines_data: [],
      form: {
        password: 'password',
        email: '',
        prefix: '',
        suffix: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile: '',
        birth_date: null,
        gender: 'MALE',
        civil_status: 'SINGLE',
        image: '',
        zone: '',
        city: '',
        barangay: '',
        location: '',
        job: '',
        height: null,
        weight: null,
        bmi: null,
        systolic: null,
        diastolic: null,
        bloody_type: '',
        temperature: null,
        medical_conditions: '',
        existing_condition: '',
        condition: '',
        medicine: '',
        vaccine: ''
      },
      vaccine_date_taken: null,
      submitted: { status: 'NO_ACTIONS' },
    }
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'id' in this.$route.params ? 'Update Patient Record' : 'Add Patient Record',
    }
  },
  async mounted () {
    if ('id' in this.$route.params) {
      // Retrieve the data in edit mode
      await this.$store.dispatch('retrievePatientRecord', { id: this.$route.params.id })
      const retrieved = this.$store.getters.retrievedPatientRecord
      // If retrieval is successfull, populate the form
      this.formStatus = retrieved.status
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res
        this.form = {
          image: data.user.image,
          prefix: data.user.prefix,
          first_name: data.user.first_name,
          middle_name: data.user.middle_name,
          last_name: data.user.last_name,
          suffix: data.user.suffix,
          mobile: data.user.mobile,
          formattedNumber: data.user.mobile,
          email: data.user.email,
          zone: data.user.zone,
          city: data.user.city,
          birth_date: (data.user.birth_date ? data.user.birth_date : null),
          vaccine_date_taken: (data.user.vaccine_date_taken ? data.user.vaccine_date_taken : null),
          barangay: data.user.barangay,
          location: (data.location.id ? data.location.id : null),
          job: data.user.job,
          gender: (data.user.gender ? data.user.gender : 'MALE'),
          civil_status: (data.user.civil_status ? data.user.civil_status : 'SINGLE'),
          weight: (data.user.medical_info ? data.user.medical_info.weight : ''),
          height: (data.user.medical_info ? data.user.medical_info.height : ''),
          bmi: (data.user.medical_info ? data.user.medical_info.bmi : ''),
          systolic: (data.user.medical_info ? data.user.medical_info.systolic : ''),
          diastolic: (data.user.medical_info ? data.user.medical_info.diastolic : ''),
          blood_type: (data.user.medical_info ? data.user.medical_info.blood_type : ''),
          temperature: (data.user.medical_info ? data.user.medical_info.temperature : '')
        }

        // Medical Condition Records
        this.medical_condition_fields = [
          { key: 'name', label: 'Conditions', sortable: true }
        ]
        this.medical_conditions = data.user.medical_condition
        if (data.user.medical_condition.length > 0) {
          const medicalConditionData = data.user.medical_condition
          for (const index in medicalConditionData) {
            if (medicalConditionData[index].name) {
              this.custom_medical_conditions.push({ name: medicalConditionData[index].name })
              this.custom_medical_conditions_reference.push(medicalConditionData[index].name)
            }
          }
        }

        // Maintenance Records
        this.maintenance_fields = [
          { key: 'name', label: 'Medicine Name', sortable: true }
        ]
        this.maintenances = data.user.maintenance

        // Vaccine Records
        this.vaccine_fields = [
          { key: 'name', label: 'Vaccine', sortable: true },
          { key: 'date', label: 'Date Taken', sortable: true }
        ]
        this.vaccines = data.user.vaccine

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
    } else {
      this.formStatus = 'FULFILLED'
    }

    // Set location value
    const details = this.$store.getters.auth.assistant_details
    this.form.location = details.default_location

    // Locations
    /* await this.$store.dispatch('fetchLocations')
    const fetchedLocations = this.$store.getters.fetchedLocations
    // If retrieval is successfull, populate the form
    if (fetchedLocations.status === 'FULFILLED') {
      const locationData = fetchedLocations.res.results
      for (const index in locationData) {
        this.locations.push({ value: locationData[index].id, text: locationData[index].name })
      }
    } */

    // Zones
    await this.$store.dispatch('fetchRegions')
    const fetched = this.$store.getters.fetchedRegions
    // If retrieval is successfull, populate the form
    if (fetched.status === 'FULFILLED') {
      const regionData = fetched.res.results
      for (const index in regionData) {
        this.zones.push({ value: regionData[index].id, text: regionData[index].name })
      }
    }

    // Medical Conditions
    await this.$store.dispatch('fetchMedicalConditions')
    const fetchedConditions = this.$store.getters.fetchedMedicalConditions
    // If retrieval is successfull, populate the form
    if (fetchedConditions.status === 'FULFILLED') {
      const conditionData = fetchedConditions.res.results
      for (const index in conditionData) {
        this.conditions.push({ value: { id: conditionData[index].id, name: conditionData[index].name }, text: conditionData[index].name })
      }
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
    onlyUnique (value, index, self) {
      return self.indexOf(value) === index
    },
    backToPersonalInfo () {
      this.$emit('childToParent', 'index')
    },
    addExistingCondition () {
      if (this.form.existing_condition !== '' && this.form.existing_condition !== undefined) {
        if (this.existing_medical_conditions.includes(this.form.existing_condition.id) || this.custom_medical_conditions_reference.includes(this.form.existing_condition.name)) {
          this.$swal({
            title: '',
            text: 'Condition already exist.',
            type: 'warning',
          })
        } else {
          this.existing_medical_conditions.push(this.form.existing_condition.id)
          this.medical_conditions.push({ name: this.form.existing_condition.name })
        }
      }
    },
    addCondition () {
      if (this.form.condition !== '' && this.form.condition !== undefined) {
        if (this.custom_medical_conditions_reference.includes(this.form.condition)) {
          this.$swal({
            title: '',
            text: 'Condition already exist.',
            type: 'warning',
          })
        } else {
          this.custom_medical_conditions_reference.push(this.form.condition)
          this.custom_medical_conditions.push({ name: this.form.condition })
          this.medical_conditions.push({ name: this.form.condition })
        }
      }
    },
    computeBMI () {
      this.form.bmi = ''
      if (this.form.weight !== undefined && this.form.height !== undefined && this.form.weight !== 0 && this.form.height !== 0) {
        this.form.bmi = ((this.form.weight / this.form.height) / this.form.height) * 10000
        this.form.bmi = this.form.bmi.toFixed(2)
      }
    },
    addMedicine () {
      if (this.form.medicine !== '' && this.form.medicine !== undefined) {
        if (this.form.medicine.length < 3) {
          this.$swal({
            title: '',
            text: 'Medicine Name must have has at least 3 characters.',
            type: 'warning',
          })
        } else if (this.maintenances_data.includes(this.form.medicine)) {
          this.$swal({
            title: '',
            text: 'Medicine Name already exist.',
            type: 'warning',
          })
        } else {
          this.maintenances_data.push(this.form.medicine)
          this.maintenances.push({ name: this.form.medicine })
        }
      }
    },
    addVaccine () {
      if (this.vaccine_date_taken !== '' && this.vaccine_date_taken !== null && this.form.vaccine !== undefined && this.form.vaccine !== '') {
        if (this.form.vaccine.length < 3) {
          this.$swal({
            title: '',
            text: 'Vaccine Name must have has at least 3 characters.',
            type: 'warning',
          })
        } else {
          this.vaccines_data.push(this.form.vaccine)
          this.vaccines.push({ name: this.form.vaccine, date: this.formatDates(this.vaccine_date_taken) })
        }
      } else {
        this.$swal({
          title: '',
          text: 'Vaccine and Date Taken are both required.',
          type: 'warning',
        })
      }
    },
    formatDates (date) {
      if (date === null || date === '') {
        return null
      }
      return moment(date).format('YYYY-MM-DD')
    },
    sendingEvent (file, xhr, formData) {
      formData.append('image', file)
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
    // Handle form submission
    handleSubmit () {
      this.$validator.validateAll().then(async (result) => {
        if (result && this.hasErrorActive === false) {
          this.form.birth_date = this.formatDates(this.form.birth_date)
          // this.form.vaccine_date_taken = this.formatDates(this.form.vaccine_date_taken)
          this.collected_errors = []
          if (this.currentPage === '' || this.currentPage === 'index') {
            this.$emit('childToParent', 'medical_information')
          } else {
            this.is_disabled = true
            for (const key in this.form) {
              if (this.form.hasOwnProperty(key) && !this.form[key]) {
                delete this.form[key]
              }
            }
            this.form.username = this.form.mobile
            this.form.password = 'password'
            this.form.custom_conditions = this.custom_medical_conditions
            this.form.medical_conditions = this.existing_medical_conditions
            this.form.maintenances = this.maintenances
            this.form.vaccines = this.vaccines
            // If id parameter is exisiting (update mode)
            if ('id' in this.$route.params) {
              await this.$store.dispatch('updatePatientRecord', {
                id: this.$route.params.id,
                data: this.form,
              })
              this.submitted = this.$store.getters.updatedPatientRecord
            } else {
              // Create record
              await this.$store.dispatch('createPatientRecord', this.form)
              this.submitted = this.$store.getters.createdPatientRecord
            }

            this.is_disabled = false
            // Redirect to list if there's no form error(s)
            if (this.submitted.status === 'FULFILLED') {
              this.$swal({
                title: '',
                text: '',
                type: 'success'
              }).then(() => this.$router.push({ path: '/patient_records/' }))
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
    margin: 20px;
  }

  .display-none-class {
    display: none;
  }
</style>
