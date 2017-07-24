
```
<template>
    
    <wue-keyboard v-model="show1" :input-done="done1">
        
    </wue-keyboard>
</template>

<script type="text/babel">
    import keyboard from '../../../src/components/keyboard/index.vue';
    
    export default {
        data() {
            return {
                show1: true,
                show2: false
            }
        },
        components: {
            'wue-keyboard': keyboard
        },
        methods: {
            done1(val) {
                console.log('输入的密码是：' + val);
            },
        }
    }
</script>

```