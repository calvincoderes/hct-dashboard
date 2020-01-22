<template>
  <div class="page-wrapper">
    <b-col xl="12" lg="12" cols="12" class="mt-5 pt-5">
      <div class="offset-4">
        <b-row>
          <b-col xl="6" lg="6" cols="6">
            <b-img src="~assets/images/page-not-found.png" fluid />
          </b-col>
        </b-row>
        <b-row class="mt-5 text-center">
          <b-col xl="6" lg="6" cols="6" class="headline bold">
            Page not found
          </b-col>
        </b-row>
      </div>
      <div class="offset-3">
        <b-row class="mt-5 text-center">
          <b-col xl="8" lg="8" cols="8" class="content-line">
            Oops! We couldn’t find the page that you were looking for. You can either return to the homepage or try reloading the page again.
          </b-col>
        </b-row>
      </div>
      <div class="offset-4">
        <b-row class="mt-5 offset-1">
          <b-col xl="4" lg="4" cols="4">
            <nuxt-link :to="{path: '/dashboard/'}">
              <b-button variant="primary" size="lg" block>
                Return to Homepage
              </b-button>
            </nuxt-link>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col xl="6" lg="6" cols="6" class="normal bold text-center pointer" @click="reloadPage">
            Reload Page
          </b-col>
        </b-row>
      </div>
    </b-col>
  </div>
</template>
<script>
export default {
  methods: {
    reloadPage () {
      location.reload()
    }
  }
}
</script>
