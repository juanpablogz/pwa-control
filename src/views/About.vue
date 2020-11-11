<template>
  <div>
        <Navbar/>
        <Income/>
        <Expenses/>
  </div>
</template>

<script>
import axios from 'axios'
import api from './../mixins/api.js'
import Income from '@/components/Income.vue'
import Expenses from '@/components/Expenses.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar,
    Expenses,
    Income
  },
mixins: [api],
  data () {
    return {
      email: '',
      password: '',
      data: {},
      tokenSave: {}
    }
  },
created () {
},
methods: {
  getx () {
    this.$router.push('index')
  },
    getObjects () {
      var data = JSON.parse(localStorage.getItem('token'))
      let params  = { 'uid': data.uid }
      console.log(data.uid)
      this.get('user_books', params).then((result) => {
      console.log(result)
      })
    },
}
}
</script>

<style>

</style>