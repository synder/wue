## Picker

> import { Picker } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|visible|Boolean|是否可见|
|change|Event|值发生变化时的事件|返回选择的对象|
|options|Object|{province: ['测试1', '测试2'],city: ['测试3', '测试4']}|


```html
 <wue-picker @change="onClick" :visible="true" :options="options"></wue-picker>
```