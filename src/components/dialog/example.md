## Dialog

> import { Dialog } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| theme         | String |弹框主题| ios, android|
| hide-on-blur       |  Boolean|失去焦点时隐藏| | false|
| title       | String |标题|
| confirm       | String |确认按键文字|
| cancel       | String |取消按键文字|
| content       | String |内容| ||


```
<wue-confirm title="测试" content="内容" :hide-on-blur="true" v-model="value" @on-confirm="confirm">
     <div>内容</div>
</wue-confirm>
```