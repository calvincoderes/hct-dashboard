<template>
  <div>
    <b-row>
      <b-col cols="12" xl="4" lg="4" class="pt-3 pr-5">
        <ServiceProviderProfileInfo :id="$route.params.provider_id" />
        <hr class="mt-5 mb-5">
        <ServiceProviderProfileSection
          :provider-id="$route.params.provider_id"
          :route-name="$route.name"
        />
      </b-col>
      <b-col cols="12" xl="8" lg="8" class="pl-2 mb-5">
        <nuxt-child />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ServiceProviderProfileInfo from '~/components/module_templates/ServiceProviderProfileInfo.vue'
import ServiceProviderProfileSection from '~/components/module_templates/ServiceProviderProfileSection.vue'
export default {
  components: {
    ServiceProviderProfileInfo,
    ServiceProviderProfileSection,
  },
  data () {
    return {
      routeName: ''
    }
  },
}
</script>
