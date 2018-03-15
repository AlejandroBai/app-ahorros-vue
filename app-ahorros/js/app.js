// MÓDULO DEL PRESUPUESTO
var presupuestoControlador = (function () {

  var Gasto = function (id, descripcion, valor) {
    this.id = id;
    this.descripcion = descripcion;
    this.valor = valor;
    this.porcentaje = -1;
  };

  Gasto.prototype.calcularPorcentaje = function (gastosTotales) {
    if (gastosTotales > 0) {
      this.porcentaje = Math.round((this.valor / gastosTotales) * 100);
    } else {
      this.porcentaje = -1;
    };
  };

  Gasto.prototype.cogerPorcentaje = function () {
    return this.porcentaje;
  };

  var Ingreso = function (id, descripcion, valor) {
    this.id = id;
    this.descripcion = descripcion;
    this.valor = valor;
  };

  var calcularTotal = function (tipo) {
    var suma = 0;
    datos.todosItems[tipo].forEach(function (itemActual) {
      suma = suma + itemActual.valor;
    });
    datos.totales[tipo] = suma;
  };

  var datos = {
    todosItems: {
      ing: [],
      gas: []
    },
    totales: {
      ing: 0,
      gas: 0
    },
    presupuesto: 0,
    porcentaje: -1
  };

  return {
    anadirItem: function (tipo, desc, val) {
      var newItem, ID;
      if (datos.todosItems[tipo].length > 0) {
        ID = datos.todosItems[tipo][datos.todosItems[tipo].length - 1].id + 1;
      } else {
        ID = 0;
      };
      if (tipo === 'gas') {
        newItem = new Gasto(ID, desc, val);
      } else if (tipo === 'ing') {
        newItem = new Ingreso(ID, desc, val);
      };
      datos.todosItems[tipo].push(newItem);
      return newItem;
    },

    borrarItem: function (tipo, id) {
      var ids, index, tipo;
      ids = datos.todosItems[tipo].map(function (actual) {
        return actual.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        datos.todosItems[tipo].splice(index, 1);
      }
    },

    calcularPresupuesto: function () {
      calcularTotal('gas');
      calcularTotal('ing');
      datos.presupuesto = datos.totales.ing - datos.totales.gas;
      if (datos.totales.ing > 0) {
        datos.porcentaje = Math.round((datos.totales.gas / datos.totales.ing) * 100);
      } else {
        datos.porcentaje = -1;
      }
    },

    calcularPorcentajes: function () {
      datos.todosItems.gas.forEach(function (actual) {
        actual.calcularPorcentaje(datos.totales.ing);
      });
    },

    cogerPorcentajes: function () {
      var todosPorcentajes = datos.todosItems.gas.map(function (actual) {
        return actual.cogerPorcentaje();
      });
      return todosPorcentajes;
    },

    cogerPresupuesto: function () {
      return {
        presupuesto: datos.presupuesto,
        totalIngresos: datos.totales.ing,
        totalGastos: datos.totales.gas,
        porcentaje: datos.porcentaje
      };
    },
  };

})();

// MÓDULO DE LA INTERFAZ DE USUARIO
var UIController = (function () {
  var textosDOM = {
    tipoInput: '.anadir__radios input[name=tipo]',
    radioIngreso: '.anadir__radio--ingreso',
    radioGasto: '.anadir__radio--gasto',
    descripcionInput: '.anadir__descripcion',
    valorInput: '.anadir__valor',
    botonInput: '.anadir__btn',
    contenedorIngresos: '.ingresos__lista',
    contenedorGastos: '.gastos__lista',
    presupuestoTexto: '.presupuesto__valor',
    ingresosTexto: '.presupuesto__ingresos--valor',
    gastosTexto: '.presupuesto__gastos--valor',
    porcentajeTexto: '.presupuesto__gastos--porcentaje',
    contenedorListas: '.listas',
    textoPorcentajesItems: '.item__numeros--porcentaje',
    fecha: '.presupuesto__titulo--fecha'
  };

  var textosUIOscura = {
    UIOscura: false,
    checked: 'input[type=checkbox]',
    texto: '.switch-texto',
    body: 'body',
    barra: '.row.anadir',
    inputText: 'input[type=text]',
    inputNumber: 'input[type=number]',
    listaUnificada: '.lista__item',
    listaIngresos: '.ingresos__lista',
    listaGastos: '.gastos__lista',
    itemIngreso: '.ingresos__lista__item',
    itemGasto: '.gastos__lista__item'
  };

  var formateoNumeros = function (num, tipo) {
    var numSplit, entero, decimal, tipo;
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split('.');
    entero = numSplit[0];
    if (entero.length > 3) {
      entero.substr(0, entero.length - 3) + ',' + entero.substr(entero.length - 3, 3);
    }
    decimal = numSplit[1];
    return (tipo === 'gas' ? signo = '-' : signo = '+') + ' ' + entero + '.' + decimal;
  };

  var nodeListForeach = function (lista, callback) {
    for (var i = 0; i < lista.length; i++) {
      callback(lista[i], i);
    }
  };

  return {
    cogerInput: function () {
      return {
        tipo: document.querySelector(textosDOM.tipoInput + ':checked').value, // ing o gas
        descripcion: document.querySelector(textosDOM.descripcionInput).value,
        valor: parseFloat(document.querySelector(textosDOM.valorInput).value)
      }
    },

    pintarItemUI: function (obj, tipo) {
      var html, newHtml, elemento;
      if (tipo === 'ing') {
        elemento = textosDOM.contenedorIngresos;
        if (textosUIOscura.UIOscura) {
          html = '<div class="lista__item ingresos__lista__item oscuro1" id="ing-%id%"><span class="item__description">%descripcion%</span><div class="item__numeros"><span class="item__numeros--valor">%valor%</span><span class="item__numeros--borrar"><button class="item__borrar--btn"><i class="ion-ios-close-outline"></i></button></span></div></div>';
        } else {
          html = '<div class="lista__item ingresos__lista__item" id="ing-%id%"><span class="item__description">%descripcion%</span><div class="item__numeros"><span class="item__numeros--valor">%valor%</span><span class="item__numeros--borrar"><button class="item__borrar--btn"><i class="ion-ios-close-outline"></i></button></span></div></div>';
        }
      } else if (tipo === 'gas') {
        elemento = textosDOM.contenedorGastos;
        if (textosUIOscura.UIOscura) {
          html = '<div class="lista__item gastos__lista__item oscuro1" id="gas-%id%"><span class="item__description">%descripcion%</span><div class="item__numeros"><span class="item__numeros--valor">%valor%</span><div class="item__numeros--porcentaje">21%</div><span class="item__numeros--borrar"><button class="item__borrar--btn"><i class="ion-ios-close-outline"></i></button></span></div></div>';
        } else {
          html = '<div class="lista__item gastos__lista__item" id="gas-%id%"><span class="item__description">%descripcion%</span><div class="item__numeros"><span class="item__numeros--valor">%valor%</span><div class="item__numeros--porcentaje">21%</div><span class="item__numeros--borrar"><button class="item__borrar--btn"><i class="ion-ios-close-outline"></i></button></span></div></div>';
        }
      };
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%descripcion%', obj.descripcion);
      newHtml = newHtml.replace('%valor%', formateoNumeros(obj.valor, tipo));
      document.querySelector(elemento).insertAdjacentHTML('beforeend', newHtml);
    },

    borrarItemUI: function (idElegido) {
      var el = document.getElementById(idElegido);
      el.parentNode.removeChild(el);
    },

    borrarCampos: function () {
      var campos, arrayCampos;
      campos = document.querySelectorAll(textosDOM.descripcionInput + ', ' + textosDOM.valorInput);
      arrayCampos = Array.prototype.slice.call(campos);
      arrayCampos.forEach(function (campoActual, index, array) {
        campoActual.value = "";
      });
      arrayCampos[0].focus();
    },

    mostrarPresupuesto: function (obj) {
      var tipo;
      obj.presupuesto > 0 ? tipo = 'ing' : tipo = 'gas';
      document.querySelector(textosDOM.presupuestoTexto).textContent = formateoNumeros(obj.presupuesto, tipo) + ' €';
      document.querySelector(textosDOM.ingresosTexto).textContent = formateoNumeros(obj.totalIngresos, 'ing');
      document.querySelector(textosDOM.gastosTexto).textContent = formateoNumeros(obj.totalGastos, 'gas');
      if (obj.porcentaje > 0) {
        document.querySelector(textosDOM.porcentajeTexto).style.display = 'block';
        document.querySelector(textosDOM.porcentajeTexto).textContent = obj.porcentaje + ' %';
      } else {
        document.querySelector(textosDOM.porcentajeTexto).textContent = '---';
        document.querySelector(textosDOM.porcentajeTexto).style.display = 'none';
      }
    },

    mostrarPorcentajes: function (porcentajes) {
      var campos = document.querySelectorAll(textosDOM.textoPorcentajesItems);
      nodeListForeach(campos, function (actual, index) {
        if (porcentajes[index] > 0) {
          actual.textContent = porcentajes[index] + ' %';
        } else {
          actual.textContent = '---';
        }
      });
    },

    mostrarFecha: function () {
      var ahora, meses, mes, ano;
      ahora = new Date();
      meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      ano = ahora.getFullYear();
      mes = ahora.getMonth();
      document.querySelector(textosDOM.fecha).textContent = meses[mes] + ' de ' + ano;
    },

    mostrarAdvertencia: function () {
      document.querySelector('.advertencia').classList.remove('ocultar');
      document.querySelector('.advertencia').classList.add('mostrar');
      setTimeout(function () {
        document.querySelector('.advertencia').classList.add('ocultar');
      }, 2000);
    },

    cogerTextosDOM: function () {
      return textosDOM;
    },

    cogerTextosSwitch: function () {
      return textosUIOscura;
    },

    cambiarInterfaz: function () {
      var selectores = {
        UI: document.querySelector(textosUIOscura.texto),
        body: document.querySelector(textosUIOscura.body),
        barra: document.querySelector(textosUIOscura.barra),
        inputText: document.querySelector(textosUIOscura.inputText),
        inputNumber: document.querySelector(textosUIOscura.inputNumber),
        ingreso: document.querySelector(textosUIOscura.itemIngreso),
        gasto: document.querySelector(textosUIOscura.itemGasto),
        listaGastos: document.querySelector(textosUIOscura.listaGastos),
        listaIngresos: document.querySelector(textosUIOscura.listaIngresos)
      };

      var listaUnificada = document.querySelectorAll(textosUIOscura.listaUnificada);

      if (document.querySelector(textosUIOscura.checked).checked === false) {
        // UI Oscura
        textosUIOscura.UIOscura = true;
        selectores.UI.textContent = 'UI Clara';
        selectores.body.classList.remove('claro');
        selectores.body.classList.add('oscuro');
        selectores.barra.classList.add('oscuro1');
        selectores.inputText.classList.add('oscuro-input');
        selectores.inputNumber.classList.add('oscuro-input');
        nodeListForeach(listaUnificada, function (actual, index) {
          actual.classList.add('oscuro1');
        });
      } else {
        // UI Clara
        textosUIOscura.UIOscura = false;
        selectores.UI.textContent = 'UI Oscura';
        selectores.body.classList.remove('oscuro');
        selectores.body.classList.add('claro');
        selectores.barra.classList.remove('oscuro1');
        selectores.inputText.classList.remove('oscuro-input');
        selectores.inputNumber.classList.remove('oscuro-input');
        nodeListForeach(listaUnificada, function (actual, index) {
          actual.classList.remove('oscuro1');
        });
      }
    },
    cambiarFocus: function () {
      var campos = document.querySelectorAll(
        textosDOM.tipoInput + ',' +
        textosDOM.descripcionInput + ',' +
        textosDOM.valorInput
      );
      nodeListForeach(campos, function (actual) {
        actual.classList.toggle('focus-rojo');
      });
      document.querySelector(textosDOM.botonInput).classList.toggle('anadir__btn-rojo');
    }

  };

})();


// MÓDULO DE LA APLICACIÓN
var appController = (function (presupuestoCtrl, UICtrl) {

  var iniciarCambioInterfaz = function () {
    console.log('Inicio cambio UI');
    document.querySelector('.slider').addEventListener('click', function () {
      ctrlInterfaz();
    });
  };

  var nodeListForeach = function (lista, callback) {
    for (var i = 0; i < lista.length; i++) {
      callback(lista[i], i);
    }
  };

  var iniciarEventListeners = function () {
    var DOM = UICtrl.cogerTextosDOM();
    document.querySelector(DOM.botonInput).addEventListener('click', ctrlAnadirItem);
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        ctrlAnadirItem();
      }
    });
    document.querySelector('.anadir__radios').addEventListener('change', UICtrl.cambiarFocus);
    document.querySelector(DOM.contenedorListas).addEventListener('click', ctrlBorrarItem);
  };

  var actualizarPresupuesto = function () {
    presupuestoCtrl.calcularPresupuesto();
    var presupuesto = presupuestoCtrl.cogerPresupuesto();
    UICtrl.mostrarPresupuesto(presupuesto);
    console.log(presupuesto);
  };

  var actualizarPorcentajes = function () {
    presupuestoCtrl.calcularPorcentajes();
    var porcentajes = presupuestoCtrl.cogerPorcentajes();
    UICtrl.mostrarPorcentajes(porcentajes);
    console.log(porcentajes);
  };

  var ctrlInterfaz = function () {
    UICtrl.cambiarInterfaz();
  };

  var ctrlAnadirItem = function () {
    var valoresInput, newItem;
    valoresInput = UICtrl.cogerInput();
    if (valoresInput.descripcion !== "" && !isNaN(valoresInput.valor) && valoresInput.valor > 0) {
      newItem = presupuestoControlador.anadirItem(valoresInput.tipo, valoresInput.descripcion, valoresInput.valor);
      UICtrl.pintarItemUI(newItem, valoresInput.tipo);
      UICtrl.borrarCampos();
      actualizarPresupuesto();
      actualizarPorcentajes();
    } else {
      var mostrar = UICtrl.mostrarAdvertencia();
      if (valoresInput.descripcion !== "" && valoresInput.valor === 0) {
        document.querySelector('.advertencia').textContent = 'El valor no puede ser 0';
        mostrar
      } else {
        document.querySelector('.advertencia').textContent = 'Rellena todos los campos, por favor';
        mostrar
      }
    }
  };

  var ctrlBorrarItem = function (event) {
    var itemID, splitID, tipo, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    splitID = itemID.split('-');
    tipo = splitID[0];
    ID = parseInt(splitID[1]);
    presupuestoCtrl.borrarItem(tipo, ID);
    UICtrl.borrarItemUI(itemID);
    actualizarPresupuesto();
    actualizarPorcentajes();
  };

  return {
    init: function () {
      console.log('Aplicación inicializada');
      UICtrl.mostrarFecha();
      iniciarEventListeners();
      UICtrl.mostrarPresupuesto({
        presupuesto: 0,
        totalIngresos: 0,
        totalGastos: 0,
        porcentaje: -1
      });
      iniciarCambioInterfaz();
    },
  };
})(presupuestoControlador, UIController);

appController.init();
