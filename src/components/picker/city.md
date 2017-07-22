# CityPicker

> import { CityPicker } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|province|String|默认选中的省|
|city|String|默认选中的城市|
|area|String|默认选中的区|
|done|Function|返回选中值|


```
<wue-city-picker v-model="value" :done="onDone" province="新疆" city="乌鲁木齐市" area="天山区"></wue-city-picker>
```