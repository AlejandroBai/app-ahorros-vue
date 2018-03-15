<template>
  <div class="col-lg-5 offset-lg-1 col-md-6">
    <h2 class="titulo">
      {{ titulo }}
    </h2>
    <div class="list">
      <app-simple-item v-for="(item, index) in ingresos" :key="item.id">
        <span class="item__description">{{ item.descripcion }}</span>
        <div class="item__numeros">
          <span class="item__numeros--valor">{{ item.valor | formatear }}</span>
          <span class="item__numeros--borrar">
          <button class="item__borrar--btn" @click="borrarItem(index)">
              <i class="ion-ios-close-outline"></i>
          </button>
          </span>
        </div>
      </app-simple-item>
    </div>
  </div>
</template>

<script>
import InputsBar from "./InputsBar.vue";
import SimpleItem from "./SimpleItem.vue";

export default {
  props: ["ingresos"],
  data: function() {
    return {
      titulo: "Ingresos"
    };
  },
  methods: {
    borrarItem(index) {
      this.$emit("itemBorrado", index);
    }
  },
  components: {
    appInputsBar: InputsBar,
    appSimpleItem: SimpleItem
  }
};
</script>

<style lang="scss" scoped>
.titulo {
  color: #1abc9c;
  padding: 2rem 0;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.list__item .item__numeros {
  color: #1abc9c;
}
</style>