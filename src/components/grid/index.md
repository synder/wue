## Grid

```
import { Grid } from 'wue';
import { GridItem } from 'wue';
```

#Grid 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|rows|Number| 列数||3|


#GridItem 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|label|String| 名称|


```
<wue-grid :rows="3">
        <wue-grid-item label="x" v-for="i in 3" :key="i">
            <img slot="icon" src="/img/logo.png">
        </wue-grid-item>
 </wue-grid>
```