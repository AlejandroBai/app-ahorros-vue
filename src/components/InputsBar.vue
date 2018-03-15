<template>
  <div class="row add">
    <div class="col-lg-8 offset-lg-2 col-md-6 offset-md-3 add__contenedor">
      <div class="col-lg-2 col-sm-12 add__radios">
        <input type="radio" class="add__radio--ingreso" id="ingreso" value="ingreso" v-model="item.tipo">
        <label for="ingreso">
        <i class="ion-ios-plus-outline"></i>
      </label>
        <input type="radio" class="add__radio--gasto" id="gasto" value="gasto" v-model="item.tipo" :tipo="item.tipo">
        <label for="gasto">
        <i class="ion-ios-minus-outline"></i>
      </label>
      </div>
      <input type="text" class="col-lg-4 col-sm-12 add__descripcion" placeholder="Añade una descripción" ref="descripcion" v-model="item.descripcion" @keyup.enter="crearNuevoItem" :class="{'focus-rojo': item.tipo === 'gasto' }">
      <input @keyup.enter="crearNuevoItem" type="number" class="col-lg-4 col-sm-12 add__valor" placeholder="Valor" v-model.number="item.valor" :class="{'focus-rojo': item.tipo === 'gasto' }">
      <button type="submit" class="col-lg-1 col-sm-12 add__btn" :class="{'focus-rojo': item.tipo === 'gasto' }" @click.prevent="crearNuevoItem">
        <i class="ion-ios-checkmark-outline"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import IngresosList from "./IngresosList.vue";
import GastosList from "./GastosList.vue";
import SimpleItem from "./SimpleItem.vue";
export default {
  data: function() {
    return {
      item: {
        id: "",
        tipo: "ingreso",
        descripcion: "",
        valor: "",
        porcentaje: -1
      }
    };
  },
  components: {
    appHeader: Header,
    appIngresosList: IngresosList,
    appGastosList: GastosList,
    appSimpleItem: SimpleItem
  },
  computed: {
    mostrarTipo() {
      return;
      console.log(this.item.tipo);
    }
  },
  methods: {
    crearNuevoItem() {
      if (
        this.item.descripcion !== "" &&
        this.item.valor !== "" &&
        this.item.valor > 0
      ) {
        this.$emit(
          "addedItem",
          //Almacenamos los valores en un nuevo objeto llamado newItem
          (this.newItem = {
            id: this.item.id,
            tipo: this.item.tipo,
            descripcion: this.item.descripcion,
            valor: this.item.valor
          })
        );
        // Al emitir el evento, creo un newItem con la información que recoge item desde los inputs. Hago esto para poder borrar los datos de los campos sin que ello afecte al nuevo objeto creado. Si mandara item, descripción y valor serían = "". Al crear newItem almacenamos un nuevo objeto con los datos de item antes de ser borrados. Cuando utilicemos addedItem en el componente ListContainers, recibirá newItem como argumento, que es el objeto con los datos que ha introducido el usuario.
        // Borramos los campos y reestablecemos los datos de item
        this.item.descripcion = "";
        this.item.valor = "";
        // Con el atributo ref me ayudo para seleccionar un elemento del DOM, en este caso sería equivalente a dcument.querySelector('.add__descripcion') --- y le aplico el método .focus()
        this.$refs.descripcion.focus();
      } else if (this.item.descripcion !== "" && this.item.valor !== 0) {
        // Si no es así, emito un evento mostrarAdvertencia con valor true que envío a la App
        this.$emit(
          "mostrarAdvertencia",
          (this.advertencia = {
            visible: true,
            texto: "Rellena el valor, por favor"
          })
        );
      } else if (this.item.valor !== "" && this.item.valor > 0) {
        // Si no es así, emito un evento mostrarAdvertencia con valor true que envío a la App
        this.$emit(
          "mostrarAdvertencia",
          (this.advertencia = {
            visible: true,
            texto: "Rellena la descripción, por favor"
          })
        );
      } else if (this.item.descripcion !== "" && this.item.valor === 0) {
        // Si no es así, emito un evento mostrarAdvertencia con valor true que envío a la App
        this.$emit(
          "mostrarAdvertencia",
          (this.advertencia = {
            visible: true,
            texto: "El valor no puede ser cero"
          })
        );
      } else {
        this.$emit(
          "mostrarAdvertencia",
          (this.advertencia = {
            visible: true,
            texto: "Rellena todos los campos, por favor"
          })
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/**********************************************
                        *** PARTE DE LA BARRA AÑADIR
                        **********************************************/
.add {
  text-align: center;
  padding: 1rem;
  .add__contenedor {
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .add__radios {
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      input[type="radio"] {
        display: none;
        + label {
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 2.8rem;
          cursor: pointer;
          color: #aaa;
        }
        &:hover + label {
          .ion-ios-plus-outline {
            color: #1abc9c;
            transform: scale(1.2);
          }
          .ion-ios-minus-outline {
            color: #e74c3c;
            transform: scale(1.2);
          }
        }
        &:checked + label {
          .ion-ios-plus-outline:before {
            content: "\f48b";
            color: #1abc9c;
          }
          .ion-ios-minus-outline:before {
            content: "\f464";
            color: #e74c3c;
          }
        }
      }
    }
    .add__descripcion,
    .add__valor {
      padding: 1rem;
      font-size: 1rem;      
      &:focus {
        outline: none;
        outline-color: #1abc9c;
        outline-width: 1px;
        border: solid 1px #1abc9c;        
      }
    }
    .focus-rojo {
      &:focus {
        border: solid 1px #e74c3c;
      }
      i {
        color:#e74c3c;
        &:hover {
          color: #e74c3c;
          cursor: pointer;
          transform: scale(1.2);
          .ion-ios-checkmark-outline:before {
            content: "\f3ff";
          }
          &:focus,
          &:active {
            outline: none;
            border: none;
            border-style: none;
          }
        }
      }
    }

    .add__btn {
      padding: 0;
      border: none;
      background: none;
      font-size: 2.8rem;
      font-weight: 100;
      color: #1abc9c;
      &:hover {
        color: #1abc9c;
        cursor: pointer;
        transform: scale(1.2);
        .ion-ios-checkmark-outline:before {
          content: "\f3ff";
        }
      }
      &:focus,
      &:active {
        outline: none;
        border: none;
        border-style: none;
      }
    }
  }
}
/**********************************************
*** PARTE DE LA BARRA AÑADIR
**********************************************/
@media (max-width: 992px) {
  .add__descripcion,
  .add__valor,
  .add__radios {
    margin-bottom: 1rem;
  }
}
</style>

