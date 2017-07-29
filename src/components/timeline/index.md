
```
<template>
    <div class="timeline-demo">
        <wue-timeline v-model="value">
            <wue-timeline-item id="a1">
                <h4 class="recent">【广东】 广州市 已发出</h4>
                <p class="recent">2016-04-17 12:00:00</p>
            </wue-timeline-item>
            <wue-timeline-item id="a2">
                <h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
                <p>2016-04-16 10:23:00</p>
            </wue-timeline-item>
            <wue-timeline-item id="a3">
                <h4> 商家正在通知快递公司揽件</h4>
                <p>2016-04-15 9:00:00</p>
            </wue-timeline-item>
        </wue-timeline>
        <button @click="next"> Set to 6 nodes</button>
    </div>
</template>

<script>
    import WueTimeline from '../../../src/components/timeline/index.vue';
    import WueTimelineItem from '../../../src/components/timeline/item.vue';

    export default {
        components: {
            WueTimeline,
            WueTimelineItem,
        },
        data () {
            return {
                value: null
            }
        },
        
        methods: {
            next(){
                this.value = 'a3';
            }
        }
    }
</script>

```