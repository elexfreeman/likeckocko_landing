<template>
  <div class="toCart">
    <button v-on:click="onAddCart" class="btn btn-primary btn-lg">В корзину</button>
  </div>
</template>

<script lang='ts'>
import { OrderController } from "../FOrderCtrl";

export default {
  name: "ToCart",

  data() {
    return {
      orderController: new OrderController(this.$store)
    };
  },

  mounted() {}, // mounted

  methods: {
    onAddCart(e: any) {
      this.orderController.onAddCart(this.$parent);
    }
  }, // methods

  computed: {}, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
