import * as Blockly from 'blockly/core';
import 'blockly/javascript';
//
// Generate code to pull earthquakes.csv from GitHub.
//
Blockly.JavaScript['data_earthquakes'] = (block) => {
  const URL = 'https://raw.githubusercontent.com/tidyblocks/tidyblocks/master/data/earthquakes.csv'
  const prefix = registerPrefix('')
  return `${prefix} environment.readCSV('${URL}')`
}
