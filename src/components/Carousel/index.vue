<template>
  <!-- 轮播图 -->
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import { Swiper, Navigation, Pagination } from "swiper";

export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //这里监听，无论数据有没有变化，上来立即监听一次
      immediate: true,
      //监听后执行的函数
      handler() {
        //第一次ListContainer中的轮播图Swiper定义是采用watch+ this.$nextTick()实现
        this.$nextTick(() => {
          //轮播图
          Swiper.use([Navigation, Pagination]);
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>