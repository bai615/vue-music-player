<template>
  <ul>
    <MusicListItem
      v-for="listEle in musicList"
      :isFocus='listEle === currentMusicItem'
      :key='listEle.id'
      :musicItem='listEle'
    >
    {{listEle.musicTitle}}
    </MusicListItem>
  </ul>
</template>

<script>
import MusicListItem from './musiclistitem'

export default {
  name: 'MusicList',
  props: ['musicList', 'currentMusicItem'],
  components: {
    MusicListItem
  }
}
</script>

<style scoped>

</style>
