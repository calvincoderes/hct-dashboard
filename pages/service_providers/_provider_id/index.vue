<template>
  <ServiceProviderProfilePersonalInfo :id="$route.params.provider_id" :route-name="routeName" @clicked="handleRouteName" />
</template>

<script>
import ServiceProviderProfilePersonalInfo from '~/components/module_templates/ServiceProviderProfilePersonalInfo.vue'
export default {
  components: {
    ServiceProviderProfilePersonalInfo
  },
  data () {
    return {
      routeName: ''
    }
  },
  methods: {
    handleRouteName (value) {
      console.log(value)
    }
  }
}
</script>
