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
      <b-col xl="6">
        <SearchField search-place-holder="Search name of Service Providers" @searchValue="onSearch" />
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
    <!-- <b-row v-if="$store.getters.fetchedServiceProviders.status === 'REJECTED'" class="mt-5">
      <b-col xl="12" lg="12">
        <b-alert variant="danger" show>
          Oops, something went wrong...
        </b-alert>
      </b-col>
    </b-row> -->
    <!-- FAILED REQUEST HANDLER -->

    <!-- <b-row v-if="$store.getters.fetchedServiceProviders.status === 'PENDING'">
      <b-col xl="12" lg="12" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning" />
      </b-col>
    </b-row> -->

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
import SearchField from '~/components/module_templates/SearchField.vue'
// import PatientQueue from '~/components/patient_queue/PatientQueue.vue'

export default {
  components: {
    SearchField,
    // PatientQueue,
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
      count: 0,
      perPage: 10,
      currentPage: 1,
      totalPages: 1,
      currentDate: '',
      minDate: '',
      showSetAppointment: false,
      providerSelected: null,
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
        schedule_this_date: this.currentDate,
        light_mode: true
      })
      // fetch method came from vuex store actions
      await this.$store.dispatch('fetchServiceProviders', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedServiceProviders
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
        // Get value from 'res' key
        const { res } = fetched

        // Records
        this.items = res

        // Records count
        this.count = res.count

        // Router push
        this.$router.push({ query: params })
      }
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
    }
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
