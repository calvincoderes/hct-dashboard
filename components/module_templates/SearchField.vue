<template>
  <!-- Actual search box -->
  <div class="form-group has-search">
    <span class="form-control-feedback">
      <search-icon size="1x" class="custom-class" />
    </span>
    <b-form-input
      v-model="search"
      class="search-field"
      :placeholder="searchPlaceHolder"
      name="search"
      aria-autocomplete="off"
      autocomplete="off"
      @keyup="searchValue"
    />
  </div>
</template>
<script>
export default {
  props: {
    searchPlaceHolder: { type: String, default: '' }
  },
  data () {
    return {
      search: ''
    }
  },
  created () {
    if (this.$route.query.search) {
      this.search = this.$route.query.search
    }
  },
  methods: {
    searchValue () {
      this.$emit('searchValue', this.search)
    }
  }
}
</script>
<style>
  .input-group-prepend > .input-group-text {
    border: solid 1px var(--black-8);
    border-right: none;
    background-color: rgba(82, 82, 82, 0.02);
  }
  /* Bootstrap 4 text input with search icon */
  .has-search .form-control {
      padding-left: 2.75rem;
  }

  .has-search .form-control-feedback {
      position: absolute;
      z-index: 2;
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      pointer-events: none;
      color: #aaa;
  }
</style>
