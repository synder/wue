## Marquee

```
import { Marquee } from 'wue';
```

#Marquee 参数

| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|height|Number| 高度|
|speed|Number| 播放速度|
|interval|Number| 间隔时间|
|direction|String| 播放方向| 'up', 'down'| up|
|align|String| 对齐方式| 'left', 'center', 'right'| left|


```
 <div>
        <wue-marquee interval="2000">
            <wue-marquee-item><span style="color:#F00;">&nbsp;荐&nbsp;</span>荣耀V9 3月超级钜惠！</wue-marquee-item>
            <wue-marquee-item><span style="color:#F00;">&nbsp;荐&nbsp;</span>3.23京东超级品牌日格力盛典</wue-marquee-item>
            <wue-marquee-item><span style="color:#F00;">&nbsp;荐&nbsp;</span>京东服饰 早春新品低至7折</wue-marquee-item>
        </wue-marquee>

        <wue-marquee align="center" height="50" interval="2000" class="demo-small-pitch">
            <wue-marquee-item>
                设置高度！设置高度！<br/>
                内容居中！内容居中！<br/>
            </wue-marquee-item>
            <wue-marquee-item>
                2.5秒自动切换！<br>
                2.5秒自动切换！<br>
            </wue-marquee-item>
            <wue-marquee-item>
                京东服饰 早春新品低至7折 <br>
                京东服饰 早春新品低至7折 <br>
            </wue-marquee-item>
        </wue-marquee>

        <wue-marquee direction="down" align="right" height="50" interval="2000" class="demo-small-pitch">
            <wue-marquee-item>
                向下滚动！向下滚动！<br/>
                向下滚动！向下滚动！<br/>
            </wue-marquee-item>
            <wue-marquee-item>
                内容居右！内容居右！<br>
                内容居右！内容居右！<br>
            </wue-marquee-item>
            <wue-marquee-item>
                京东服饰 早春新品低至7折 <br>
                京东服饰 早春新品低至7折 <br>
            </wue-marquee-item>
        </wue-marquee>
</div>
```