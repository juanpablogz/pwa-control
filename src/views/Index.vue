<template>
  <div>
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <Navbar/>
    <h2 class="mt-12">saldo: {{saldo}} </h2>
    <div class="container mx-auto flex justify-center ">
        <apexchart class="widh mt-12" type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
    </div>
  <h2 class="mt-12">ingresos</h2>
<!-- ingresos -->
    <div v-if="modeEditIncome == false" class="container mx-auto flex justify-center ">
      <table class="table-auto ">
          <thead>
              <tr>
                <th class="px-4 py-2">Nombre</th>
              </tr>
          </thead>
          <tbody>
            <tr  v-for="(income, index) in incomes" :key="index">
              <td class="border px-4 py-2">{{income.name}}</td>
              <td class="border px-4 py-2">{{income.value}}</td>
              <a @click="modoEditionIncome(idEditionIncome = income.id)" class="edit"> <i class="fas fa-edit"></i> </a>
              <a @click="incomeDelete(index,income.id)" class="color p-2 w-32 h-12"><i class="fas fa-trash-alt"></i></a>
            </tr>
          </tbody>
      </table>
    </div>
    <!-- edicion -->
  <form v-if="modeEditIncome" class="w-full max-w-sm container mx-auto flex justify-center">
      <div class="flex items-center border-b border-blue-500 py-2">
        <input v-model="newValue" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="nuevo valor" aria-label="Full name">
        <button @click="updatedIncome()" class="flex-shrink-0 bg-blue-500 hover:bg-teal-700 border-blue-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
          Cambiar
        </button>
        <button @click="modeEditIncome = false" class="flex-shrink-0 border-transparent border-4 text-blue-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
          Cancelar
        </button>
      </div>
  </form>
  <!-- end edicion -->
<!-- end ingresos -->

<!-- gastos -->
  <h2 class="mt-12">gastos</h2>
    <div v-if="modeEdit == false" class="container mx-auto flex justify-center">
      <table class="table-auto ">
        <thead>
            <tr>
              <th class="px-4 py-2">Nombre</th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(expense, index) in expenses" :key="index">
              <td class="border px-4 py-2">{{expense.name}}</td>
              <td class="border px-4 py-2">{{expense.value}}</td>
              <td class="border px-4 py-2">{{expense.id}}</td>
                <a @click="modoEdition(idEdition = expense.id)" class="edit"> <i class="fas fa-edit"></i> </a>
                <a @click="expenseDelete(index, expense.id)" class="color"><i class="fas fa-trash-alt"></i></a>
            </tr>
        </tbody>
      </table>
    </div>
    <!-- edicion -->
  <form v-if="modeEdit" class="w-full max-w-sm container mx-auto flex justify-center">
      <div class="flex items-center border-b border-blue-500 py-2">
        <input v-model="newValue" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="nuevo valor" aria-label="Full name">
        <button @click="updated()" class="flex-shrink-0 bg-blue-500 hover:bg-teal-700 border-blue-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
          Cambiar
        </button>
        <button @click="modeEdit = false" class="flex-shrink-0 border-transparent border-4 text-blue-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
          Cancelar
        </button>
      </div>
  </form>
  <!-- end edicion -->
<!-- end gastos -->
  </div>
</template>

<script>
import axios from 'axios'
import api from './../mixins/api.js'
import Navbar from '@/components/Navbar.vue'
import Swal from 'sweetalert2'
export default {
  components: {
    Navbar,
  },
mixins: [api],
  data () {
    return {
      modeEdit: false,
      modeEditIncome: false,
      name: {},
      incomes: {},
      expenses: {},
      options: {},
      series: [],
      newValue: '',
      idEdition: 0,
      incomeBalance: [],
      expenseBalance: [],
      idEditionIncome: 0,
      expenses: 0,
      newSaldo: 0,
      chartOptions: {
        labels: []
      },
    }
  },
created () {
    this.get('user_incomes').then((result) => {
    this.incomes = result.data
    this.incomes.forEach(element => this.series.push(element.value));
    this.incomes.forEach(element => this.incomeBalance.push(element.value));
    this.incomes.forEach(element => this.chartOptions['labels'].push(element.name));

  })
    this.get('user_expenses').then((result) => {
    this.expenses = result.data
    var value = []
    this.expenses.forEach(element => this.series.push(element.value));
    this.expenses.forEach(element => this.expenseBalance.push(element.value));
    this.expenses.forEach(element => this.chartOptions['labels'].push(element.name));
  })
},
    methods: {
      modoEdition () {
        this.modeEdit = true
      },
      modoEditionIncome () {
        this.modeEditIncome = true
      },
    updatedIncome () {
      let params = { 'value': this.newValue }
        Swal.fire({
          title: 'Estas seguro?',
          text: "Editaras el gasto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
            this.put(`incomes/${this.idEditionIncome}`, params).then((result) => {
            let data = result.headers
            this.modeEdit = false
            this.$router.push('about')
          }),
              'Deleted!',
              'eliminado correctamente.',
              'success'
            )
          }
        })
    },
    updated () {
      let params = { 'value': this.newValue }
        Swal.fire({
          title: 'Estas seguro?',
          text: "Editaras el gasto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
            this.put(`expenses/${this.idEdition}`, params).then((result) => {
            let data = result.headers
            this.modeEdit = false
            this.$router.push('about')
          }),
              'Deleted!',
              'eliminado correctamente.',
              'success'
            )
          }
        })
    },
  incomeDelete (index,id) {
    let user_id = JSON.parse(localStorage.getItem('id'))
    let params  = { 'user_id': user_id }
      Swal.fire({
        title: 'Estas seguro?',
        text: "Lo eliminaras permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            this.delete(`incomes/${id}`, params).then((result) => {
              let data = result.headers
              this.series.splice(index,1)
              this.incomes.splice(index,1)
              this.incomeBalance.splice(index,1) 
            }),
            'Deleted!',
            'eliminado correctamente.',
            'success'
          )
        }
      })
    },
  expenseDelete (index,id) {
    let user_id = JSON.parse(localStorage.getItem('id'))
    let params  = { 'user_id': user_id }
    Swal.fire({
      title: 'Estas seguro?',
      text: "Lo eliminaras permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          this.delete(`expenses/${id}`, params).then((result) => {
            let data = result.headers
            this.series.splice(index,1)
            this.expenses.splice(index,1)
            this.expenseBalance.splice(index,1)
          }),
          'Deleted!',
          'eliminado correctamente.',
          'success'
        )
      }
    })
  },
},
computed: {
  saldo () {
    let expense = this.expenseBalance.reduce((a, b) => a + b, 0);
    let income = this.incomeBalance.reduce((a, b) => a + b, 0);
    return income-expense
  },
},
watch: {
}}
</script>

<style>
@media (max-width: 600px) {
}
.color {
  color: red;
}
.color:hover {
  color: black;
}
.edit {
  color: #3185FC;
  padding: 20px;
}
.edit:hover {
  color: black;
}
</style>