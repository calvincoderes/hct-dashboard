import _ from 'lodash'
import moment from 'moment'

const endpoint = process.env.REST_API_ENDPOINT
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
  data () {
    return {
      patients: [],
      locations: [],
      services: [],
      providers: [],
      enabledDates: [],
      minDate: moment(new Date()).add(5, 'minutes').format('YYYY-MM-DD HH:mm'),
      maxDate: moment(new Date()).add(1, 'years').format('YYYY-MM-DD HH:mm'),
      avatarMainProps: { blank: true, blankColor: '#777', width: 24, height: 24 },
      appointmentTypes: [
        { text: 'Walk-In', value: 'walkin' },
        { text: 'Manual', value: 'manual' },
      ]
    }
  },
  watch: {
    'form.appointment_type' (newValue, oldValue) {
      if (newValue === 'walkin') {
        this.maxDate = this.minDate
      } else {
        this.maxDate = moment(new Date()).add(1, 'years').format('YYYY-MM-DD HH:mm')
      }
    }
  },
  computed: {
    imagePlaceholder () {
      const { width, height } = this.avatarMainProps
      return `https://via.placeholder.com/${width}/${height}`
    },
  },
  mounted () {
    this.fetchLocations()
  },
  methods: {
    fetchLocations () {
      this.locations = []
      const assistantDetails = this.$store.getters.auth.assistant_details
      const { locations } = assistantDetails

      for (const key in locations) {
        const locationValue = {
          text: `${locations[key].name} (${locations[key].service_type})`,
          value: locations[key],
        }
        if (typeof assistantDetails.default_location !== 'undefined' &&
          assistantDetails.default_location === locations[key].id &&
          !this.form.location
        ) {
          this.form.location = locations[key]
          this.handleLocationChange(locations[key])
        }
        this.locations.push(locationValue)
      }
    },
    handleSearchPatient (search, loading) {
      loading(true)
      this.searchPatient(loading, search, this)
    },
    searchPatient: _.debounce(async (loading, search, vm) => {
      // fetch method came from vuex store actions
      await vm.$store.dispatch('fetchPatientRecords', { per_page: 20, search })
      // fetched results came from vuex store getters
      const fetched = vm.$store.getters.fetchedPatientRecords
      const results = []
      if (fetched.status === 'FULFILLED') {
        for (const key in fetched.res.results) {
          const result = fetched.res.results[key]
          results.push({
            id: result.id,
            user: result.user,
          })
        }
        vm.patients = _.uniqBy(results, e => e.user.id)
        loading(false)
      }
    }, 350),
    // Handle Appointment Type Changes
    async handleAppointmentType (appointmentType) {
      this.providers = []
      await this.$store.dispatch('fetchServiceProviders', {
        mutation: 'setFetchedLightServiceProviders',
        per_page: 0,
        light_mode: true, // lightweight response
        appointment_type: appointmentType
      })
      const { fetchedLightServiceProviders } = this.$store.getters
      if (fetchedLightServiceProviders.status === 'FULFILLED') {
        const fetched = fetchedLightServiceProviders.res
        for (const key in fetched) {
          this.providers.push({
            label: fetched[key].user.full_name,
            ...fetched[key],
          })
        }
      }
    },
    // Handle Location Change
    async handleLocationChange (location) {
      // this.services = []
      // await this.$store.dispatch('fetchRecordServices', { per_page: 0, location_id: location.id })
      // const { fetchedRecordServices } = this.$store.getters
      // if (fetchedRecordServices.status === 'FULFILLED') {
      //   const fetched = fetchedRecordServices.res
      //   for (const key in fetched) {
      //     this.services.push({
      //       text: fetched[key].name,
      //       value: fetched[key],
      //     })
      //   }
      // }
    },
    // Handle Service Change
    async handleServiceChange (service) {
      // this.providers = []
      // await this.$store.dispatch('fetchServiceProviders', {
      //   mutation: 'setFetchedLightServiceProviders',
      //   per_page: 0,
      //   light_mode: true, // lightweight response
      //   service_id: service.id,
      //   location_id: this.form.location.id
      // })
      // const { fetchedLightServiceProviders } = this.$store.getters
      // if (fetchedLightServiceProviders.status === 'FULFILLED') {
      //   const fetched = fetchedLightServiceProviders.res
      //   for (const key in fetched) {
      //     this.providers.push({
      //       label: fetched[key].user.full_name,
      //       ...fetched[key],
      //     })
      //   }
      // }
    },
    // Handle Provider Chage
    async handleProviderChange (provider) {
      this.form.datetime = ''
      this.form.service = ''
      if (provider) {
        this.fetchLocations()
        for (const index in this.locations) {
          const location = this.locations[index]
          if (!provider.locations.includes(location.value.id)) {
            console.log(this.locations[index])
            delete this.locations[index]
          }
        }
        this.$axios.get(`${endpoint}/assistant/provider_schedules/`, {
          params: {
            per_page: 0,
            provider_id: provider.id,
          }
        }).then((response) => {
          const { data } = response

          const result = []
          for (const index in data) {
            result.push(this.getDateRange(days[data[index].day]))
          }

          this.enabledDates = []
          for (const key in result) {
            result[key].map((m) => {
              this.enabledDates.push(m.format('YYYY-MM-DD'))
            })
          }
        }).catch((e) => { this.handleError(e) })

        // Services
        this.services = []
        await this.$store.dispatch('fetchServices', { per_page: 0, provider_id: provider.id })
        const { fetchedServices } = this.$store.getters

        if (fetchedServices.status === 'FULFILLED') {
          const fetched = fetchedServices.res.results
          for (const key in fetched) {
            this.services.push({
              text: fetched[key].service.name,
              value: fetched[key].service.id,
            })
          }
        }
        // Services
      }
    },
    // Handle ajax error
    handleError (e) {
      const data = e.response.data
      const details = typeof data.details !== 'undefined' ? data.details : 'Something went wrong'
      const type = e.response.status === 400 ? 'warning' : 'error'

      this.$swal({ title: 'Oops!', text: details, type })
    },
    flagError (field, key, msg) {
      this.$validator.errors.add({
        id: field.id,
        field: key,
        msg,
        scope: this.$options.scope,
      })
      field.setFlags({
        invalid: true,
        valid: false,
        validated: true,
      })
    },
    formatDate (date) {
      if (date === null || date === '') {
        return null
      }
      return moment(date).format('YYYY-MM-DD')
    },
    getDateRange (day) {
      const current = moment(this.minDate).subtract(7, 'd')
      const end = this.maxDate
      const result = []
      while (current.day(7 + day).isBefore(end)) {
        result.push(current.clone())
      }
      return result
    },
  }
}
