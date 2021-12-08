# tvghbigdata

> A Vue.js project

## Build Setup

# use toast

1. 引用plugins至專案

```
import toastRegistry from '@/plugins/toastr';
Vue.use(toastRegistry)
```

2. 在專案中使用

```
this.$toast({ 
  text: 'your message' ,
  type: 'success',
  duration: 1000   // 單位為ms
});

```
