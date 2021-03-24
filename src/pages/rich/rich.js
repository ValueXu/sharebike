import React, { Component } from "react";
import { Card, Button, Modal } from "antd";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

import draftjs from "draftjs-to-html";

export default class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      showRichText: false,
      contentState: "",
    };
  }

  onEditorChange = (contentState) => {
    this.setState({
      contentState,
    });
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleClearContent = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
    });
  };
  handleGetText = () => {
    this.setState({
      showRichText: true,
    });
  };

  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleClearContent}>
            清空内容
          </Button>
          <Button
            type="primary"
            onClick={this.handleGetText}
            style={{ marginLeft: 20 }}
          >
            获取HTML文本
          </Button>
        </Card>
        <Card title="富文本编辑器" style={{ marginTop: 20 }}>
          <Editor
            editorState={this.state.editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false,
            });
          }}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}
