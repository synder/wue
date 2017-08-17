<template>
    <div>
        <wue-cells>
            <wue-radio-cell :options="options" v-model="value"></wue-radio-cell>
            <wue-checkbox-cell :options="options" v-model="check"></wue-checkbox-cell>
            <wue-switch-cell  v-model="switches">你好</wue-switch-cell>
            <wue-textarea-cell  v-model="value">你好</wue-textarea-cell>
            <wue-swipe-cell icon="/img/logo.png" id="show" @swipe-button-click="onClick">查看</wue-swipe-cell>

            <wue-swipe-cell title="标题文字" :value="true">
                <wue-swipe-cell-button type="warn" slot="button" >
                    <wue-icon name="delete"></wue-icon>
                </wue-swipe-cell-button>
            </wue-swipe-cell>

            <wue-swipe-cell title="标题文字" :value="true">
                <wue-swipe-cell-button type="warn" slot="button" >
                    <wue-icon name="delete" ></wue-icon>
                </wue-swipe-cell-button>

                <wue-swipe-cell-button type="warn" slot="button" background="#ddd">
                    <wue-icon name="edit"></wue-icon>
                </wue-swipe-cell-button>

                <wue-swipe-cell-button type="warn" slot="button" background="#00ffbb">
                    <wue-icon name="lock"></wue-icon>
                </wue-swipe-cell-button>
            </wue-swipe-cell>
            
            <wue-form title="注册信息">
                <wue-input-cell label="label" placeholder="请输入内容" v-model="show"></wue-input-cell>
                <wue-input-cell label="label" placeholder="请输入数字" type="number" v-model="number"></wue-input-cell>
                <wue-input-cell label="请输入 abc" placeholder="请输入 abc" v-model="number" pattern="^\d*$"></wue-input-cell>
                <wue-input-cell label="请输入 abc" placeholder="请输入 abc" v-model="number" pattern="^\d*$">
                    <button class="vcode-btn">获取验证码</button>
                </wue-input-cell>
            </wue-form>
        </wue-cells>
    </div>

</template>

<style lang="less">

</style>

<script>

    import cells from '../../../src/components/cells/index.vue';
    import radio from '../../../src/components/cell/radio.vue';
    import checkbox from '../../../src/components/cell/checkbox.vue';
    import switches from '../../../src/components/cell/switch.vue';
    import textarea from '../../../src/components/cell/textarea.vue';
    import swipe from '../../../src/components/cell/swipe.vue';
    import WueIcon from '../../../src/components/icon/index.vue';
    import WueSwipeCellButton from "../../../src/components/cell/swipe-button";
    import WueInputCell from "../../../src/components/cell/input";
    import WueForm from "../../../src/components/form/form";


    export default {
        data() {
            return {
                value: '女',
                check: ['男', '女'],
                options: [
                    '男',
                    '女'
                ],
                switches: true
            }
        },

        watch: {
            value (newVal) {
                console.log(newVal);
            }
        },

        created(){

        },

        methods: {
            onClick: function (obj, text) {
                console.log(obj, text);
            }
        },
        components: {
            WueForm,
            WueInputCell,
            WueIcon,
            WueSwipeCellButton,
            'wue-cells': cells,
            'wue-radio-cell': radio,
            'wue-checkbox-cell': checkbox,
            'wue-switch-cell': switches,
            'wue-textarea-cell': textarea,
            'wue-swipe-cell': swipe,
        }
    }
</script>