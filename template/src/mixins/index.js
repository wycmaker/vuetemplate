/**
 * 載入列表相關共用設定
 */
export const LoadData = {
  data() {
    return {
      loadContent: true,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
    }
  },
  methods: {
    /**
     * 處理分頁改變事件
     * @param {Object} val 變更的物件
     */
    handlePageChange(val) {
      this.currentPage = val.page
      this.pageSize = val.size
      this.getDataList(val.isChange)
    },
    /**
     * 返回列表
     */
    backToList() {
      this.getDataList(false)
    },
    /**
     * 重載Table組件
     */
    reloadTable() {
      this.loadContent = false
      this.$nextTick(_ => {
        this.loadContent = true
      })
    }
  }
}

/**
 * 表格相關共用設定
 */
export const TableColumn = {
  props: {
    label: {
      type: String,
      default: '表頭'
    },
    width: {
      type: String|Number,
      default: null
    },
    align: {
      type: String,
      default: 'left'
    },
    prop: {
      type: String,
      default: null
    },
    fix: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: null
    },
  }
}

/**
 * 查詢相關共用設定
 */
export const QueryItem = {
  props: {
    value: {
      type: String|undefined|null,
      default: null
    },
    title: {
      type: String,
      default: '查詢文字'
    },
    'title-width': {
      type: String,
      default: null
    }
  },
  computed: {
    bindValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('update:value', newValue)
      }
    }
  }
}

/**
 * 表單相關共用設定
 */
export const MedicalChart = {
  props: {
    dataAttr: {
      type: Object,
      default: () => { return {} }
    }
  }, 
  inject: [ 'canModify' ],
  computed: {
    data: {
      get() {
        return this.dataAttr
      },
      set(newValue) {
        this.$emit('update:dataAttr', newValue)
      }
    }
  }
}

/**
 * 更新病歷資料
 */
export const UpdateMedicalChart = {
  inject:[ 'updateMedicalChart', 'getPhisNum' ],
  data() {
    return {
      showSOAP: false,
      soapAttr: {}
    }
  },
  methods: {
    /**
     * 送出修改病歷API
     */
    sendData() {
      this.updateMedicalChart(this.data)
    },
    /**
     * 返回列表
     */
    backToList() {
      this.$router.push(`${this.$foldPath}`)
    },
    getSOAP(chartPartType, partID) {
      let sendData = {
        phisNum: this.getPhisNum(),
        chartPartType: chartPartType,
        partID: partID
      }
      this.$api.getSOAPbyType(sendData).then(res => {
        this.soapAttr = { ...res.data }
        this.showSOAP = true
      }).catch(err => {
        if(err !== '') this.$service.info.error(err)
      })
    }
  }
}