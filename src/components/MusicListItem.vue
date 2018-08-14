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

<style lang="less" scoped>
  .components-listitem {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
    text-indent: 10px;
    cursor: pointer;
    .delete {
      cursor: pointer;
      height: 30px;
      width: 30px;
      top: 3px;
      position: relative;
      transform: rotate(45deg);
      margin-right: 15px;
      &::before, &::after{
        content: '';
        display: block;
        background: #666;
        position: absolute;
      }
      &::before {
        width: 100%;
        height: 1px;
        top: 14px;
        left: 0;
      }
      &::after {
        height: 100%;
        width: 1px;
        left: 15px;
        top: 0;
      }
    }

    &.focus {
      color: #2f9842;
    }
  }
  .components-listitem:hover {
    background: #eee;
  }
</style>
