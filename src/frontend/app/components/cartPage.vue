<template>
  <div class="card_component">
    <div class="modal-body">
      <div class="content">
        <div class="columns">
          <div class="column col-sm-12 col-6 col-order">
            <div class="card-caption-1">Оформление заказа</div>
            <div v-bind:class="{ 'has-error': hasError('User.name') }" class="form-group">
              <label class="form-label">Ваше имя:</label>
              <input
                v-on:change="()=>onChangeUser(user)"
                v-model="user.name"
                class="form-input"
                type="text"
                placeholder="Ваше имя"
              />
            </div>
            <div v-bind:class="{ 'has-error': hasError('User.phone') }" class="form-group">
              <label class="form-label">Ваш телефон:</label>
              <input
                v-on:change="()=>onChangeUser(user)"
                v-model="user.phone"
                class="form-input"
                type="text"
                placeholder="Ваш телефон"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Город:</label>
              <input
                v-on:change="()=>onChangeOrder(order)"
                v-model="order.city"
                class="form-input"
                type="text"
                placeholder="Город"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Адрес доставки:</label>
              <input
                v-on:change="()=>onChangeOrder(order)"
                v-model="order.delivery_address"
                class="form-input"
                type="text"
                placeholder="Адрес доставки"
              />
            </div>
            <div class="form-group">
              <label class="form-label">День доставки:</label>
              <label class="form-radio">
                <input
                  v-on:click="()=>onChangeOrder(order)"
                  v-model="order.delivery_date"
                  type="radio"
                  value="1"
                  name="gender"
                  checked
                />
                <i class="form-icon"></i> В понедельник
              </label>
              <label class="form-radio">
                <input
                  v-on:click="()=>onChangeOrder(order)"
                  v-model="order.delivery_date"
                  type="radio"
                  value="2"
                  name="gender"
                />
                <i class="form-icon"></i> или в пятницу
              </label>
            </div>           
            <div class="form-group">
              <label class="form-label">Комментарий к заказу:</label>
              <textarea  v-on:change="()=>onChangeOrder(order)"
                v-model="order.comment"
                class="form-input"
                placeholder="Комментарий к заказу"></textarea>              
            </div>
          </div>
          <div class="column col-sm-12 col-6 col-card">
            <div class="card-caption-1">Корзина</div>
            <div v-bind:key="index" v-for="(item, index) in order.products">
              <div class="columns card-list">
                <div class="column col-5">
                  <img class="card-img" v-bind:src="item.img" />
                </div>
                <div class="column col-7">
                  <div class="item-caption">{{item.caption}}</div>
                  <div class="item-buttons">
                    <div class="card-counter">
                      <div class="conter-button" v-on:click="()=>countDec(item)">
                        <i class="icon icon-minus"></i>
                      </div>
                      <span>{{item.count}}</span>
                      <div class="conter-button" v-on:click="()=>countInc(item)">
                        <i class="icon icon-plus"></i>
                      </div>
                    </div>
                    <div v-on:click="()=>removeItem(item)" class="delete-button">
                      <i class="icon icon-delete"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div v-if="cartFormError" class="error-msg-footer">Заполненны не все поля</div>
      <div class="card-footer">
        <div class="total-price">Итого: {{totalPrice}} руб.</div>
        <div class="card-button text-right">
          <button v-on:click="checkout" class="btn btn-primary btn-lg">Заказать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { OrderController } from "../OrderController";
import { UserController } from "../UserController";
import * as FFOrder from "../../../Func/Order/FFOrder";
import { OrderI } from "../../../Func/Order/TOrder";
import { UserI } from "../../../Func/User/TUser";
import { fHasError, fCheckField } from "../../../Func/TValidator";

const orderController = new OrderController();
const userController = new UserController();

export default {
  name: "cartPage",

  data() {
    return {};
  }, // data

  mounted() {}, // mounted

  methods: {
    onShowCart() {
      orderController.onShowCart();
    },
    onHideCart() {
      orderController.onHideCart();
    },
    countInc(item: any) {
      orderController.countInc(item, +1);
    },
    countDec(item: any) {
      if (item.count > 1) {
        orderController.countInc(item, -1);
      }
    },
    onChangeOrder(order: OrderI) {
      orderController.onSaveCart(order);
    },
    onChangeUser(user: UserI) {
      userController.onChangeUser(user);
    },
    checkout() {
      orderController.checkout();
    },
    removeItem(item: any) {
      orderController.fRemoveProduct(item);
    },
 
    hasError(sField: string) {
      if(fCheckField(this.$store.state.cartErrors)(sField)) 
        return fHasError(this.$store.state.cartErrors)(sField);
      return false;
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
      return this.$store.state.cartErrors;
    },
    cartFormError() {
      return this.$store.state.cartFormError;
    },
    totalPrice() {
      return this.$store.state.totalPrice;
    }
  }, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
