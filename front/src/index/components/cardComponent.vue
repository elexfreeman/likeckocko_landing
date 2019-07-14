<template>
  <div class="card_component">
    <div class="card_menu">
      <div class="columns">
        <div class="column col-4 col-sm-6 phone-col">
          <img class="phone-ico" src="/img/phone-ico.png" />
          <span>{{phone}}</span>
        </div>
        <div class="column col-sm-2"></div>
        <div class="column col-4 text-right card-col">
          <img v-on:click="onShowCard" class="card-ico" src="/img/card-ico.png" />
        </div>
      </div>
    </div>

    <div class="cardModal">
      <div v-bind:class="{'active': showCard}" class="modal" id="modal-id">
        <span v-on:click="onHideCard" class="modal-overlay" aria-label="Close"></span>
        <div class="modal-container">
          <div class="modal-header">
            <span v-on:click="onHideCard" class="btn btn-clear float-right" aria-label="Close"></span>
            <div class="modal-title h5">
              <img class="card-ico" src="/img/card-ico.png" /> 
              <span>Корзина</span>
              </div>
          </div>
          <div class="modal-body">
            <div class="content">
              <div v-bind:key="index" v-for="(item, index) in card.products">
                <div class="columns card-list">
                  <div class="column col-xs-3">
                    <img class="card-img" v-bind:src="item.img" />
                  </div>
                  <div class="column col-xs-5">{{item.caption}}</div>
                  <div class="column col-xs-2">
                    <div class="form-group">                     
                      <input v-model='item.count' class="form-input" type="number" />
                    </div>                    
                  </div>
                  <div class="column col-xs-1">
                    <button class="btn btn-action"><i class="icon icon-delete"></i>  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class='phone-caption'>Ваш телефон:</div>
            <div class="phone-input">
              <input  class="form-input" type="text" />
            </div>
            <div class="phone-input-m">
              <input  class="form-input" type="text" placeholder="Ваш номер телефона +7..." />
            </div>
            <button class="btn btn-primary btn-lg">Заказать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardController from "../CardController";
const cardController = new CardController();

export default {
  name: "cardComponent",

  data() {
    return {};
  }, // data

  mounted() {}, // mounted

  methods: {
    testCheck(e) {
      console.log(e);
    },
    onShowCard() {
      cardController.onShowCard();
    },
    onHideCard() {
      cardController.onHideCard();
    }
  }, // methods

  computed: {
    phone() {
      return this.$store.state.phone;
    },
    showCard() {
      return this.$store.state.showCard;
    },
    card() {
      return this.$store.state.card;
    }
  }, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
