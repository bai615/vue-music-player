<template>
  <div class="component-progress" ref="progressBar" @lick="changeProgress()">
    <div class="progress"
         v-bind:style="{width: progress + '%', background: barColor}"
         ></div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: ['progress', 'barColor'],
  methods: {
    changeProgress (e) {
      // console.log(e.clientX);
      // console.log(this.refs.progressBar);
      let progressBar = this.refs.progressBar
      let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
      // console.log(progress);
      this.props.onProgressChange && this.props.onProgressChange(progress)
    }
  }
}
</script>

<style scoped>
  .component-progress {
    margin-top: 20px;
    width: 100%;
    height: 5px;
    background: #ddd;
    cursor: pointer;
  }
  .progress {
    height: 5px;
  }
</style>
