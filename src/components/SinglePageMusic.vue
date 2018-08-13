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

export default {
  name: 'SinglePageMusic',
  data () {
    return {
      musicList: MUSIC_LIST, // 播放列表
      currentMusicItem: MUSIC_LIST[0] // 当前播放
    }
  },
  components: {Header, Player}
}
</script>

<style scoped>

</style>
