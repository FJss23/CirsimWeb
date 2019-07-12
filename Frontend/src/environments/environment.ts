// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  login: 'http://localhost:8081/login',
  user: 'http://localhost:8081/api/cirsim/user',
  task: 'http://localhost:8081/api/cirsim/task',
  /*login: 'https://sheltered-everglades-46626.herokuapp.com/login',
  user:  'https://sheltered-everglades-46626.herokuapp.com/api/cirsim/user',
  task: 'https://sheltered-everglades-46626.herokuapp.com/api/cirsim/task',*/
  configurationVis: {
    autoResize: true,
    height: "900px",
    width: "900px",
    clickToUse: true,
    physics:{
      enabled: false,
    },
    edges: {
      smooth: {
        type: "cubicBezier",
        forceDirection: "none",
        roundness: 1
      }
    },
    nodes: {
      font: {
        strokeWidth: 6, 
        strokeColor: '#ffffff'
      }
    },
    interaction: {
      zoomView: false,
      multiselect: true,
      dragView: false
    },
    manipulation: {
      enabled: false,
      initiallyActive: true,
    },
    defaultSizeConnection: 6,
    defaultSizePoint: 11,
    defaultValueName: '',
    defaultColor:'#000000'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
