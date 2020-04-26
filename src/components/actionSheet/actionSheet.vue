<template>
  <div class="actionSheet">
    <van-action-sheet v-if="partAttr"  v-model="partData[partAttr].show" :actions="partData[partAttr].actions" cancel-text="取消" @close="onClose" @select="onSelect" />
  </div>
</template>
<script>
import { ActionSheet} from "vant";
import { mapMutations } from "vuex";
import { $home } from "@/api";
export default {
  components: {
    [ActionSheet.name]: ActionSheet,
  },
  data() {
    return {
      partData:{
        broadbandtype:{
          show:false,
          actions: []
        },
        broadbandAccount:{
          show:false,
          actions: [
            {
              name: '宽带账号1'
            },
            {
              name: '宽带账号2'
            },
            {
              name: '宽带账号3',
            }
          ]
        },
        broadbandRate:{
          show:false,
          actions: [
            {
              name: '宽带速率1'
            },
            {
              name: '宽带速率2'
            },
            {
              name: '宽带速率3',
            }
          ]
        },
        // 附近
        nearby:{
          show:false,
          actions:[
            {

            }
          ]
        },
        // 行业分类
        industry_type: {
          show: false,
          actions: []
        }
      },
    };
  },
   props:['partAttr'],
  watch: {
    partAttr(val) {
      if(val) {
        console.log(val+'1111111111111')
        this.getSelect();
        this.partData[val].show = true;
      }
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    //上拉菜单关闭
    onClose(){
      this.$emit('setCurrentStr');
    },
    //上拉菜单选中
    onSelect(currentData){
      this.partData[this.partAttr].show=false;
      this.$emit('setAttrVal',currentData);
    },
    //获取数据
    getSelect(){
      let self=this;
      let paramData={
        type:self.partAttr
      };
      console.log('str',self.partAttr)
      $home.getSelect(paramData,res=>{
        if(res.code=='0'){
          self.partData[self.partAttr].actions=res.data;
        }else{
          self.$toast(res.msg);
        }
      },err => {

      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/modules/collection.less";
</style>
