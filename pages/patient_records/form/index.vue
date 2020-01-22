<template>
  <div>
    <b-row>
      <b-col xl="4" lg="4" class="pt-3 pr-5 headline-3 semi-bold">
        Add New Record
        <hr class="mt-5 mb-5">
        <PatientRecordSection :page.sync="fromChild" @childToParent="onChildClick" />
      </b-col>
      <b-col xl="8" lg="8" class="pl-2 mb-5">
        <nuxt-child :current-page="fromChild" @childCurrentPage="updatedChildPage" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PatientRecordSection from '~/components/module_templates/PatientRecordSection.vue'

export default {
  middleware: ['authenticate'],
  components: {
    PatientRecordSection
  },
  data () {
    return {
      fromChild: 'index'
    }
  },
  methods: {
    // Triggered when `childToParent` event is emitted by the child.
    onChildClick (value) {
      this.fromChild = value
    },
    updatedChildPage (value) {
      this.fromChild = value
    }
  }
}
</script>
