<template>
    <div class="layout">
        <wue-group v-model="value" :height="height" :width="width">
            <wue-group-item :id="1">
                <wue-grid :rows="4">
                    <wue-grid-item label="accordion" to="#/accordion"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="actionsheet" to="#/actionsheet"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="dialog" to="#/dialog"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="article" to="#/article"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="avatar" to="#/avatar"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="backtop" to="#/backtop"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="badge" to="#/badge"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="button" to="#/button"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="cell" to="#/cell"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="circle" to="#/circle"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="divider" to="#/divider"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="flex" to="#/flex"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="fresh" to="#/fresh"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="fullpage" to="#/fullpage"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="gallery" to="#/gallery"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="grid" to="#/grid"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="header" to="#/header"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="infinite" to="#/infinite"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="input" to="#/input"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="list" to="#/list"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="marquee" to="#/marquee"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="mask" to="#/mask"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="msg" to="#/msg"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="navbar" to="#/navbar"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="panel" to="#/panel"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                    <wue-grid-item label="picker" to="#/picker"><wue-icon slot="icon" name="arrow-up" :size="60"></wue-icon></wue-grid-item>
                </wue-grid>
            </wue-group-item>

            <wue-group-item :id="2">
                2
            </wue-group-item>

            <wue-group-item :id="3">
                3
            </wue-group-item>

            <wue-group-item :id="4">
                4
            </wue-group-item>
        </wue-group>

        <wue-tabbar v-model="value" class="tabbar">
            <wue-tabbar-item label="首页" @click="onClick" :id="1">
                <wue-icon slot="icon" name="home" :size="25"></wue-icon>
            </wue-tabbar-item>

            <wue-tabbar-item label="喜欢" @click="onClick" :id="2">
                <wue-icon slot="icon" name="heart-fill" :size="25"></wue-icon>
            </wue-tabbar-item>

            <wue-tabbar-item label="定位" @click="onClick" :id="3">
                <wue-icon slot="icon" name="location" :size="25"></wue-icon>
            </wue-tabbar-item>

            <wue-tabbar-item label="用户" @click="onClick" :id="4">
                <wue-icon slot="icon" name="user" :size="25"></wue-icon>
            </wue-tabbar-item>
        </wue-tabbar>
    </div>
</template>

<style lang='less' scoped>
    @import "../../../src/styles/base/reset";
    
    .layout{
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
</style>

<script>
    import WueGrid from "../../../src/components/grid/index";
    import WueGridItem from "../../../src/components/grid/item";
    import WueIcon from "../../../src/components/icon/index";
    import WueTabbar from "../../../src/components/tabbar/index";
    import WueTabbarItem from "../../../src/components/tabbar/item";
    import WueGroup from "../../../src/components/groups/index";
    import WueGroupItem from "../../../src/components/groups/item";
    export default {
        components: {
            WueGroupItem,
            WueGroup,
            WueTabbarItem,
            WueTabbar,
            WueIcon,
            WueGridItem,
            WueGrid},
        props: {},

        data(){
            return {
                value: 1,
                height: window.innerHeight,
                width: window.innerWidth
            };
        },

        computed: {},

        methods: {
            onClick(){
                
            }
        },

        watch: {},

        mounted(){
            const self = this;
        }
    }
</script>