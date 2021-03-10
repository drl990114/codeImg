import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import 'flygrace/dist/index.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/nord.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/http/http'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/markdown/markdown'

ReactDOM.render(<App />,
  document.getElementById('root')
);
