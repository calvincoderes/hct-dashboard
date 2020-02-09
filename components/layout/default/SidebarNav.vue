<template>
  <div class="sidenav">
    <b-list-group>
      <b-list-group-item class="heading">
        NAVIGATION
      </b-list-group-item>
      <b-list-group-item
        v-for="item in menu"
        :key="item.href"
        class="button-nav"
        :class="isActive(item.href) ? 'active' : ''"
        :href="item.href"
      >
        <fa :icon="[item['theme'], item['icon']]" />
        <span class="item-title">
          {{ item['title'] }}
        </span>
      </b-list-group-item>
    </b-list-group>
    <b-row>
      <b-col cols="12">
        <!-- <location-toggler /> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import LocationToggler from '~/components/module_templates/LocationToggler.vue'

export default {
  // components: {
  //   LocationToggler,
  // },
  data () {
    return {
      menu: [
        {
          href: '/dashboard',
          title: 'Dashbord',
          theme: 'fas',
          icon: 'calendar-check'
        },
        {
          href: '/history',
          title: 'Reports',
          theme: 'fas',
          icon: 'history',
        }
        // {
        //   href: '/calendar',
        //   title: 'Calendar',
        //   theme: 'fas',
        //   icon: 'calendar-alt',
        // },
        // {
        //   href: '/patient_records',
        //   title: 'Patient Records',
        //   theme: 'fas',
        //   icon: 'clipboard-check',
        // },
        // {
        //   href: '/service_providers',
        //   title: 'Service Providers',
        //   theme: 'fas',
        //   icon: 'user-md',
        // },
        // {
        //   href: '/my_account',
        //   title: 'My Account',
        //   theme: 'fas',
        //   icon: 'user-circle',
        // },
        // {
        //   href: '/history',
        //   title: 'Clinic Records',
        //   theme: 'fas',
        //   icon: 'history',
        // }
      ]
    }
  },
  methods: {
    isActive (path) {
      return this.$route.path.substr(0, path.length) === path
    }
  }
}
</script>
