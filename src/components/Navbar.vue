<template>
  <div>
    <nav class="navb flex items-center justify-between flex-wrap white p-5">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
          <!-- <img src="https://res.cloudinary.com/dutj1bbos/image/upload/c_scale,w_136/v1603461897/logo_ovqxsj.png" alt=""> -->
      <div class="block lg:hidden" >
          <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 ">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
      </div>
      <router-link to="about"><a class="Sunflower block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray mr-4 mx-6 p-4">Ingresos vs gastos</a></router-link>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-start lg:w-auto">
        <div class="text-sm lg:flex-grow lg:flex justify-start" :class="isOpen ? 'block': 'hidden'">
          <router-link to="index"><a rel="noopener noreferrer" class="Sunflower block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray mr-4">mis estadisticas</a></router-link>
            <a @click="out()" class="Sunflower hidd2 block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray mr-4">Salir</a>
        </div>
        <div>
            <a @click="out()" class="Sunflower hidd block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray">Salir</a>
        </div>
      </div>
    </nav>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    out () {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        this.$router.push('/')
    }
    },
}
</script>

<style>
@media (max-width: 800px) {
.hidd {
  display: none !important;
  margin-top: -500px !important;
}
}
@media (min-width: 800px) {
.hidd2 {
  display: none !important;
}
}
.navb{
  background-color: #3185FC!important;
}
.letter {

font-size: 14px;
}
.Sunflower {
  font-family: 'Sunflower', sans-serif;
  font-size: 19px;
}
</style>