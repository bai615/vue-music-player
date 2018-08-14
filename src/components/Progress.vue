<template>
  <div class="component-progress" ref="progressBar" v-on:click='changeProgress'>
    <div class="progress"
         v-bind:style="{width: progress + '%', background: barColor}"
         ></div>
  </div>
</template>

<script>
import 'jplayer'

export default {
  name: 'Progress',
  // props: ['progress', 'barColor'],
  props: {
    progress: Number,
    barColor: String,
    onProgressChange: {}
  },
  methods: {
    changeProgress: function (e) {
      console.log('changeProgress')
      // console.log(e)
      // console.log(e.clientX)
      // console.log(this.$refs.progressBar)
      let progressBar = this.$refs.progressBar
      // console.log(progressBar.getBoundingClientRect().left)
      // console.log(progressBar.clientWidth)
      let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
      // console.log(progress)
      this.onProgressChange && this.onProgressChange(progress)
    }
  }
}
</script>

<style lang="less" scoped>
  .component-progress {
    margin-top: 20px;
    width: 100%;
    height: 5px;
    background: #ddd;
    cursor: pointer;

    .progress {
      height: 5px;
    }
  }
</style>
