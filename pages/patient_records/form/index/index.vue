<template>
  <div>
    <form-component :current-page="currentPage" @childToParent="onChildClick" />
  </div>
</template>

<script>
import FormComponent from '~/components/patient_records/form.vue'

export default {
  middleware: ['authenticate'],
  components: {
    FormComponent,
  },
  props: {
    currentPage: { type: String, default: '' }
  },
  methods: {
    onChildClick (page) {
      this.$emit('childCurrentPage', page)
    }
  }
}
</script>
