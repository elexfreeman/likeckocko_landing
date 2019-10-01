<template>
  <div class="toCart">
    <button v-on:click="onAddCart" class="btn btn-primary btn-lg">В корзину</button>
  </div>
</template>

<script lang='ts'>
import { OrderController } from "../OrderController";

const orderController = new OrderController();

export default {
  name: "toCart",

  data() {
    return {};
  },

  mounted() {}, // mounted

  methods: {
    onAddCart(e: any) {
      orderController.onAddCart(this.$parent);
    }
  }, // methods

  computed: {}, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
