<template>
  <div>
    <el-table :data="dataList" :border="border" :stripe="stripe" v-loading="loading" :class="classes" :max-height="height">
      <template v-for="(item, index) in columns">
        <el-table-column :label="item.label" :key="index" width="65px" align="center" :prop="item.prop" v-if="item.type === 'index'"></el-table-column>
        <el-table-column :label="item.label" :key="index" :width="item.width" align="center" :prop="item.prop" :fixed="item.fix" v-if="item.type === 'button'">
          <template slot-scope="scope">
            <table-button-group 
              :scope="scope" 
              :show="item.show"
              :disable="item.disable"
              @update="updateItem"
              @delete="deleteItem"
              @watch="watchItem"
            ></table-button-group>
          </template>
        </el-table-column>
        <el-table-column :label="item.label" :key="index" :min-width="item.width" :prop="item.prop" :align="item.align" :class-name="$style[item.class]" v-else>
          <template slot-scope="scope">
            <enable-switch 
              v-model="scope.row[item.prop]" 
              :disabled="scope.row.disable" 
              @change="switchChange" 
              v-if="item.type === 'switch'"
            ></enable-switch>
            <el-checkbox 
              v-model="scope.row[item.prop]" 
              :disabled="scope.row.disable" 
              @change="checkboxChange" 
              v-else-if="item.type === 'checkbox'"
            ></el-checkbox>
            <el-input 
              v-model="scope.row[item.prop]" 
              :disabled="scope.row.disable" 
              @blur="inputBlur" 
              @change="inputChange" 
              v-else-if="item.type === 'input'"
            ></el-input>
            <el-input 
              v-model="scope.row[item.prop]" 
              :disabled="scope.row.disable" 
              type="textarea" :rows="item.rows" 
              v-else-if="item.type === 'textarea'"
            ></el-input>
            <el-select 
              v-model="scope.row[item.prop]" 
              :disabled="scope.row.disable" 
              placeholder="" 
              :clearable="item.clearable" 
              :filterable="item.filterable" 
              @change="selectChange" 
              v-else-if="item.type === 'select'"
            >
              <el-option v-for="option in options[item.optionName]" :key="option.value" :value="option.value" :label="option.label"></el-option>
            </el-select>
            <template v-else>{{ scope.row[item.prop] }}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <pagination-bar
      :total="total"
      :current-page="current"
      :page-size="size"
      @changeSize="sizeChange"
      @changeCurrent="currentChange"
    ></pagination-bar>
  </div>
</template>

<script>
import EnableSwitch from '@/components/Table/EnableSwitch'
import TableButtonGroup from '@/components/Table/TableButtonGroup'
import PaginationBar from '@/components/Table/PaginationBar'

export default {
  components: { EnableSwitch, TableButtonGroup, PaginationBar },
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    },
    columns: {
      type: Array,
      default: () => { return [] }
    },
    classes: {
      type: Array,
      default: () => { return [] }
    },
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    showPages: {
      type: Boolean,
      default: true
    },
    totalCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {

    }
  },
  methods: {
    /**
     * 按下修改按鈕
     * @param {number} index 陣列索引值
     */
    updateItem(index) {
      this.$emit('update', index)
    },
    /**
     * 按下刪除按鈕
     * @param {number} index 陣列索引值
     */
    deleteItem(index) {
      this.$emit('delete', index)
    },
    /**
     * 按下檢視按鈕
     * @param {number} index 陣列索引值
     */
    watchItem(index) {
      this.$emit('watch', index)
    },
    /**
     * switch變更函數
     * @param {boolean} val 變更的數值
     */
    switchChange(val) {
      this.$emit('switch-change', val)
    },
    /**
     * checkbox變更函數
     * @param {boolean} val 變更的數值
     */
    checkboxChange(val) {
      this.$emit('checkbox-change', val)
    },
    /**
     * input blur事件觸發函式
     * @param {object} e 變更的數值
     */
    inputBlur(e) {
      this.$emit('input-blur', e)
    },
    /**
     * input change事件觸發函數
     * @param {number|string} val 實際的數值
     */
    inputChange(val) {
      this.$emit('input-change', val)
    },
    /**
     * selct change事件觸發函數
     * @param {Number} val 變更的數值
     */
    selectChange(val) {
      this.$emit('select-change', val)
    },
    /**
     * 頁面變更函數
     * @param {Number} val 變更的數值
     */
    currentChange(val) {
      this.$emit('current-change', val)
    },
    /**
     * 資料數變更函數
     * @param {Number} val 變更的數值
     */
    sizeChange(val) {
      this.$emit('size-change', val)
    },
  },
  computed: {
    dataList: {
      get() {
        return this.data
      },
      set(newValue) {
        this.$emit('update:data', newValue)
      }
    },
    total: {
      get() {
        return this.totalCount
      },
      set(newValue) {
        this.$emit('update:totalCount', newValue)
      }
    },
    current: {
      get() {
        return this.currentPage
      },
      set(newValue) {
        this.$emit('update:currentPage', newValue)
      }
    },
    size: {
      get() {
        return this.pageSize
      },
      set(newValue) {
        this.$emit('update:pageSize', newValue)
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>