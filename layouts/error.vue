<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: [String, Number, Boolean, Object],
      default: null
    }
  },
  layout: '404'
}
</script>
