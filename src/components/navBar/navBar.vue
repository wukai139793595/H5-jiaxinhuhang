<template>
  <div class="navHeihgt">
    <van-nav-bar :title="title">
      <span slot="left">
        <van-icon name="arrow-left" @click="backHandle" v-if="left==1"></van-icon>
        <span v-if="left==2" class="address" @click="showPickerHandle">
          {{address}}
          <i class="traingle"></i>
        </span>
      </span>
      <span slot="right">
        <van-icon name="search" slot="right" v-if="right==1" @click="searchHandle" />
        <van-icon name="plus" v-if="right==2" @click="addHandle"/>
        <span class="imgModify" v-if="right=='modify'" @click="editFun"></span>
        <span class="imgRecord" v-if="right=='record'" @click="linkFun('record')"></span>
        <span class="img-share" v-if="right=='share'" @click="shareHandle"></span>
      </span>
    </van-nav-bar>
    <van-popup v-model="show" position="bottom">
      <van-picker :columns="columns" @change="pickerChange" />
    </van-popup>
  </div>
</template>

<script>
import { NavBar,Icon,Popup,Picker } from "vant"
export default {
  components: {
      [NavBar.name]:NavBar,
      [Icon.name]:Icon,
      [Popup.name]:Popup,
      [Picker.name]:Picker
  },
  props: {
    backurl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    left: {
      default: 2
    },
    right: {},
    address: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default: () => ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    //跳转链接
    linkFun(linkStr){
      let linkUrl='/'+linkStr;
      this.$router.push({path:linkUrl,query:{text:this.title}})
    },
    //可以编辑
    editFun(){
      this.$emit('changeEdit')
    },
    addHandle () {
      this.$emit('addClient')
    },
    //   后退
    backHandle() {
      if(this.backurl) {
        /*if (this.backurl == '/index') {
          this.$notify({type:'primary',message:'返回app'})
        } else {*/
          this.$router.push({path:this.backurl})
       /* }*/
      } else {
        this.$router.goBack();
      }
    },
    // 显示picker组件
    showPickerHandle() {
      this.show = true;
    },
    // 选择地市
    pickerChange(picker, value, index) {
      this.$emit("update:address", value);
      this.show = false;
    },
    // 点击查找图标
    searchHandle() {
      this.$emit('focusSearch')
    },
    // 点击分享图标
    shareHandle () {
      this.$emit('shareHandle')
    }
  }
};
</script>

<style lang="less" scoped>
  .navHeihgt {
    height:86px;
  }
  /deep/ .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    background:linear-gradient(to right,#237af7,#3298fe);
    height: 86px;
    line-height: 86px;
    .van-nav-bar__title{
      color: #fff;
      font-size: 34px;
    }
    .van-nav-bar__left{
      left:30px;
      top: 0;
    }
    .van-icon{
      color: #fff;
      font-size: 32px;
    }
    .imgModify{
      display:block;
      width:54px;
      height:40px;
      background:url(../../assets/images/home/icon-modify.png) 0 0 no-repeat;
      background-size:100% 100%;
      position:relative;
      top:-20px;
    }
    .imgRecord{
      display:block;
      width:36px;
      height:40px;
      background:url(../../assets/images/home/icon-topRecord.png) 0 0 no-repeat;
      background-size:100% 100%;
      position:relative;
      top:-20px;
    }
    .img-share {
      display:block;
      width:36px;
      height:40px;
      background-size:100% 100%;
      position:relative;
      top:-20px;
      background-image: url(../../assets/images/officialAccount/icon-share.png);
      background-size: 100% 100%;
    }
  }
  .address {
    font-size: 20px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
  }
  .traingle {
    vertical-align: middle;
    display:inline-block;
    border-top: 6px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
</style>
