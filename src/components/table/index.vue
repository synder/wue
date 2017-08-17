<template>
    <table class="wue-table"
           :class="classes">
        <slot></slot>
    </table>
</template>

<script>
    export default {
        name: 'wue-table',
        props: {
            fullBordered: Boolean,
            cellBordered: {
                type: Boolean,
                default: true
            },
            contentBordered: {
                type: Boolean,
                default: true
            }
        },
        
        computed: {
            classes(){
                return {
                    'wue-table-bordered': this.fullBordered, 
                    'wue-table-no-cell-bordered': !this.cellBordered, 
                    'wue-table-no-content-bordered': !this.contentBordered
                };
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../styles/base/reset.less';

    .wue-table {
        line-height: 40px;
        position: relative;
        width: 100%;
        border-collapse: collapse;

        &:after {
            .top-line();
        }
        th {
            font-weight: 500
        }
    }

    .wue-table.wue-table-bordered {
        &:before {
            .left-line();
        }
    }

    .wue-table td, .wue-table th {
        border-bottom: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
        text-align: center;
    }

    .wue-table td, .wue-table th {
        position: relative;
        border-right: 0;
        border-bottom: 0;
    }

    .wue-table td, .wue-table th {
        &:before {
            .bottom-line();
        }
    }

    .wue-table.wue-table-no-content-bordered td {
        &:before {
            border-bottom-width: 0;
        }
    }

    .wue-table.wue-table-no-content-bordered tr:last-child td {
        &:before {
            border-bottom-width: 1px;
        }
    }

    .wue-table td, .wue-table th {
        &:after {
            .right-line();
        }
    }

    .wue-table.wue-table-no-cell-bordered td, .wue-table.wue-table-no-cell-bordered th {
        &:after {
            border-right-width: 0;
        }
    }

    .wue-table tr td:last-child, .wue-table tr th:last-child {
        &:after {
            border-right-width: 0;
        }
    }

    .wue-table.wue-table-bordered tr td:last-child, .wue-table.wue-table-bordered tr th:last-child {
        &:after {
            border-right-width: 1px;
        }
    }
</style>
