const userAgent = navigator.userAgent.toLowerCase()

if(userAgent.indexOf("msie")!=-1 || userAgent.indexOf("trident")!=-1) {
  alert('使用IE瀏覽器可能造成部分功能異常，建議使用Chrome或Edge瀏覽器')
}