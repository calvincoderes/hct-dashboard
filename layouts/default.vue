<template>
  <div class="page-wrapper">
    <HeaderNav />
    <b-container class="mb-5 pb-5" fluid>
      <SidebarNav />
      <div class="px-4 page-content">
        <nuxt class="mb-5" />
      </div>
    </b-container>
  </div>
</template>

<script>
import SidebarNav from '~/components/layout/default/SidebarNav.vue'
import HeaderNav from '~/components/layout/default/HeaderNav.vue'

export default {
  components: {
    SidebarNav,
    HeaderNav,
  }
}
</script>
