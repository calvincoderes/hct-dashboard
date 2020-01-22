<template>
  <div>
    <in-clinic :provider="selectedSP" />
    <!-- RECORD LIST -->
    <b-row>
      <b-col xl="4" lg="4">
        <b-col xl="12" lg="12">
          <b-row>
            <div class="headline">
              Service Providers
            </div>
          </b-row>
        </b-col>
        <b-col xl="12" lg="12">
          <b-row>
            <div class="label-headline black-40">
              {{ count }} Provider{{ count > 1 ? 's' : '' }}
            </div>
          </b-row>
        </b-col>
      </b-col>
      <b-col xl="6" lg="6" class="mt-4">
        <SearchField search-place-holder="Search name of Service Providers" @searchValue="onSearch" />
      </b-col>
    </b-row>

    <!-- FAILED REQUEST HANDLER -->
    <b-row v-if="listStatus === 'REJECTED'" class="mt-5">
      <b-col xl="12" lg="12">
        <b-alert variant="danger" show>
          Oops, something went wrong...
        </b-alert>
      </b-col>
    </b-row><!-- FAILED REQUEST HANDLER -->

    <b-row v-if="listStatus === 'PENDING'" class="mt-5">
      <b-col xl="12" lg="12" class="mt-4">
        <b-row>
          <b-col xl="4" lg="4">
            <card-loader />
          </b-col>
          <b-col xl="4" lg="4">
            <card-loader />
          </b-col>
          <b-col xl="4" lg="4">
            <card-loader />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row v-if="listStatus === 'FULFILLED'" class="mt-5 mb-5">
      <b-col
        v-for="item in filteredItems"
        :key="item.id"
        xl="4"
        lg="6"
        class="mt-4"
      >
        <b-card class="card-default">
          <b-row>
            <b-col xl="12" lg="12">
              <b-row>
                <b-col xl="2" lg="2">
                  <b-img
                    rounded="circle"
                    :width="32"
                    :height="32"
                    :src="item.user.image_url || getImageUrl(48)"
                    :alt="item.user.full_name"
                  />
                </b-col>
                <b-col xl="10" lg="10">
                  <b-row class="mt-1">
                    <b-col xl="12" lg="12" class="label-headline bold text-truncate">
                      {{ item.user.full_name || '-' }}
                    </b-col>
                    <b-col xl="12" lg="12" class="logo-sub brown-grey text-truncate">
                      {{ item.occupation && item.occupation.name || '-' }}
                    </b-col>
                  </b-row>
                </b-col>
                <!--<b-col xl="2" lg="2" class="pr-0 pl-0">
                  <b-form-checkbox v-model="checked" size="lg" name="check-button" switch />
                  <div class="small mid-blue mt-1">
                    IN-CLINIC
                  </div>
                </b-col>-->
              </b-row>
            </b-col>
            <b-col xl="12" lg="12" class="headline-basic black-40 mt-3">
              TODAY'S SCHEDULE
            </b-col>
            <b-col xl="12" lg="12" class="headline-basic black semi-bold">
              {{ item.schedules | todaySchedule }}
            </b-col>
            <b-col xl="12" lg="12" class="headline-basic black-40 mt-3">
              CLINIC AVAILABILITY
            </b-col>
            <b-col xl="12" lg="12" class="headline-basic black semi-bold text-truncate">
              {{ item.schedules | daysAvailable }}
            </b-col>
            <b-col xl="12" lg="12" class="mt-4">
              <nuxt-link :to=" `/service_providers/${item.id}/`">
                <b-button variant="outline-primary" block size="sm" class="revert normal-border-radius normal-height">
                  View Details
                </b-button>
              </nuxt-link>
            </b-col>
            <b-col xl="12" lg="12" class="mt-4">
              <b-button
                variant="outline-primary"
                block
                size="sm"
                class="revert normal-border-radius normal-height"
                @click="handleInClinic(item)"
              >
                Clinic Attendance
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import DaysMixin from '~/utils/mixins/days.js'
import SearchField from '~/components/module_templates/SearchField.vue'
import CardLoader from '~/components/loading_states/CardLoader.vue'
import InClinic from '~/components/service_providers/InClinic.vue'

export default {
  components: {
    SearchField,
    CardLoader,
    InClinic
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
    }
  },
  mixins: [DaysMixin],
  data () {
    return {
      listStatus: 'PENDING',
      mainProps: { blank: true, blankColor: '#777', width: 48, height: 48, class: 'm1' },
      search: '',
      checked: false,
      items: [],
      count: 0,
      selectedSP: {},
    }
  },
  computed: {
    filteredItems () {
      return this.items.filter((item) => {
        return String(item.user.full_name).toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted () {
    // Fetch data on-load
    const params = {
      per_page: 0,
      ...this.$route.query,
    }

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
    // Custom Fetch function, use to manipulate records
    async fetch (params = {}) {
      // Location
      if (this.$store.getters.auth.assistant_details) {
        const details = this.$store.getters.auth.assistant_details
        Object.assign(params, { location_id: details.default_location })
      }
      // fetch method came from vuex store actions
      await this.$store.dispatch('fetchServiceProviders', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedServiceProviders
      this.listStatus = fetched.status
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
        // Get value from 'res' key
        const { res } = fetched

        // Records
        this.items = res

        // Count
        this.count = res.length

        // Router push
        this.$router.push({ query: params })
      }
    },
    handleInClinic (item) {
      this.selectedSP = item
      this.$bvModal.show('attendance-modal')
    },
    onSearch (search) {
      this.search = search
    },
    // Avatar
    getImageUrl (imageId) {
      const { width, height } = this.mainProps
      return `https://via.placeholder.com/${width}/${height}`
    },
  }
}
</script>
