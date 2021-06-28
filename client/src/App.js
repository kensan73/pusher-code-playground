import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";

import Editor from './Editor'

import "./App.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      html: "",
      css: "",
      js: ""
    };

    // this.pusher = new Pusher("18160601861a89d7f8f7", {
    //   cluster: "eu",
    //   forceTLS: true
    // });

    // this.channel = this.pusher.subscribe("editor");
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid()
    });

    // this.channel.bind("text-update", data => {
    //   const { id } = this.state;
    //   if (data.id === id) return;
    //
    //   this.setState({
    //     html: data.html,
    //     css: data.css,
    //     js: data.js
    //   });
    // });
  }

  syncUpdates = () => {
    // const data = { ...this.state };
    //
    // axios
    //   .post("http://localhost:5000/update-editor", data)
    //   .catch(console.error);
  };

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true
    };

    return (
      <div className="App">
        <section className="playground">
          <Editor className='html-code' codeMirrorOptions={codeMirrorOptions} header='HTML' mode='htmlmixed' onBeforeChange={(editor, data, html) => {
            this.setState({ html }, () => this.syncUpdates());
          }} value={html} />
          <Editor className='css-code' codeMirrorOptions={codeMirrorOptions} header='CSS' onBeforeChange={(editor, data, css) => {
            this.setState({ css }, () => this.syncUpdates());
          }} mode='css' value={css} />
          <Editor className='js-code' codeMirrorOptions={codeMirrorOptions} header='JavaScript'               onBeforeChange={(editor, data, js) => {
            this.setState({ js }, () => this.syncUpdates());
          }} mode='javascript' value={js} />
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
      </div>
    );
  }
}

export default App;
