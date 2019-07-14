<template>
  <div class="card_component">
    <div class="card_menu">
      <div class="columns">
        <div class="column col-4 phone-col">
          <img class="phone-ico" src="/img/phone-ico.png" />
          <span>{{phone}}</span>
        </div>
        <div class="column col-4"></div>
        <div class="column col-4 text-right card-col">
          <img class="card-ico" src="/img/card-ico.png" />
        </div>
      </div>
    </div>
    <div class="card_modal"></div>
  </div>
</template>

<script>
export default {
  name: "cardComponent",

  data() {
    return {};
  }, // data

  mounted() {}, // mounted

  methods: {
    testCheck(e) {
      console.log(e);
    }
  }, // methods

  computed: {
    phone() {
      return this.$store.state.phone;
    }
  }, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
