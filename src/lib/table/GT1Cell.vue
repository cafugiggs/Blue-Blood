<template>
  <ul class="content" :style="bodyStyles ? bodyStyles : {}">
    <li class="cell" :style="computeCellStyle(column)" v-for="(column, index) in headColumns" :key="index">
      <div v-if="column.type === 'selection'">
        <Checkbox v-model="bodyData['checked']" @on-change="changeHandle"></Checkbox>
      </div>
      <div v-else>
        <a href="javascript:;" v-if="!isEditing || (currentEditingKey !== column.key)" @dblclick="editHandle(column.key)">{{bodyData[column.key] !== "" ? bodyData[column.key] : ""}}</a>
        <input type="text" :value="`${bodyData[column.key]}`" v-else @blur="cancelHandle" />
      </div>
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
      type: Object,
      require: true
    },
    dataIndex: {
      type: Number,
      require: true
    },
    defaultCellWidth: {
      type: Number
    },
    isCanEdit: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      currentEditingKey: '',
      isEditing: false
    }
  },
  methods: {
    computeCellStyle (column) {
      let style = {}
      style.width = column.width ? `${column.width}px` : `${parseFloat(this.defaultCellWidth)}px`
      style.height = `${GT1_HEAD_HEIGHT}px`
      return style
    },
    changeHandle (e) {
      this.$emit('on-select', {value: e, index: this.dataIndex})
    },
    editHandle (key) {
      if (!this.isCanEdit) {
        return
      }
      this.currentEditingKey = key
      this.isEditing = true
    },
    cancelHandle (e) {
      this.isEditing = !this.isEditing
      this.$set(this.bodyData, this.currentEditingKey, e.target.value)
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
    border-bottom: 1px solid #dddeee;
    border-left: 1px solid #dddeee;
  }
  li.cell:last-child {
    border-right: 1px solid #dddeee;
  }
  li.cell div {
    width: 100%;
    height: 100%;
  }
  li.cell a, li.cell a:hover {
    color: #495060;
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
  input[type="text"] {
    text-indent: 5px;
    width: 94%;
    height: 30px;
    margin: 5px auto;
    border: 1px dotted #ccc;
  }
</style>
