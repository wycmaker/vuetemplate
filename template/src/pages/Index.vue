<template>
  <div :class="[$style.content]">
    <table-template 
      :data="reportList" 
      :columns="columns"
      stripe
      :loading="loading"
      :classes="[$style['table-A']]"
      :options="options"
      @update="editReport"
      @switch-change="switchChange"
      @checkbox-change="checkboxChange"
      @input-blur="inputBlur"
      @input-change="inputChange"
      @select-change="selectChange"
    ></table-template>
  </div>
</template>

<script>
import { TableTemplate } from '@/services/componentLibrary' 
import { ApiService, Info, Common } from '@/services'

const apiService = new ApiService()
const infowindow = new Info()
const common = new Common()

export default {
  components: { TableTemplate },
  data() {
    return {
      loading: false,
      queryData: {
        skip: null,
        take: null,
        keyWord: null,
        sex: null,
        reportStatus: null
      },
      totalCount: 0,
      reportList: [],
      pageSize: 10,
      currentPage: 1,
      common: common,
      pageShow: 1,
      reportSymbol: null,
      columns: [
        { type: 'text', label: '檢查日期', prop: 'checkDate', width: '120px', align: 'left', class: null },
        { type: 'text', label: '病歷號', prop: 'patientID', width: '110px', align: 'left', class: null },
        { type: 'text', label: '檢查單號', prop: 'req', width: '160px', align: 'left', class: 'comment' },
        { type: 'text', label: '姓名', prop: 'patientName', width: '100px', align: 'left', class: null },
        { type: 'switch', label: '性別', prop: 'sex', width: '160px', align: 'center', class: null },
        { type: 'checkbox', label: '性別', prop: 'sex', width: '160px', align: 'center', class: null },
        { type: 'input', label: '狀態', prop: 'reportStatus', width: '160px', align: 'center', class: null },
        { type: 'text', label: '狀態', prop: 'reportStatus', width: '160px', align: 'left', class: null },
        { type: 'select', label: '狀態', prop: 'reportStatus', width: '160px', align: 'left', optionName: 'reportStatusList', clearable: false, filterable: true, class: null },
        { type: 'text', label: '動作', prop: 'procedureCode', width: '120px', align: 'left', class: null },
        { type: 'textarea', label: '動作', prop: 'procedureCode', width: '120px', align: 'left', rows: 1, class: null },
        { type: 'button', label: '', prop: '', width: '70px', show: [true, false, false], disable: [false, false, false], fix: 'right', class: null }
      ],
      options: {
        reportStatusList: [
          { value: 1, label: '已檢查' },
          { value: 3, label: '初步報告' },
          { value: 2, label: '報告暫存(待上傳)' },
          { value: 4, label: '正式報告' },
          { value: 5, label: '已退回' },
          { value: 6, label: '已刪除' }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getReportList(false)
    })
  },
  methods: {
    /**
     * 取得報告清單
     * @param {numner} isChange 是否換頁
     */
    getReportList(isChange) {
      this.loading = true
      this.queryData.take = this.pageSize
      this.queryData.skip = (isChange === true) ? (this.currentPage - 1) * this.pageSize : 0
      if(!isChange) this.currentPage = 1
      apiService.postData('/api/ReportSystem/GetReportList', this.queryData).then(res => {
        this.totalCount = res.data.item1
        this.reportList = res.data.item2
        // this.reportList.map(r => r.sex = (r.sex === true) ? '女' : '男')
        this.reportList.map(r => r.disable = true)
      }).catch(err => {
        infowindow.error(this, err)
      }).finally(_ => {
        this.loading = false
      })
    },
    /**
     * 檢查是否可以編輯
     * @param {number} status 報告狀態 
     */
    modifyCheck(status) {
      if(status === 6) return true
      else return false
    },
    /**
     * 刪除報告
     * @param {number} index 陣列索引值
     */
    deleteReport(index) {
      var data = JSON.parse(JSON.stringify(this.reportList[index]))
      infowindow.confirm(this, `確定要刪除檢查單號為${data.req}的報告？`).then(_ => {
        var currentUser = this.$store.state.userInfo.userInfoID
        this.loading = true
        apiService.postData('/api/ReportSystem/DeleteReport', { reportSymbol: data.reportSymbol, currentUser: currentUser }).then(res => {
          if(res.data.isSuccess) {
            infowindow.success(this, res.data.successMessage)
            this.getReportList(false)
          } else infowindow.error(this, res.data.exceptionMessage)
        }).catch(err => {
          infowindow.error(this, err)
        }).finally(_ => {
          this.loading = false
        })
      }).catch(_ => {})
    },
    /**
     * 查看與修改報告
     */
    editReport(index) {
      var data = JSON.parse(JSON.stringify(this.reportList[index]))
      this.reportSymbol = data.reportSymbol
      this.pageShow = 3
    },
    switchChange(val) {

    },
    checkboxChange(val) {
      
    },
    inputBlur(e) {

    },
    inputChange(val) {
      
    },
    selectChange(val) {

    },
    backToList(isChange) {
      this.getReportList(isChange)
    }
  },
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>
