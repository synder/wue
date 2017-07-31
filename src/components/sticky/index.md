
```
<template>
   <div style="height: 1000px;">
      <div style="height: 200px; background-color: #FF3B30"></div>
      <wue-sticky :offset="10">
         <wue-navbar v-model="selected">
            <wue-navbar-item id="item1" @on-item-click="handle">选项1</wue-navbar-item>
            <wue-navbar-item id="item2" @on-item-click="handle">选项2</wue-navbar-item>
            <wue-navbar-item id="item3" @on-item-click="handle">选项3</wue-navbar-item>
         </wue-navbar>
      </wue-sticky>
      <div style="height: 200px; background-color: #00FF00"></div>
      <div style="height: 200px; background-color: #FF3B30"></div>
      <div style="height: 200px; background-color: #0000FF"></div>
      <div style="height: 200px; background-color: #FF3B30"></div>
      <div style="height: 200px; background-color: #00FF00"></div>
   </div>
</template>

<script>
    import WueSticky from "../../../src/components/sticky/index";
    import WueNavbar from "../../../src/components/navbar/index";
    import WueNavbarItem from "../../../src/components/navbar/item";
   

    export default {
        components: {
            WueNavbarItem,
            WueNavbar,
            WueSticky

        },
        data () {
            return {
                selected: 'item1'
            }
        },
        
        methods: {
            handle(){
                
            }
        },
        
        mounted(){
           
        }
    }
</script>

```