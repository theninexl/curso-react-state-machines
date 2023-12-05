import { createMachine } from 'xstate';

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial:"inicial",
  states: {
    inicial: {
      on: {
        START: {
          target: 'search',
          actions: 'imprimirInicio',
        },
      }
    },
    search: {
      entry: 'imprimirEntrada',
      exit: 'imprimirSalida',
      on: {
        CONTINUE: 'passengers',
        CANCEL: "inicial",
      }
    },
    passengers: {
      on: {
        DONE: 'tickets',
        CANCEL: 'inicial',
      }
    },
    tickets: {
      on: {
        FINISH: 'inicial'
      }
    },
    
  },
},
{
  actions: {
    imprimirInicio: () => console.log('Imprimir Inicio'),
    imprimirEntrada: () => console.log('Imprimir entrada a search'),
    imprimirSalida: () => console.log('Imprimir salida del search'),
  },
}
);

export { bookingMachine }