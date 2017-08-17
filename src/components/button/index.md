## Button

> import { Button } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| type         | String |按钮类型| default, warn, primary| default|
| plain         | Boolean |是否显示边框| | false|
| loading       | Boolean |是否显示加载|
| mini       | Boolean |是否最小化|
| disabled       | Boolean |是都禁用|
| to       | String |跳转地址|
| background       | String |按钮背景颜色|
| color       | String |按钮文字颜色|
| radius       | Number |按钮半径|


#指定皮肤样式
```
<wue-button type="primary" background="#456554"> 贤惠</wue-button>
<wue-button type="primary" background="#456554" :mini="true"> 贤惠</wue-button>
<wue-button type="primary" background="#456554" :plain="true"> 贤惠</wue-button>
```