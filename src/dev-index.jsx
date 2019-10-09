/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'blockly';

import ReactBlocklyComponent from './index';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';

class TestEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
    };
  }

  componentDidMount = () => {

      const SINGLE_COLUMN_NAME = /^ *[_A-Za-z][_A-Za-z0-9]* *$/
      const MULTIPLE_COLUMN_NAMES = /^ *([_A-Za-z][_A-Za-z0-9]*)( *, *[_A-Za-z][_A-Za-z0-9]*)* *$/
  
      // Names of single-column fields in various blocks (for generating validators).
      const SINGLE_COLUMN_FIELDS = [
        'COLUMN',
        'FORMAT',
        'LEFT_TABLE',
        'LEFT_COLUMN',
        'RIGHT_TABLE',
        'RIGHT_COLUMN',
        'NAME',
        'COLOR',
        'X_AXIS',
        'Y_AXIS'
      ]
  
      // Names of multiple-column fields in various blocks (for generating validators).
      const MULTIPLE_COLUMN_FIELDS = [
        'MULTIPLE_COLUMNS'
      ]
  
      const createValidator = (columnName, pattern) => {
        return function () {
          const field = this.getField(columnName)
          field.setValidator((newValue) => {
            if (newValue.match(pattern)) {
              return newValue.trim() // strip leading and trailing spaces
            }
            return null // fails validation
          })
        }
      }
  
      SINGLE_COLUMN_FIELDS.forEach(col => {
        Blockly.Extensions.register(`validate_${col}`, createValidator(col, SINGLE_COLUMN_NAME))
      })
  
      MULTIPLE_COLUMN_FIELDS.forEach(col => {
        Blockly.Extensions.register(`validate_${col}`, createValidator(col, MULTIPLE_COLUMN_NAMES))
      })
}

  workspaceDidChange = (workspace) => {
    workspace.registerButtonCallback('myFirstButtonPressed', () => {
      alert('button is pressed');
    });
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').value = code;
  }

  render = () => (
    <ReactBlocklyComponent.BlocklyEditor
      toolboxCategories={this.state.toolboxCategories}
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
      }}
      initialXml={ConfigFiles.INITIAL_XML}
      wrapperDivClassName="fill-height"
      workspaceDidChange={this.workspaceDidChange}
    />
  )
}

window.addEventListener('load', () => {
  const editor = React.createElement(TestEditor);
  ReactDOM.render(editor, document.getElementById('blockly'));
});
