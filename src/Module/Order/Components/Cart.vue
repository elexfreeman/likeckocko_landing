<template>
  <a href="/cart">
    <img v-if="order.products.length > 0" class="card-ico" src="/img/cart-ico.png" />
  </a>
</template>

<script lang='ts'>
import { OrderController } from "../FOrderCtrl";

export default {
  name: "Cart",

  data() {
    return {
      orderController: new OrderController(this.$store)
    };
  }, // data

  mounted() {}, // mounted

  methods: {
    testCheck(e: any) {
      console.log(e);
    },
    onShowCart() {
      this.orderController.onShowCart();
    },
    onHideCart() {
      this.orderController.onHideCart();
    },
    countInc(item: any) {
      item.count++;
      this.orderController.countInc(item, +1);
    },
    countDec(item: any) {
      if (item.count > 1) {
        item.count--;
        this.orderController.countInc(item, -1);
      }
    },
    checkout() {
      this.orderController.checkout();
    },
    removeItem(item: any) {
      this.$store.state.order.removeItem(item.id);
    }
  }, // methods

  computed: {
    phone() {
      return this.$store.state.phone;
    },
    showCart() {
      return this.$store.state.showCart;
    },
    order() {
      return this.$store.state.order;
    },
    user() {
      return this.$store.state.user;
    },
    errors() {
      return this.$store.state.orderErrors;
    },
    orderFormError() {
      return this.$store.state.orderFormError;
    },
    totalPrice() {
      return this.$store.state.order.getTotalPrice();
    }
  }, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
