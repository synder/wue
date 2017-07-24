## Swipe

```
import { Swipe } from 'wue';
import { SwipeItem } from 'wue';
```

#Swipe 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|height|Number| 轮播图高度|
|speed|Number| 播放速度|

#Swipe 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|



```
<wue-swipe :height="130" :auto="4000">
    <wue-swipe-item style="background-color: #f44336">1</wue-swipe-item>
    <wue-swipe-item style="background-color: #ffc107">2</wue-swipe-item>
    <wue-swipe-item style="background-color: #03a9f4">3</wue-swipe-item>
</wue-swipe>
```