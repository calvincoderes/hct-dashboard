  <!-- tel-input.vue -->
<template>
  <vue-tel-input
    v-model="data"
    @onInput="onInput"
  />
</template>

<script>
import { VueTelInput } from 'vue-tel-input'

export default {
  components: {
    VueTelInput
  },
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.data = this.vaue
  },
  methods: {
    onInput (value) {
      if (typeof value.number.e164 !== 'undefined') {
        this.$emit('tel-input-value', value.number.e164)
      } else {
        this.$emit('tel-input-value', '')
      }
    }
  }
}
</script>
