## Radio

> import { Radio } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|title| Number | 标题|||
|items| Array | 显示的项目| ['男', '女']||


```html
 <wue-radio title="title" v-model="name" :items="items" @change="onChange"></wue-radio>
```