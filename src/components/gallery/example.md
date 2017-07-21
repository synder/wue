## Button

> import { Button } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| type         | String |按钮类型| primary,default,warn| default|
| disabled       | Boolean |是否禁用按钮||false|
| plain       | Boolean |是否显示为扁平化| |  false|
| mini       | Boolean |是否最小||false|
| loading       | Boolean |是否显示加载||false|
| action       | String |按钮类型| submit|


#指定皮肤样式
```
<wu-button :loading="true">1</wu-badge>
```