<template>
  <div :class="[$style.query]">
    <template v-for="(item, index) in options">
      <template v-if="item.type === 'date'">
        <date-range-picker :title="item.title" :startDate.sync="query[item.option[0]]" :endDate.sync="query[item.option[1]]" :key="index"></date-range-picker>
      </template>
      <template v-else-if="item.type === 'input'">
        <div :class="[$style['query-item']]" :key="index">
          <label>{{ item.title }}</label>
          <el-input v-model="query[item.option[0]]" placeholder="" clearable></el-input>
        </div>
      </template>
      <template v-else-if="item.type === 'select'">
        <div :class="[$style['query-item']]" :key="index">
          <label>{{ item.title }}</label>
          <el-select v-model="query[item.option[0]]" placeholder="" :clearable="(item.clearable !== undefined) ? item.clearable : true" filterable :multiple="item.ismultiple">
            <el-option v-for="option in item.selectOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </div>
      </template>
      <template v-else-if="item.type === 'button'">
        <query-button-group :show="[item.show[0], item.show[1], item.show[2]]" @getData="getData" @export="exportList" @add="addData" :key="index"></query-button-group>
      </template>
    </template>
  </div>
</template>

<script>
import DateRangePicker from '@/components/DateRangePicker'
import QueryButtonGroup from '@/components/QueryButtonGroup'

export default {
  components: { DateRangePicker, QueryButtonGroup },
  props: {
    queryData: {
      type: Object
    },
    queryOptions: {
      type: Array
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  methods: {
    /**
     * 搜尋按鈕
     */
    getData() {
      this.$emit('getData', false)
    },
    /**
     * 新增按鈕
     */
    addData() {
      this.$emit('add', null)
    },
    /**
     * 匯出資料
     */
    exportList() {
      this.$emit('export')
    }
  },
  computed: {
    query: {
      get() {
        return this.queryData
      },
      set(newValue) {
        this.$emit('update:queryData', newValue)
      }
    },
    options: {
      get() {
        return this.queryOptions
      },
      set(newValue) {
        this.$emit('update:queryOptions', newValue)
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";
</style>