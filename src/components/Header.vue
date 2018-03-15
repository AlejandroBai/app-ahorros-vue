<template>
  <div class="row header">
    <div class="col header__navbar">
      <img class="header__navbar__img" src="../assets/avatar.jpg" alt="avatar-usuario">
      <a href="" @click.prevent="cambiarAuth"><img class="header__navbar__logout" src="../assets/exit.svg"></a>
    </div>
  
    <div class="header__container col-lg-4 offset-lg-4 col-md-6 offset-md-3">
      <div class="header__title">
        <p>Fondos disponibles a:</p>
      </div>
      <div class="header__fecha">
        <span class="header__fecha-fondo">{{ mostrarFecha }}</span>
      </div>
      <div class="header__value">
        <span v-if="total === 0">{{total.toFixed(2)}}</span>
        <!-- Si es 0 muestro sin filtro -->
        <span v-else-if="total !== 0">{{total > 0 ? '+ ' : '- '}}{{ total | formatear }}</span>
        <!-- Si es diferente de 0 muestro un signo dependiendo del valor filtro -->
      </div>
      <div class="header__ingresos">
        <span class="header__ingresos--text">Ingresos</span>
        <div class="numeros">
          <span class="header__ingresos--value">{{ totalIngresos | formatear}}</span>
        </div>
      </div>
      <div class="header__gastos">
        <span class="header__gastos--text">Gastos</span>
        <div class="numeros">
          <span class="header__gastos--value">{{ totalGastos | formatear }}</span>
          <span v-if="porcentajeTotal" class="header__gastos--porcentaje">{{ porcentajeTotal }} %</span>
        </div>
      </div>
      <p class="advertencia" :class="{ 'mostrar': mostrarAdvertencia.visible, 'ocultar': mostrarAdvertencia.visible === false && mostrarAdvertencia.texto !== 'Texto base' }">{{ mostrarAdvertencia.texto }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: [
    "total",
    "totalIngresos",
    "totalGastos",
    "porcentajeTotal",
    "mostrarAdvertencia"
  ],
  data: function() {
    return {
      fecha: "",
      porcentaje: Math.round(this.totalGastos / this.totalIngresos * 100)
    };
  },
  methods: mapMutations(["cambiarAuth"]),
  computed: {
    mostrarFecha: function() {
      var fechaAhora = new Date();
      var meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
      ];
      var semana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ];
      var ano = fechaAhora.getFullYear();
      var mes = fechaAhora.getMonth();
      var dia = fechaAhora.getDay();
      var diaMes = fechaAhora.getDate();
      return (this.fecha =
        semana[dia] + " " + diaMes + " de " + meses[mes] + " de " + ano);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem;
  text-align: center;
  .header__navbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    background: white;
    padding: .5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header__navbar__img {
      width: 3rem;
      border-radius: 50px;
    }
    .header__navbar__logout {
      width: 2rem;
    }
  }
  .header__container {
    margin-top: 4rem;
    padding: 1rem 0;
    .header__title {
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      font-weight: 100;
    }
    .header__fecha {
      margin-top: 1rem;
      .header__fecha-fondo {
        background: white;
        font-size: 0.8rem;
        padding: 4px 8px;
        color: #777;
        border-radius: 4px;
      }
    }
    .header__value {
      padding: 1rem;
      margin-bottom: 10px;
      font-size: 2rem;
    }
    .header__ingresos,
    .header__gastos {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      color: white;
      font-size: 1rem;
      text-transform: uppercase;
    }
    .header__ingresos {
      background-color: #1abc9c;
      .header__ingresos--text {
        font-size: 0.9rem;
      }
    }
    .header__gastos {
      margin-bottom: 2rem;
      background-color: #e74c3c;
      .header__gastos--text {
        font-size: 0.9rem;
      }
      .header__gastos--porcentaje {
        margin-left: 1rem;
        font-size: 12px;
        background-color: white;
        opacity: 0.8;
        padding: 2px 8px;
        border-radius: 4px;
        color: #e74c3c;
      }
    }
    .numeros {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    // Animación ocultar y mostrar contraseña
    @keyframes fadeOut {
      0% {
        opacity: 1;
        visibility: visible;
      }
      99% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        visibility: hidden;
      }
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
        visibility: visible;
      }
      100% {
        opacity: 1;
      }
    }
    .advertencia {
      visibility: hidden;
      color: #e74c3c;
    }
    .mostrar {
      visibility: visible;
      animation: fadeIn 0.3s linear;
    }
    .ocultar {
      visibility: hidden;
      animation: fadeOut 0.3s linear;
    }
  }
}

// // Logout
// .logout {
//   position: fixed;
//   top: 1rem;
//   right: 1rem;
// }
</style>
