<template>
	<div>
    <!-- icon-arrow-short 价格筛选的上下箭头 -->
    <symbol id="icon-arrow-short" viewBox="0 0 25 32">
      <title>arrow-short</title>
      <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
    </symbol>
    <symbol id="icon-status-ok" viewBox="0 0 32 32">
      <title>status-ok</title>
      <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
      <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
    </symbol>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
            <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
            </svg>

          </a>
          <a href="javascript:void(0)" class="filterby stopPop" v-on:click="showFilerPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-lazy="{'filterby-show':filerBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceCheck=='all'}" @click="setPriceCheck('all')">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceCheck(index)" :class="{'cur':priceCheck == index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>

            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodslist">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'static/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <!--// 利用 busy 控制隐藏加载HUD-->
              <div v-show="!busy" class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img src="static/loading-svg/loading-bubbles.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <modal v-bind:mdShow="mdShow" v-on:close="cosleModal">
      <p slot="message">
        请先登录，否则无法加入购物车！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>

    <modal v-bind:mdShow="mdShowCart" v-on:close="cosleModal">
      <p slot="message">
        <svg class="icon icon-status-ok" >
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功！</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
	</div>
</template>

<style >
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
  .sort-up{
    transform: rotate(180deg);
    transition: all 0.3s ease-out;
  }
</style>

<script >
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from './NavHeader.vue'
  import NavFooter from './NavFooter.vue'
  import NavBread from './NavBread.vue'
  import Modal from './../components/Modal.vue'
  import axios from 'axios'


  export default {
		data (){
			return {
				goodslist:[],
        sortFlag:true, //排序
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'100.00'
          },
          {
            startPrice:'100.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          }, {
            startPrice:'1000.00',
            endPrice:'5000.00'
          }
        ],
        priceCheck:'all',   //价格选中的状态
        filerBy:false,      //小屏幕价格菜单显示
        overLayFlag:false,   //遮罩显示
        page:1,
        pageSize:8,
        busy:true,       //默认禁止滚动加载
        mdShow:false,  //登录模态框显示
        mdShowCart:false

			}
		},
    components:{
		  NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted:function () {
        this.getGoodsList(false);
    },
    methods:{
        getGoodsList:function (flag) {    //获取商品列表
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,   //升降排序
            priceLevel:this.priceCheck //价格级别
          };

          axios.get("/goods/list",{
            params:param
          }).then((result)=>{
            var  res = result.data;
            if (res.status=="0") {
              if (flag) { //累加
                this.goodslist = this.goodslist.concat(res.result.list);
                if (res.result.count==0) {
                  this.busy = true; //没数据时禁止滚动到底部自动请求
                }else {
                  this.busy = false;
                }
              }else { //不累加
                this.goodslist = res.result.list;
                this.busy = false; //首次请求成功后开启

              }
            }else {
              this.goodslist = [];
            };

          })
        },
        showFilerPop() {
           this.filerBy = true;
           this.overLayFlag = true;

        },
        closePop(){
          this.filerBy = false;
          this.overLayFlag = false;
        },
        setPriceCheck(index){
           this.priceCheck = index;
           this.closePop();
           this.page = 1;
           this.getGoodsList();
        },
        sortGoods (){ //排序
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodsList();
        },
        loadMore () {
          this.bus = true;
          //第一请求完成后才会执行第二个请求，防止鼠标滚动时请求过多
          setTimeout(()=>{
            this.page++;
            this.getGoodsList(true); //传个true表示要列表数组累加
          },500)
        },
        addCart (productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then((res)=>{
            var res = res.data;
            if(res.status==0){
              this.mdShowCart = true;
//              this.$store.commit("updateCartCount",1);
//              alert("加入购物车成功");
            }else{
              this.mdShow = true;
//              alert(res.msg);
            }
          });
        },
        cosleModal () {  //关闭模态框
          this.mdShow = false;
        }
    }
	}
</script>
