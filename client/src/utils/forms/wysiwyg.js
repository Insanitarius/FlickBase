import React, { useState, useEffect } from "react";

import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

///edit
import htmlToDraft from "html-to-draftjs";

const WYSIWYG = (props) => {
  const [editorData, setEditorData] = useState({
    editorState: EditorState.createEmpty(),
  });

  const onEditorStateChange = (editorData) => {
    let HTMLDATA = stateToHTML(editorData.getCurrentContent());

    setEditorData({
      editorState: editorData,
    });

    props.setEditorState(HTMLDATA);
  };

  return (
    <div>
      <Editor
        editorState={editorData.editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onBlur={props.setEditorBlur}
      />
    </div>
  );
};

export default WYSIWYG;
