<template>
  <div class="text-center text-success my-3">
    <b-spinner type="grow" class="align-middle" />
    <strong>Loading...</strong>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.$router.push('/dashboard')
  }
}
</script>
