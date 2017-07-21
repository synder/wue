## Input & Form

```
import { Input } from 'wue';
import { Form } from 'wue';
```

#Form 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|title | String|表单头 |
|tips | String|表单尾 |

#Input 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|type|String| 表单类型| text number| | text|
|label|String| 标签| | ||
|label-width|Number| 标签宽度| | | 105|
|placeholder|String| 标签| | ||
|disabled|Boolean| 使用可用| | ||
|validate|Boolean| 是否验证| | |true|
|readonly|Boolean| 是否只读| | ||
|required|Boolean| 是否必须| | ||
|pattern|String| 正则表达式| | ||


```
<wue-input label="label" placeholder="请输入内容" v-model="show"></wue-input>
```