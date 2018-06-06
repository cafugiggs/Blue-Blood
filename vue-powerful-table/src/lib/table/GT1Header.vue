<template>
  <ul class="header" :style="headStyles ? headStyles : {}">
    <li class="cell" :style="computeCellStyle(column)" v-for="(column, index) in headColumns" :key="index">
      <Checkbox v-if="column.type === 'selection'" @on-change="changeHandle"></Checkbox>
      <span v-else>{{column.title}}</span>
    </li>
  </ul>
</template>
<script>
  const GT1_HEAD_HEIGHT = 40;

  export default {
    props: {
      headColumns: {
        type: Array,
        require: true
      },
      headStyles: {
        type: Object
      },
      defaultCellWidth: {
        type: Number
      }
    },
    data() {
      return {

      }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
      computeCellStyle(column) {
        let style = {};
        style.width = column.width ? `${column.width}px` : `${this.defaultCellWidth}px`;
        style.height = `${GT1_HEAD_HEIGHT}px`;
        return style;
      },
      changeHandle(e) {
        e ? this.$emit('on-select-all') : this.$emit('on-cancel-all');
      }
    }
  }
</script>
<style scoped>
  ul.header {
    overflow: hidden;
    list-style: none;
    box-sizing: border-box;
  }
  li.cell {
    font-weight: bold;
    line-height: 40px;
    text-align: center;
    float: left;
    box-sizing: border-box;
    border-top: 1px solid #dddeee;
    border-bottom: 1px solid #dddeee;
    border-left: 1px solid #dddeee;
    background-color: #eee;
  }
  li.cell:last-child {
    border-right: 1px solid #dddeee;
  }
</style>
