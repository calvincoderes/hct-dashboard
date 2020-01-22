<template>
  <div>
    <b-row v-if="$store.getters.retrievedServiceProvider.status === 'PENDING'">
      <b-col xl="12" lg="12" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning" />
      </b-col>
    </b-row>
    <b-row v-if="$store.getters.retrievedServiceProvider.status === 'FULFILLED'">
      <b-col xl="12" lg="12" class="headline-3 semi-bold">
        Personal Information
      </b-col>
      <b-col xl="12" lg="12" class="mt-5">
        <b-row>
          <b-col xl="4" lg="4">
            <b-row>
              <b-col xl="12" lg="12" class="logo-sub black-40">
                FIRST NAME
              </b-col>
              <b-col xl="12" lg="12" class="label-headline semi-bold black-88">
                {{ item.first_name || '' }}
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4" lg="4">
            <b-row>
              <b-col xl="12" lg="12" class="logo-sub black-40">
                MIDDLE NAME
              </b-col>
              <b-col xl="12" lg="12" class="label-headline semi-bold black-88">
                {{ item.middle_name || '' }}
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4" lg="4">
            <b-row>
              <b-col xl="12" lg="12" class="logo-sub black-40">
                LAST NAME
              </b-col>
              <b-col xl="12" lg="12" class="label-headline semi-bold black-88">
                {{ item.last_name || '' }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col xl="12" lg="12" class="mt-5">
        <b-row>
          <b-col xl="12" lg="12" class="logo-sub black-40">
            YEARS OF PRACTICE
          </b-col>
          <b-col xl="12" lg="12" class="label-headline semi-bold black-88">
            {{ item.service_year || '-' }}
          </b-col>
        </b-row>
      </b-col>
      <b-col xl="12" lg="12" class="mt-5">
        <b-row>
          <b-col xl="12" lg="12" class="logo-sub black-40">
            DATE JOINED
          </b-col>
          <b-col xl="12" lg="12" class="label-headline semi-bold black-88">
            {{ date(item.date_joined) }}
          </b-col>
        </b-row>
      </b-col>
      <b-col xl="12" lg="12" class="mt-5">
        <b-row>
          <b-col xl="12" lg="12" class="logo-sub black-40">
            ADDRESS
          </b-col>
          <b-col xl="12" lg="12" class="label-headline semi-bold black-88">
            <div v-if="item.address_1 === null && item.address_2 === null && item.city_name === null && item.zone_name === null && item.country_name === null">
              -
            </div>
            {{ item.address_1 ? item.address_1 + ', ' : '' }}
            {{ item.address_2 ? item.address_2 + ', ' : '' }}
            {{ item.city_name ? item.city_name + ', ' : '' }}
            {{ item.zone_name ? item.zone_name + ', ' : '' }}
            {{ item.country_name ? item.country_name : '' }}
          </b-col>
        </b-row>
      </b-col>
      <b-col xl="12" lg="12" class="mt-5">
        <!-- <b-row>
          <b-col xl="12" lg="12">
            <b-row>
              <b-col xl="3" lg="3" class="headline-basic semi-bold black-grey mt-1">
                EDUCATION
              </b-col>
              <b-col xl="6" lg="6">
                <hr>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col xl="12" lg="12">
            <b-row>
              <b-col xl="1" lg="1" class="label-headline semi-bold mt-2 pr-0">
                1
              </b-col>
              <b-col xl="10" lg="10" class="pl-0">
                <b-row>
                  <b-col xl="12" lg="12" class="label-headline semi-bold">
                    San Beda College
                  </b-col>
                  <b-col xl="12" lg="12" class="logo-sub black-40">
                    Legarda, Manila
                  </b-col>
                  <b-col xl="12" lg="12">
                    <hr>
                  </b-col>
                  <b-col xl="12" lg="12" class="small black-40">
                    1987 - 1991
                  </b-col>
                  <b-col xl="12" lg="12" class="logo-sub">
                    B.S. Multimedia Arts and Sciences
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col xl="12" lg="12">
            <b-row>
              <b-col xl="1" lg="1" class="label-headline semi-bold mt-2 pr-0">
                2
              </b-col>
              <b-col xl="10" lg="10" class="pl-0">
                <b-row>
                  <b-col xl="12" lg="12" class="label-headline semi-bold">
                    Ateneo De Manila
                  </b-col>
                  <b-col xl="12" lg="12" class="logo-sub black-40">
                    Legarda, Manila
                  </b-col>
                  <b-col xl="12" lg="12">
                    <hr>
                  </b-col>
                  <b-col xl="12" lg="12" class="small black-40">
                    1987 - 1991
                  </b-col>
                  <b-col xl="12" lg="12" class="logo-sub">
                    B.S. Multimedia Arts and Sciences
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row> -->
        <b-row class="mt-5">
          <b-col xl="12" lg="12" class="logo-sub black-40">
            BRIEF INTRODUCTION
          </b-col>
          <b-col xl="12" lg="12" class="label-headline semi-bold black-88">
            {{ item.brief_intro || '-' }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    id: { type: String, default: '' },
  },
  data () {
    return {
      item: {
        first_name: '',
        middle_name: '',
        last_name: '',
        service_year: '',
        date_joined: '',
        brief_intro: '',
        address_1: '',
        address_2: '',
        city_name: '',
        zone_name: '',
        country_name: ''
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
        console.log(data)
        this.item = {
          first_name: data.user.first_name,
          middle_name: data.user.middle_name,
          last_name: data.user.last_name,
          service_year: data.service_year,
          date_joined: data.created_at,
          brief_intro: data.user.about,
          address_1: data.user.address_1,
          address_2: data.user.address_2,
          city_name: data.user.city_name,
          zone_name: data.user.zone_name,
          country_name: data.user.country_name,
        }
      }
    },
    date (date) {
      return moment(date).format('MMMM DD, YYYY')
    }
  }
}
</script>
