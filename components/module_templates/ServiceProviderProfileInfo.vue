<template>
  <div>
    <b-row v-if="$store.getters.retrievedServiceProvider.status === 'PENDING'">
      <b-col xl="12" lg="12" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning" />
      </b-col>
    </b-row>
    <b-row v-if="$store.getters.retrievedServiceProvider.status === 'FULFILLED'">
      <b-col xl="2" lg="3">
        <b-img
          rounded="circle"
          style="width: 48px; height: 48px;"
          :src="item.image_url || getImageUrl(48)"
          :alt="item.full_name"
        />
      </b-col>
      <b-col xl="10" lg="9">
        <b-row class="mt-1">
          <b-col xl="12" lg="12" class="label-headline bold">
            {{ item.name }}
          </b-col>
          <b-col xl="12" lg="12" class="headline-basic black-88">
            {{ item.occupation && item.occupation.name }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col xl="2" lg="2" class="text-right">
        <phone-icon class="custom-class icon-normal-size" />
      </b-col>
      <b-col xl="10" lg="10">
        <b-row>
          <b-col xl="12" lg="12" class="headline-basic black-88 pl-0">
            {{ item.mobile || '-' }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col xl="2" lg="2" class="text-right">
        <mail-icon class="custom-class icon-normal-size" />
      </b-col>
      <b-col xl="10" lg="10">
        <b-row>
          <b-col xl="12" lg="12" class="headline-basic black-88 pl-0">
            {{ item.email || '-' }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: [Number, String], default: '' }
  },
  data () {
    return {
      mainProps: { blank: true, blankColor: '#777', width: 48, height: 48, class: 'm1' },
      item: {
        name: '',
        occupation: '',
        mobile: '',
        email: '',
        image_url: ''
      }
    }
  },
  mounted () {
    // Fetch data on-load
    this.fetch(this.$route.query)
  },
  methods: {
    // Custom Fetch function, use to manipulate records
    async fetch (params = {}) {
      // fetch method came from vuex store actions
      await this.$store.dispatch('retrieveServiceProvider', { id: this.id })
      const retrieved = this.$store.getters.retrievedServiceProvider
      // If retrieval is successfull, populate the form
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res
        this.item = {
          name: data.user.first_name + ' ' + data.user.last_name,
          occupation: data.occupation,
          mobile: data.user.mobile,
          email: data.user.email,
          image_url: data.user.image_url
        }
      }
    },
    // Avatar
    getImageUrl (imageId) {
      const { width, height } = this.mainProps
      return `https://via.placeholder.com/${width}/${height}`
    }
  }
}
</script>
