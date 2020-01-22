<template>
  <div class="spa-app">
    <b-row>
      <b-col xl="3" lg="3">
        <b-col xl="12" lg="12">
          <b-row>
            <div class="headline">
              <calendar-icon size="1.5x" /> CALENDAR
            </div>
          </b-row>
        </b-col>
      </b-col>
      <b-col xl="7" lg="7" class="mb-4 mt-2">
        <form
          method="post"
          @submit.prevent="handleSearch"
        >
          <SearchField search-place-holder="Enter name of Service Provider and Press Enter" @searchValue="onSearch" />
        </form>
      </b-col>
      <b-col xl="2" lg="2" class="mb-4 mt-2">
        <b-button
          variant="outline-primary"
          class="btn-patient-queue float-right"
          size="lg"
          @click.prevent="handleShowQueueButtonClick()"
        >
          <fa :icon="['fas', 'clipboard-list']" /> View Patient Queue
        </b-button>
        <div v-if="showPatientQueue" id="patient-queue-container">
          <patient-queue
            :date="date"
            :refresh="providerData"
            :pop-up="true"
            :provider="providerData"
            :providers="providers"
            @popup-toggle="onPopUpToggle"
            @provider-toggle="onProviderToggle"
          />
        </div>
      </b-col>
    </b-row>
    <FullCalendar
      ref="fullCalendar"
      class="spa-app-calendar"
      default-view="dayGridMonth"
      prev="left-single-arrow"
      next="right-single-arrow"
      :nav-links="true"
      :event-limit="true"
      :header="{
        left: 'title',
        center: 'prev,dayGridMonth,timeGridWeek,timeGridDay,next',
        right: '', //'listMonth,listWeek,listDay'
      }"
      :button-text="buttonText"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="calendarEvents"
      @eventClick="handleEventClick"
      @eventRender="eventRender"
    />
  </div>
</template>

<script>
import $ from 'jquery'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import rrulePlugin from '@fullcalendar/rrule'
import PatientQueue from '~/components/patient_queue/PatientQueue.vue'
import SearchField from '~/components/module_templates/SearchField.vue'
import Colors from '~/utils/colors.js'

const moment = extendMoment(Moment)

const days = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 0
}

export default {
  components: {
    SearchField,
    PatientQueue,
    FullCalendar,
  },
  data () {
    return {
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin,
        bootstrapPlugin,
        rrulePlugin
      ],
      calendarWeekends: true,
      calendarEvents: [],
      buttonText: {
        prev: '<< Prev Month',
        next: 'Next Month >>',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        listMonth: 'List Month',
        listWeek: 'List Week',
        listDay: 'List Day'
      },
      serviceType: 'clinic',
      search: '',
      showPatientQueue: false,
      providerData: {},
      providers: [],
      providersBySched: {},
      date: '',
      defaultProviderFilters: {},
      refresh: ''
    }
  },
  created () {
    const details = this.$store.getters.auth.assistant_details
    this.defaultProviderFilters = {
      per_page: 0,
      semi_light_mode: true,
      location_id: details.default_location,
      leaves: true,
    }

    this.fetch(this.defaultProviderFilters)
  },
  mounted () {
    this.$bvModal.show('patient-queue-modal')
  },
  methods: {
    async fetch (params) {
      this.providers = []
      this.calendarEvents = []

      await this.$store.dispatch('fetchServiceProviders', params)
      const { res, status } = this.$store.getters.fetchedServiceProviders

      const currentDate = moment(new Date()).format('YYYY-MM-DD')
      if (status === 'FULFILLED') {
        this.providers = []
        this.providersBySched = []

        for (const index in res) {
          const provider = res[index]
          const providersResult = {
            _refresh: provider.id,
            provider_id: provider.id,
            provider_name: provider.user.full_name,
            provider_image: provider.user.image_url,
            provider_occupation: provider.occupation ? provider.occupation.name : '',
            in_clinic: provider.in_clinic,
          }
          this.providers.push(providersResult)

          for (const key in provider.schedules) {
            const schedule = provider.schedules[key]
            const color = Colors[String(provider.user.last_name).charAt(0).toLowerCase()]
            const title = `${provider.user.prefix || ''} ${provider.user.last_name}`

            if (typeof this.providersBySched[days[schedule.day]] === 'undefined') {
              Object.assign(this.providersBySched, {
                [days[schedule.day]]: []
              })
            }
            this.providersBySched[days[schedule.day]].push(providersResult)
            this.calendarEvents.push({
              title,
              color,
              startRecur: currentDate,
              daysOfWeek: [days[schedule.day]],
              startTime: schedule.from_time,
              endTime: schedule.to_time,
              data: {
                id: provider.id,
                user: provider.user,
                occupation_name: provider.occupation ? provider.occupation.name : '',
                in_clinic: provider.in_clinic,
                leaves: provider.leaves,
              },
              allDay: false,
            })
          }
        }
      }
    },
    // Handle Show Patient Queue Button Click
    handleShowQueueButtonClick () {
      const { fetchedServiceProviders } = this.$store.getters
      if (fetchedServiceProviders.status === 'FULFILLED') {
        this.showPatientQueue = false
        const { res } = fetchedServiceProviders
        if (res.length) {
          const data = res[0]
          if (Object.keys(this.providerData).length === 0) {
            this.refresh = true
            this.providerData = {
              _refresh: data.id,
              provider_id: data.id,
              provider_name: data.user.full_name,
              provider_image: data.user.image_url,
              provider_occupation: data.occupation_name,
              in_clinic: data.in_clinic,
            }
          }
          this.showPatientQueue = true
        }
      }
    },
    // Event Click
    handleEventClick (arg) {
      const date = moment(arg.event.start)

      this.date = date.format('YYYY-MM-DD')
      this.showPatientQueue = false

      const day = date.day()
      const { data } = arg.event.extendedProps
      this.refresh = true
      this.providerData = {
        _refresh: data.id,
        provider_id: data.id,
        provider_name: data.user.full_name,
        provider_image: data.user.image_url,
        provider_occupation: data.occupation_name,
        in_clinic: data.in_clinic,
      }
      this.showPatientQueue = true
      this.providers = this.providersBySched[day]
    },
    // Search
    handleSearch () {
      this.fetch({
        ...this.defaultProviderFilters,
        search: this.search,
      })
    },
    // Search Value
    onSearch (search) {
      this.search = search
    },
    // Pop-up patient queue toggle
    onPopUpToggle (value) {
      this.showPatientQueue = value
    },
    // Provider Data toggle
    onProviderToggle (value) {
      this.providerData = value
    },
    // Full Calendar Event Ren der
    eventRender (info) {
      const { data } = info.event.extendedProps

      const start = info.event.start
      const leaves = data.leaves || []
      if (leaves.length) {
        for (const index in leaves) {
          const leave = leaves[index]
          const range = moment().range(new Date(leave.date_from), new Date(leave.date_to))
          if (range.contains(start)) {
            $(info.el).hide()
            break
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#patient-queue-container {
  position: absolute;
  right: 0;
  top: 28px;
  bottom: 0;
  z-index: 2;
  width: 432px;
}
</style>
