import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GeneratedCode from "./textArea";
import BlocklyArea from "./blocklyArea";
import PlayIcon from "@material-ui/icons/PlayArrow";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import BlocklyJS from 'blockly/javascript';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const StyledTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8"
  }
})(Tabs);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4)
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  padding: {
    padding: theme.spacing(0.5)
  },
  demo2: {
    backgroundColor: "white"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function ScrollableTabsButtonAuto() {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateCode = () => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    console.log(code);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo2}>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Blocks" {...a11yProps(0)} />
          <StyledTab label="Text" {...a11yProps(1)} />
          <Tooltip disableFocusListener title="Run Code">
            <IconButton size="medium">
              <PlayIcon onClick={generateCode}/>
            </IconButton>
          </Tooltip>
        </StyledTabs>
      </div>
      <TabPanel value={value} index={0}>
        <BlocklyArea />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GeneratedCode />
      </TabPanel>
    </div>
  );
}
