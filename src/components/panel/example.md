## Popup

> import { Popup } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|height|NUmber|弹出高度|
|show|Event|显示时触发的事件|
|hide|Event|显示时触发的事件|


```html
 <wue-popup :height="300" v-model="value">
    <wue-cells>
        <wue-switch title="关闭" v-model="value" :cell="true"></wue-switch>
        <wue-cell title="title" :label="value"></wue-cell>
        <wue-cell title="title" :label="value"></wue-cell>
    </wue-cells>
</wue-popup>
```