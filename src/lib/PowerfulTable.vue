<template>
  <div :style="styles">
    <!-- 下拉刷新 -->
    <gt1-drop-down v-if="isDropDown"></gt1-drop-down>
    <!-- powerfulTable 外层遮罩 -->
    <div id="Gt1Table" class="Gt1Table" v-if="isNeedShowTable">
      <!-- powerfulWrapper 外部内容 -->
      <div class="Gt1Wrapper">
        <gt1-table
          :columns="columns"
          :data="salaryData"
          :styles="styles"
          :isPolling="isPollUp"
          :isSingleSelection="isSingleSelection"
          :isCanEdit="isCanEdit"
          :hasIndex="hasIndex"
          @on-getPageData="getPageData"
          @on-select-all="selectAll"
          @on-cancel-all="cancelAll"
          @on-select="singleSelect"
        ></gt1-table>
      </div>
    </div>
    <!-- 上拉加载 -->
    <gt1-pull-up v-if="isPollUp"></gt1-pull-up>
  </div>
</template>
<script>
import Gt1DropDown from './table/GT1DropDown.vue'
import Gt1PullUp from './table/GT1PullUp.vue'
import Gt1Table from './table/GT1Table.vue'

export default {
  components: {Gt1DropDown, Gt1PullUp, Gt1Table},
  props: {
    isDropDown: {
      type: Boolean,
      default () {
        return false
      }
    },
    isPollUp: {
      type: Boolean,
      default () {
        return false
      }
    },
    isSingleSelection: {
      type: Boolean
    },
    isCanEdit: {
      type: Boolean
    },
    hasIndex: {
      type: Boolean
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    columns: {
      type: Array,
      require: true
    },
    data: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isNeedShowTable: false
    }
  },
  computed: {
    styles () {
      let style = {}
      style.height = `${parseInt(this.height)}px`
      style.width = `${parseInt(this.width)}px`
      style.overflow = 'visible'
      style.boxSizing = 'border-box'
      return style
    },
    salaryData () {
      if (this.hasIndex) {
        this.data.forEach((d, i, a) => {
          d['index'] = i + 1
        })
      }
      return this.data
    }
  },
  mounted () {
    if (!this.hasIndex) {
      this.isNeedShowTable = true
    } else {
      this.setIndex()
    }
  },
  methods: {
    getPageData () {
      this.$emit('on-getPageData')
    },
    selectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    cancelAll () {
      this.$emit('on-cancel-all')
    },
    singleSelect (selection) {
      this.$emit('on-select', selection)
    },
    setIndex () {
      const isHasIndex = this.columns[0].key === 'index'
      if (isHasIndex) {
        return
      }
      let hasFixedColumn = false
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].fixed) {
          hasFixedColumn = true
          break
        }
      }
      if (hasFixedColumn) {
        this.columns.unshift({title: '', key: 'index', width: 40, align: 'center', fixed: true})
      } else {
        this.columns.unshift({title: '', key: 'index', width: 40, align: 'center'})
      }
      this.isNeedShowTable = true
    }
  }
}
</script>
<style scoped>
  /* ====== 表格 ====== */
  .Gt1Table {
    font-size: 12px;
    color: #495060;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    background: white;
  }
  .Gt1Wrapper {
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>
