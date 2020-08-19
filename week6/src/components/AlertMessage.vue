<template>
<div class="message-alert">
  <div class="alert alert-dismissible fade show"
    :class="'alert-' + item.status"
    v-for="(item, i) in messages" :key="i"
    role="alert">
      <span>{{ item.message }}</span>
      <button type="button" class="close"
      data-dismiss="alert" aria-label="Close"
      @click="removeMessage(i)">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    }
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
