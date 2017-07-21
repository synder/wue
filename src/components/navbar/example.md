## Navbar

```
import { Navbar } from 'wue';
import { NavbarItem } from 'wue';
```

#Navbar 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|color|String| 正常字体颜色|success, warn, info, waiting|
|backgroundColor|String| 背景色|
|activeColor|String| 激活颜色|
|disabledColor|String| 不可用颜色|

#NavbarItem 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|id|String| 该项目的id|
|disabled|Boolean| 是否禁用| | false|
|on-item-click|Event| 点击单个选项触发的事件（传入该项的ID）| | |


```
 <wue-navbar v-model="selected" @change="changed" fixed>
    <wue-navbar-item id="item1" @on-item-click="handle">选项1</wue-navbar-item>
    <wue-navbar-item id="item2" @on-item-click="handle">选项2</wue-navbar-item>
    <wue-navbar-item id="item3" @on-item-click="handle">选项3</wue-navbar-item>
 </wue-navbar>
```