<template>
  <li v-on:click='playMusic(musicItem)' class="components-listitem row" v-bind:class="[isFocus ? 'focus' : '']" >
    <p><strong>{{musicItem.musicTitle}}</strong> - {{musicItem.artist}}</p>
    <p v-on:click='deleteMusic(musicItem)' class="-col-auto delete"></p>
  </li>
</template>

<script>
import PubSub from 'pubsub-js'

export default {
  name: 'MusicListItem',
  props: ['musicItem', 'isFocus'],
  methods: {
    playMusic (musicItem) {
      console.log('PLAY_MUSIC')
      PubSub.publish('PLAY_MUSIC', musicItem)
    },

    deleteMusic (musicItem, e) {
      e.stopPropagation() // 禁止冒泡事件
      console.log('DELETE_MUSIC')
      PubSub.publish('DELETE_MUSIC', musicItem)
    }
  }
}
</script>

<style scoped>

</style>
