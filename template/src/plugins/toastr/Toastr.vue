<template>
  <div v-if="isShow">
    <div
      class="custom-toast"
      :class="{
        info: type === 'info',
        success: type === 'success',
        wraning: type === 'wraning',
        danger: type === 'danger',
        'bottom-center': position === 'bottom-center',
        'bottom-left': position === 'bottom-left',
        'bottom-right': position === 'bottom-right',
        'top-center': position === 'top-center',
        'top-left': position === 'top-left',
        'top-right': position === 'top-right',
      }"
    >
      <div :class="$style['info-block']">
        <div :class="$style['info-block-icon']">
          <i v-if="type === 'info'" class="el-icon-info"></i>
          <i v-if="type === 'success'" class="el-icon-success"></i>
          <i v-if="type === 'wraning'" class="el-icon-warning"></i>
          <i v-if="type === 'danger'" class="el-icon-error"></i>
        </div>
        <div :class="$style['info-block-text']">
          <label>{{ text }}</label>
        </div>
      </div>
      <p class="progress">&nbsp;</p>
    </div>
  </div>
</template>

<style scoped>
.custom-toast {
  position: fixed;
  left: 50%;
  bottom: 0px;
  background: #ccc;
  padding: 10px 20px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
  min-width: 250px;
  max-width: 300px;
  height: auto;
  min-height: 40px;
  line-height: 40px;
  font-size: 18px;
  z-index: 100000;
}

.bottom-center {
  position: fixed;
  left: 50%;
  bottom: 0px;
}

.bottom-right {
  position: fixed;
  right: 0px;
  left: unset;
  transform: translateX(0%);
  bottom: 30px;
}

.bottom-left {
  position: fixed;
  left: 0px;
  transform: translateX(0%);
  bottom: 30px;
}

.top-center {
  position: fixed;
  left: 50%;
  bottom: unset;
  top: 50px;
}

.top-left {
  position: fixed;
  left: 30px;
  transform: translateX(0%);
  bottom: unset;
  top: 50px;
}

.top-right {
  position: fixed;
  left: unset;
  right: 30px;
  transform: translateX(0%);
  bottom: unset;
  top: 50px;
}

.el-icon-info, .el-icon-success, .el-icon-warning, .el-icon-error {
  margin-right: 5px;
}

.info {
  background: #00aaee;
}

.success {
  background: #2fa84f;
}

.wraning {
  background: #eea300;
}

.danger {
  background: #c9290c;
}

.progress {
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  margin: 0;
}
</style>

<style lang="scss" module>
  @import "@/assets/css/custom.scss";

  .info-block {
    display: flex;
    align-items:center;

    &-icon {
      width: 30px;
    }

    &-text {
      width: 250px;
      line-height: 25px;
    }
  }
</style>