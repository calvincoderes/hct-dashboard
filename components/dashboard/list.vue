<template>
  <div>
    <b-row class="mt-4">
      <b-col xl="3">
        <vue-ctk-date-time-picker
          id="date-selector"
          v-model="currentDate"
          v-b-tooltip.hover
          title="Select Date"
          color="#8f3d86"
          format="YYYY-MM-DD"
          formatted="MMMM D, YYYY"
          input-size="lg"
          :auto-close="true"
          :min-date="minDate"
          :only-date="true"
          :no-clear-button="true"
          :no-label="true"
        />
      </b-col>
      <!-- <b-col xl="6">
        <SearchField search-place-holder="Search name of Service Providers" @searchValue="onSearch" />
      </b-col> -->
      <b-col cols="4" style="padding-top:7px;">
        <v-multiselect
          v-model="location"
          placeholder="Search for Clinic"
          label="text"
          track-by="value"
          :options="locations"
          :multiple="enableMultipleLocations"
          class="location-select"
          @input="handleLocation"
        />
        <!-- <b-form-select v-model="service" class="sm" :options="services" @change="handleService" /> -->
      </b-col>
    </b-row>

    <b-row>
      <b-col xl="12" class="text-center">
        <div v-if="currentDate" class="headline">
          Today is {{ currentDate | prettifyDate('Do of MMMM YYYY') }}
        </div>
      </b-col>
    </b-row>

    <!-- FAILED REQUEST HANDLER -->
    <b-row v-if="$store.getters.fetchedAppointments.status === 'REJECTED'" class="mt-5">
      <b-col xl="12" lg="12">
        <b-alert variant="danger" show>
          Oops, something went wrong...
        </b-alert>
      </b-col>
    </b-row>
    <!-- FAILED REQUEST HANDLER -->

    <b-row v-if="$store.getters.fetchedAppointments.status === 'PENDING'">
      <b-col xl="12" lg="12" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning" />
      </b-col>
    </b-row>

    <b-row v-if="$store.getters.fetchedAppointments.status === 'FULFILLED' && currentDate">
      <b-col cols="12 p-0">
        <div class="hscroll">
          <div v-if="!$store.getters.fetchedAppointments.res.length">
            <div class="headline brown-grey center mt-3">
              No Data Available
            </div>
          </div>
          <div class="charts">
            <div class="grid">
              <ChartDoughnut
                v-if="typeRecordLoaded"
                :title="doughnutTitle"
                :online="onlineTypesRecord"
                :walkin="walkinTypesRecord"
                :manual="manualTypesRecord"
              />
            </div>
          </div>
          <!-- <patient-queue
            v-for="item in filteredItems"
            :key="item.id"
            :refresh="providerSelected && item.id === providerSelected.id ? makeid(32) : false"
            :date="currentDate"
            :provider="{
              provider_id: item.id,
              provider_name: item.user.full_name,
              provider_image: item.user.image_url,
              provider_occupation: item.occupation ? item.occupation.name : '',
              in_clinic: item.in_clinic
            }"
          /> -->
        </div>
      </b-col>
    </b-row>

    <!-- <b-row v-if="$store.getters.fetchedServiceProviders.status === 'FULFILLED' && currentDate">
      <b-col cols="12 p-0">
        <div class="hscroll">
          <div v-if="!$store.getters.fetchedServiceProviders.res.length">
            <div class="headline brown-grey center mt-3">
              No Schedule for Today
            </div>
          </div>
          <div v-else>
            <div v-if="currentDate" class="center headline">
              {{ currentDate | prettifyDate('Do of MMMM YYYY') }}'s Queue
            </div>
          </div>
          <patient-queue
            v-for="item in filteredItems"
            :key="item.id"
            :refresh="providerSelected && item.id === providerSelected.id ? makeid(32) : false"
            :date="currentDate"
            :provider="{
              provider_id: item.id,
              provider_name: item.user.full_name,
              provider_image: item.user.image_url,
              provider_occupation: item.occupation ? item.occupation.name : '',
              in_clinic: item.in_clinic
            }"
          />
        </div>
      </b-col>
    </b-row> -->
    <!-- RECORD LIST -->
  </div>
</template>

<script>
import moment from 'moment'
import DaysMixin from '~/utils/mixins/days.js'
import { serialize } from '~/utils/helpers'
// import SearchField from '~/components/module_templates/SearchField.vue'
// import PatientQueue from '~/components/patient_queue/PatientQueue.vue'

// import ChartBar from '~/components/charts/chart-bar'
import ChartDoughnut from '~/components/charts/chart-doughnut'
// import ChartLine from '~/components/charts/chart-line'

export default {
  components: {
    // SearchField,
    // ChartBar,
    ChartDoughnut,
    // ChartLine
  },
  filters: {
    todaySchedule (schedules) {
      let schedule = 'None'
      for (const index in schedules) {
        const isToday = schedules[index].is_today
        if (isToday) {
          schedule = schedules[index].from_time_pretty + ' to ' + schedules[index].to_time_pretty
          break
        }
      }
      return schedule
    },
    daysAvailable (schedules) {
      const dayInfo = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      const dayNames = []
      for (const index in schedules) {
        const day = schedules[index].day
        dayNames.push(dayInfo[day])
      }
      return dayNames.join(', ')
    },
    prettifyDate (value, format) {
      return moment(value).format(format)
    }
  },
  mixins: [DaysMixin],
  data () {
    return {
      mainProps: { blank: true, blankColor: '#777', width: 48, height: 48, class: 'm1' },
      search: '',
      checked: false,
      items: [],
      location: null,
      locations: [],
      enableMultipleLocations: false,
      count: 0,
      perPage: 10,
      currentPage: 1,
      totalPages: 1,
      currentDate: '',
      minDate: '',
      showSetAppointment: false,
      providerSelected: null,
      typeRecordLoaded: false,
      onlineTypesRecord: [],
      walkinTypesRecord: [],
      manualTypesRecord: [],
      doughnutTitle: 'Appointments by type'
    }
  },
  computed: {
    filteredItems () {
      return this.items.filter((item) => {
        return String(item.user.full_name).toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  watch: {
    currentDate (newValue, oldValue) {
      if (newValue !== oldValue && oldValue) {
        // Fetch data on-load
        const params = {
          ...this.$route.query,
        }
        // Location
        const details = this.$store.getters.auth.assistant_details
        if (details.default_location) {
          Object.assign(params, { location_id: details.default_location })
          this.location = details.default_location
        }
        this.fetch(params)
      }
    }
  },
  async created () {
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
    this.currentDate = moment(new Date()).format('YYYY-MM-DD')
    this.minDate = moment(new Date()).format('YYYY-MM-DD')

    // Fetch data on-load
    const params = {
      ...this.$route.query,
    }

    // Location
    // const details = this.$store.getters.auth.assistant_details
    // if (details.default_location) {
    //   Object.assign(params, { location_id: details.default_location })
    //   this.location = details.default_location
    // }

    this.fetch(params)
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'List of Service Providers',
    }
  },
  methods: {
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
      // Per page = 0
      Object.assign(params, {
        per_page: 0,
        // schedule_this_date: this.currentDate,
        light_mode: true
      })

      if (params.location_ids) {
        // hack until appointment accepts multiple location ids
        params.location_id = params.location_ids[0] || ''
      } else {
        params.location_id = ''
      }

      console.log('final params', params)
      // fetch method came from vuex store actions
      await this.$store.dispatch('fetchAppointments', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedAppointments
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
        // Get value from 'res' key
        const { res } = fetched

        // Records
        this.items = res

        // Records count
        this.count = res.count

        // GET TOTAL TYPE-ONLINE
        await this.sortRecordTotalByType(res)

        // Router push
        this.$router.push({ query: params })
      }
    },
    sortRecordTotalByType (record = []) {
      console.log('this record', record)

      const onlineTypes = record.filter(function (record) {
        return record.appointment_type === 'online'
      })
      const walkinTypes = record.filter(function (record) {
        return record.appointment_type === 'walkin'
      })
      const manualTypes = record.filter(function (record) {
        return record.appointment_type === 'manual'
      })

      // set data
      this.onlineTypesRecord = onlineTypes
      this.walkinTypesRecord = walkinTypes
      this.manualTypesRecord = manualTypes
      this.typeRecordLoaded = true
      // console.log('sample filter online', onlineTypes)
      // console.log('sample filter walkin', walkinTypes)
      // console.log('sample filter manua;', [manualTypes, manualTypes.length])
    },
    // Handle Show Appointment Button Click
    handleShowAppointmentButtonClick () {
      this.showSetAppointment = true
    },
    // Avatar
    getImageUrl (imageId) {
      const { width, height } = this.mainProps
      return `https://via.placeholder.com/${width}/${height}`
    },
    // On Search
    onSearch (search) {
      this.search = search
    },
    // Pop-up patient queue toggle
    onPopUpToggle (value) {
      this.showSetAppointment = value
    },
    // Provider selected
    onProviderSelected (value) {
      this.providerSelected = value
    },
    // Make ID
    makeid (length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    // handle location change
    handleLocation (location) {
      let locationCodes = []

      if (this.enableMultipleLocations === true) {
        for (const key in location) {
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
      console.log('sent location', locationCodes)
      this.fetch({
        ...this.$route.query,
        location_ids: locationCodes,
      })
    },
  }
}
</script>

<style lang="scss">
#date-selector-wrapper {
  display: inline-block;
  width: auto;

  & > div {
    input {
      font-family: 'Open Sans', sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      color: var(--light-eggplant);
      background-color: var(--white);
      border: 0;
      border-radius: 2rem;
      &:hover {
        background-color: var(--light-eggplant) !important;
        color: var(--white);
      }
    }
  }
}

.hscroll {
  min-height: 580px !important;
}
</style>
