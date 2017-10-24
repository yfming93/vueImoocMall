<template>
  <!--template 中必须有一个根元素。若直接放多个元素在 template 中会报错-->
  <!-- modal弹框 -->
  <div>
    <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">

          <button class="md-close" @click="cosleModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="cosleModal"></div>
  </div>
</template>

<script>
  export default {
    props:["mdShow"],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      cosleModal () {
        this.$emit("close")    //调用父组件的close方法
      }
    }
  }
</script>

<style>

</style>
