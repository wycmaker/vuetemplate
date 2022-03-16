<template>
  <div :class="[$style['query-item']]">
    <label>{{title}}</label>
    <el-date-picker
      v-model="startDateValue"
      type="date"
      value-format="yyyy-MM-dd"
      :clearable="true"
      @change="startChange"
      placeholder="">
    </el-date-picker>
    <label>到</label>
    <el-date-picker
      v-model="endDateValue"
      type="date"
      value-format="yyyy-MM-dd"
      :clearable="false"
      @change="endChange"
      :picker-options="endOption"
      placeholder="">
    </el-date-picker>
  </div>
</template>

<script>
import { Common } from '@/services'

const common = new Common()
export default {
  props: {
    startDate: {
      default: null
    },
    endDate: {
      default: null
    },
    title: {
      default: null
    }
  },
  data() {
    return {
      endOption: {
        disabledDate: (time) => {
          if(this.startDateValue === null) return null 
          else return new Date(this.startDateValue).getTime() > (time.getTime() + 86400000)
        }
      }
    }
  },
  methods: {
    /**
     * 開始日期改變
     */
    startChange(val) {
      if(val !== null) {
        if(this.endDateValue === null) {
          this.endDateValue = common.getDateString(new Date(val))
        }
        else if(this.endDateValue !== null && new Date(val).getTime() > new Date(this.endDateValue).getTime()) {
          this.endDateValue = common.getDateString(new Date(val))
        }
      } else this.endDateValue = null
    },
    /**
     * 結束日期改變
     */
    endChange(val) {
      if(val !== null && this.startDateValue === null) this.startDateValue = common.getDateString(new Date(val))
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