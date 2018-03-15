<template>
  <div class="list__item">
    <slot></slot>
  </div>
</template>

<script>
  
</script>

<style lang="scss" scoped>
.list__item {
  border-bottom: solid 2px #f0f0f0;
  color: #555;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item__description {
    padding: 1rem;
  }
  .item__numeros {
    justify-content: space-around;
    padding: 0 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item__borrar--btn {
      display: none;
      padding: 0;
      margin: 0;
      border: none;
      background: none;
      font-size: 2rem;
      font-weight: 100;
      color: #e74c3c;
      &:hover {
        transition: 0.1s;
        cursor: pointer;
        color: #e74c3c;
        .ion-ios-close-outline:before {
          content: "\f406";
        }
      }
      &:focus {
        outline: none;
      }
    }
  }
  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    .item__borrar--btn {
      display: block !important;
    }
    .item__numeros--valor,
    .item__numeros--porcentaje {
      transform: translateX(-1rem) !important;
    }
  }
}

.item__numeros--porcentaje {
  margin-left: 1rem;
  font-size: 12px;
  background-color: #e74c3c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
