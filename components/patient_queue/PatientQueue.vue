<template>
  <b-card v-if="Object.keys(provider).length" class="patient-queue scrollable-card m-4 p-2" :class="popUp ? 'arrow-up': ''">
    <b-row>
      <b-col cols="12">
        <div class="cc-date-wrapper float-left">
          <calendar-icon size="3x" />
          <div class="cc-date-content">
            <div class="cc-date-month small-black">
              {{ currentDate.month }}
            </div>
          </div>
        </div>
        <div class="pl-2 float-left">
          <div class="sub-label-88 semi-bold">
            {{ currentDate.dayDo }}'s Queue
          </div>
          <div class="small">
            {{ currentDate.dayName }}
          </div>
        </div>
      </b-col>
      <b-col cols="12" class="mt-3">
        <SearchField v-model="search" search-place-holder="Search Patient Name or Appointment ID" @searchValue="onSearch" />
      </b-col>
    </b-row>
    <b-row v-if="providers.length" class="mb-2">
      <b-col cols="12">
        <hr />
      </b-col>
    </b-row>
    <b-row v-if="providers.length" class="mb-4">
      <b-col cols="6">
        <template v-if="typeof providers[prevIndex] !== 'undefined' && currentIndex">
          <chevron-left-icon size="1.5x" class="float-left" />
          <div
            class="provider-paginator cursor-pointer"
            :title="providers[prevIndex].provider_name"
            @click="handleProviderToggle(providers[prevIndex])"
          >
            {{ providers[prevIndex].provider_name }}
          </div>
        </template>
      </b-col>
      <b-col cols="6" class="text-right">
        <template v-if="typeof providers[nextIndex] !== 'undefined'">
          <chevron-right-icon size="1.5x" class="float-right" />
          <div
            class="provider-paginator cursor-pointer"
            :title="providers[nextIndex].provider_name"
            @click="handleProviderToggle(providers[nextIndex])"
          >
            {{ providers[nextIndex].provider_name }}
          </div>
        </template>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols="2">
        <b-img
          rounded="circle"
          :width="32"
          :height="32"
          :src="provider.provider_image || getImageUrl(32)"
          :alt="provider.provider_name"
        />
      </b-col>
      <b-col cols="10">
        <b-row class="mt-1">
          <b-col v-b-tooltip.hover :title="provider.provider_name" xl="12" lg="12" class="provider-name label-headline bold">
            {{ provider.provider_name }}
          </b-col>
          <b-col xl="12" lg="12" class="headline-basic black-88">
            {{ provider.provider_occupation }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <in-clinic-without-modal :provider="{id: provider.provider_id, user: {fullname: ''}}" />
    </b-row>
    <b-row class="mb-2">
      <b-col>
        <drop
          style="width: 100%"
          :class="{ over }"
          @dragover="over = true"
          @dragleave="over = false"
          @drop="handleCurrentAppointment"
        >
          <current-patient
            v-if="date === actualCurrentDate || !date"
            :refresh="refreshCurrentAppointment"
            :location="location"
            :provider="provider"
            @refresh-provider-appointments="handleRefreshProviderAppointments"
          />
          <b-row v-else>
            <b-col cols="12">
              <div class="current-appointment over">
                <div class="p-4">
                  <div class="text-center normal mt-5 mb-3">
                    <strong>DOCTOR NOT IN CLINIC</strong>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </drop>
      </b-col>
    </b-row>
    <b-row class="mb-3 mt-3">
      <b-col cols="6">
        <div class="normal bold">
          NEXT IN LINE
        </div>
      </b-col>
      <b-col cols="6">
        <div v-if="loadingAppointments" class="text-right small">
          <b-spinner small type="grow" class="align-middle" />
          <strong>Retrieving updates...</strong>
        </div>
      </b-col>
    </b-row>
    <template v-if="filteredAppintments.length === 0">
      <h1 class="sub-label ">
        No result
      </h1>
    </template>
    <!-- Busy state -->
    <!-- <template v-if="loadingAppointments">
      <b-row>
        <b-col cols="12">

          <div class="text-center text-success my-2">
            <b-spinner type="grow" class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </b-col>
      </b-row>
    </template> -->
    <!-- Busy state -->
    <!-- <template v-if="loadingAppointments === false && providerAppointments.status === 'FULFILLED'"> -->
    <template v-if="filteredAppintments.length">
      <b-row>
        <b-col cols="12" class="patient-queue-scrollable">
          <!-- Pinned Draggable List -->
          <draggable class="patient-rows-wrapper">
            <template v-for="(result, index) in filteredAppintments">
              <drag
                v-if="result.in_clinic && result.pinned"
                :key="index"
                :transfer-data="result"
                :effect-allowed="['move']"
                drop-effect="move"
                class="patient-queue-rows cursor-pointer patient-in-clinic-pinned"
                @dragend="setPatientQueueItemIndices"
              >
                <patient-queue-item
                  :sort="keys[result.id]"
                  :result="result"
                  :class="`patient-queue-item-${provider.provider_id}`"
                  :data-id="result.id"
                  :data-sort="result.sort_order"
                  :data-pinned="result.pinned"
                  :prioritization="prioritization"
                  @refresh-provider-appointments="handleRefreshProviderAppointments"
                />
              </drag>
            </template>
          </draggable>
          <!-- Pinned Non Draggable List -->
          <!-- Draggable List -->
          <draggable class="patient-rows-wrapper">
            <template v-for="(result, index) in filteredAppintments">
              <drag
                v-if="result.in_clinic && result.pinned == false"
                :key="index"
                :transfer-data="result"
                :effect-allowed="['move']"
                drop-effect="move"
                class="patient-queue-rows cursor-pointer patient-in-clinic"
                @dragend="setPatientQueueItemIndices"
              >
                <patient-queue-item
                  :sort="keys[result.id]"
                  :result="result"
                  :class="`patient-queue-item-${provider.provider_id}`"
                  :data-id="result.id"
                  :data-sort="result.sort_order"
                  :data-pinned="result.pinned"
                  :prioritization="prioritization"
                  @refresh-provider-appointments="handleRefreshProviderAppointments"
                />
              </drag>
            </template>
          </draggable>
          <!-- Draggable List -->
          <!-- Non Draggable List -->
          <template v-for="(result, index) in filteredAppintments">
            <drag
              v-if="!result.in_clinic"
              :key="index"
              :transfer-data="result"
              :effect-allowed="['move']"
              drop-effect="move"
              class="patient-queue-rows cursor-pointer patient-out-clinic"
            >
              <patient-queue-item
                :sort="keys[result.id]"
                :result="result"
                :data-id="result.id"
                :prioritization="prioritization"
                @refresh-provider-appointments="handleRefreshProviderAppointments"
              />
            </drag>
          </template><!-- Non Draggable List -->
        </b-col>
      </b-row>
    </template>
  </b-card>
  <div v-else>
    No Apointment Selected
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'
import { Drag, Drop } from 'vue-drag-drop'
import SearchField from '~/components/module_templates/SearchField.vue'
import CurrentPatient from '~/components/patient_queue/CurrentPatient.vue'
import InClinicWithoutModal from '~/components/service_providers/InClinicWithoutModal.vue'
import PatientQueueItem from '~/components/patient_queue/PatientQueueItem.vue'

const endpoint = process.env.REST_API_ENDPOINT

export default {
  components: {
    SearchField,
    Drag,
    Drop,
    CurrentPatient,
    InClinicWithoutModal,
    PatientQueueItem,
  },
  props: {
    popUp: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: [Boolean, String, Object],
      default: false
    },
    provider: {
      type: Object,
      default: () => {}
    },
    providers: {
      type: Array,
      default: () => []
    },
    date: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      avatarProps: { blank: true, blankColor: '#777', width: 32, height: 32, class: 'm1' },
      currentDate: { dayName: '', day: '', month: '' },
      providerAppointments: { res: [] },
      loadingAppointments: false,
      refreshCurrentAppointment: null,
      actualCurrentDate: moment(new Date()).format('YYYY-MM-DD'),
      location: null,
      locationDetails: {},
      over: false,
      search: '',
      prevIndex: 0,
      currentIndex: 0,
      nextIndex: 0,
      keys: {},
      prioritization: ''
    }
  },
  computed: {
    filteredAppintments () {
      return this.providerAppointments.res.filter((result) => {
        return String(result.patient_name).toLowerCase().includes(this.search.toLowerCase()) || String(result.id) === this.search
      })
    }
  },
  watch: {
    refresh (newValue) {
      if (newValue) {
        this.fetch()
      }
    },
    provider (newValue, oldValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        const params = {
          provider_id: newValue.provider_id,
          others: {
            provider_id: newValue.provider_id
          }
        }
        this.fetch(params)
      }
      if (newValue) {
        this.refreshCurrentAppointment = newValue.provider_id
      }
    },
    date (newValue, oldValue) {
      this.handleDateChange()
    },
  },
  mounted () {
    this.handleDateChange()
    this.fetch({ per_page: 0 })
    $(document).click((event) => {
      if (this.popUp &&
          !$(event.target).closest('.patient-queue').length &&
          !$(event.target).closest('.fc-event-container').length &&
          !$(event.target).closest('.btn-patient-queue').length &&
          !$(event.target).closest('.swal2-container').length
      ) {
        this.$emit('popup-toggle', false)
      }
    })
    setInterval(async () => {
      await this.fetch({ per_page: 0 })
      if (this.loadingAppointments === true && this.filteredAppintments.length > 0) {
        Object.assign(this.filteredAppintments, ...this.filteredAppintments)
      }
    }, 30000)
  },
  methods: {
    async fetch (params = {}) {
      this.getLocation()
      let ordering = 'sort_order,time_from'
      if (this.location) {
        Object.assign(params, {
          location_id: this.location
        })
        if (this.prioritization === 'fcfs') {
          ordering = 'sort_order,id'
        }
      }
      this.loadingAppointments = true

      if (!this.date) {
        Object.assign(params, { is_today: true })
      } else {
        Object.assign(params, { date: this.date })
      }

      await this.$store.dispatch('fetchAppointments', {
        mutation: 'setProviderAppointments',
        per_page: 0,
        provider_id: this.provider.provider_id,
        statuses: 'new,resched',
        ordering,
        others: { provider_id: this.provider.provider_id },
        ...params,
      })
      this.loadingAppointments = false

      if (typeof this.provider.provider_id !== 'undefined') {
        this.providerAppointments = this.$store.getters.providerAppointments[this.provider.provider_id]
      }
      // For today's queue view
      this.getCurrentProviderIndex()
      this.setPatientQueueItemIndicesNoSave()
    },
    handleDateChange () {
      if (!this.date) {
        this.currentDate = {
          dayName: moment().format('dddd'),
          day: moment().format('D'),
          dayDo: moment().format('Do'),
          month: moment().format('MMM'),
        }
      } else {
        this.currentDate = {
          dayName: moment(this.date).format('dddd'),
          day: moment(this.date).format('D'),
          dayDo: moment(this.date).format('Do'),
          month: moment(this.date).format('MMM'),
        }
      }
    },
    handleCurrentAppointment (data) {
      this.over = false
      if (data) {
        if (this.date === this.actualCurrentDate) {
          if (this.provider.in_clinic) {
            if (data.in_clinic) {
              this.$axios.put(`${endpoint}/assistant/providers/${data.provider}/current_appointment/`, {
                appointment_id: data.id
              })
                .then((response) => {
                  this.fetch()
                  this.refreshCurrentAppointment = data.id
                })
                .catch((e) => { this.errorHandler(e) })
            } else {
              this.$swal({ title: 'Oops!', text: 'Patient must be in clinic', type: 'warning' })
            }
          } else {
            this.$swal({ title: 'Oops!', text: 'Service Provider must be in clinic', type: 'warning' })
          }
        } else {
          this.$swal({ title: 'Oops!', text: 'Date must me current date', type: 'warning' })
        }
      }
    },
    handleRefreshProviderAppointments (value) {
      if (value) {
        this.fetch()
      }
    },
    handleProviderToggle (provider) {
      this.$emit('provider-toggle', provider)
    },
    onSearch (search) {
      this.search = search
    },
    getLocation () {
      // Location
      if (this.$store.getters.auth.assistant_details) {
        const details = this.$store.getters.auth.assistant_details
        this.location = details.default_location
        for (const key in details.locations) {
          const location = details.locations[key]
          if (location.id === details.default_location) {
            this.locationDetails = location
            this.prioritization = location.prioritization
            break
          }
        }
      }
    },
    getImageUrl (size) {
      return `https://via.placeholder.com/${size}/${size}`
    },
    getCurrentProviderIndex () {
      const stringProvider = JSON.stringify(this.provider)
      for (const index in this.providers) {
        const strProvider = JSON.stringify(this.providers[index])
        if (strProvider === stringProvider) {
          this.prevIndex = Number(index) - 1
          this.currentIndex = index
          this.nextIndex = Number(index) + 1
          break
        }
      }
    },
    setPatientQueueItemIndicesNoSave () {
      setTimeout(() => {
        $(`.patient-queue-item-${this.provider.provider_id}`).each((index, row) => {
          const sort = index + 1
          const id = Number($(row).data('id'))
          this.keys = { ...this.keys, [id]: sort }
        })
      }, 100)
    },
    setPatientQueueItemIndices (value) {
      setTimeout(() => {
        const ids = []
        let firstIds = []
        $(`.patient-queue-item-${this.provider.provider_id}`).each((index, row) => {
          const sort = index + 1
          const id = Number($(row).data('id'))
          this.keys = { ...this.keys, [id]: sort }
          ids.push(id)
          if (id === value.id) {
            firstIds = [...ids]
          }
        })
        setTimeout(() => {
          const lastIds = _.xor(ids, firstIds)
          this.$axios.put(`${endpoint}/assistant/appointments/sort_order_bulk/`, {
            ids: firstIds.join(','),
            last_ids: lastIds.join(',')
          }).catch((e) => { this.errorHandler(e) })
        }, 100)
      }, 100)
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
  background: var(--very-light-pink-two);
}
.provider-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
