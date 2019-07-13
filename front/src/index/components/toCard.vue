<template>
  <div class="toCard">
    <button v-on:click="onAddCard" class="btn btn-primary btn-lg" href="#cards">В корзину</button>
  </div>
</template>

<script>
import CardController from "../CardController";

cardController = new CardController();

export default {
  name: "toCard",

  data() {
    return {};
  },

  mounted() {}, // mounted

  methods: {
    onAddCard(e) {
      cardController.onAddCard(this.$parent);
    }
  }, // methods

  computed: {}, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
