<template>
  <div>
    <b-col xl="12" lg="12">
      <b-row v-if="status === 'PENDING'">
        <b-col xl="4" lg="4">
          <b-img rounded="circle" :width="48" :src="'https://via.placeholder.com/32'" />
        </b-col>
        <b-col xl="8" lg="8" class="pl-3 mt-1">
          <b-row class="mt-1">
            <b-col xl="12" lg="12" class="headline-basic-07-lt-space black text-truncate">
              {{ '- - - -' }}
            </b-col>
            <b-col xl="12" lg="12" class="logo-sub brown-grey text-truncate mt-1">
              {{ '- - - -' }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="status === 'FULFILLED'">
        <b-col xl="2" lg="2">
          <b-img v-if="!item.provider_image" rounded="circle" :width="48" :src="'https://via.placeholder.com/32'" />
          <b-img v-else-if="!item.provider_image" rounded="circle" :width="48" :src="'https://via.placeholder.com/32'" />
          <b-img v-else rounded="circle" :src="item.provider_image" :width="48" />
        </b-col>
        <b-col xl="10" lg="10" class="pl-2 mt-1">
          <b-row class="mt-1">
            <b-col xl="12" lg="12" class="headline-basic-07-lt-space black text-truncate">
              {{ item.provider_name || '- - - -' }}
            </b-col>
            <b-col xl="12" lg="12" class="logo-sub brown-grey text-truncate mt-1">
              {{ item.provider_occupation || '- - - -' }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          provider_image: '',
          provider_name: '- - - -',
          provider_occupation: '- - - -',
        }
      }
    },
    status: {
      type: String,
      default: 'PENDING'
    }
  }
}
</script>
