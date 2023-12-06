import { createMachine, assign, fromPromise } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: fromPromise(() => fetchCountries()),      
        onDone: {
          target: 'success',
          actions: assign({
            countries: ({_,event})=> event.output 
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: ({_, event}) => event.error
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: 'loading'}
      }
    }
  }
}

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectedCountry: '',
    countries: [],
    error: '',
  },
  states: {
    initial: {
      entry: assign(
        ({ context, event }) => {
          context.passengers = []
          context.selectedCountry = ''
        }
      ),
      on: {
        START: {
          target: "search",
        },
      },
    },
    search: {
      on: {
        CONTINUE: {
          target: 'passengers',
          actions: assign({
            selectedCountry: ({ event }) => event.selectedCountry,
          })
        },
        CANCEL: "initial",
      },
      ...fillCountries,
    },
    tickets: {
      after: {
        5000: {
          target: 'initial',
          actions: 'cleanContext'
        }
      },
      on: {
        FINISH: "initial",
      },
    },
    passengers: {
      on: {
        DONE:{
          target: 'tickets',
          guard: 'moreThanOnePassenger'
        },
        CANCEL: "initial",
        ADD: {
          target: 'passengers',
          actions: assign(
            ({ context, event }) => context.passengers.push(event.newPassenger),
          )
        },
      },
    },
  },
},
{
  actions: {
    imprimirInicio: () => console.log('Imprimir inicio'),
    imprimirEntrada: () => console.log('Imprimir entrada a search'),
    imprimirSalida: () => console.log('Imprimir salida del search'),
    cleanContext: ({ context, event }) => {
      context.passengers = []
      context.selectedCountry = ''
    }
  },
  guards: {
    moreThanOnePassenger: ({ context }) => {
      return context.passengers.length > 0;
    }
  }
}
);

export default bookingMachine;