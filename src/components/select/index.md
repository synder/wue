## Search

> import { Search } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|focus| Boolean | 进入就获取焦点|||
|placeholder| String | placeholder|| 搜索|
|cancel| String | 取消按钮文字|| 取消按钮|
|change| Event | 内容变化时获取值|||


```html
<wue-search :focus="true"  v-model="value" ></wue-search>
```