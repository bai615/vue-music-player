<template>
<div>
  <Header></Header>
  <Player v-bind={currentMusicItem}></Player>
  <MusicList
    v-bind={currentMusicItem}
    v-bind:musicList='musicList'
  ></MusicList>
</div>
</template>

<script>
import Header from './Header'
import {MUSIC_DATA} from './musicdata'
import Player from './Player'
import MusicList from './MusicList'
import PubSub from 'pubsub-js'
import 'jplayer'

export default {
  name: 'SinglePageMusic',
  data () {
    return {
      musicList: MUSIC_DATA, // 播放列表
      currentMusicItem: MUSIC_DATA[0], // 当前播放
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

    // 订阅音乐播放事件
    PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    })

    // 订阅音乐删除事件
    PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.musicList = this.musicList.filter(item => {
        return item !== musicItem
      })
    })

    // 订阅播放上一曲事件
    PubSub.subscribe('PLAY_PREV', () => {
      this.playNext('prev')
    })

    // 订阅播放下一曲事件
    PubSub.subscribe('PLAY_NEXT', () => {
      this.playNext()
    })
  },
  components: {Header, Player, MusicList},
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
    },
    playNext (type = 'next') {
      let index = this.findMusicIndex(this.currentMusicItem)
      let newIndex = null
      let musicListLength = this.musicList.length
      if (type === 'next') {
        newIndex = (index + 1) % musicListLength
      } else {
        newIndex = (index - 1 + musicListLength) % musicListLength
      }
      this.playMusic(this.musicList[newIndex])
    },
    findMusicIndex (musicItem) {
      return this.musicList.indexOf(musicItem)
    }
  }
}
</script>

<style scoped>

</style>
