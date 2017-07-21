## Cells

> import { Cells } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| title         | String |标题| 
| color       | String |标题的颜色|

#指定皮肤样式
```
<wue-cells title="带图标、说明、跳转的列表项">
  <wue-cell title="标题文字" label="说明文字" to="/" icon="imgIcon"></wue-cell>
  <wue-cell title="标题文字" label="说明文字" to="/">
    <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
  </wue-cell>
</wue-cells>
```