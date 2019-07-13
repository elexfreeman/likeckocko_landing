<template>
  <div class="msgModal">
    <div v-bind:class="{'active': showMsgModal}" class="modal" id="modal-id">
     
      <div class="modal-container">
        <div class="modal-header">
          <a href="#close" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5"></div>
        </div>
        <div class="modal-body">
          <div class="content">
            {{showMsgModal}}
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",

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
    showMsgModal() {
      return this.$store.showMsgModal;
    }
  }, // computed

  components: {} // components
};
</script>


<style lang="scss">
</style>
