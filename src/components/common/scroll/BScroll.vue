<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "BScroll",
  data() {
    return {
      betterScroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.betterScroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.betterScroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })
    }
    //3.监听滚动到底部
    if (this.pullUpLoad) {
      this.betterScroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.betterScroll.scrollTo(x, y, time)
    },
    refresh () {
      // console.log('..............'); //测试加防抖函数后refresh函数执行几次
      this.betterScroll && this.betterScroll.refresh()
    },
    finishPullUp() {
      this.betterScroll && this.betterScroll.finishPullUp()
    }
  }
}
</script>

<style>

</style>