<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12">
      <b-row>
        <b-col xs="12" lg="12" class="headline">
          Patients
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12" lg="12" class="caption">
          {{ count }} Patient Records
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col xs="12">
          <!-- SEARCH FORM -->
          <b-row>
            <b-col cols="4">
              <b-form-select v-model="perPage" class="sm" :options="per_pages" @change="handlePerPageChange" />
            </b-col>
            <b-col cols="6">
              <form
                method="post"
                class="mb-4"
                @submit.prevent="handleSearch"
              >
                <SearchField search-place-holder="Search name of patients" @searchValue="onSearch" />
              </form>
            </b-col>
            <b-col cols="2">
              <nuxt-link to="/patient_records/form" class="ml-2 mb-4 float-right">
                <b-button pill size="md" variant="outline-secondary">
                  <user-plus-icon size="1.25x" class="custom-class" /> Add New Record
                </b-button>
              </nuxt-link>
            </b-col>
          </b-row>
          <!-- SEARCH FORM -->

          <!-- FAILED REQUEST HANDLER -->
          <b-row v-if="$store.getters.fetchedPatientRecords.status === 'REJECTED'">
            <b-col xs="12">
              <b-alert variant="danger" show>
                Oops, something went wrong...
              </b-alert>
            </b-col>
          </b-row><!-- FAILED REQUEST HANDLER -->

          <!-- RECORD LIST -->
          <b-row>
            <b-col xs="12">
              <b-table
                :busy="$store.getters.fetchedPatientRecords.status === 'PENDING'"
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
                <template v-slot:cell(action)="data">
                  <nuxt-link :to="{path: `/patient_records/form/${data.item.id}`, query: $route.query}">
                    <b-button pill variant="outline-info" size="sm">
                      <edit-icon size="1.25x" />
                    </b-button>
                  </nuxt-link>
                  <b-button pill variant="outline-danger" size="sm" @click="handleConfirmDelete(data.item)">
                    <x-circle-icon size="1.25x" />
                  </b-button>
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
import SearchField from '~/components/module_templates/SearchField.vue'
import { serialize } from '~/utils/helpers'
import PagesMixin from '~/utils/mixins/pages.js'

export default {
  components: {
    SearchField
  },
  mixins: [PagesMixin],
  data () {
    return {
      search: '',
      fields: [],
      items: [],
      perPage: 10,
      currentPage: 1,
      totalPages: 1,
      location: null,
      count: 0,
      toDelete: {}
    }
  },
  mounted () {
    const query = this.$route.query
    // Location
    if (this.$store.getters.auth.assistant_details) {
      const details = this.$store.getters.auth.assistant_details
      const defaultLocation = details.default_location

      Object.assign(query, { location_id: defaultLocation })
      this.location = defaultLocation
    }
    // Fetch data on-load
    this.fetch(query)
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'List of Patient Records',
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
      // fetch method came from vuex store actions
      await this.$store.dispatch('fetchPatientRecords', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedPatientRecords
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
        // Get value from 'res' key
        const { res } = fetched
        // Record Fields
        this.fields = [
          { key: 'user.full_name', label: 'Name', sortable: true },
          // { key: 'user.id', label: 'Patient ID', sortable: true },
          { key: 'user.civil_status', label: 'Status', sortable: true },
          { key: 'user.gender', label: 'Gender', sortable: true },
          { key: 'user.email', label: 'Email', sortable: true },
          { key: 'user.mobile', label: 'Contact Number', sortable: true },
          // { key: 'date_of_last_visit', label: 'Date of Last Visit', sortable: true },
          // { key: 'history', label: 'History', sortable: true },
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
    // Handle Location Change
    handleLocationChange (value) {
      this.fetch({
        ...this.$route.query,
        location_id: this.location,
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
        const sortBy = String(ctx.sortBy).replace('.', '__')
        Object.assign(query, {
          ordering: `${ctx.sortDesc === true ? '-' : ''}${sortBy}`
        })

        this.fetch(query)
      }
    },
    // Handle Deletion Confirmation
    handleConfirmDelete (toDelete) {
      this.$swal({
        title: 'Confirmation',
        text: 'Are you sure you want to delete this record?',
        type: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this.handleDelete(toDelete)
        }
      })
    },
    // Delete Record
    async handleDelete (data) {
      // Delete methon from vuex store
      await this.$store.dispatch('deletePatientRecord', { id: data.id })
      // Check if deletion request is successfull
      const deleted = this.$store.getters.deletedPatientRecord
      if (deleted.status === 'FULFILLED') {
        this.$swal({
          title: 'Success',
          text: `ID# ${data.id} has been successfully deleted!`,
          type: 'success',
        })
        this.fetch()
      } else {
        this.$swal({ title: 'Oops!', text: `Failed to delete ID# ${data.id}`, type: 'error' })
      }
    }
  }
}
</script>
