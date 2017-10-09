<template>
	<div>
		这个商品列表页面
		<span>{{$route.params.goodsId}}</span><br>
		<span>{{$route.params.name}}</span>
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
		}
	}
</script>

