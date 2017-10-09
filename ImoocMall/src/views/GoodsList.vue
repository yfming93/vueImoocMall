<template>
	<div>
		这个商品列表页面
		<span>{{$route.params.goodsId}}</span><br>
		<span>{{$route.params.name}}</span>
		<router-link to="/goods/Title">显示商品标题</router-link>
		<router-link to="/goods/Img">显示商品图片</router-link>
		<div>
			<router-view> </router-view>
		</div>
		<!-- 带参数的命名路由 -->
		<router-link v-bind:to="{name:'cart',params:{cartId:123}}">跳转到购物车页面</router-link>
		
	</div>
</template>

<style >
</style>

<script >
	export default {	
		data (){
			return {
				msg:'hello Vue!'
			}
		},
		methods:{
			jump(){
				// this.$router.push("/cart")
				this.$router.push({path:'/cart?goodsId=123'})
				// this.$router.go(-2) //后退两步
			}
		}
	}
</script>
