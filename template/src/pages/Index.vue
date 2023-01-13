<template>
  <div :class="[$style.content]">
  </div>
</template>

<script>
export default {
  components: {  },
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
      pageShow: 1,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getReportList(false)
    })
  },
  methods: {

  },
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';
</style>
