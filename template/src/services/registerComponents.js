import Vue from 'vue'

// 共用組件
import FormButtonGroup from '@/components/FormButtonGroup'
Vue.component('form-button-group', FormButtonGroup)

import CustomSelect from '@/components/Common/CustomSelect'
Vue.component('custom-select', CustomSelect)

import CustomDateRange from '@/components/Common/CustomDateRange.vue'
Vue.component('custom-date-range', CustomDateRange)

import CustomSwitch from '@/components/Common/CustomSwitch.vue'
Vue.component('custom-switch', CustomSwitch)

/* #region Table相關組件 */

import TableTemplate from '@/components/Table/TableTemplate'
Vue.component('table-template', TableTemplate)

import ButtonColumn from '@/components/Table/Columns/ButtonColumn'
Vue.component('button-column', ButtonColumn)

import SwitchColumn from '@/components/Table/Columns/SwitchColumn.vue'
Vue.component('switch-column', SwitchColumn)

import CheckBoxColumn from '@/components/Table/Columns/CheckBoxColumn'
Vue.component('check-box-column', CheckBoxColumn)

import SelectColumn from '@/components/Table/Columns/SelectColumn'
Vue.component('select-column', SelectColumn)

import InputColumn from '@/components/Table/Columns/InputColumn'
Vue.component('input-column', InputColumn)

import TextareaColumn from '@/components/Table/Columns/TextareaColumn'
Vue.component('textarea-column', TextareaColumn)

import PlainTextColumn from '@/components/Table/Columns/PlainTextColumn'
Vue.component('plain-text-column', PlainTextColumn)

import IndexColumn from '@/components/Table/Columns/IndexColumn'
Vue.component('index-column', IndexColumn)

/* #endregion */

/* #region Query相關組件 */

import QueryBar from '@/components/Query/QueryBar'
Vue.component('query-bar', QueryBar)

import QueryDateRange from '@/components/Query/QueryDateRange'
Vue.component('query-date-range', QueryDateRange)

import QueryInput from '@/components/Query/QueryInput'
Vue.component('query-input', QueryInput)

import QuerySelect from '@/components/Query/QuerySelect'
Vue.component('query-select', QuerySelect)

import QueryCascader from '@/components/Query/QueryCascader'
Vue.component('query-cascader', QueryCascader)

import QueryButtonGroup from '@/components/Query/QueryButtonGroup'
Vue.component('query-button-group', QueryButtonGroup)

/* #endregion */
