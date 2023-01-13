<template>
  <div :class="[$style['query-item']]">
    <label style="display:inline-block;" :style="(titleWidth !== null && titleWidth !== '') ? `width: ${titleWidth}` : ''">{{ title }}</label>
    <custom-date-range :startDate.sync="startDateValue" :endDate.sync="endDateValue" @change="dateChange"></custom-date-range>
  </div>
</template>

<script>
import { QueryItem } from '@/mixins'

export default {
  mixins: [ QueryItem ],
  props: {
    startDate: {
      type: String,
      default: null
    },
    endDate: {
      type: String,
      default: null
    }
  },
  methods: {
    dateChange() {
      this.$emit('change')
    }
  },
  computed: {
    startDateValue: {
      get() {
        return this.startDate
      },
      set(newValue) {
        this.$emit('update:startDate', newValue)
      }
    },
    endDateValue: {
      get() {
        return this.endDate
      },
      set(newValue) {
        this.$emit('update:endDate', newValue)
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>