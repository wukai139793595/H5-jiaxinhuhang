<template>
  <div class="actionSheet">
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @close="onClose"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { ActionSheet } from "vant";
import { mapMutations } from "vuex";
import { $home } from "@/api";
export default {
  props: ["partAttr", "actions", "showSheet"],
  components: {
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      show: false
    };
  },

  watch: {
    showSheet(val) {
      this.show = val;
    }
  },
  computed: {},
  mounted() {},
  methods: {
    //上拉菜单关闭
    onClose() {

      this.$emit("setCurrentStr");
    },
    //上拉菜单选中
    onSelect(currentData) {
        console.log('onSelect',currentData)
      this.$emit("setAttrVal", currentData);
      
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/modules/collection.less";
</style>
