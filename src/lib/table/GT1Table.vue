<template>
  <div class="content">
    <div>
      <div class="fixed" :style="fixedContent" v-if="fixed.columns.length > 0">
        <gt1-header
          :headColumns="fixed.columns"
          :defaultCellWidth="defaultCellWidth"
          @on-select-all="selectAll"
          @on-cancel-all="cancelAll"
        ></gt1-header>
        <div id="fixedCellContent" class="fixedCellContent" ref="fixedCellContent" :style="fixedCellContent">
          <gt1-cell
            :headColumns="fixed.columns"
            :bodyData="body"
            :dataIndex="fixedDataIndex"
            :defaultCellWidth="defaultCellWidth"
            :isSingleSelection="isSingleSelection"
            :isCanEdit="isCanEdit"
            @on-select="singleSelect"
            v-for="(body, fixedDataIndex) in data"
            :key="fixedDataIndex"
          >
          </gt1-cell>
        </div>
      </div>
      <div class="noFixed" :style="noFixedContent">
        <div id="noFixedHeadContent" class="noFixedHeadContent" ref="noFixedHeadContent" :style="noFixedHeadContent" @scroll="handleNoFixedheadScroll">
          <gt1-header
            :headColumns="noFixed.columns"
            :headStyles="noFixedWidthStyles"
            :defaultCellWidth="defaultCellWidth"
            @on-select-all="selectAll"
            @on-cancel-all="cancelAll"
          ></gt1-header>
        </div>
        <div id="noFixedScrollContent" class="noFixedScrollContent" ref="noFixedScrollContent" :style="noFixedScrollContent" @scroll="handleNoFixedScroll">
          <div id="noFixedCellContent" class="noFixedCellContent" ref="noFixedCellContent" :style="noFixedCellContent">
            <gt1-cell
              :headColumns="noFixed.columns"
              :bodyStyles="noFixedWidthStyles"
              :bodyData="body"
              :dataIndex="noFixedDataIndex"
              :defaultCellWidth="defaultCellWidth"
              :isSingleSelection="isSingleSelection"
              :isCanEdit="isCanEdit"
              @on-select="singleSelect"
              v-for="(body, noFixedDataIndex) in data"
              :key="noFixedDataIndex"
            >
            </gt1-cell>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="fixed" :style="fixedContent" v-if="fixed.columns.length > 0">
        <gt1-count-cell
          :headColumns="fixed.columns"
          :bodyData="data"
          :defaultCellWidth="defaultCellWidth"
        ></gt1-count-cell>
      </div>
      <div class="noFixed" :style="noFixedContent">
        <div id="noFixedCountScrollContent" class="noFixedCountScrollContent" ref="noFixedCountScrollContent" :style="noFixedCountScrollContent">
          <div id="noFixedCountCellContent" class="noFixedCountCellContent" ref="noFixedCountCellContent" :style="noFixedCountCellContent">
            <gt1-count-cell
              :headColumns="noFixed.columns"
              :bodyStyles="noFixedWidthStyles"
              :bodyData="data"
              :defaultCellWidth="defaultCellWidth"
            ></gt1-count-cell>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Gt1Header from './GT1Header.vue'
import Gt1Cell from './GT1Cell.vue'
import Gt1CountCell from './GT1CountCell.vue'

export default {
  components: {Gt1Header, Gt1Cell, Gt1CountCell},
  props: {
    columns: {
      type: Array,
      require: true
    },
    data: {
      type: Array,
      require: true
    },
    styles: {
      type: Object,
      require: true
    },
    isPolling: {
      type: Boolean,
      require: true
    },
    isSingleSelection: {
      type: Boolean,
      default () {
        return false
      }
    },
    isCanEdit: {
      type: Boolean
    },
    hasIndex: {
      type: Boolean
    }
  },
  data () {
    return {
      fixed: {columns: []},
      noFixed: {columns: []},
      currentScrollPosition: {
        left: 0,
        top: 0
      },
      isScrolling: false
    }
  },
  computed: {
    cellCount () {
      return this.columns.length
    },
    defaultCellWidth () {
      return (this.fixedWidth + this.noFixedWidth) / this.cellCount
    },
    // 固定列的宽度
    fixedWidth () {
      let width = 0
      if (this.fixed.columns.length > 0) {
        this.fixed.columns.forEach(column => {
          width += column.width
        })
      }
      return width
    },
    // 固定列容器样式
    fixedContent () {
      let style = {}
      style.width = `${this.fixedWidth}px`
      return style
    },
    // 固定列内容行容器(外层容器 - 表头)
    fixedCellContent () {
      let style = {}
      const CONTENT_HEIGHT = this.data.length * 40
      const BLOCK_HEIGHT = parseInt(this.styles.height.replace(/px|%/g, '') - 40)
      style.height = CONTENT_HEIGHT > BLOCK_HEIGHT ? `${BLOCK_HEIGHT - 5}px` : `${BLOCK_HEIGHT}px`
      style.overflowY = 'auto'
      return style
    },
    // 非固定列宽度
    noFixedWidth () {
      let width = 0
      this.noFixed.columns.forEach(column => {
        width += column.width
      })
      return width
    },
    // 非固定列容器样式(外层容器 - 固定列)
    noFixedContent () {
      let style = {}
      style.width = `${parseInt(this.styles.width.replace(/px|%/g, '')) - this.fixedWidth}px`
      return style
    },
    // 非固定列表头容器高度
    noFixedHeadContent () {
      let style = {}
      const CONTENT_WIDTH = this.noFixedWidth
      const BLOCK_WIDTH = parseInt(this.styles.width.replace(/px|%/g, '') - this.fixedWidth)
      style.width = CONTENT_WIDTH > BLOCK_WIDTH ? `${BLOCK_WIDTH - 5}px` : `${BLOCK_WIDTH}px`
      style.height = '40px'
      style.overflow = 'auto'
      return style
    },
    // 非固定列内容容器高度
    noFixedScrollContent () {
      let style = {}
      const BLOCK_WIDTH = parseInt(this.styles.width.replace(/px|%/g, '') - this.fixedWidth)
      const BLOCK_HEIGHT = parseInt(this.styles.height.replace(/px|%/g, '') - 40)

      style.width = `${BLOCK_WIDTH}px`
      style.height = `${BLOCK_HEIGHT}px`
      style.overflow = 'auto'
      return style
    },
    // 非固定列内容行样式
    noFixedCellContent () {
      let style = {}
      style.width = `${this.noFixedWidth}px`
      style.height = `${this.data.length * 40}px`
      return style
    },
    // 非固定列宽度样式
    noFixedWidthStyles () {
      let style = {}
      style.width = `${this.noFixedWidth}px`
      return style
    },
    // 统计行
    noFixedCountScrollContent () {
      let style = {}
      const BLOCK_WIDTH = parseInt(this.styles.width.replace(/px|%/g, '') - this.fixedWidth)
      const BLOCK_HEIGHT = 40
      style.width = `${BLOCK_WIDTH}px`
      style.height = `${BLOCK_HEIGHT}px`
      style.overflow = 'auto'
      return style
    },
    noFixedCountCellContent () {
      let style = {}
      const CONTENT_WIDTH = this.noFixedWidth
      const BLOCK_WIDTH = parseInt(this.styles.width.replace(/px|%/g, '') - this.fixedWidth)
      style.width = CONTENT_WIDTH > BLOCK_WIDTH ? `${BLOCK_WIDTH - 5}px` : `${BLOCK_WIDTH}px`
      style.height = '40px'
      style.overflow = 'auto'
      return style
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.separateFixedAndNoFixed()
    },
    separateFixedAndNoFixed () {
      const _self = this
      this.columns.forEach((cell, index, array) => {
        if (cell.fixed) {
          _self.fixed.columns.push(_self.columns[index])
        } else {
          _self.noFixed.columns.push(_self.columns[index])
        }
      })
    },
    handleNoFixedScroll (e) {
      if ((typeof e) === 'number') {
        this.$nextTick(() => {
          document.getElementById('noFixedHeadContent').scrollLeft = e
          document.getElementById('noFixedScrollContent').scrollLeft = e
          document.getElementById('noFixedCountCellContent').scrollLeft = e
        })
      } else {
        const AFTER_SCROLL_TOP = e.target.scrollTop
        const AFTER_SCROLL_LEFT = e.target.scrollLeft

        this.$nextTick(() => {
          document.getElementById('fixedCellContent').scrollTop = AFTER_SCROLL_TOP
          document.getElementById('noFixedHeadContent').scrollLeft = AFTER_SCROLL_LEFT
          document.getElementById('noFixedCountCellContent').scrollLeft = AFTER_SCROLL_LEFT
        })

        if (AFTER_SCROLL_TOP >= (e.target.scrollHeight - e.target.clientHeight)) {
          this.getPageData()
        }
      }
    },
    handleNoFixedheadScroll (e) {
      const AFTER_SCROLL_LEFT = e.target.scrollLeft
      this.handleNoFixedScroll(AFTER_SCROLL_LEFT)
    },
    getPageData () {
      this.$emit('on-getPageData')
    },
    selectAll () {
      this.data.forEach(data => {
        data.checked = true
      })
      this.$emit('on-select-all', this.data)
    },
    cancelAll () {
      this.data.forEach(data => {
        data.checked = false
      })
      this.$emit('on-cancel-all')
    },
    singleSelect (e) {
      if (this.isSingleSelection) {
        if (e.value) {
          this.data.forEach((data, index, arr) => {
            data.checked = false
            if (index === e.index) {
              data.checked = true
            }
          })
        }
      }
      this.$emit('on-select', {
        value: e.value,
        index: e.index,
        selection: this.data.filter(row => {
          return row.checked
        })
      })
    }
  }
}
</script>
<style scoped>
  .content {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .fixed, .noFixed {
    float: left;
    box-sizing: border-box;
  }
  .fixedCellContent::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .noFixed {
    overflow: hidden;
  }
  .noFixedHeadContent::-webkit-scrollbar {
    height: 0;
  }
  .noFixedScrollContent {

  }
  .noFixedScrollContent::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .noFixedScrollContent::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #EDEDED;
  }
  .noFixedScrollContent::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #F90;
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  }
  .noFixedCellContent {

  }
  .noFixedCountCellContent::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
