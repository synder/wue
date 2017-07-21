## Switch

> import { Switch } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|title| String | 标题|||
|disabled| String | 是否可用| ||
|cell| Boolean | 是否显示在一行内| ||


```html
 <wue-radio title="title" v-model="name" :items="items" @change="onChange"></wue-radio>
```