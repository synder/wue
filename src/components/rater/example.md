## Rater

> import { Rater } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|max| Number | 最大值|||
|disabled| Boolean | 是否可用| |false|
|color| String | 颜色| ||
|margin| Number | 间距| ||
|size| Number | 大小| ||


```html
 <wue-rater :max="10" v-model="value"></wue-rater>
```