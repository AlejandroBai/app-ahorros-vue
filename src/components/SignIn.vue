<template>
    <div class="container-fluid">
        <div class="row login__fila">
            <div class="col-md-8 offset-md-2 login__col">
                <h1 class="login__titulo">Iniciar sesión</h1>
                <form class="col-md-6 offset-md-3 login__form">
                    <input class="form__field" type="text" placeholder="Usuario">
                    <input class="form__field" type="password" placeholder="Contraseña">
                    <a class="form__btn" @click.prevent="cambiarAuth">
                        <router-link :to="{name: 'home'}">Entrar</router-link>
                    </a>
                </form>
                <div class="col-md-6 offset-md-3 login__form">
                    <router-link class="form__link" :to="{name: 'register'}">No estoy registrado</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {
    mapMutations
  } from "vuex";
  export default {
    methods: mapMutations(["cambiarAuth"])
  };
</script>

<style lang="scss" scoped>
    .login__fila {
        align-items: center;
        background: #212121;
        min-height: 100vh;
        .login__col {
            text-align: center;
            flex-direction: column;
            .login__titulo {
                color: #bbbbbb;
                padding-bottom: 2rem;
            }
            .login__subtitulo {
                margin: 2rem auto;
            }
            .login__form {
                display: flex;
                flex-direction: column;
                .form__field {
                    padding: 1rem;
                    margin-bottom: 1rem;
                    font-size: 1rem;
                    border-radius: 50px;
                    border: solid 1px #212121;
                    background: #292929;
                    color: #1abc9c;
                    outline: none;
                    &:focus {
                        border-color: #1abc9c;
                    }
                }
                .form__btn {
                    // padding: 1rem;
                    margin-bottom: 1rem;
                    border-radius: 50px;
                    border: solid 1px #1abc9c;
                    cursor: pointer;
                    outline: none;
                    img {
                        width: 2rem;
                    }
                    &:hover {
                        background: #1abc9c;
                        color: #212121;
                        a {
                            font-size: 1rem;
                            color: #212121;
                        }
                    }
                }
            }
            // General
            .form__link {
                padding: 1rem;
                &:hover {
                    color: #1abc9c;
                }
            }
            .form__btn {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 50px;
                // border: solid 1px #1abc9c;
                cursor: pointer;
                outline: none;
                &:hover {
                    background: #1abc9c;
                    color: #212121;
                    a {
                        font-size: 1rem;
                        color: #212121;
                    }
                }
            }
            a,
            p {
                font-size: 1rem;
                color: #bbbbbb;
                text-decoration: none;
            }
        }
    }
</style>