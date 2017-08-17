## Tabbar & TabbarItem

```
import { Tabbar } from 'wue';
import { TabbarItem } from 'wue';
```


Tabbar

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|fixed| Boolean | 是否固定位置| ||


Tabbar

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|id| String | Number | 必填| ||


```html
 <wue-tabbar v-model="value">
    <wue-tabbar-item icon="/img/menu.png" on-icon="/img/logo.png" label="微信1" :badge="10" id="1" @click="onClick"></wue-tabbar-item>
    <wue-tabbar-item icon="/img/menu.png" on-icon="/img/logo.png" label="微信2" :dot="true" id="2"></wue-tabbar-item>
    <wue-tabbar-item icon="/img/menu.png" on-icon="/img/logo.png" label="微信3" id="3"></wue-tabbar-item>
</wue-tabbar>
```