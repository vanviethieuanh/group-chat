
<template>
  <div class="container">
    <div class="input-wrapper">
      <PincodeInput v-model="code" placeholder="0" />
    </div>
  </div>
</template>

<script>
import PincodeInput from "vue-pincode-input";
export default {
  name: "Home",
  components: {
    PincodeInput
  },
  data: function() {
return {
    code: ""
  };
}
};
</script>

<style>
</style>