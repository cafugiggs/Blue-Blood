<template>
  <div class="loader">
    <div class="loader-inner ball-clip-rotate">
      <div></div>
    </div>
  </div>
</template>
<style scoped>
  .ball-clip-rotate > div {
    background-color: #2d8cf0;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 8px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    border: 2px solid #2d8cf0;
    border-bottom-color: transparent;
    height: 20px;
    width: 20px;
    background: transparent !important;
    display: inline-block;
    -webkit-animation: rotate 0.75s 0s linear infinite;
    animation: rotate 0.75s 0s linear infinite;
  }
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg) scale(1);
      transform: rotate(0deg) scale(1);
    }
    50% {
      -webkit-transform: rotate(180deg) scale(0.6);
      transform: rotate(180deg) scale(0.6);
    }
    100% {
      -webkit-transform: rotate(360deg) scale(1);
      transform: rotate(360deg) scale(1);
    }
  }
</style>
