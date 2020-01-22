<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12">
      <b-card footer-tag="footer">
        <b-row>
          <b-col xs="12">
            <!-- SEARCH FORM -->
            <b-row>
              <b-col cols="3">
                <b-form-select v-model="perPage" class="sm" :options="per_pages" @change="handlePerPageChange" />
              </b-col>

              <b-col cols="6">
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

              <b-col v-if="$route.query.date_from_min" cols="3">
                <b-button variant="info" size="sm" right @click="clearDateRange">
                  <x-icon size="1x" /> Clear Date and Time
                </b-button>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="4">
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
              <b-col cols="4">
                <v-multiselect
                  v-model="service"
                  placeholder="Search for service"
                  label="text"
                  track-by="value"
                  :options="services"
                  :multiple="true"
                  @input="handleService"
                />
              </b-col>
              <b-col cols="4">
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
            <b-row>
              <b-col cols="12" xs="12">
                <b-table
                  :busy="$store.getters.fetchedAppointments.status === 'PENDING'"
                  :items="items"
                  :fields="fields"
                  :no-local-sorting="true"
                  hover
                  responsive
                  striped
                  foot-clone
                  @sort-changed="handleSortChange"
                >
                  <!-- Busy state -->
                  <div slot="table-busy" class="text-center text-success my-2">
                    <b-spinner type="grow" class="align-middle" />
                    <strong>Loading...</strong>
                  </div><!-- Busy state -->

                  <template v-slot:cell(rate)="data">
                    <div class="text-right">
                      {{ Number(data.item.rate).toFixed(2) }}
                    </div>
                  </template>
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
      </b-card>
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
      search: '',
      fields: [],
      items: [],
      perPage: 10,
      service: [],
      services: [],
      status: [],
      currentPage: 1,
      totalPages: 1,
      count: 0,
      toDelete: {}
    }
  },
  async created () {
    // Services
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
        for (const key in services) {
          serviceIds.push(parseInt(services[key]))
        }

        for (const key in this.services) {
          if (serviceIds.includes(this.services[key].value)) {
            this.service.push({ value: this.services[key].value, text: this.services[key].text })
          }
        }
      }
    }
  },
  mounted () {
    // Fetch data on-load
    this.fetch(this.$route.query)
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'List of Appointments',
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
    // Custom Fetch function, use to manipulate records
    async fetch (params = {}) {
      // fetch method came from vuex store actions
      const assistantDetails = this.$store.getters.auth.assistant_details

      params.provider_id = this.$route.params.provider_id
      params.location_id = assistantDetails.default_location

      await this.$store.dispatch('fetchAppointments', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedAppointments
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
        // Get value from 'res' key
        const { res } = fetched
        // Record Fields
        this.fields = [
          { key: 'id', label: 'Appointment ID', sortable: true },
          { key: 'patient_name', label: 'Name', sortable: true },
          { key: 'date_from', label: 'Date and Time', formatter: formatPretty, sortable: true },
          // { key: 'provider_name', label: 'Service Provider', sortable: true },
          { key: 'service_name', label: 'Service', sortable: true },
          { key: 'rate', label: 'Rate', sortable: true },
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
    // Page Change Handler
    handlePageChange (page) {
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
