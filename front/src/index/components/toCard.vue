<template>
  <div class="toCard">
    <a class="btn btn-primary btn-lg" href="#cards">В корзину</a>
  </div>
</template>

<script>
export default {
  name: "toCard",

  data() {
    return {
    /*   product_id: '',
      product_caption: '',
      product_price: '', */
    };
  }, // data

  //props: ['product_id','product_caption','product_price'],

  mounted() {
    console.log(this.$parent.product_id);
    console.log(this.$parent.product_caption);
    console.log(this.$parent.product_price);
  }, // mounted

  methods: {
    testCheck(e) {
      console.log(e);
    }
  }, // methods

  computed: {}, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
