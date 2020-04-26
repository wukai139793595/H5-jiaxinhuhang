<template>
  <div :class="['order',{isQuote:isQuote}]">
    <nav-bar v-if="!isQuote" title="提交订单" :left="1"></nav-bar>
    <div class="my-info">
      <div class="title-wrap">
        <span class="line"></span>
        <span class="word">我的信息</span>
      </div>
      <van-form @submit="handle_submit" class="v-form label-180">
        <van-field v-model="form.name" label="姓名：" placeholder="请输入您的姓名" required />
        <van-field v-model="form.contactNumber" label="联系电话：" placeholder="请输入您的联系电话" required />
        <van-field v-model="form.addr" label="联系地址：" required>
          <div class="select" slot="input">
            <a href="javascript:" @click="addrClick('addrDistrict')">{{form.addrDistrict}}</a>
            <a href="javascript:" @click="addrClick('addrStreet')">{{form.addrStreet}}</a>
          </div>
        </van-field>
        <van-field v-model="form.addrDetail" label="详细地址：" placeholder="请输入您的详细地址" />
        <van-field v-model="form.companyName"  label="企业名称：" placeholder="请输入您的企业名称" />
        <van-field
          v-if="partNum && partNum!=0"
          v-model="form.fundingBudget"
          type="number"
          label="资金预算："
          placeholder="请输入您的预算"
        />
        <van-field
            v-if="partNum==0"
          v-model="form.description"
          type="textarea"
          label="备注："
          placeholder="最多可输入300字"
          maxlength="300"
        />
        <van-field
         v-if="partNum && partNum!=0"
          v-model="form.description"
          type="textarea"
          label="详细描述："
          placeholder="请输入不超过100字的描述"
          maxlength="100"
          required
        />
      </van-form>
      <div v-if="partNum==0 || !partNum">
        <div class="title-wrap">
          <span class="line"></span>
          <span class="word">订单产品</span>
        </div>
        <ul class="product-box">
          <li class="product" v-for="(item,index) in orderProducts" :key="index">
            <div class="month-wrap">
              <span class="name">{{item.productName}}</span>
              <span
                class="month"
                @click="service_time_handle(index,item)"
                v-if="item.goodsList && item.goodsList.length>1"
              >
                {{item.currentUnit | unit}}
                <img src="@/assets/images/officialAccount/bottom.png" />
              </span>
            </div>
            <div class="number-wrap">
              <span class="number">
                数量
                <van-stepper class="v-stepper step" v-model="item.num" max="8" min="1"></van-stepper>
              </span>
              <span class="money">¥{{item.price}}</span>
            </div>
          </li>
          <div class="total-money">¥{{totalMoney}}</div>
        </ul>
      </div>
    </div>
    <div class="btn-wrap">
      <van-button round block @click.native="save_order_handle">提 交</van-button>
    </div>

    <van-popup v-model="layer.addr" position="bottom" class="v-popup">
      <van-picker
        show-toolbar
        :columns="nowColumns"
        @change="addr_change"
        @cancel="layer.addr = false"
        @confirm="addr_confirm"
      />
    </van-popup>
    <van-action-sheet
      class="v-action-sheet"
      v-model="sheetShow"
      cancel-text="取消"
      :actions="actions"
      @select="select_handle"
    ></van-action-sheet>
  </div>
</template>
<script>
    import {
        Button,
        Form,
        Field,
        Stepper,
        Popup,
        Picker,
        ActionSheet
    } from "vant";
    import {
        mapMutations
    } from "vuex";
    import NavBar from "@/components/navBar/navBar.vue";
    import {
        officialAccount,
        config
    } from "@/api/officialAccount";
    import {
        getSessionStore
    } from "@/common/js/storage.js";
    const citys = {
        浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
        福建: ["福州", "厦门", "莆田", "三明", "泉州"]
    };
    export default {
        components: {
            [Button.name]: Button,
            [Form.name]: Form,
            [Field.name]: Field,
            [Stepper.name]: Stepper,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [ActionSheet.name]: ActionSheet,
            NavBar
        },
        data() {
            return {
                pattern:/^1[3456789]\d{9}$/,
                isUser: '',
                sheetShow: false,
                // 表单
                form: {
                    name: '',
                    addr: '请选择',
                    addrDistrict: '',
                    addrStreet: '',
                    addrDetail: '',
                    companyName: '',
                    fundingBudget: '',
                    description: '',
                    contactNumber: ''
                },
                orderProducts: [],
                layer: {
                    addr: false
                },
                nowPropText: '',//当前弹框的属性文字标识
                districtsColumns: [],//区域数据
                districtsData: {},//当前区域数据
                streetsColumns: [],//街道数据
                streetsData: [],//当前街道数据
                nowColumns: [],//当前地址弹框数据
                actions: [{
                    name: "包月"
                }, {
                    name: "包年"
                }],
                currentProductNum: '',//当前产品第几个
                nowPartNum: '',//
            };
        },
        computed: {
            totalMoney() {
                console.log("this.orderProductsComputed:", this.orderProducts)
                if (this.orderProducts.length > 0) {
                    let orderProducts = this.orderProducts;
                    console.log('orderProducts.length:', orderProducts.length)
                    let totalPrice;
                    return orderProducts.reduce((pre, item, index) => {
                        let price = item.price ? parseInt(item.price) : 0;
                        let number = item.num ? item.num : 1;
                        totalPrice = Number(pre) + price * number;
                        return totalPrice;
                    }, 0);
                }


            }
        },
        created() {
            console.log('this.isQuote:', this.isQuote)
            console.log('partNum:', this.partNum)
            this.isUser = getSessionStore('isUser')
            this.id = this.$route.query.id;
            this.goodsId = this.$route.query.goodsId;
            this.getNowUser();
            if (this.isQuote) {
                let oldProductList = this.productList ? this.productList : [];
                let newProductList = JSON.parse(JSON.stringify(oldProductList));
                newProductList.forEach((item, index) => {
                    if (item.checked) {
                        this.orderProducts.push(item);
                    }
                });
                console.log('this.orderProducts11111:', this.orderProducts)
            } else {
                let productList = JSON.parse(getSessionStore("productList"));
                if (productList) {
                    productList.forEach(function (element, index, arr1) {
                        element.num = 1;
                    })
                    this.orderProducts = productList;
                }
                console.log('this.orderProducts222:', this.orderProducts)
            }
        },
        mounted() {

        },
        props: [
            "isQuote", //是否引用
            "partNum", //0为找产品，1为发需求，2为报故障
            "productList",//产品数据
        ],
        watch: {
            productList: {
                deep: true,
                handler: function (newVal) {
                    let newProductList = JSON.parse(JSON.stringify(newVal));
                    this.orderProducts = [];
                    if (this.isQuote) {
                        newProductList.forEach((item, index) => {
                            if (item.checked) {
                                this.orderProducts.push(item);
                            }
                        });
                    }
                }
            }
        },
        methods: {
            validate (){
                if (!this.form.addrDistrict || !this.form.addrStreet) {
                    return false
                } else {
                    return true
                }
            },
            //获取用户信息
            async getNowUser(){
                let params = {
                    userType: this.isUser == 'true' ? 1 : 2,//1为普通用户 2为管理用户
                }
                try {
                    let {data} = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getNowUser,     // 主求Url 在上面api中进行配置
                        data: params,       // 请求参数
                    });
                    if (data.code == '0') {
                        for (let key in data.user) {
                            this.form[key] = data.user[key];
                        }
                            this.form.contactNumber =this.form.mobile
                    } else {
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //获取区域信息
            async getDistrictsName(){
                let params = {}
                try {
                    let {data} = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getDistrictsName,     // 主求Url 在上面api中进行配置
                        data: params
                    });
                    if (data.code == '0') {
                        data.districts.forEach(function (item, index, arr1) {
                            item.text = item.areaName;
                        })
                        this.districtsColumns = data.districts;
                        this.nowColumns = this.districtsColumns;
                    } else {
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //获取街道信息
            async getStreetsName(){
                let params = {}
                try {
                    let {data} = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getStreetsName,     // 主求Url 在上面api中进行配置
                    });
                    if (data.code == '0') {

                    } else {
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //根据区域id获取街道
            async getStreetsByDistrictId(){
                let params = {
                    districtId: this.districtsData.id,
                }
                try {
                    let {data} = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getStreetsByDistrictId,     // 主求Url 在上面api中进行配置
                        data: params
                    });
                    if (data.code == '0') {
                        data.streets.forEach(function (item, index, arr1) {
                            item.text = item.areaName;
                        })
                        this.streetsColumns = data.streets;
                        this.nowColumns = this.streetsColumns;
                    } else {
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //联系地址中选项事件
            addrClick(part){
                this.nowPropText = part;
                this.nowColumns = [];
                if (part == 'addrDistrict') {
                    this.layer.addr = true;
                    this.getDistrictsName();
                } else if (part == 'addrStreet') {
                    if (this.form.addrDistrict) {
                        this.layer.addr = true;
                        this.getStreetsByDistrictId();
                    } else {
                        this.$toast("请先选择前一个下拉！");
                    }

                }
            },
            // 提交
            handle_submit() {
            },
            // 地市更改
            addr_change(picker, values) {
                picker.setColumnValues(1, citys[values[0]]);
            },
            // 地市确认
            addr_confirm(value, index) {
                if (this.nowPropText == 'addrDistrict') this.districtsData = value;
                if (this.nowPropText == 'addrStreet') this.streetsData = value;
                this.form[this.nowPropText + 'Id'] = value.id;
                this.form[this.nowPropText] = value.text;
                this.layer.addr = false;
            },
            select_handle(action, index) {
                this.actions.forEach((ele, ind) => {
                    if (index === ind) {
                        ele.className = "active_item";
                    } else {
                        ele.className = "";
                    }
                });
                this.orderProducts[this.currentProductNum].currentUnit = action.name;
                if (action.name == '包年') this.orderProducts[this.currentProductNum].price = this.orderProducts[this.currentProductNum].goodsList[1].price;
                if (action.name == '包月') this.orderProducts[this.currentProductNum].price = this.orderProducts[this.currentProductNum].goodsList[0].price;
                this.sheetShow = false;
                console.log('this.orderProducts:', this.orderProducts)
                console.log('this.productList:', this.productList)
            },
            service_time_handle(index, item) {
                console.log('item:', item)
                this.sheetShow = true;
                this.currentProductNum = index;

//                this.reqProductInfo(item);

            },
            // 提交订单
            async save_order_handle() {
                if (!this.form.name) {
                    this.$toast('请输入您的姓名')
                    return false
                }
                if (!(/^1[3456789]\d{9}$/.test(this.form.contactNumber))) {
                    this.$toast('请输入正确的联系电话')
                    return 
                }
                if (!this.form.addrDistrict || this.form.addrDistrict=="请选择") {
                    this.$toast('请选择区域')
                    return 
                }
                if (!this.form.addrStreet || this.form.addrStreet=="请选择") {
                    this.$toast('请选择街道')
                    return 
                }
                if (this.partNum && this.partNum!=0) {
                    if (!this.form.description) {
                        this.$toast('请输入详细描述')
                        return 
                    }                   
                }
                this.nowPartNum = this.partNum ? this.partNum : 0;
                debugger
                if (this.nowPartNum == 0) {
                    let productIds = [];
                    for (let item of this.orderProducts) {
                        productIds.push({
                            "goodsId": item.goodsId,
                            "productId": item.id,
                            "quantity": item.num
                        })
                    }
                    let params = {
                        "addrDetail": this.form.addrDetail,
                        "addrDistrict": this.form.addrDistrict,
                        "addrDistrictId": this.form.addrDistrictId,
                        "addrStreet": this.form.addrStreet,
                        "addrStreetId": this.form.addrStreetId,
                        "companyName": this.form.companyName,
                        "contactNumber": this.form.contactNumber,
                        "demandType": 2,
                        "description": this.form.description,
                        "fundingBudget": this.totalMoney,
                        "name": this.form.name,
                        "productIds": productIds
                    };
                    try {
                        let {
                            data
                        } = await this.$http({
                            type: "post", // 请求类型
                            url: officialAccount.saveOrder, // 主求Url 在上面api中进行配置
                            data: params, // 请求参数
                            config: config.applicationJon
                        });
                        if (data.code == "0") {
                            // this.newProductList=data.page;
                            this.$toast(data.msg);
                            this.getWxPush(data.demandEntityId, data.demandCode);
                        } else {
                            this.$toast.fail(data.msg);
                        }
                    } catch (error) {
                        // 接口返回错误 会跑到这里
                        console.log(error);
                    }
                } else {
                    let products = [];
                    for (let item of this.productList) {
                        if (item.checked) products.push(item.id);
                    }
                    let demandType;
                    if (this.nowPartNum == '1') demandType = 1;//发需求
                    if (this.nowPartNum == '2') demandType = 4;//故障单

                    let params = {
                        "addrDetail": this.form.addrDetail,
                        "addrDistrict": this.form.addrDistrict,
                        "addrDistrictId": this.form.addrDistrictId,
                        "addrStreet": this.form.addrStreet,
                        "addrStreetId": this.form.addrStreetId,
                        "companyName": this.form.companyName,
                        "contactNumber": this.form.contactNumber,
                        "demandType": demandType,//需求类型
                        "description": this.form.description,
                        "fundingBudget": this.form.fundingBudget,
                        "name": this.form.name,
                        "products": products
                    };
                    try {
                        let {
                            data
                        } = await this.$http({
                            type: "post", // 请求类型
                            url: officialAccount.demandSaveOrder, // 主求Url 在上面api中进行配置
                            data: params, // 请求参数
                            config: config.applicationJon
                        });
                        if (data.code == "0") {
                            this.$toast(data.msg);
                            this.getWxPush(data.demandEntityId, data.demandCode);
                        } else {
                            this.$toast.fail(data.msg);
                        }
                    } catch (error) {
                        // 接口返回错误 会跑到这里
                        console.log(error);
                    }
                }

            },
            //推送
            async getWxPush(demandId, demandCode){
                this.closePage();
                if (!this.isQuote) {
                    this.$router.push('/order');
                }
//                WeixinJSBridge.call('closeWindow');
                /* keyword1 公司名称
                 keyword2 联系电话
                 keyword3 订单号
                 keyword4 订单状态
                 keyword5 价格
                 remark  备注
                 demandId  需求单id*/
                let params = {
                    first: '您的订单已下单成功，进入转派状态，请耐心等待...',
                    keyword1: '',
                    keyword2: '',
                    keyword3: demandCode,
                    keyword4: '转派中',
                    keyword5: '',
                    remark: '',
                    demandId: demandId
                };
                try {
                    let {
                        data
                    } = await this.$http({
                        type: "get", // 请求类型
                        url: officialAccount.getWxPush, // 主求Url 在上面api中进行配置
                        data: params // 请求参数
                    });
                    if (data.code == "0") {
                        
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error);
                }
            },
            //关闭浏览器页面，返回公众号
            closePage(){
                setTimeout(function () {
                    //安卓手机
                    window.addEventListener(
                        "WeixinJSBridgeReady",
                        function () {
                            WeixinJSBridge.call("closeWindow");
                        },
                        false
                    );
                    //ios手机
                    WeixinJSBridge.call("closeWindow");
                }, 100);
            },
            // 订单产品
            async
            product_info()
            {
                let id = this.id;
                let goodsId = this.goodsId;
                let params = {
                    optionValue: "包月",
                    goodsId: goodsId
                };
                try {
                    let {
                        data
                    } = await
                        this.$http({
                            type: "post", // 请求类型
                            url: officialAccount.productInfo + "/" + id, // 主求Url 在上面api中进行配置
                            data: params // 请求参数
                        });
                    if (data.code == "0") {
                        //                        this.newProductList=data.page;
                    } else {
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error);
                }
            }
            ,
            //根据id调数据
            async
            reqProductInfo(item)
            {
                console.log('item:', item)
                let id = this.id;
                let params = {
                    id: item.id,
                    goodsId: item.goodsId,
                };
                try {
                    let {data} = await
                        this.$http({
                            type: 'get',
                            url: officialAccount.productInfo + "/" + 111,
                            data: params
                        })
                    if (data.code == '0') {

                    } else {
                        this.$toast(data.msg)
                    }
                }
                catch (error) {

                }
            }
        },
        filters: {
            itemMoney(optionValue, item)
            {
                let orderNumber = item.num ? item.num : 1;
                let price = optionValue ? parseInt(optionValue) : 0;
                console.log('optionValue:', optionValue)
                console.log('item:', item)
                return orderNumber * price;
            }
            ,
            unit(value, item)
            {
                let unitStr = value ? value : '包月';
                return unitStr;
            }
        }
    }
    ;
</script>
<style lang="less">
@import "~@/assets/css/officialAccount/common.less";
</style>
<style lang="less" scoped>
@import "~@/assets/css/officialAccount/submitOrder.less";
</style>
