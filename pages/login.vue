<template>
  <div class="login-form">
    <form
      method="post"
      @submit.prevent="handleSubmit"
    >
      <div class="logo mb-3">
        <img src="~assets/images/logo-login.png">
      </div>
      <div class="headline-basic text-center mb-3">
        Administrator Dashboard
      </div>
      <br class="mt-1">
      <b-form-group
        label="Username"
        class="mt-5 mb-5"
      >
        <b-form-input
          v-model="form.username"
          v-validate="{required: true}"
          autocomplete="off"
          placeholder="Username"
          name="username"
          type="text"
        />
        <div
          v-for="(error, index) in errors.collect('username')"
          :key="`username-${index}`"
          class="errors"
        >
          {{ error }}
        </div>
      </b-form-group>
      <b-form-group
        label="Password"
        class="mb-5"
      >
        <b-form-input
          v-model="form.password"
          v-validate="{required: true}"
          placeholder="Password"
          name="password"
          type="password"
        />
        <div
          v-for="(error, index) in errors.collect('password')"
          :key="`password-${index}`"
          class="errors"
        >
          {{ error }}
        </div>
      </b-form-group>
      <b-row class="mt-5 mb-5">
        <b-col cols="12 mt-2 px-5">
          <b-button
            type="submit"
            variant="primary"
            block
            size="lg"
            :disabled="is_disabled"
          >
            Login
          </b-button>
        </b-col>
        <b-col cols="12 mt-4 mb-5 text-center">
          <nuxt-link to="/forgot_password" class="normal semi-bold">
            Forgot Password <arrow-right-icon size="1.5x" class="custom-class" />
          </nuxt-link>
        </b-col>
        <b-col cols="12 mt-4 px-5">
          <nuxt-link to="/register">
            <b-button variant="outline-primary" block size="lg" class="revert">
              No Account? Click here to create
            </b-button>
          </nuxt-link>
        </b-col>
      </b-row>
    </form>
    <div id="login-footer" class="text-center small">
      &copy; 2019 HealthCare App | Powered by <a href="https://hct.ph">hct.ph</a>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['unauthenticated'],
  layout: 'login',
  data () {
    return {
      is_disabled: false,
      form: {
        username: '',
        password: '',
      }
    }
  },
  // Head Tag
  head () {
    // Page title
    return {
      title: 'Administrator Dashboard | Login',
    }
  },
  methods: {
    handleSubmit () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const first3Chars = this.form.username.substring(0, 2)
          if (first3Chars === '09') {
            this.form.username = `+639${this.form.username.substring(2)}`
          }
          console.log('test forms', this.form)
          this.is_disabled = true
          await this.$store.dispatch('postLogin', this.form)
          this.is_disabled = false
          if (!this.$store.getters.auth) {
            const key = 'username'
            const field = this.$validator.fields.find({ name: key, scope: this.$options.scope })

            this.$validator.errors.add({
              id: field.id,
              field: key,
              msg: 'Invalid username and/or password',
              scope: this.$options.scope,
            })
            field.setFlags({
              invalid: true,
              valid: false,
              validated: true,
            })
          } else {
            window.location = '/'
          }
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
