<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <b-scroll class="content"
              ref="scroll" 
              :probe-type="3" 
              @scroll="scrollPosition" 
              :pull-up-load="true" 
              @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend :recommends="recommends"/>
      <home-feature/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="activeGoods"/>
      <goods-list :list="showGoods"/>
    </b-scroll>

    <back-top @click.native="backtopClick" v-show="isShowBackTop"/>
  </div>
 
</template>

<script>
import HomeSwiper from './homeComponents/HomeSwiper'
import HomeRecommend from './homeComponents/HomeRecommend'
import HomeFeature from './homeComponents/HomeFeature'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goodsList/GoodsList'
import BScroll from 'components/common/scroll/BScroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoodsdata} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name: "Home",
  components:{
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    BScroll,
    BackTop
  },

  data() {
    return {
      //布局数据
      banners: [],
      recommends: [],

      //商品数据
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentGood: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentGood].list
    }
  },

  //生命周期函数
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoodsdata('pop')
    this.getHomeGoodsdata('new')
    this.getHomeGoodsdata('sell')
  },

  mounted() {

    const refresh = debounce(this.$refs.scroll.refresh,200)
    //监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      // console.log('............');
      refresh()
    })
  },

  methods: {
    //事件监听相关的方法
    activeGoods(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentGood = 'pop';
          break;
        case 1:
          this.currentGood = 'new';
          break;
        case 2:
          this.currentGood = 'sell';
          break;
        default:
          break;
      }
    },
    backtopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    scrollPosition(position) {
      this.isShowBackTop = (-position.y) > 700
    },
    loadMore() {
      this.getHomeGoodsdata(this.currentGood)
    },

    //请求数据相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoodsdata(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsdata(type,page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  position: relative;
  height: 100vh;
}

.home-nav {
  z-index: 99;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;/**没有此属性的话，内容盒子会被撑大 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>