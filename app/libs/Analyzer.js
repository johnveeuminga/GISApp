export default class Analyzer {
    analyzerConfig = null;

    constructor( analyzerConfig ) {
        this.analyzerConfig = analyzerConfig;
    }

    analyzeData( data, configName, key = null ) {
        const analyzerConf = this.analyzerConfig.get(configName);

        let returnValue = [];
        
        analyzerConf.forEach( (config) => {
            let keyToUse = key ? key : config.compareKey
            if( !config.compareOperator || !( data.hasOwnProperty(keyToUse) || data.data.hasOwnProperty(keyToUse) ) )  {
              return false;
            }

            let dataToCompare = data.hasOwnProperty('data') ? 
                                  data.data[keyToUse] ? data.data[keyToUse] : data[keyToUse]
                                  : data[keyToUse];

            switch( config.compareOperator ) {
              case '>':
                if( dataToCompare > config.compareValue ) {
                  
                  if( config.hasOwnProperty('name') ) {
                    let name = config.name;

                    if( data.name.toLowerCase() != name.toLowerCase() ) {
                      return false;
                    }
                  }

                  const { message, alertType } = config;
              
                  returnValue.push( {
                    message,
                    alertType
                  })

                  return true;
                }
                break;
              case '>=':
                  
                if( dataToCompare >= config.compareValue ) {
                  if( config.hasOwnProperty('name') ) {
                    let name = config.name;
                    
                    if( data.name.toLowerCase() != name.toLowerCase() ) {
                      return false;
                    }
                  }

                  const { message, alertType } = config;
                  returnValue.push( {
                    message,
                    alertType
                  })

                  return true;
                }
                break;
              case '<':
                if( dataToCompare < config.compareValue ) {
                  if( config.hasOwnProperty('name') ) {
                    let name = config.name;
                    
                    if( data.name.toLowerCase() != name.toLowerCase() ) {
                      return false;
                    }
                  }

                  const { message, alertType } = config;
                  returnValue.push( {
                    message,
                    alertType
                  })

                  return true;
                }
                break;
              case '<=':
                if( dataToCompare <= config.compareValue ) {
                  if( config.hasOwnProperty('name') ) {
                    let name = config.name;
                    
                    if( data.name.toLowerCase() != name.toLowerCase() ) {
                        return false;
                    }
                  }

                  const { message, alertType } = config;
                  returnValue.push( {
                    message,
                    alertType
                  })

                  return true;
                } else {
                  console.log( 'No' )
                }
                break;
              default:
                return false; 
          }
        })

        return returnValue;
    }
}
