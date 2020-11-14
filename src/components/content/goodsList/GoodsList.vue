<template>
  <div class="goodslist">
    <div class="goodslist-item" v-for="(item,index) in list" :key="index">
      <a :href="item.link">
        <img :src="item.show.img" alt="" @load="imageLoad">
        <div class="goodslist-info">
          <p>{{item.title}}</p>
          <span class="price">{{item.price}}</span><span class="collect">{{item.cfav}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  props: {
    list: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    }
  }
}
</script>

<style scoped>
.goodslist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 12px;
}

.goodslist-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goodslist-item img {
  width: 100%;
  border-radius: 5px;
}

.goodslist-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goodslist-info p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.goodslist-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.collect {
    position: relative;
  }

.collect::before {
  content: '';
  position: absolute;
  left: -14px;
  top: 1px;
  width: 13px;
  height: 13px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>