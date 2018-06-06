<template>
  <div class="pull">
    <div class="icon">
      <loading></loading>
    </div>
    <div class="txt">
      {{statusText}}
    </div>
  </div>
</template>
<script>
  import loading from '../spin/Loading.vue'
  export default {
    components: {loading},
    props: {
      statusText: {
        default: ''
      }
    },
    data() {
      return {

      }
    }
  }
</script>
<style scoped>
  .pull {
    width: 100%;
    height: 40px;
    overflow: hidden;
  }
  .pull .icon {
    width: 45%;
    text-align: right;
    float: left;
  }
  .pull .txt {
    color: #2d8cf0;
    line-height: 40px;
    width: 55%;
    height: 40px;
    float: left;
  }
</style>
