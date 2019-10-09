import React from 'react';
import PropTypes from 'prop-types';
import Blockly from 'blockly';

function debounce(func, wait) {
  let timeout;

  return function debouncedFunction(...args) {
    const context = this;
    const later = function later() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

class BlocklyWorkspace extends React.Component {
  static propTypes = {
    initialXml: PropTypes.string,
    workspaceConfiguration: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    wrapperDivClassName: PropTypes.string,
    xmlDidChange: PropTypes.func,
    workspaceDidChange: PropTypes.func,
    onImportXmlError: PropTypes.func,
    toolboxMode: PropTypes.oneOf(['CATEGORIES', 'BLOCKS']),
  };

  static defaultProps = {
    initialXml: null,
    workspaceConfiguration: null,
    wrapperDivClassName: null,
    xmlDidChange: null,
    workspaceDidChange: null,
    onImportXmlError: null,
    toolboxMode: 'BLOCKS',
  };

  constructor(props) {
    super(props);

    this.state = {
      workspace: null,
      xml: this.props.initialXml,
    };
  }

  componentDidMount = () => {

    const tidyBlockStyles = {

      data_blocks: {
        colourPrimary: '#FEBE4C',
        colourSecondary: '#64C7FF',
        colourTertiary: '#9B732F',
        hat: 'cap'
      },

      transform_blocks: {
        colourPrimary: '#76AADB',
        colourSecondary: '#3976AD',
        colourTertiary: '#BF9000'
      },

      plot_blocks: {
        colourPrimary: '#A4C588',
        colourSecondary: '#64C7FF',
        colourTertiary: '#586B4B'
      },

      hat_blocks: {
        colourPrimary: '#FEBE4C',
        colourSecondary: '#FEBE4C',
        colourTertiary: '#BF9000',
        hat: 'cap'
      },

      plumbing_blocks: {
        colourPrimary: '#404040',
        colourSecondary: '#404040',
        colourTertiary: '#A0A0A0',
        hat: 'cap'
      },

      value_blocks: {
        colourPrimary: '#E7553C',
        colourSecondary: '#64C7FF',
        colourTertiary: '#760918'
      }
    }

    const tidyCategoryStyles = {
      data: {
        colour: '#FEBE4C'
      },
      transform: {
        colour: '#76AADB'
      },
      plot: {
        colour: '#A4C588'
      },
      plumbing: {
        colour: '#808080'
      },
      stats: {
        colour: '#AF43B7'
      },
      values: {
        colour: '#E7553C'
      }
    }

    // TODO figure out how to use setState here without breaking the toolbox when switching tabs
    this.state.workspace = Blockly.inject(
      this.editorDiv,
      {
        ...this.props.workspaceConfiguration,
        toolbox: this.dummyToolbox,
        theme: new Blockly.Theme(tidyBlockStyles, tidyCategoryStyles),
      },
    );

    if (this.state.xml) {
      if (this.importFromXml(this.state.xml)) {
        this.xmlDidChange();
      } else {
        this.setState({ xml: null }, this.xmlDidChange);
      }
    }

    this.state.workspace.addChangeListener(this.workspaceDidChange);

    this.state.workspace.addChangeListener(debounce(() => {
      const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
      if (newXml === this.state.xml) {
        return;
      }

      this.setState({ xml: newXml }, this.xmlDidChange);
    }, 200));
  }

  componentWillReceiveProps = (newProps) => {
    if (this.props.initialXml !== newProps.initialXml) {
      this.setState({ xml: newProps.initialXml });
    }
  }

  shouldComponentUpdate = () => false

  componentWillUnmount = () => {
    if (this.state.workspace) {
      this.state.workspace.dispose();
    }
  }

  importFromXml = (xml) => {
    try {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.state.workspace);
      return true;
    } catch (e) {
      if (this.props.onImportXmlError) {
        this.props.onImportXmlError(e);
      }
      return false;
    }
  }

  xmlDidChange = () => {
    if (this.props.xmlDidChange) {
      this.props.xmlDidChange(this.state.xml);
    }
  }

  workspaceDidChange = () => {
    if (this.props.workspaceDidChange) {
      this.props.workspaceDidChange(this.state.workspace);
    }
  }

  toolboxDidUpdate = (toolboxNode) => {
    if (toolboxNode && this.state.workspace) {
      this.state.workspace.updateToolbox(toolboxNode);
    }
  }

  resize = () => {
    Blockly.svgResize(this.state.workspace);
  }

  render = () => {
    // We have to fool Blockly into setting up a toolbox with categories initially;
    // otherwise it will refuse to do so after we inject the real categories into it.
    let dummyToolboxContent;
    if (this.props.toolboxMode === 'CATEGORIES') {
      dummyToolboxContent = (
        <category name="Dummy toolbox" />
      );
    }

    return (
      <div className={this.props.wrapperDivClassName}>
        <xml style={{ display: 'none' }} ref={(dummyToolbox) => { this.dummyToolbox = dummyToolbox; }}>
          {dummyToolboxContent}
        </xml>
        <div
          className={this.props.wrapperDivClassName}
          ref={(editorDiv) => { this.editorDiv = editorDiv; }}
        />
      </div>
    );
  }
}

export default BlocklyWorkspace;
