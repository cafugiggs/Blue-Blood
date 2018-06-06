<template>
  <ul class="content" :style="bodyStyles ? bodyStyles : {}">
    <li class="cell" :style="computeCellStyle(column)" v-for="(column, index) in headColumns" :key="index">
      <span>{{computeCellValue(column)}}</span>
    </li>
  </ul>
</template>
<script>
const GT1_HEAD_HEIGHT = 40

export default {
  props: {
    headColumns: {
      type: Array,
      require: true
    },
    bodyStyles: {
      type: Object
    },
    bodyData: {
      type: Array,
      require: true
    },
    defaultCellWidth: {
      type: Number
    }
  },
  methods: {
    computeCellStyle (column) {
      let style = {}
      style.width = column.width ? `${column.width}px` : `${parseFloat(this.defaultCellWidth)}px`
      style.height = `${GT1_HEAD_HEIGHT}px`
      return style
    },
    computeCellValue (column) {
      if (column.key === '' || !column.count) {
        return ''
      }
      let value = 0
      this.bodyData.forEach(data => {
        if (((/^(-?\d+)(\.\d+)?$/.test(data[column.key])) || (/^-?\d+$/.test(data[column.key]))) && (data[column.key] !== '')) {
          value += parseFloat(data[column.key])
        }
      })
      return value.toFixed(2) !== 0.00 ? value.toFixed(2) : ''
    }
  }
}
</script>
<style scoped>
  ul.content {
    overflow: hidden;
    list-style: none;
    box-sizing: border-box;
  }
  li.cell {
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
