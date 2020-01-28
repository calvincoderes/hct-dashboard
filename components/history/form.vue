<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12">
      <b-row>
        <b-col cols="4" xl="4" lg="4">
          <b-row v-if="$store.getters.retrievedAppointment.status === 'FULFILLED'" class="mt-4 mb-5">
            <left-side-details :appointment="$store.getters.retrievedAppointment.res" />
          </b-row>
          <!-- <b-row>
            <b-col v-if="item.provider" xl="12" lg="12">
              <patient-queue
                :single-provider="true"
                :provider="{
                  provider_id: item.provider,
                  provider_name: item.provider_name,
                  provider_image: item.provider_image,
                  provider_occupation: item.provider_occupation,
                  in_clinic: providerInClinic,
                }"
              />
            </b-col>
          </b-row> -->

          <b-row class="mt-4">
            <b-col xl="12" lg="12">
              <nuxt-link to="/dashboard/">
                <b-button variant="primary" size="lg" block>
                  Go to Dashboard
                </b-button>
              </nuxt-link>
            </b-col>
            <b-col xl="12" lg="12" class="mt-4">
              <nuxt-link :to="{path: `/history/`, query: $route.query}">
                <b-button variant="info" size="lg" block>
                  Go to History Records
                </b-button>
              </nuxt-link>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col cols="12" xl="12" lg="12">
              <div id="appointment-header-status" class="text-center logo-sub white-88 pt-1">
                APPOINTMENT ONGOING
              </div>
              <b-card id="appointment-status">
                <b-row>
                  <b-col cols="12" xl="12" lg="12" class="label-headline black-88 bold">
                    Appointment Service
                  </b-col>
                </b-row>
                <b-row class="mt-1">
                  <b-col cols="12" xl="12" lg="12" class="small-black56-11">
                    1923109238290190123 (appointment ID)
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col cols="5" xl="5" lg="5">
                    <b-row>
                      <b-col cols="2" xl="2" lg="2" class="small-11">
                        <calendar-icon size="1.5x" />
                      </b-col>
                      <b-col cols="9" xl="9" lg="9" class="small-gb-11 pl-2 mt-0-dot-5">
                        June 13, 2019
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="5" xl="5" lg="5" class="pl-0">
                    <b-row>
                      <b-col cols="2" xl="2" lg="2" class="small-11">
                        <clock-icon size="1.5x" class="custom-class" />
                      </b-col>
                      <b-col cols="9" xl="9" lg="9" class="small-gb-11 pl-2 mt-0-dot-5">
                        11:30 AM
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" xl="12" lg="12" class="pl-0 pr-0">
                    <hr>
                  </b-col>
                  <b-col cols="12" xl="12" lg="12">
                    <b-row>
                      <b-col cols="6" xl="6" lg="6">
                        <b-row>
                          <b-col cols="12" xl="12" lg="12" class="logo-sub black-40">
                            Time Started:
                          </b-col>
                          <b-col cols="12" xl="12" lg="12" class="logo-sub black-40 bold">
                            11:37 am
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols="6" xl="6" lg="6" class="text-right normal bold mt-2">
                        <x-icon size="1.2x" class="custom-class" /> Close Session
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row> -->
          <!-- <b-row class="mt-4">
            <b-col cols="12" xl="12" lg="12">
              <b-col cols="12" xl="12" lg="12">
                <b-button variant="outline-primary" size="lg" block>
                  Book Follow-Up Appointment
                </b-button>
              </b-col>
            </b-col>
          </b-row> -->
          <!-- <b-row class="mt-5">
            <b-col xl="12" lg="12">
              <b-row>
                <b-col xl="5" lg="5" class="headline-basic bold black-grey mt-1">
                  SERVICE PROVIDER
                </b-col>
                <b-col xl="7" lg="7">
                  <hr>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <LeftSideServiceProvider :item="item" :status="appointment_status" />
          </b-row> -->
          <!-- <b-row class="mt-5">
            <LeftSideDetails />
          </b-row> -->
          <!-- <b-row class="mt-5">
            <b-col xl="12" lg="12">
              <b-row>
                <b-col xl="4" lg="4" class="headline-basic bold black-grey mt-1">
                  NEXT IN LINE
                </b-col>
                <b-col xl="8" lg="8">
                  <hr>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row class="mt-4">
            <b-col xl="1" lg="1" class="label-headline bold mt-2 pr-0">
              2
            </b-col>
            <b-col xl="6" lg="6" class="pl-3">
              <b-row>
                <b-col xl="12" lg="12" class="label-headline bold">
                  Stephanie McMahon
                </b-col>
                <b-col xl="12" lg="12" class="logo-sub black-40 mt-1">
                  Full Body Medical Checkup
                </b-col>
              </b-row>
            </b-col>
            <b-col xl="5" lg="5">
              <b-form-checkbox v-model="checked" size="lg" name="check-button" switch />
              <div class="small mid-blue mt-1">
                IN-CLINIC
              </div>
            </b-col>
          </b-row> -->
        </b-col>
        <b-col cols="8" xl="8" lg="8">
          <b-row>
            <b-col cols="12" xl="12" lg="12">
              <b-card footer-tag="footer">
                <b-row>
                  <b-col cols="8" xl="8" lg="8">
                    <b-row>
                      <b-col xl="1" lg="1" class="mt-2">
                        <b-img v-if="!item.user.image_url" rounded="circle" :width="40" :height="40" :src="'https://via.placeholder.com/32'" />
                        <b-img v-else-if="!item.user.image_url" rounded="circle" :width="40" :height="40" :src="'https://via.placeholder.com/32'" />
                        <b-img v-else rounded="circle" :src="item.user.image_url" :width="40" :height="40" />
                      </b-col>
                      <b-col xl="10" lg="10" class="ml-3">
                        <b-row>
                          <b-col xl="12" lg="12" class="headline text-truncate">
                            {{ item.user.full_name || '- - - -' }}
                          </b-col>
                          <b-col v-if="$store.getters.retrievedAppointment.status === 'FULFILLED'" xl="12" lg="12" class="headline-basic text-uppercase">
                            <b-badge v-if="item.appointment_type === 'online'" pill variant="primary">
                              <globe-icon size="1x" /> ONLINE
                            </b-badge>
                            <b-badge v-else-if="item.appointment_type === 'manual'" pill variant="info">
                              <edit-icon size="1x" /> MANUAL
                            </b-badge>
                            <b-badge v-else pill variant="success">
                              <book-icon size="1x" /> WALK-IN
                            </b-badge>
                            <template v-if="item.location">
                              <b-badge v-if="item.location.service_type === 'clinic'" pill variant="info">
                                <plus-circle-icon size="1x" /> {{ item.location.service_type }}
                              </b-badge>
                              <b-badge v-else-if="item.location.service_type === 'clinic'" pill variant="info">
                                <home-icon size="1x" /> {{ item.location.service_type }}
                              </b-badge>
                              <b-badge v-if="item.status === 'cancelled' || item.status === 'closed'" pill variant="danger">
                                CLOSED
                              </b-badge>
                            </template>
                            <!-- <b-row>
                              <b-col v-if="item.status !== 'cancelled' && item.status !== 'closed'" xl="12" lg="12" class="mt-3">
                                <b-button variant="outline-danger" @click="cancelAppointment">
                                  Cancel
                                </b-button>
                                <b-button variant="outline-dark" @click="closeAppointment">
                                  Close Appointment
                                </b-button>
                              </b-col>
                            </b-row> -->
                          </b-col>
                          <!-- <b-col v-if="item.user.is_active === true" xl="12" lg="12" class="headline-basic" style="color: #5bdf6f;">
                            <check-circle-icon size="1x" class="custom-class" />&nbsp;Registered
                          </b-col>
                          <b-col v-if="item.user.is_active === false" xl="12" lg="12" class="caption">
                            Walk In
                          </b-col> -->
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col cols="4" xl="4" lg="4">
                    <b-row>
                      <b-col cols="12" xl="12" lg="12" class="mt-2">
                        <b-row>
                          <b-col cols="1" xl="1" lg="1">
                            <phone-icon size="1.5x" />
                          </b-col>
                          <b-col cols="10" xl="10" lg="10" class="headline-basic-07-lt-space black mt-1">
                            {{ item.user.mobile || '- - - -' }}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols="12" xl="12" lg="12" class="mt-2">
                        <b-row>
                          <b-col cols="1" xl="1" lg="1">
                            <mail-icon size="1.5x" />
                          </b-col>
                          <b-col cols="10" xl="10" lg="10" class="headline-basic-07-lt-space black mt-1">
                            {{ item.user.email || '- - - -' }}
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols="12" xl="12" lg="12" class="mt-2">
                        <b-row>
                          <b-col cols="1" xl="1" lg="1">
                            <file-text-icon size="1.5x" />
                          </b-col>
                          <b-col cols="10" xl="10" lg="10" class="headline-basic-07-lt-space black mt-1">
                            {{ item.user.birth_date || '- - - -' }}
                            <!-- June 1, 1978 <b>(41 years old)</b> -->
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>

                <!-- <b-row class="mt-3">
                  <b-col xl="12" lg="12">
                    <b-row>
                      <b-col xl="4" lg="4" class="headline-basic bold black-grey mt-1">
                        PERSONAL INFORMATION
                      </b-col>
                      <b-col xl="8" lg="8">
                        <hr>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row class="mt-3">
                  <b-col xl="2" lg="2">
                    <b-row>
                      <b-col xl="12" lg="12" class="logo-sub black-40">
                        HEIGHT
                      </b-col>
                      <b-col xl="12" lg="12" class="headline-basic-07-lt-space black pr-0 mt-2">
                        - - - -
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col xl="2" lg="2">
                    <b-row>
                      <b-col xl="12" lg="12" class="logo-sub black-40">
                        WEIGHT
                      </b-col>
                      <b-col xl="12" lg="12" class="headline-basic-07-lt-space black pr-0 mt-2">
                        - - - -
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col xl="2" lg="2">
                    <b-row>
                      <b-col xl="12" lg="12" class="logo-sub black-40">
                        CIVIL STATUS
                      </b-col>
                      <b-col xl="12" lg="12" class="headline-basic-07-lt-space black pr-0 mt-2">
                        - - - -
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col xl="3" lg="3">
                    <b-row>
                      <b-col xl="12" lg="12" class="logo-sub black-40">
                        OCCUPATION
                      </b-col>
                      <b-col xl="12" lg="12" class="headline-basic-07-lt-space black pr-0 mt-2">
                        - - - -
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col xl="3" lg="3">
                    <b-row>
                      <b-col xl="12" lg="12" class="logo-sub black-40">
                        LAST VISIT
                      </b-col>
                      <b-col xl="12" lg="12" class="headline-basic-07-lt-space black pr-0 mt-2">
                        - - - -
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row> -->

                <b-row class="mt-5">
                  <b-col xl="12" lg="12" class="headline-basic-07-lt-space brown-grey bold">
                    APPOINTMENT NOTES
                  </b-col>
                  <b-col xl="12" lg="12" class="mt-2">
                    <form
                      @submit.prevent="updateAppointments"
                    >
                      <b-form-group>
                        <b-form-textarea
                          v-model="item.provider_note"
                          no-resize
                          placeholder="Enter your notes here"
                          rows="6"
                          max-rows="10"
                        />
                      </b-form-group>
                      <!-- <b-button variant="outline-primary" size="lg" block :disabled="is_disabled" type="submit">
                        Update
                      </b-button> -->
                    </form>
                  </b-col>
                </b-row>

                <b-row class="mt-5">
                  <b-col xl="12" lg="12" class="headline-basic-07-lt-space brown-grey bold">
                    DOCTOR'S ATTACHMENTS
                  </b-col>
                  <!-- <b-col xl="12" lg="12" class="mt-2">
                    <dropzone
                      id="files"
                      ref="files"
                      :options="dropzoneOptions"
                      :destroy-dropzone="true"
                      @vdropzone-sending="sendingEvent"
                      @vdropzone-queue-complete="queueComplete"
                    />
                  </b-col> -->
                </b-row>

                <b-row class="mt-4">
                  <b-col v-for="(added_file, index) in doctor_added_files" :key="added_file.id" xl="4" lg="4" class="mb-3">
                    <div v-b-popover.hover.top="added_file.filename" class="text-center">
                      <b-row>
                        <b-col xl="8" lg="8" class="pr-0">
                          <div class="bg-secondary text-light text-truncate pl-1 pr-1" style="height: 100%; line-height: 26px;">
                            {{ added_file.filename }}
                          </div>
                        </b-col>
                        <b-col xl="2" lg="2" class="pl-0 pr-0">
                          <b-button variant="danger" size="sm" @click="deleteDoctorFile(added_file.id, index)">
                            <trash-2-icon size="1x" class="custom-class" />
                          </b-button>
                        </b-col>
                        <b-col xl="2" lg="2" class="pl-0">
                          <b-button variant="info" size="sm" @click="localDownload(added_file.file)">
                            <download-icon size="1x" class="custom-class" />
                          </b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col xl="12" lg="12">
                    <hr>
                  </b-col>
                </b-row>

                <b-row class="mt-5">
                  <b-col xl="12" lg="12" class="headline-basic-07-lt-space brown-grey bold">
                    PATIENT'S FILES
                  </b-col>
                  <b-col v-if="!Object.keys(patient_added_files).length" xl="12" lg="12">
                    <h3 class="mt-2">
                      No Available Files
                    </h3>
                  </b-col>
                  <b-col v-for="patient_added_file in patient_added_files" :key="patient_added_file.id" xl="4" lg="4" class="mb-3">
                    <div v-b-popover.hover.top="patient_added_file.filename" class="text-center">
                      <b-row>
                        <b-col xl="8" lg="8" class="pr-0">
                          <div class="bg-secondary text-light text-truncate pl-1 pr-1" style="height: 100%; line-height: 26px;">
                            {{ patient_added_file.filename }}
                          </div>
                        </b-col>
                        <b-col xl="2" lg="2" class="pl-0">
                          <b-button variant="info" size="sm" @click="localDownload(patient_added_file.file)">
                            <download-icon size="1x" class="custom-class" />
                          </b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>

                <b-row class="mt-5">
                  <b-col cols="12" xl="12" lg="12">
                    <b-row>
                      <b-col xs="6" lg="6" class="label-headline bold">
                        Medical History
                      </b-col>
                      <b-col xs="6" lg="6" class="normal text-right pointer" @click="$router.push({ path: '/history/' })">
                        View Complete History <arrow-right-icon size="1x" />
                      </b-col>
                    </b-row>
                    <b-row class="mt-4">
                      <b-col xs="12">
                        <!-- FAILED REQUEST HANDLER -->
                        <b-row v-if="$store.getters.fetchedUserMedicalHistories.status === 'REJECTED'">
                          <b-col xs="12">
                            <b-alert variant="danger" show>
                              Oops, something went wrong...
                            </b-alert>
                          </b-col>
                        </b-row><!-- FAILED REQUEST HANDLER -->

                        <!-- RECORD LIST -->
                        <b-row>
                          <b-col xs="12">
                            <b-table
                              :busy="$store.getters.fetchedUserMedicalHistories.status === 'PENDING'"
                              :items="items"
                              :fields="fields"
                              :no-local-sorting="true"
                              hover
                              responsive
                              foot-clone
                              @sort-changed="handleSortChange"
                            >
                              <!-- Busy state -->
                              <div slot="table-busy" class="text-center text-success my-2">
                                <b-spinner type="grow" class="align-middle" />
                                <strong>Loading...</strong>
                              </div><!-- Busy state -->

                              <!-- A Virtual column -->
                              <template slot="action" slot-scope="data">
                                <nuxt-link :to="{path: `/patient_records/form/${data.item.id}`, query: $route.query}">
                                  <b-button pill variant="outline-info" size="sm" class="mt-2">
                                    <edit-icon size="1.25x" />
                                  </b-button>
                                </nuxt-link>
                                <b-button pill variant="outline-danger" size="sm" class="mt-2" @click="handleConfirmDelete(data.item)">
                                  <x-circle-icon size="1.25x" />
                                </b-button>
                              </template><!-- A Virtual column -->
                            </b-table>
                          </b-col><!-- PAGINATION -->
                        </b-row><!-- RECORD LIST -->
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import $ from 'jquery'
// import Dropzone from 'nuxt-dropzone'
// import LeftSideServiceProvider from '~/components/module_templates/appointments/LeftSideServiceProvider.vue'
import LeftSideDetails from '~/components/module_templates/appointments/LeftSideDetails.vue'
// import PatientQueue from '~/components/patient_queue/PatientQueue.vue'
import 'nuxt-dropzone/dropzone.css'

const endpoint = process.env.REST_API_ENDPOINT

export default {
  components: {
    // LeftSideServiceProvider,
    LeftSideDetails,
    // PatientQueue,
    // Dropzone
  },
  data () {
    return {
      is_disabled: false,
      mainProps: { blank: true, blankColor: '#777', width: 80, height: 80, class: 'm1' },
      appointment_status: 'PENDING',
      doctor_added_files: [],
      patient_added_files: [],
      provider_files: [],
      item: {
        provider: 0,
        provider_image: '- - - -',
        provider_name: '- - - -',
        provider_occupation: '- - - -',
        provider_note: '',
        user: {
          image_url: '',
          full_name: '- - - -',
          is_active: false,
          mobile: '- - - -',
          birth_date: '- - - -',
          email: '- - - -'
        }
      },
      items: [],
      fields: [],
      checked: false,
      dropzoneOptions: {
        url: `${process.env.REST_API_ENDPOINT}/files/`,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        maxFilesize: 2,
        addRemoveLinks: true,
        headers: {
          Authorization: `${this.$store.getters.auth.token_type} ${this.$store.getters.auth.access_token}`,
          'Cache-Control': null,
          'X-Requested-With': null
        },
        success: (res) => {
          const response = JSON.parse(res.xhr.response)
          const splitFile = response.file.split('/')
          const filename = splitFile[splitFile.length - 1]
          this.doctor_added_files.push({ id: response.id, file: response.file, filename })
          this.provider_files.push(response.id)
        },
      },
      providerInClinic: false,
      retrievedAppointment: {}
    }
  },
  mounted () {
    // Fetch data on-load
    this.fetch(this.$route.query)
    this.fetchRetrieveAppointment()
  },
  methods: {
    getProviderDetails () {
      const assistantDetails = this.$store.getters.auth.assistant_details
      this.$axios.get(`${endpoint}/assistant/providers/${this.item.provider}/`, {
        params: {
          light_mode: true,
          location_id: assistantDetails.default_location,
        }
      }).then((response) => {
        this.providerInClinic = response.data.in_clinic
      }).catch((e) => {
        console.log(e)
      })
    },
    getImageUrl (imageId) {
      const { width, height } = this.mainProps
      return `https://via.placeholder.com/${width}/${height}`
    },
    async queueComplete (file, xhr, formData) {
      this.$refs.files.removeAllFiles()
      await this.$store.dispatch('updateAppointment', {
        id: this.$route.params.id,
        data: { provider_files: this.provider_files }
      })
    },
    sendingEvent (file, xhr, formData) {
      formData.append('file', file)
    },
    cancelAppointment () {
      this.$swal({
        input: 'textarea',
        title: 'Note',
        text: 'Add notes to continue',
        type: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.value === false) { return false }

        if (result.value === '') {
          this.$swal({
            title: '',
            text: 'Note is required',
            type: 'warning',
          })
          return false
        }

        if (result.value) {
          this.handleCancelAppointment(this.$route.params.id, result.value)
        }
      })
    },
    async handleCancelAppointment (id, note) {
      await this.$store.dispatch('cancelAppointment', {
        id,
        data: { note }
      })
      this.submitted = this.$store.getters.cancelledAppointment
      if (this.submitted.status === 'FULFILLED') {
        this.$swal({
          title: 'Success',
          text: 'Appointment has been successfully cancelled!',
          type: 'success',
        })
        this.item.status = 'cancelled'
      }
    },
    closeAppointment () {
      this.$swal({
        title: 'Confirmation',
        text: 'Are you sure you want to close this appointment?',
        type: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.handleCloseAppointment(this.$route.params.id)
        }
      })
    },
    async handleCloseAppointment (id, note) {
      await this.$store.dispatch('closeAppointment', {
        id,
        data: { note }
      })
      this.submitted = this.$store.getters.closedAppointment
      if (this.submitted.status === 'FULFILLED') {
        this.$swal({
          title: 'Success',
          text: 'Appointment has been successfully closed!',
          type: 'success',
        })
        this.item.status = 'closed'
      } else {
        const response = this.submitted.res
        this.$swal({
          title: '',
          text: response.details.join(),
          type: 'warning'
        })
      }
    },
    handleSortChange (ctx) {
      const query = {
        ...this.$route.query,
        sortBy: ctx.sortBy,
        sortDesc: ctx.sortDesc,
      }
      if (ctx.sortBy) {
        this.fetch(query)
      }
    },
    deleteDoctorFile (id, index) {
      this.$swal({
        title: 'Confirmation',
        text: 'Are you sure you want to delete this record?',
        type: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.doctor_added_files.splice(index, 1)
          this.handleDelete(id)
        }
      })
    },
    localDownload (urlLink) {
      const link = document.createElement('a')
      $(link).attr('target', '_blank')
      link.href = urlLink
      link.setAttribute('download', urlLink) // or any other extension
      document.body.appendChild(link)
      link.click()
      window.focus()
    },
    async updateAppointments () {
      await this.$store.dispatch('updateAppointment', {
        id: this.$route.params.id,
        data: { provider_note: this.item.provider_note },
      })
      this.submitted = this.$store.getters.updatedAppointment
      if (this.submitted.status === 'FULFILLED') {
        this.$swal({
          title: 'Success',
          text: 'Appointment Notes has been successfully updated!',
          type: 'success',
        })
      }
    },
    async fetch (params = {}) {
    // fetch method came from vuex store actions
      await this.$store.dispatch('fetchUserMedicalHistories', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedUserMedicalHistories
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
      // Get value from 'res' key
        const { res } = fetched
        // Record Fields
        this.fields = [
          { key: 'blood_type', label: 'Blood Type', sortable: true },
          { key: 'height', label: 'Height', sortable: true },
          { key: 'width', label: 'Status', sortable: true },
          { key: 'weight', label: 'Gender', sortable: true },
          { key: 'bmi', label: 'Email', sortable: true }
        ]
        // Records
        this.items = res.results

        // Push State
        this.$router.push({ query: params })
      }
    },
    async fetchRetrieveAppointment () {
      await this.$store.dispatch('retrieveAppointment', { id: this.$route.params.id })
      const fetched = this.$store.getters.retrievedAppointment
      // If retrieval is successfull, populate the form
      this.appointment_status = fetched.status
      if (fetched.status === 'FULFILLED') {
        this.item = fetched.res
        for (const key in this.item.provider_files) {
          const doctorAttachment = this.item.provider_files[key]
          const splitFile = doctorAttachment.file.split('/')
          const filename = splitFile[splitFile.length - 1]
          this.doctor_added_files.push({ id: doctorAttachment.id, file: doctorAttachment.file, filename })
        }

        for (const key in this.item.files) {
          const patientAttachment = this.item.files[key]
          const splitPatientFile = patientAttachment.file.split('/')
          const patientFilename = splitPatientFile[splitPatientFile.length - 1]
          this.patient_added_files.push({ id: patientAttachment.id, file: patientAttachment.file, filename: patientFilename })
        }
        this.getProviderDetails()
      }
    },
    async handleDelete (id) {
      // Delete methon from vuex store
      await this.$store.dispatch('deleteFile', { id })
      // Check if deletion request is successfull
      const deleted = this.$store.getters.deletedFile
      if (deleted.status === 'FULFILLED') {
        this.$swal({
          title: 'Success',
          text: `ID# ${id} has been successfully deleted!`,
          type: 'success',
        })
        this.fetch()
      } else {
        this.$swal({ title: 'Oops!', text: `Failed to delete ID# ${id}`, type: 'error' })
      }
    }
  }
}
</script>
<style scoped>
  .patient-queue {
    min-width: auto;
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
<style>
  #appointment-header-status {
    background-color: var(--cool-green);
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  #appointment-status {
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  #outline-primary-radius-type {
    border-radius: 1rem;
  }

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
