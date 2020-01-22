<template>
  <b-table
    :items="items"
    :fields="fields"
    hover
    responsive
  >
    <template v-slot:cell(day)="data">
      {{ data.item.day | dayName }}
    </template>

    <template v-slot:cell(time)="data">
      {{ data.item.from_time_pretty }} - {{ data.item.to_time_pretty }}
    </template>

    <template v-slot:cell(in_clinic)="data">
      <div class="text-center">
        <b-form-checkbox
          v-model="data.item.in_clinic"
          v-b-tooltip.hover
          title="In-Clinic"
          switch
          @change="handleInClinic($event, data.item.id)"
        />
      </div>
    </template>
  </b-table>
</template>

<script>
const endpoint = process.env.REST_API_ENDPOINT

const days = {
  '0': 'Monday',
  '1': 'Tuesday',
  '3': 'Thursday',
  '4': 'Friday',
  '5': 'Saturday',
  '6': 'Sunday',
}

export default {
  filters: {
    dayName (value) {
      return days[value] || '-'
    }
  },
  props: {
    provider: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      title: '',
      fields: [],
      items: []
    }
  },
  watch: {
    provider (newValue, oldValue) {
      if (typeof newValue.user !== 'undefined' && newValue.user) {
        this.title = newValue.user.full_name
        const params = {
          per_page: 0,
          provider_id: newValue.id,
          is_today: true,
        }
        // Location
        if (this.$store.getters.auth.assistant_details) {
          const details = this.$store.getters.auth.assistant_details
          Object.assign(params, { location_id: details.default_location })
        }
        this.fetch(params)
      }
    }
  },
  methods: {
    fetch (params = {}) {
      this.$axios.get(`${endpoint}/assistant/provider_schedules/`, { params })
        .then((response) => {
          this.items = response.data
          this.fields = [
            { key: 'location.name', label: 'Location' },
            { key: 'day', label: 'Day' },
            { key: 'time', label: 'Time' },
            { key: 'in_clinic', label: 'In-Clinic' },
          ]
        }).catch((e) => { this.errorHandler(e) })
    },
    handleInClinic (checked, id) {
      this.$axios.put(`${endpoint}/assistant/provider_schedules/${id}/in_clinic/`, {
        in_clinic: checked
      })
        .catch((e) => { this.errorHandler(e) })
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
