<template>
  <b-card
    border-variant="primary"
    header="List of Module Templates"
    header-bg-variant="primary"
    header-text-variant="white"
    header-border-variant="primary"
  >
    <b-row>
      <b-col xs="12">
        <b-row>
          <!-- SEARCH FORM -->
          <b-col cols="12">
            <div class="form-inline float-right">
              <form
                method="post"
                class="mb-4"
                @submit.prevent="handleSearch"
              >
                <b-input-group>
                  <b-form-input
                    v-model="search"
                    placeholder="Enter search keyword"
                    name="search"
                    type="text"
                  />
                  <b-input-group-append>
                    <b-button size="sm" type="submit" text="Search" variant="primary">
                      <search-icon size="1.25x" />
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </form>
              <nuxt-link to="/module_templates/form" class="ml-2 mb-4 float-right">
                <b-button variant="primary" size="md">
                  <plus-icon size="1.25x" />
                </b-button>
              </nuxt-link>
            </div>
          </b-col><!-- SEARCH FORM -->
        </b-row>

        <!-- FAILED REQUEST HANDLER -->
        <b-row v-if="$store.getters.fetchedModuleTemplates.status === 'REJECTED'">
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
              :busy="$store.getters.fetchedModuleTemplates.status === 'PENDING'"
              :items="items"
              :fields="fields"
              :no-local-sorting="true"
              hover
              responsive
              head-variant="dark"
              foot-clone
              fixed
              @sort-changed="handleSortChange"
            >
              <!-- Busy state -->
              <div v-slot:cell(table-busy) class="text-center text-success my-2">
                <b-spinner type="grow" class="align-middle" />
                <strong>Loading...</strong>
              </div><!-- Busy state -->

              <!-- A Virtual column -->
              <template v-slot:cell(action)="data">
                <nuxt-link :to="{path: `/module_templates/form/${data.item.id}`, query: $route.query}">
                  <b-button variant="info" size="sm">
                    <edit-icon size="1.25x" /> Edit
                  </b-button>
                </nuxt-link>
                <b-button variant="danger" size="sm" @click="handleConfirmDelete(data.item)">
                  <x-circle-icon size="1.25x" /> Delete
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
  </b-card>
</template>

<script>
import { formatDate } from '~/utils/formatters'
import { serialize } from '~/utils/helpers'

export default {
  data () {
    return {
      search: '',
      fields: [],
      items: [],
      perPage: 10,
      currentPage: 1,
      totalPages: 1,
      count: 0,
      toDelete: {},
      modal: { okOnly: false, title: '', content: '' }
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
      title: 'List of Module Templates',
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
      await this.$store.dispatch('fetchModuleTemplates', params)
      // fetched results came from vuex store getters
      const fetched = this.$store.getters.fetchedModuleTemplates
      // If fetch is successful
      if (fetched.status === 'FULFILLED') {
        // Get value from 'res' key
        const { res } = fetched
        // Record Fields
        this.fields = [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'created_at', label: 'Date Added', formatter: formatDate, sortable: true },
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
    // Search
    handleSearch () {
      this.fetch({
        ...this.$route.query,
        search: this.search,
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
      const query = {
        ...this.$route.query,
        sortBy: ctx.sortBy,
        sortDesc: ctx.sortDesc,
      }

      if (ctx.sortBy) {
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
    async handleDelete (id) {
      // Delete methon from vuex store
      await this.$store.dispatch('deleteModuleTemplate', { id })
      // Check if deletion request is successfull
      const deleted = this.$store.getters.deletedModuleTemplate
      if (deleted.status === 'FULFILLED') {
        this.$swal({
          title: 'Success',
          text: `ID# ${id} has been successfully deleted!`,
          type: 'success',
        })
        this.fetch()
      } else {
        this.$swal({ title: 'Oops!', text: `Failed to delete ID# ${id}`, type: 'error' })
      }
    }
  }
}
</script>
