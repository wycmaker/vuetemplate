<template>
  <div>
    <label :class="$style['form-label']">Upload Files:</label>
    <el-upload
      action=""
      :auto-upload="false"
      list-type="picture-card"
      :file-list="data.fileList"
      :on-change="handleChange"
      accept=".pdf, .docx, .doc, .odt, .txt, .csv, .ods, .xls, .xlsx, .mp4, .mpeg, .mp3, .wav, .jpg, .png"
      :class="[$style.upload, (data.fileList.length === 5) ? $style.hiddenAdd : null]"
      :limit="5"
      :multiple="true"
      :disabled="disabled"
      class="loading">
      <i class="el-icon-plus"></i>
      <div slot="file" style="text-align:center;" slot-scope="{file}">
        <template v-if="file.name.split('.').pop() !== 'jpg' && file.name.split('.').pop() !== 'png'">
          <i class="el-icon-document" 
            style="font-size: 80px;padding-top: 13px">
          </i>
          <p style="font-size:12px;margin: 0px">{{ file.name }}</p>
        </template>
        <template v-else>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </template>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handleDownload(file)">
            <i class="el-icon-download" v-if="file.name.split('.').pop() !== 'jpg' && file.name.split('.').pop() !== 'png'"></i>
            <i class="el-icon-zoom-in" v-else></i>
          </span>
          <span class="el-upload-list__item-delete">
            <i class="el-icon-delete" @click="fileRemove(file)"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <el-dialog :visible.sync="showPicture" append-to-body :close-on-click-modal="false" :class="$style.dialog" :custom-class="$style['picture-dialog']">
      <img :src="imgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { MedicalChart } from '@/mixins'

export default {
  mixins: [ MedicalChart ],
  inject: [ 'reloadData' ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPicture: false,
      imgSrc: ''
    }
  },
  methods: {
    /**
     * 檔案列表改變
     * @param {Object} file 檔案物件
     * @param {Array} fileList 檔案列表
     */
    handleChange(file, fileList) {
      // 1024 * 1024 = 1MB
      if(file.size > 5 * 1024 * 1024) {
        this.$service.info.warning('檔案不可大於5MB')
        fileList.splice(fileList.length-1, 1)
      }
      else {
        this.data.fileList.push(file)
        this.data.fileList = [ ...this.data.fileList ]
      }
    },
    /**
     * 刪除檔案
     * @param {Object} file 檔案物件
     */
    fileRemove(file) {
      this.$service.info.confirm('您確定要刪除此檔案?').then(() => {
        let uid = file.uid;
        let index = this.data.fileList.findIndex(item => item.uid === uid)
        if(index !== -1) {
          if(this.data.fileList[index].actualFileName === undefined) {
            this.data.fileList.splice(index, 1)
            this.data.fileList = this.data.fileList.slice()
            this.$service.info.success('刪除檔案成功')
          }
          else {
            let sendData = {
              chartFileID: this.data.fileList[index].chartFileID,
              currentUser: this.$store.getters.currentUser
            }

            this.$api.deleteChartFile(sendData).then(res => {
              if(res.data.isSuccess) {
                this.$service.info.success(res.data.returnMessage)
                this.data.fileList.splice(index, 1)
                this.data.fileList = this.data.fileList.slice()
                this.reloadData()
              } else {
                this.$service.info.error(res.data.returnMessage)
              }
            }).catch(err => {
              if(err !== '') this.$service.info.error(err)
            })
          }
        }        
      }).catch(() => {});
    },
    /**
     * 下載檔案
     * @param {Object} file 檔案物件 
     */
    handleDownload(file) {
      let name = file.name
      let arr = name.split('.')
      let length = arr.length
      let extension = arr[length - 1]
      if(extension === 'jpg' || extension === 'png') {
        this.showPicture = true
        this.imgSrc = file.url
      }
      else {
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = file.url
        a.download = file.name
        a.click()
        a = null
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import '@/assets/css/custom.scss';

  .upload {
    :global(.el-upload--picture-card) {
      background-color: #fafafa;
      border-color: #cccccc;

      i {
        color: #b3b3b3;
      }
    }
  }

  .hiddenAdd {
    :global {
      .el-upload--picture-card {
        display: none !important;
      }
    }
  }

  .picture-dialog {
    width: 50%;

    @media (max-width: 1180px) {
      width: 75%;
    }

    :global {
      .el-dialog__body {
        text-align: center;
        padding: 15px;

        & img {
          margin-top: 15px;
          width: 100%;
        }
      }
    }
  }
</style>