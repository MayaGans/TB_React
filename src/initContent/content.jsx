import BlocklyJS from 'blockly/javascript';

import '../blocks/data_colors'
import '../generators/js/data_colors'
import '../blocks/data_double';
import '../generators/js/data_double'
import '../blocks/data_earthquakes';
import '../generators/js/data_earthquakes'
import '../blocks/data_iris';
import '../generators/js/data_iris'
import '../blocks/data_missing';
import '../generators/js/data_missing'
import '../blocks/data_mtcars';
import '../generators/js/data_mtcars'
import '../blocks/data_single';
import '../generators/js/data_single'
import '../blocks/data_toothGrowth';
import '../generators/js/data_toothGrowth'
import '../blocks/data_urlCSV';
import '../generators/js/data_urlCSV'

import '../blocks/plot_bar';
import '../generators/js/plot_bar'
import '../blocks/plot_boxplot';
import '../generators/js/plot_boxplot'
import '../blocks/plot_hist';
import '../generators/js/plot_hist'
import '../blocks/plot_point';
import '../generators/js/plot_point'
import '../blocks/plot_table';
import '../generators/js/plot_table'

import '../blocks/plumbing_join';
import '../generators/js/plumbing_join'
import '../blocks/plumbing_notify';
import '../generators/js/plumbing_notify'

import '../blocks/transform_filter';
import '../generators/js/transform_filter'
import '../blocks/transform_groupby';
import '../generators/js/transform_groupby'
import '../blocks/transform_mutate';
import '../generators/js/transform_mutate'
import '../blocks/transform_select';
import '../generators/js/transform_select'
import '../blocks/transform_sort';
import '../generators/js/transform_sort'
import '../blocks/transform_summarize_item';
import '../blocks/transform_summarize';
import '../generators/js/transform_summarize'
import '../blocks/transform_ungroup';
import '../generators/js/transform_ungroup'

import '../blocks/value_arithmetic';
import '../generators/js/value_arithmetic'
import '../blocks/value_boolean';
import '../generators/js/value_boolean'
import '../blocks/value_column';
import '../generators/js/value_column'
import '../blocks/value_compare';
import '../generators/js/value_compare'
import '../blocks/value_convert_datetime';
import '../generators/js/value_convert_datetime'
import '../blocks/value_convert';
import '../generators/js/value_convert'
import '../blocks/value_datetime';
import '../generators/js/value_datetime'
import '../blocks/value_ifelse';
import '../generators/js/value_ifelse'
import '../blocks/value_logical';
import '../generators/js/value_logical'
import '../blocks/value_negate';
import '../generators/js/value_negate'
import '../blocks/value_not';
import '../generators/js/value_not'
import '../blocks/value_number';
import '../generators/js/value_number'
import '../blocks/value_text';
import '../generators/js/value_text'
import '../blocks/value_type';
import '../generators/js/value_type'

const INITIAL_XML = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

const INITIAL_TOOLBOX_XML = '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">\n'
+' <category name="data" categorystyle="data">\n'
+' <block type="data_colors"></block>\n'
+' <block type="data_double"></block>\n'
+' <block type="data_earthquakes"></block>\n'
+' <block type="data_iris"></block>\n'
+' <block type="data_missing"></block>\n'
+' <block type="data_mtcars"></block>\n'
+' <block type="data_toothGrowth"></block>\n'
+' <block type="data_single"></block>\n'
+' <block type="data_urlCSV"></block>\n'
+' </category>\n'
+' <category name="transform" categorystyle="transform">\n'
+' <block type="transform_filter"></block>\n'
+' <block type="transform_groupBy"></block>\n'
+' <block type="transform_mutate"></block>\n'
+' <block type="transform_select"></block>\n'
+' <block type="transform_sort"></block>\n'
+' <block type="transform_summarize">\n'
+'     <statement name="COLUMN_FUNC_PAIR">\n'
+'       <block type="transform_summarize_item"></block>\n'
+'     </statement>\n'
+' </block>\n'
+' <block type="transform_summarize_item"></block>\n'
+' <block type="transform_ungroup"></block>\n'
+' </category>\n'
+' <category name="plot" categorystyle="plot">\n'
+' <block type="plot_bar"></block>\n'
+' <block type="plot_boxplot"></block>\n'
+' <block type="plot_hist"></block>\n'
+' <block type="plot_point"></block>\n'
+' <block type="plot_table"></block>\n'
+' </category>\n'
+' <category name="plumbing" categorystyle="plumbing">\n'
+' <block type="plumbing_join"></block>\n'
+' <block type="plumbing_notify"></block>\n'
+' </category>\n'
+' <category name="values" categorystyle="values">\n'
+' <block type="value_arithmetic"></block>\n'
+' <block type="value_boolean"></block>\n'
+' <block type="value_column"></block>\n'
+' <block type="value_compare"></block>\n'
+' <block type="value_convert"></block>\n'
+' <block type="value_datetime"></block>\n'
+' <block type="value_ifElse"></block>\n'
+' <block type="value_negate"></block>\n'
+' <block type="value_not"></block>\n'
+' <block type="value_number"></block>\n'
+' <block type="value_logical"></block>\n'
+' <block type="value_text"></block>\n'
+' <block type="value_type"></block>\n'
+' </category>\n'
+ '</xml>';

const INITIAL_TOOLBOX_CATEGORIES = [];

const ConfigFiles = {
  INITIAL_XML,
  INITIAL_TOOLBOX_XML,
  INITIAL_TOOLBOX_CATEGORIES,
};

export default ConfigFiles;
