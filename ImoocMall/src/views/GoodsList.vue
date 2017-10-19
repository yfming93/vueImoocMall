<template>
	<div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                加载中...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
	</div>
</template>

<style >
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>

<script >
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from './NavHeader.vue'
  import NavFooter from './NavFooter.vue'
  import NavBread from './NavBread.vue'
  import axios from 'axios'


  export default {
		data (){
			return {
				goodslist:[],
        sortFlag:true, //排序
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00'
          },
        ],
        priceCheck:'all',   //价格选中的状态
        filerBy:false,      //小屏幕价格菜单显示
        overLayFlag:false,   //遮罩显示
        page:1,
        pageSize:8,
        busy:true       //默认禁止滚动加载
			}
		},
    components:{
		  NavHeader,
      NavFooter,
      NavBread
    },
    mounted:function () {
        this.getGoodsList(false);
    },
    methods:{
        getGoodsList:function (flag) {
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1
//            priceLevel:this.priceChecked
          };

          axios.get("/goods",{
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
        }
    }
	}
</script>
