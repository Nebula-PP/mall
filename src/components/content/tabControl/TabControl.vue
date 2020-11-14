<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index" :class="{active:index === currentIndex}" @click="tabActive(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    tabActive(index) {
      this.currentIndex = index;
      // 子传父
      this.$emit('tabClick',index);
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  /* 吸顶效果 */
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 99;

  text-align: center;
  height: 40px;
  line-height: 40px;
}

.tab-control-item {
  flex: 1;
  width: 100%;
  font-size: 14px;
}

.tab-control-item span {
  padding: 4px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>