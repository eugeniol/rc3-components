import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-tomorrow';

export const CodeEditor = ({
  schema: { title: label } = {},
  uiSchema: {
    'ui:options': {
      mode = 'html',
      theme = 'tomorrow',
      width = '100%',
      height = '50vh',
      tabSize = 2,
      showPrintMargin = false
    } = {}
  } = {},
  idSchema: { $id: name } = {},
  onChange,
  onFocus,
  formData: value
}) => (
  <div>
    <label htmlFor={name} className="control-label">
      {label}
    </label>
    <AceEditor
      name={name}
      mode={mode}
      theme={theme}
      value={String(value || '')}
      onChange={value => onChange(value)}
      onFocus={ev => onFocus && onFocus(name, ev)}
      width={width}
      height={height}
      tabSize={tabSize}
      showPrintMargin={showPrintMargin}
      className="form-control code-editor"
    />
  </div>
);

export default CodeEditor;
