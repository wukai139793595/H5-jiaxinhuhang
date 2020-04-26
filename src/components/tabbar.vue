<template>
  <ul class="nav-bar fool">
    <router-link v-for="(item,index) in imgList" 
            :key="index" 
            :class="{active:$route.path==item.linkUrl}"
            tag="li"
            :to="item.linkUrl"
            replace
        >
      <!-- <img class="iconImg" :src="item.url" /> -->
      <i :class="item.icon" class="iconfont" ></i>
      <p>{{item.text}}</p>
    </router-link>
  </ul>
</template>
<script>
  import {mapState,mapGetters,mapActions} from 'vuex';
  export default {
    name: 'tabbar',
    data() {
      return {
        imgList:[
          {icon:'icon-dilanxianxingiconyihuifu_huabanfuben',text:'首页',linkUrl:'/',},
          {icon:'icon-sousuo',text:'商机搜索',linkUrl:'/search',},
          {icon:'icon-renwuguanli',text:'派单信息',linkUrl:'/dispatch',},
          {icon:'icon-renwu',text:'任务',linkUrl:'',},
          {icon:'icon-shezhi_huaban',text:'设置',linkUrl:'/setting',},
        ],
      }
    },

    computed: {
      
    },
    created () {
      console.log('router',this.$route)
    },
    methods: {
      
    }
  }
</script>
<style lang="less" scoped>
  .nav-bar {
    position: fixed;
    width:100%;
    transform: translate(-50%,0);
    max-width: 750px;
    margin: 0 auto;
    bottom: 0;
    left: 50%;
    height: 100px;
    padding: 12px 0  0;
    background: #fff;
    // border-top: 1px solid #d0d0d0;
    overflow: hidden;
    clear: both;
    display: flex;
    flex: 1;
    z-index: 1000;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    box-shadow: 0px -3px 3px 0px rgba(224, 224, 225, 0.4);
    li {
      width: 25%;
      height: 100%;
      cursor: pointer;
      text-align:center;
      color:#929292;
      text-align:center;
      .iconImg {
        color:#929292;
        height:40px;
        display:inline-block;
      }
      i{
        font-size: 46px;
      }
      p {
        margin: 0;
        line-height: normal;
        font-size: 20px;
      }
      &.cart {
        position: relative;
        label {
          position: absolute;
          left:50%;
          margin-left:7px;
          top:-10px;
          background:red;
          color:#fff;
          display: block;
          width:33px;
          height:33px;
          border-radius: 50%;
          line-height:33px;
          text-align:center;
          font-size: 20px;
        }
      }
      &.active {
        color:#237df8;
        .iconfont {
          color:#237df8;
        }
        .icon-Moneymanagement {
          &:before {
            content: "\e783";
          }
        }
        .icon-Similarproducts {
          &:before {
            content: "\e78c";
          }
        }
        .icon-cart-full {
          &:before {
            content: "\e77a";
          }
        }
        .icon-bussiness-man {
          &:before {
            content: "\e719";
          }
        }
      }
    }
    .active{
      i{
        color: #209eff;
      }
      p{
        color: #209eff;
      }
    }
  }
</style>
