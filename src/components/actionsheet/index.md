## ActionSheet

> import { ActionSheet } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| type          | String |皮肤样式|ios, android	| ios|
| title         | String |标题|
| cancel        | String |取消菜单项文字|
| options       | Array  |菜单项| [{id:'1', text: '菜单'}]	|


| 事件           | 类型          | 说明  | 传递参数| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| click | Event| 点击单个项目时选择的| {id: '', text: ''}|


#指定皮肤样式
```
<wu-actionsheet type="android" @click="onClick" :options="options" cancel="取消" v-model="sheetVisible"></wv-actionsheet>
```