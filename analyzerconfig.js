const config = new Map();

populationAnalyzer = [
  {
    name:"dog",
    compareOperator: ">=",
    compareValue: 400,
    message: "Population of dogs too high. Consider doing antirabies vaccinations for dogs.",
    alertType: "alert",
    compareKey: 'population'
  },
  {
    name: "dog",
    compareOperator: '<',
    compareValue: 100,
    message: "Population of dogs too low.",
    alertType: "alert",
    compareKey: 'population'
  }
]
config.set( 'population', populationAnalyzer );


plantAnalyzer = [
  {
    compareOperator: "<=",
    compareValue: 100,
    message: "Population too low. Planting more ___ can help prevent landslides.",
    alertType: "danger",
    compareKey: 'population'
  }
]

lakeAnalyzer = [
  {
    compareOperator: '<=',
    compareValue: 250,
    message: "Depth is too high as of the moment. Consider preparing evacuation measures in case of flash floods",
    alertType: 'danger',
    compareKey: 'average_depth'
  }
]

config.set( 'plantAnalyzer', plantAnalyzer );
config.set( 'population', populationAnalyzer )
config.set( 'lakeAnalyzer', lakeAnalyzer )

export default config;