## Progress

> import { Progress } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|height| Number | 进度条高度||3|
|clear| Boolean | 是否显示取消按钮||false|
|on-cancel| Event | 取消时触发的时间|


```html
<wue-progress :height="10" v-model="value" :clear="true" @on-cancel="onCancel"></wue-progress>
```