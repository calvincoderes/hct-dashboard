<template>
  <header id="header-wrapper" class="clearfix mb-4">
    <b-row>
      <b-col id="top-head-purple" cols="6">
        &nbsp;
      </b-col>
      <b-col id="top-head-blue" cols="6">
        &nbsp;
      </b-col>
    </b-row>
    <b-navbar id="header-nav" toggleable="lg" class="px-5" variant="light">
      <b-navbar-brand href="/">
        <img id="brand-logo" class="float-left pr-3" src="~assets/images/logo-only.png">
        <div class="float-left">
          <div class="logo-mark bold">
            HEALTH<span class="color-blue-theme">CARE</span>
            </span>
          </div>
          <div class="logo-sub">
            Administator Dashboard
          </div>
        </div>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <div class="inset">
              <img v-if="!item.image_url" style="width: 32px" :src="'https://via.placeholder.com/32'">
              <img v-else :src="item.image_url" style="width: 32px">
            </div>
          </b-nav-item>

          <b-nav-item-dropdown
            id="name-dropdown"
            right
            :text="item.full_name"
          >
            <!-- Using 'button-content' slot -->
            <b-dropdown-item href="/my_account">
              My Account
            </b-dropdown-item>
            <b-dropdown-item @click="authLogout()">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  data () {
    return {
      item: {
        image_url: this.$store.getters.auth ? this.$store.getters.auth.image_url : '',
        full_name: this.$store.getters.auth ? this.$store.getters.auth.full_name : '',
      }
    }
  },
  async created () {
    if (this.$store.getters.auth) {
      // Retrieve the data in edit mode
      await this.$store.dispatch('retrieveMyProfile', { id: this.$store.getters.auth.id })
      const retrieved = this.$store.getters.retrievedMyProfile
      // If retrieval is successfull, populate the form
      if (retrieved.status === 'FULFILLED') {
        const data = retrieved.res
        this.item.image_url = data.image_url
        this.item.full_name = data.full_name
      }
    }
  },
  methods: {
    async authLogout () {
      await this.$store.dispatch('postLogout')
      if (!this.$store.getters.auth && this.$store.getters.logout) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
