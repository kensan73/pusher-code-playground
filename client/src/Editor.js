import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

const Editor = ({className, onBeforeChange, codeMirrorOptions, mode, value, header}) => (
    <div className={`code-editor ${className}`}>
        <div className="editor-header">{header}</div>
        <CodeMirror
            value={value}
            options={{
                mode,
                ...codeMirrorOptions
            }}
            onBeforeChange={onBeforeChange}
        />
    </div>
)

export { Editor }
export default Editor