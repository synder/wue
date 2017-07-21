## Flex & FlexItem

```
import { Flex } from 'wue';
import { FlexItem } from 'wue';
```


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|gutter| Number| 列间距	||
|flex| Number| 相当于 CSS3 中 flex 属性||

```
<wue-flex :gutter="1">
        <wue-flex-item  classes="content"></wue-flex-item>
        <wue-flex-item :flex="10" classes="content">
            <div>name</div>
        </wue-flex-item>
        <wue-flex-item  classes="content"></wue-flex-item>
</wue-flex>
```