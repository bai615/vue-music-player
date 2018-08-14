<template>
  <div class="player-page">
    <h1 class="caption">
      <!--<router-link to="/list">
        我的私人音乐坊 &gt;
      </router-link>-->
    </h1>
    <div class="mt20 row">
      <div class="controller-wrapper">
        <h2 class="music-title">{{currentMusicItem.musicTitle}}</h2>
        <h3 class="music-artist mt10">{{currentMusicItem.artist}}</h3>
        <div class="row mt20">
          <div class="left-time -col-auto">-{{leftTime}}</div>
          <div class="volume-controller">
            <i class="icon-volume rt" v-bind:style="{top: 5, left: -5}"></i>
            <div class="volume-wrapper">
              <!-- 音量控制部分 -->
              <Progress
                v-bind={progress:volume}
                :onProgressChange='changeVolumeHandler'
                v-bind:barColor="volumeBarColor"
              ></Progress>
            </div>
          </div>
        </div>
        <div v-bind:style="{height:10,lineHeight:'10px',marginTop:10}">
          <!-- 播放进度部分 -->
          <Progress
            v-bind={progress}
            :onProgressChange='progressChangeHandler'
            v-bind:barColor="progressBarColor"
          ></Progress>
        </div>
        <div class="mt35 row">
          <div>
            <i class="icon prev" @click="playPrev()"></i>
            <i class="icon ml20" v-bind:class="[isPlay ? 'pause' : 'play']" @click="play()"></i>
            <i class="icon next ml20" @click="playNext()"></i>
          </div>
          <div class="-col-auto">
            <i class="icon repeat-cycle"></i>
          </div>
        </div>
      </div>
      <div class="-col-auto cover">
        <img v-bind:src="currentMusicItem.cover" v-bind:alt="currentMusicItem.musicTitle"/>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from './Progress'
import 'jplayer'

export default {
  name: 'Player',
  data () {
    return {
      volume: 0, // 初始化音量数据
      volumeBarColor: '#aaa',
      progress: 0, // 初始化进度条数据
      progressBarColor: '#ff0000',
      duration: null, // 音频总时间
      isPlay: true, // 是否播放，默认播放
      leftTime: ''
    }
  },
  beforeMount () {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      this.duration = e.jPlayer.status.duration
      this.volume = e.jPlayer.options.volume * 100
      this.progress = e.jPlayer.status.currentPercentAbsolute
      this.leftTime = this.formatTime(this.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
    })
  },
  created: function () {
    $('#player').unbind($.jPlayer.event.timeupdate)
  },
  props: ['currentMusicItem'],
  methods: {
    changeVolumeHandler (progress) {
      $('#player').jPlayer('volume', progress)
    },
    progressChangeHandler (progress) {
      // console.log('total :', this.state.duration);
      // console.log('from root widget', progress);
      $('#player').jPlayer('play', this.duration * progress)
    },
    play () {
      if (this.isPlay) {
        console.log('pause')
        $('#player').jPlayer('pause')
      } else {
        console.log('play')
        $('#player').jPlayer('play')
      }

      this.isPlay = !this.isPlay
    },
    playPrev () {
      console.log('PLAY_PREV')
      // PubSub.publish('PLAY_PREV');
      // this.state.isPlay = true;
    },
    playNext () {
      console.log('PLAY_NEXT')
      // PubSub.publish('PLAY_NEXT');
      // this.state.isPlay = true;
    },
    formatTime (time) {
      time = Math.floor(time)
      let miniutes = Math.floor(time / 60)
      let seconds = Math.floor(time % 60)

      seconds = seconds < 10 ? `0${seconds}` : seconds
      return `${miniutes}:${seconds}`
    }
  },
  components: {Progress}
}
</script>

<style lang="less" scoped>
  .player-page {
    width: 700px;
    margin: auto;
    margin-top: 120px;
    margin-bottom: 120px;

    .caption {
      font-size: 16px;
      color: rgb(47, 152, 66);
    }

    .cover {
      width: 180px;
      height: 180px;
      margin-left: 20px;

      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
      }
    }
    .volume-container {
      position: relative;
      left: 20px;
      top: -30px;
    }
    .volume-container .volume-wrapper {
      opacity: 0;
      transition: opacity .5s linear;
    }
    .volume-container:hover .volume-wrapper {
      opacity: 1;
    }
    .music-title {
      font-size: 25px;
      font-weight: 400;
      color: rgb(3, 3, 3);
      height: 36px;
      line-height: 36px;
    }
    .music-artist {
      font-size: 15px;
      font-weight: 400;
      color: rgb(74, 74, 74);
    }
    .left-time {
      font-size: 14px;
      color: #999;
      font-weight: 400;
      width: 40px;
    }
    .icon {
      cursor: pointer;
    }
    .ml20 {
      margin-left: 20px;
    }
    .mt35 {
      margin-top: 35px;
    }
    .volume-wrapper {
      width: 60px;
      display: inline-block;
    }
  }</style>
