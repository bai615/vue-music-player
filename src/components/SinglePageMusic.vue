<template>
<div>
  <Header></Header>
  <Player v-bind={currentMusicItem}></Player>
</div>
</template>

<script>
import Header from './Header'
import {MUSIC_LIST} from './musiclist'
import Player from './Player'
// import PubSub from 'pubsub-js'
// import jPlayer from 'jplayer'
import 'jplayer'

export default {
  name: 'SinglePageMusic',
  data () {
    return {
      musicList: MUSIC_LIST, // 播放列表
      currentMusicItem: MUSIC_LIST[0], // 当前播放
      volume: 0, // 初始化音量数据
      progress: 0, // 初始化进度条数据
      duration: null, // 音频总时间
      isPlay: true, // 是否播放，默认播放
      leftTime: ''
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)

    // 初始化jPlayer配置
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    })

    // 播放歌曲
    this.playMusic(this.currentMusicItem)
  },
  components: {Header, Player},
  methods: {
    playMusic (musicItem) {
      $('#player').jPlayer('setMedia', {
        mp3: musicItem.file
      }).jPlayer('play')

      this.currentMusicItem = musicItem
    },
    progressChangeHandler (progress) {
      // console.log('total :', this.state.duration);
      // console.log('from root widget', progress);
      $('#player').jPlayer('play', this.duration * progress)
    }
  }
}
</script>

<style scoped>

</style>
