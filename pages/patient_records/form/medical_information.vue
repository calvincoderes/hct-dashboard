<template>
  <div>
    <b-row>
      <b-col xl="4" lg="4" class="pt-3 pr-5 headline-3 semi-bold">
        Add New Record
        <hr class="mt-5 mb-5">
        <PatientRecordSection page="index" />
      </b-col>
      <b-col xl="8" lg="8" class="pl-2 mb-5">
        <nuxt-child />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PatientRecordSection from '~/components/module_templates/PatientRecordSection.vue'
export default {
  components: {
    PatientRecordSection
  }
}
</script>
