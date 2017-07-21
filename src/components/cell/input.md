## InputCell

> import { InputCell } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| title         | String |标题，即左侧label| 
| value       | String |内容，即左侧文字|
| to       | String |跳转目标|

#
```
<wue-form title="注册信息">
        <wue-input-cell label="label" placeholder="请输入内容" v-model="show"></wue-input-cell>
        <wue-input-cell label="label" placeholder="请输入数字" type="number" v-model="number"></wue-input-cell>
        <wue-input-cell label="请输入 abc" placeholder="请输入 abc" v-model="number" pattern="^\d*$"></wue-input-cell>
        <wue-input-cell label="请输入 abc" placeholder="请输入 abc" v-model="number" pattern="^\d*$">
            <button class="weui-vcode-btn">获取验证码</button>
        </wue-input-cell>
</wue-form>
```
