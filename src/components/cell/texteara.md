## Textarea

> import { Textarea } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|placeholder| String | 标题|||
|rows| Number | 行数| ||
|max| Number | 最大长度| ||
|disabled| Boolean | 是否禁用| ||
|readonly| Boolean | 是否只读| ||


```html
<wue-textarea placeholder="请输入文本" :rows="3" v-model="value" :max="10"></wue-textarea>
```