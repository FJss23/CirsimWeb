export const environment = {
  production: true,
  login: 'https://sheltered-everglades-46626.herokuapp.com/login',
  user:  'https://sheltered-everglades-46626.herokuapp.com/api/cirsim/user',
  task: 'https://sheltered-everglades-46626.herokuapp.com/api/cirsim/task',
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
