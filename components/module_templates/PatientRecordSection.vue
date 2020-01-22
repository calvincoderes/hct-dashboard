<template>
  <div>
    <b-row>
      <b-col xl="12" lg="12" class="headline-basic semi-bold black-grey">
        COMPLETE INFORMATION
      </b-col>
      <b-col xl="12" lg="12" class="mt-3">
        <b-list-group class="module-vertical-nav">
          <b-list-group-item
            v-for="item in items"
            :key="item.page"
            class="label-headline pt-4 pb-4"
            :class="page === item.page ? 'active-page' : 'pointer'"
            @click="changeSection(item.page)"
          >
            {{ item.label }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="12" lg="12" class="mt-4">
        <hr class="mt-5 mb-5">
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="12" lg="12" class="mt-4">
        <nuxt-link to="/patient_records/">
          <b-button variant="info" size="lg" block>
            <chevrons-left-icon size="1x" /> Back to Patient Records
          </b-button>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    page: { type: String, default: '' }
  },
  data () {
    return {
      items: [
        { page: 'index', label: 'Personal Information' },
        { page: 'medical_information', label: 'Medical Information' }
      ]
    }
  },
  methods: {
    changeSection (page) {
      this.$emit('update:page', page)
      this.$emit('childToParent', page)
    }
  }
}
</script>
