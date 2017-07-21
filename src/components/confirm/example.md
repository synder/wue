## Confirm

> import { Confirm } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| dialog-class       |String|弹窗样式Class名| | |
| hide-on-blur       | Boolean |失去焦点隐藏|
| dialog-style       | String |弹窗样式|
| scroll       | Boolean |是否可以滚动|



```
<wue-dialog :hide-on-blur="true" v-model="value">
        <div class="content">内容</div>
</wue-dialog>
```