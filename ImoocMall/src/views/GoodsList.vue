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
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>

            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodslist">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'static/' + item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
	</div>
</template>

<style >
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
        ]
			}
		},
    components:{
		  NavHeader,
      NavFooter,
      NavBread
    },
    mounted:function () {
        this.getGoodsList();
    },
    methods:{
        getGoodsList:function () {
            axios.get("/goods").then((result)=>{
              var  res = result.data;
              this.goodslist = res.result;
            })
        }
    }
	}
</script>
