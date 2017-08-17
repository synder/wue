## Footer

```
import { Footer } from 'wue';
```


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
|text| String| 列间距	||
|bottom| Boolean| 是否固定在底部	||
|links| Array| [{text: '链接名称', href: '链接地址'}]||

```
<wue-footer text="测试拦截" :links="links" :bottom="true">
</wue-footer>
```