## Cell

> import { Cell } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| title         | String |标题，即左侧label| 
| value       | String |内容，即左侧文字|
| to       | String |跳转目标|

#指定皮肤样式
```
<wue-cells title="带图标、说明、跳转的列表项">
  <wue-cell title="标题文字" label="说明文字" to="/" icon="imgIcon"></wue-cell>
  <wue-cell title="标题文字" label="说明文字" to="/">
    <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
  </wue-cell>
</wue-cells>
```

#带左滑动事件的
```
 <wue-cells title="默认">
        <wue-swipe-cell title="标题文字" :value="true">
            <wue-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">删除</wue-swipe-cell-button>
            <wue-swipe-cell-button type="default" slot="right" @click.native="readClicked">查看</wue-swipe-cell-button>
        </wue-swipe-cell>

        <wue-swipe-cell title="标题文字" :value="true">
            <wue-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">
                <i class="iconfont icon-rubish"></i>
            </wue-swipe-cell-button>
            <wue-swipe-cell-button type="default" slot="right" @click.native="readClicked">
                <i class="iconfont icon-view"></i>
            </wue-swipe-cell-button>
        </wue-swipe-cell>
        
        <wue-swipe-cell title="标题文字">
            <img src="/img/logo.png" slot="icon" class="cell-icon">
            <wue-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">删除</wue-swipe-cell-button>
            <wue-swipe-cell-button type="default" slot="right" @click.native="readClicked">查看</wue-swipe-cell-button>
        </wue-swipe-cell>

        <wue-swipe-cell title="标题文字" to="/">
            <wue-swipe-cell-button type="warn" slot="right" @click.native="deleteClicked">删除</wue-swipe-cell-button>
            <wue-swipe-cell-button type="default" slot="right" @click.native="readClicked">查看</wue-swipe-cell-button>
        </wue-swipe-cell>
    </wue-cells>
```