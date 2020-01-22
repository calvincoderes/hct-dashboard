<template>
  <b-card
    border-variant="primary"
    header="Add Service Provider"
    header-bg-variant="primary"
    header-text-variant="white"
    header-border-variant="primary"
    footer-tag="footer"
  >
    <div v-if="$route.params.id" slot="header" class="mb-0">
      Update Service Provider
    </div>
    <b-row>
      <b-col xs="12">
        <!-- FAILED REQUEST HANDLER -->
        <b-row v-if="submitted.status === 'REJECTED'">
          <b-col xs="12">
            <b-alert variant="danger" show>
              Oops, something went wrong...
            </b-alert>
          </b-col>
        </b-row><!-- FAILED REQUEST HANDLER -->

        <form
          method="post"
          @submit.prevent="handleSubmit"
        >
          <b-form-group>
            <b-form-input
              v-model="form.name"
              v-validate="{required: true}"
              placeholder="Name"
              name="name"
              type="text"
            />
            <div
              v-for="(error, index) in errors.collect('name')"
              :key="`name-${index}`"
              class="errors"
            >
              {{ error }}
            </div>
          </b-form-group>
          <hr>
          <div slot="footer">
            <b-row>
              <b-col md="12">
                <div class="form-inline float-right">
                  <nuxt-link :to="{path: '/service_providers/', query: $route.query}" class="mr-2">
                    <b-button variant="info" size="sm" right>
                      <chevrons-left-icon size="1x" /> Back to list
                    </b-button>
                  </nuxt-link>
                  <b-button type="submit" variant="primary" size="sm" class="mr-2">
                    <save-icon size="1x" /> Save
                  </b-button>
                  <b-button type="reset" variant="danger" size="sm">
                    <refresh-ccw-icon size="1x" /> Reset
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </form>

        <!-- GENERIC MODAL -->
        <b-modal
          id="generic-modal"
          :ok-only="modal.okOnly"
          @ok="$router.push({ path: '/service_providers/', query: $route.query })"
        >
          <template slot="modal-title">
            {{ modal.title }}
          </template>
          <template slot="default">
            {{ modal.content }}
          </template>
        </b-modal><!-- GENERIC MODAL -->
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      form: { name: '', code: '' },
      modal: { okOnly: false, title: '', content: '' },
      submitted: { status: 'NO_ACTIONS' },
    }
  },
  async created () {
    if ('id' in this.$route.params) {
      // Retrieve the data in edit mode
      await this.$store.dispatch('retrieveServiceProvider', { id: this.$route.params.id })
      const retrieved = this.$store.getters.retrievedServiceProvider
      // If retrieval is successfull, populate the form
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res
        this.form = {
          name: data.name,
          code: data.code,
        }
      }
    }
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'id' in this.$route.params ? 'Update Service Provider' : 'Add Service Provider',
    }
  },
  methods: {
    // Handle form submission
    handleSubmit () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          // If id parameter is exisiting (update mode)
          if ('id' in this.$route.params) {
            await this.$store.dispatch('updateServiceProvider', {
              id: this.$route.params.id,
              data: this.form,
            })
            this.submitted = this.$store.getters.updatedServiceProvider
          } else {
            // Create record
            await this.$store.dispatch('createServiceProvider', this.form)
            this.submitted = this.$store.getters.createdServiceProvider
          }

          // Redirect to list if there's no form error(s)
          if (this.submitted.status === 'FULFILLED') {
            this.modal = {
              okOnly: true,
              title: 'Success',
              content: 'Success!'
            }
            this.$bvModal.show('generic-modal')
            this.$nextTick(() => {
              this.$validator.reset()
            })
          } else {
            // Async Validation
            const response = this.submitted.res
            for (const key in response) {
              // Get fields with error and skip if field does not exists
              const field = this.$validator.fields.find({ name: key, scope: this.$options.scope })
              if (!field) { continue }

              // Show errors for each field
              for (const index in response[key]) {
                this.$validator.errors.add({
                  id: field.id,
                  field: key,
                  msg: response[key][index],
                  scope: this.$options.scope,
                })
                field.setFlags({
                  invalid: true,
                  valid: false,
                  validated: true,
                })
              }
            }
          }
        }
      })
    }
  }
}
</script>
