<template>
  <div class="component-header row">
    <img src="/static/images/logo.png" width="40" alt="" class="-col-auto"/>
    <h1 class="caption">React Music Player</h1>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  .component-header {
    box-sizing: border-box;
    padding: 15px 25px;
    border-bottom: 1px solid #ccc;
    background: white;
    .caption {
      font-size: 20px;
      text-indent: 20px;
    }
  }
</style>
