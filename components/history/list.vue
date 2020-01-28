<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12">
      <b-row>
        <b-col xs="12" lg="12" class="headline">
          Clinic Records
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12" lg="12" class="caption">
          {{ count }} Appointment Records
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col xs="12">
          <!-- SEARCH FORM -->
          <b-row>
            <b-col cols="6">
              <b-form-select v-model="perPage" class="sm" :options="per_pages" @change="handlePerPageChange" />
            </b-col>
            <b-col cols="4">
              <date-range-picker
                ref="picker"
                v-model="dateRange"
                :clear-button="true"
                :locale-data="locale"
                :start-date="startDate"
                :end-date="endDate"
                @update="handleDateRange"
              >
                <div slot="input" style="min-width: 350px;">
                  <div v-if="$route.query.date_from_min">
                    {{ $route.query.date_from_min }} - {{ $route.query.date_from_max }}
                  </div>
                  <div v-else>
                    Search Date and Time
                  </div>
                </div>
              </date-range-picker>
            </b-col>
            <b-col v-if="$route.query.date_from_min" cols="2">
              <b-button variant="info" size="sm" right @click="clearDateRange">
                <x-icon size="1x" /> Clear Date and Time
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col cols="3">
              <v-multiselect
                v-model="status"
                placeholder="Search for status"
                label="text"
                track-by="value"
                :options="appointment_status"
                :multiple="true"
                @input="handleStatus"
              />
            </b-col>
            <!-- <b-col cols="3">
              <b-form-select v-model="status" class="sm" :options="appointment_status" @change="handleStatus" />
            </b-col> -->
            <b-col cols="3">
              <v-multiselect
                v-model="service"
                placeholder="Search for service"
                label="text"
                track-by="value"
                :options="services"
                :multiple="true"
                @input="handleService"
              />
              <!-- <b-form-select v-model="service" class="sm" :options="services" @change="handleService" /> -->
            </b-col>
            <b-col cols="4">
              <v-multiselect
                v-model="location"
                placeholder="Search for Clinic"
                label="text"
                track-by="value"
                :options="locations"
                :multiple="enableMultipleLocations"
                @input="handleLocation"
              />
              <!-- <b-form-select v-model="service" class="sm" :options="services" @change="handleService" /> -->
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col cols="3">
              <v-multiselect
                v-model="appointmentType"
                placeholder="Search for Type"
                label="text"
                track-by="value"
                :options="appointmentTypes"
                :multiple="false"
                @input="handleAppointmentTypes"
              />
              <!-- <b-form-select v-model="service" class="sm" :options="services" @change="handleService" /> -->
            </b-col>
            <b-col cols="6">
              <form
                method="post"
                class="mb-4"
                @submit.prevent="handleSearch"
              >
                <SearchField search-place-holder="Search name of appointments" @searchValue="onSearch" />
              </form>
            </b-col>
          </b-row>
          <!-- SEARCH FORM -->

          <!-- FAILED REQUEST HANDLER -->
          <b-row v-if="$store.getters.fetchedAppointments.status === 'REJECTED'">
            <b-col xs="12">
              <b-alert variant="danger" show>
                Oops, something went wrong...
              </b-alert>
            </b-col>
          </b-row><!-- FAILED REQUEST HANDLER -->

          <!-- RECORD LIST -->
          <b-row class="mt-2">
            <b-col xs="12">
              <b-table
                :busy="$store.getters.fetchedAppointments.status === 'PENDING'"
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
                <template v-slot:cell(appointment_type)="data">
                  <b-badge v-if="data.item.appointment_type === 'online'" pill variant="primary">
                    <globe-icon size="1x" /> ONLINE
                  </b-badge>
                  <b-badge v-else-if="data.item.appointment_type === 'manual'" pill variant="info">
                    <edit-icon size="1x" /> MANUAL
                  </b-badge>
                  <b-badge v-else pill variant="success">
                    <book-icon size="1x" /> WALK-IN
                  </b-badge>
                </template><!-- A Virtual column -->

                <!-- A Virtual column -->
                <template v-slot:cell(status)="data">
                  <b-badge v-if="data.item.status === 'new'" variant="success">
                    NEW
                  </b-badge>
                  <b-badge v-else-if="data.item.status === 'active'" variant="info">
                    ACTIVE
                  </b-badge>
                  <b-badge v-else-if="data.item.status === 'closed'" variant="secondary">
                    CLOSED
                  </b-badge>
                  <b-badge v-else variant="danger">
                    CANCELLED
                  </b-badge>
                </template><!-- A Virtual column -->

                <!-- A Virtual column -->
                <template v-slot:cell(action)="data">
                  <nuxt-link :to="{path: `/history/${data.item.id}`, query: $route.query}">
                    <b-button pill variant="outline-info" size="sm">
                      <search-icon size="1.25x" />
                    </b-button>
                  </nuxt-link>
                </template><!-- A Virtual column -->
              </b-table>
              <hr>
              <!-- PAGINATION -->
              <b-pagination-nav
                v-if="totalPages > 1"
                v-model="currentPage"
                align="right"
                :link-gen="linkGen"
                :number-of-pages="totalPages"
                use-router
                @change="handlePageChange"
              />
            </b-col><!-- PAGINATION -->
          </b-row><!-- RECORD LIST -->
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment'
import SearchField from '~/components/module_templates/SearchField.vue'
import { formatPretty } from '~/utils/formatters'
import { serialize } from '~/utils/helpers'
import PagesMixin from '~/utils/mixins/pages.js'
import StatusesMixin from '~/utils/mixins/status.js'

export default {
  components: {
    SearchField
  },
  mixins: [PagesMixin, StatusesMixin],
  data () {
    return {
      dateRange: '',
      startDate: '',
      endDate: '',
      locale: {
        direction: 'ltr', // direction of text
        format: 'YYYY-MM-DD', // fomart of the dates displayed
        separator: ' - ', // separator between the two ranges
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: moment.weekdaysMin(), // array of days - see moment documenations for details
        monthNames: moment.monthsShort(), // array of month names - see moment documenations for details
        firstDay: 1 // ISO first day of week - see moment documenations for details
      },
      appointmentType: '',
      appointmentTypes: [
        { value: 'online', text: 'Online' },
        { value: 'walk-in', text: 'Walk-in' },
        { value: 'online', text: 'Manual' }
      ],
      search: '',
      fields: [],
      items: [],
      perPage: 10,
      service: [],
      services: [],
      location: [],
      locations: [],
      enableMultipleLocations: false,
      status: [],
      currentPage: 1,
      totalPages: 1,
      count: 0
    }
  },
  async created () {
    // Services
    // this.services.push({ value: '', text: 'all services' })
    await this.$store.dispatch('fetchAssistantServices')
    const fetchedLocations = this.$store.getters.fetchedAssistantServices
    // If retrieval is successfull, populate the form
    if (fetchedLocations.status === 'FULFILLED') {
      const servicesData = fetchedLocations.res.results
      for (const index in servicesData) {
        this.services.push({ value: servicesData[index].id, text: servicesData[index].name })
      }

      if (this.$route.query.service_ids) {
        const services = this.$route.query.service_ids.split(',')
        const serviceIds = []
        console.log('test value', services)
        for (const key in services) {
          serviceIds.push(parseInt(services[key]))
        }

        for (const key in this.services) {
          if (serviceIds.includes(this.services[key].value)) {
            this.service.push({ value: this.services[key].value, text: this.services[key].text })
          }
        }
        console.log('final service', this.service)
      }
    }

    // get location list
    await this.$store.dispatch('fetchLocations', { per_page: 50 })
    const fetchedClinics = this.$store.getters.fetchedLocations
    if (fetchedClinics.status === 'FULFILLED') {
      const locationData = fetchedClinics.res.results
      for (const index in locationData) {
        this.locations.push({ value: locationData[index].id, text: locationData[index].name })
      }

      if (this.$route.query.location_ids) {
        const locations = this.$route.query.location_ids.split(',')
        const locationIds = []
        console.log('test value', locations)
        for (const key in locations) {
          locationIds.push(parseInt(locations[key]))
        }

        for (const key in this.locations) {
          if (locationIds.includes(this.locations[key].value)) {
            this.locations.push({ value: this.locations[key].value, text: this.locations[key].text })
          }
        }
      }
    }
  },
  mounted () {
    // Fetch data on-load
    console.log('route', this.$route.query)
    this.fetch(this.$route.query)
    // this.status = this.status.split(',')
    if (this.$route.query.statuses) {
      const statuses = this.$route.query.statuses.split(',')
      for (const key in statuses) {
        this.status.push({ value: statuses[key], text: statuses[key] })
      }
    }
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'List of Appointment Records',
    }
  },
  methods: {
    formatDates (date) {
      if (date === null || date === '') {
        return null
      }
      return moment(date).format('YYYY-MM-DD')
    },
    // Generate link of pagination
    linkGen (pageNum) {
      const query = Object.assign({ page: null }, this.$route.query)
      const queryString = serialize(query)
      if (pageNum === 1) {
        return `?${queryString ? 'page=1&' + queryString : ''}`
      }
      return `?page=${pageNum}${queryString ? '&' + queryString : ''}`
    },
    // Custom Fetch function, use to manipulate records
    async fetch (params = {}) {
      // fetch method came from vuex store actions
      console.log('test nag fetch', params.location_ids[0])
      let ordering = '-date_to'
      if (params.ordering) { ordering = (params.ordering.split(',')[0] + ',-date_to') }

      params.ordering = ordering

      if (params.location_ids) {
        // hack until appointment accepts multiple location ids
        params.location_id = params.location_ids[0] || ''
      } else {
        params.location_id = ''
      }

      console.log('final params for fetch', params)
      await this.$store.dispatch('fetchAppointments', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedAppointments
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
        // Get value from 'res' key
        const { res } = fetched
        // Record Fields
        this.fields = [
          { key: 'appointment_type', label: 'Type', sortable: true },
          { key: 'id', label: 'ID', sortable: true },
          { key: 'status', label: 'Status', sortable: true },
          { key: 'patient_name', label: 'Patient Name', sortable: true },
          { key: 'date_from', label: 'Date and Time', formatter: formatPretty, sortable: true },
          { key: 'provider_name', label: 'Service Provider', sortable: true },
          { key: 'service_name', label: 'Service', sortable: true },
          // { key: 'rate', label: 'Rate', sortable: true },
          { key: 'action', label: 'Action' }
        ]
        // Records
        this.items = res.results
        // Result per page
        this.perPage = res.per_page
        // Current page
        this.currentPage = params.page
        // Records count
        this.count = res.count
        // Total number of pages
        this.totalPages = res.total_pages
        // Search Field
        this.search = params.search || ''
        // Push State
        this.$router.push({ query: params })
      }
    },
    onSearch (search) {
      this.search = search
    },
    // Search
    handleSearch () {
      this.fetch({
        ...this.$route.query,
        search: this.search,
      })
    },
    handlePerPageChange (page) {
      this.fetch({
        ...this.$route.query,
        per_page: this.perPage,
      })
    },
    handleStatus (status) {
      let statusCodes = []
      for (const key in status) {
        statusCodes.push(status[key].value)
      }

      if (statusCodes && statusCodes.length > 0) {
        statusCodes = statusCodes.join()
      }

      this.fetch({
        ...this.$route.query,
        statuses: statusCodes,
      })
    },
    handleDateRange (date) {
      this.fetch({
        ...this.$route.query,
        date_from_min: this.formatDates(date.startDate),
        date_from_max: this.formatDates(date.endDate),
      })
    },
    clearDateRange () {
      this.fetch({
        ...this.$route.query,
        date_from_min: null,
        date_from_max: null,
      })
    },
    handleService (service) {
      let serviceCodes = []
      for (const key in service) {
        serviceCodes.push(service[key].value)
      }

      if (serviceCodes && serviceCodes.length > 0) {
        serviceCodes = serviceCodes.join()
      }

      this.fetch({
        ...this.$route.query,
        service_ids: serviceCodes,
      })
    },
    handleLocation (location) {
      let locationCodes = []

      if (this.enableMultipleLocations === true) {
        for (const key in location) {
          console.log('etestetse', location[key].value)
          locationCodes.push(location[key].value)
        }

        if (locationCodes && locationCodes.length > 0) {
          locationCodes = locationCodes.join()
        }
      } else {
        console.log(location)
        if (location) {
          locationCodes.push(location.value)
        }
      }

      this.fetch({
        ...this.$route.query,
        location_ids: locationCodes,
      })
    },
    handleAppointmentTypes (type) {
      let appointmentType = ''
      if (type) {
        appointmentType = type.value
      }
      this.fetch({
        ...this.$route.query,
        appointment_type: appointmentType,
      })
    },
    // Page Change Handler
    handlePageChange (page) {
      this.$route.query.ordering = ''
      this.fetch({
        ...this.$route.query,
        page,
      })
    },
    // Sort change handler
    handleSortChange (ctx) {
      const query = this.$route.query
      if (ctx.sortBy) {
        Object.assign(query, {
          ordering: `${ctx.sortDesc === true ? '-' : ''}${ctx.sortBy}`
        })

        this.fetch(query)
      }
    },
  }
}
</script>
