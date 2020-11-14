<template>
  <div class="home-recommend">
    <div class="home-recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default: function(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.home-recommend {
  display: flex;
  border-bottom: 10px solid #eeeeee;
  padding: 10px 0 10px;
}

.home-recommend-item {
  flex: 1;
  text-align: center;
  font-size: 12px;
}

.home-recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>