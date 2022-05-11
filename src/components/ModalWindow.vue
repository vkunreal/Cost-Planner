<template>
  <div class="wrapper">
    <div class="header">{{ settings.header }}</div>

    <div class="content">
      <AddPaymentForm v-if="settings.name === 'AddPaymentForm'" />
    </div>

    <div class="footer">
      <button @click="$modal.hide()">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",

  props: {
    settings: Object,
  },
};
</script>
