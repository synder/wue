

```
<template>
    <div>
        <wue-table>
            <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Apple</td>
                <td>$1.25</td>
            </tr>
            <tr>
                <td>Banana</td>
                <td>$1.20</td>
            </tr>
            </tbody>
        </wue-table>
    </div>

</template>

<script type="text/babel">
    import table from "../../../src/components/table/index.vue";
    import ribbon from "../../../src/components/ribbon/index.vue";


    export default {
        components: {
            'wue-table': table,
            'wue-ribbon': ribbon,
        },
        data() {
            return {
                value: new Date()
            };
        },
        watch: {
            value(val){
                console.log(val);
            }
        },

        computed: {
            count(){
                return this.$store.state.count
            }
        },

        methods: {},

        mounted(){
            console.log(this);
        }
    }
</script>

```