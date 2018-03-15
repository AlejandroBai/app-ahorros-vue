<template>
  <router-view></router-view>
</template>

<script>
import Home from "./components/Home.vue";
import SignIn from "./components/SignIn.vue";
import Register from "./components/Register.vue";

import Header from "./components/Header.vue";
import InputsBar from "./components/InputsBar.vue";
import IngresosList from "./components/IngresosList.vue";
import GastosList from "./components/GastosList.vue";
import SimpleItem from "./components/SimpleItem.vue";

export default {
  data: function() {
    return {
      newItem: {
        id: "",
        tipo: "",
        descripcion: "",
        valor: ""
      },
      ingresos: [],
      gastos: [],
      total: 0,
      totalIngresos: 0,
      totalGastos: 0,
      porcentajeTotal: "",
      advertencia: {
        visible: "",
        texto: "Texto base"
      },
      UI: "UI Oscura"
    };
  },
  components: {
    appHome: Home,
    appHeader: Header,
    appInputsBar: InputsBar,
    appIngresosList: IngresosList,
    appGastosList: GastosList,
    appSimpleItem: SimpleItem
  },
  methods: {
    nuevoItem(newItem) {
      this.newItem = newItem;
      if (newItem.tipo === "ingreso") {
        // Asigno un ID a cada ingreso
        if (this.ingresos.length > 0) {
          this.newItem.id = this.ingresos[this.ingresos.length - 1].id + 1;
        } else {
          this.newItem.id = 0;
        }
        // Añado un el nuevo item al array ingresos y hago los respectivos cálculos
        this.ingresos.push(newItem);
        this.totalIngresos += newItem.valor;
        this.total = this.totalIngresos - this.totalGastos;
        this.porcentajeTotal = Math.round(
          this.totalGastos / this.totalIngresos * 100
        );
        // console.log(this.porcentajeTotal);
      } else if (newItem.tipo === "gasto") {
        // Asigno un ID a cada gasto
        if (this.gastos.length > 0) {
          this.newItem.id = this.gastos[this.gastos.length - 1].id + 1;
        } else {
          this.newItem.id = 0;
        }
        // Añado un el nuevo item al array gastos y hago los respectivos cálculos
        this.gastos.push(newItem);
        this.totalGastos += newItem.valor;
        this.total = this.totalIngresos - this.totalGastos;
        if (this.totalIngresos > 0) {
          this.porcentajeTotal = Math.round(
            this.totalGastos / this.totalIngresos * 100
          );
        } else {
          this.porcentajeTotal = "";
        }
      }
    },
    borrarGasto(index) {
      this.totalGastos -= this.gastos[index].valor;
      this.total = this.totalIngresos - this.totalGastos;
      this.gastos.splice(index, 1);
    },
    borrarIngreso(index) {
      this.totalIngresos -= this.ingresos[index].valor;
      this.total = this.totalIngresos - this.totalGastos;
      this.ingresos.splice(index, 1);
    },
    // InputsBar recibe el evento 'mostrarAdvertencia' que activa el método mostrar()
    mostrar(mostrar) {
      // Creo el método en la App para guardar el valor booleano en advertencia, y le paso el dato advertencia en la prop 'mostrarAdvertencia' al componente app-header
      this.advertencia.visible = mostrar.visible;
      this.advertencia.texto = mostrar.texto;
      setTimeout(() => {
        this.advertencia.visible = false;
      }, 3000);
    },
    cambiarInterfaz() {
      if (this.UI === "UI Oscura") {
        this.UI = "UI Clara";
        document.querySelector('html').style.background = '#212121';
      } else if (this.UI === "UI Clara") {
        this.UI = "UI Oscura";
        document.querySelector('html').style.background = '#f0f0f0';        
      }
    },
  },
  // IMPORTANTE!!! Una computed en la aplicación se aplica siempre si se la pasamos como props a un componente
  computed: {
    calcularPorcentajeItem() {
      if (this.totalGastos > 0) {
        this.gastos.forEach(element => {
          element.porcentaje = Math.round(
            element.valor / this.totalGastos * 100
          );
        });
      }
    }
  }
};
</script>

<style lang="scss">
/**********************************************
*** GENERAL
**********************************************/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s;
  outline: none;
}

body,
html {
  min-height: 100vh;
  background: #f0f0f0;
  color: #555;
  font-family: Open Sans;
  font-size: 1rem;
}
.app__container {
  min-height: 100vh;
  .add {
    background: white;
    .add__contenedor {
      .add__descripcion,
      .add__valor {
        -webkit-appearance: none;
         border-radius: 0;
        border: solid 1px #f0f0f0;
      }
    }
  }
  .lists__container {
    padding-bottom: 2rem;
  }
}

/**********************************************
*** BOTÓN SWITCH INTERFAZ
**********************************************/

/* The switch - the box around the slider */

.switch {
  position: fixed;
  top: 11rem;
  right: 14rem;
  width: 60px;
  height: 34px;
}

.switch-texto {
  display: block;
  position: relative;
  width: 60px;
  font-size: 0.7rem;
  top: -25px;
  text-align: center;
}

/* Hide default HTML checkbox */

.switch input {
  display: none;
}

/* The slider */

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.6s;
}

input:checked + .slider {
  background-color: #1abc9c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
  border-radius: 34px;
  outline: none;
}

.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 992px) {
  label.switch {
    top: auto;
    bottom: 2rem;
    right: 2rem;
  }
}

/**********************************************
*** INTERFAZ OSCURA
**********************************************/

.oscuro {
  background: #212121;
  color: #aaa;
  border-color: #212121;

  .header {
    .header__container {
      .header__fecha {
        span.header__fecha-fondo {
          background: #333;
        }
      }
    }
  }
  .add {
    background: #333;
    border-color: #212121;
    .add__contenedor {
      input.add__descripcion,
      input.add__valor {
        background: #212121;
        color: #aaa;
        border-color: #212121;
        border-radius: 50px;
      }
    }
  }
  .lists__container {
    .list__item {
      background: #333;
      color: #aaa;
      border-color: #212121;
    }
  }
}

// .list__item:hover, .list__item:focus, .list__item:active {
//   .item__numeros{
//     .item__numeros--borrar {
//       .item__borrar--btn {
//         display:block;
//       }
//     }
//   }
// }
</style>
