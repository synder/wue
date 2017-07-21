## Circle

> import { Circle } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| diameter         | Number |圆环直径| 
| line-width       | Number |线宽|
| stroke-color       | String |主色|
| trail-color       | String |轨道色|
| fill-color       | String |圆环内部填充色|
| speed       | Number |缓动速度（单位 ms）| |500ms|
| value       | Number |当前百分比| |


```
<wue-circle :line-width="3" :value="value">12 %</wue-circle>
```