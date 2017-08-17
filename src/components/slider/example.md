## Slider

> import { Slider } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|min| Number | 最小值||0|
|max| Number | 最大值|| 100|
|width| Number | 导轨宽度|| 3|
|step| Number | 步进值||1|
|show-value-box| Boolean | 显示值||true|
|disabled| 是否可用 | 显示值||false|


```html
<wue-slider :step="1" :max="100" v-model="value"></wue-slider>
```