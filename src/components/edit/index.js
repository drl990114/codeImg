import html2canvas from 'html2canvas'
import { Button, Select } from 'flygrace'
// import AceEditor from "react-ace";

import { Controlled as CodeMirror } from 'react-codemirror2'
// import { useState } from 'react'
import './index.css'
import { useState } from 'react'

export const Edit = (props) => {
    //语法language
    const [language, setLanguage] = useState('xml')
    //输入值codeValue
    const [codeValue, setValue] = useState('<h1>Hi~~~</h1>')
    const handleLanguage = (value) => {
        console.log(value)
        setLanguage(value)
    }

    //保存canvas图片方法 | 参数1:canvas元素,参数2:保存图片的名字
    function downloadCanvasIamge(canvas, name) {
        // 使用toDataURL方法将canvas元素转换被base64编码的URL字符串
        var url = canvas.toDataURL('image/png')
        // 生成一个a元素
        var a = document.createElement('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || '下载图片名称'
        // 将生成的URL设置为a.href属性
        a.href = url

        // 触发a的单击事件
        a.dispatchEvent(event)
    }
    const handleCopy = function (e) {

        var oInput = document.createElement('textarea');
        oInput.value = codeValue;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy");  // 执行浏览器复制命令
        oInput.style.display='none';
    }

    const handleCut = function () {

        const y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        const img = document.querySelector('#img')
        html2canvas(img, {
        }).then((canvas) => {

            window.scrollTo(0, y);
            downloadCanvasIamge(canvas, '图片名称')
        }).catch(() => [
            console.log('shibai')
        ])

    }


    return (
        <div id='box'>
            <div className='use'>
                <div className='select'>
                    <Select style={{ margin: 0, padding: 0 }} placeholder={language} onChange={(value) => handleLanguage(value)}>
                        <Select.Option value="javascript" />
                        <Select.Option value="css" />
                        <Select.Option value="htmlmixed" />
                        <Select.Option value="go" />
                        <Select.Option value="sql" />
                        <Select.Option value="vue" />
                        <Select.Option value="jsx" />
                        <Select.Option value="python" />
                        <Select.Option value="http" />
                    </Select>
                </div>
                <Button className='btn' onClick={() => handleCopy()}>点击复制</Button>
                <Button className='btn' onClick={() => handleCut()}>点击截图</Button>

            </div>

            <div id='img' >
                <div className='edit-header'>
                    <ul className='edit-header-ul'>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <CodeMirror
                    id='textarea'
                    value={codeValue}
                    options={{
                        mode: language,
                        theme: 'nord',
                        lineNumbers: false,
                        matchBrackets: true,
                    }}
                    onBeforeChange={(editor, data, value) => setValue(value)}
                />
            </div>
            <br />

        </div>

    )

}
