<template>
  <div>
  <div class="container mx-auto flex justify-center mt-12">
      <div class="w-full max-w-xs">
        <form v-on:submit.prevent="expense()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <h1 class="text-center  fontbold text-2xl">gastos</h1>
          <div class="mb-4">
            <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Nombre">
          </div>
          <div class="mb-6">
            <input v-model="value" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="text" type="text" placeholder="Valor gasto">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Agregar
            </button>
          </div>
          <div class="flex items-center justify-between">
          </div>
        </form>
      </div>
  </div>
  </div>
</template>

<script>
import api from './../mixins/api.js'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  
  name: 'home',
  mixins: [api],
  data () {
    return {
      name: '',
      value: 1
    }
  },
  methods: {
    expense () {
      Swal.fire({
      title: 'Agregaras un nuevo ingreso',
      text: "¿estas seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          let id = JSON.parse(localStorage.getItem('id'))
          let params  = { 'name': this.name, 'value': this.value, 'user_id': id }
          this.post('expenses', params).then((result) => {
          let data = result.headers
          console.log(result)
          localStorage.setItem('token', JSON.stringify(data))
            })
          Swal.fire(
            'Agregado!',
            'Correctamente.',
            'success'
          )
        }
      })
    },
    auth () {
      let id = JSON.parse(localStorage.getItem('id'))
      let params  = { 'name': this.name, 'value': this.value, 'user_id': id }
      this.post('expenses', params).then((result) => {
        let data = result.headers
        console.log(result)
        localStorage.setItem('token', JSON.stringify(data))
      })
    }
    },
  }
</script>

<style>

</style>