import html2canvas from 'html2canvas'
import { Button, Select } from 'flygrace'
import { Controlled as CodeMirror } from 'react-codemirror2'
import './index.css'
import { useState } from 'react'

export const Edit = (props) => {
    const [language, setLanguage] = useState('xml')    //语法language
    const [codeValue, setValue] = useState('<h1>Hi~~~</h1>')    //输入值codeValue
    const [imgborder, setBorder] = useState(10)
    const [fontsize, setFontSize] = useState(16)
    const [bordercolor, setBorderColor] = useState('#97a2ac')
    const handleLanguage = (value) => {
        console.log(value)
        setLanguage(value)
    }

    function handleBorder(e) {
        setBorder(e.target.value)
        let img = document.getElementById('img')
        img.style.padding = `${e.target.value}px`
    }
    //修改编辑区字体大小的回调
    function handleFontSize(e) {
        setFontSize(e.target.value)
        let codeFontSize = document.getElementsByClassName('CodeMirror-sizer')
        codeFontSize[0].style.fontSize = `${e.target.value}px`
        // codeFontSize[0].style.cssText = `font-size =${e.target.value}px`

    }
    //修改边框颜色的回调
    function handleColor(e) {
        setBorderColor(e.target.value)
        let img = document.getElementById('img')
        img.style.backgroundColor = e.target.value
    }

    /**保存canvas图片方法 
     * @param :canvas元素
     * @param :图片名称
     */
    function downloadCanvasIamge(canvas, name) {
        // 生成一个a元素
        let a = document.createElement('a')
        // 创建一个单击事件
        let event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || '下载图片名称'
        // 使用toDataURL方法将canvas元素转换被base64编码的URL字符串
        a.href = canvas.toDataURL()
        // 触发a的单击事件
        a.dispatchEvent(event)
    }
    const handleCopy = function (e) {

        let oInput = document.createElement('textarea');
        oInput.value = codeValue;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy");  // 执行浏览器复制命令
        oInput.style.display = 'none';
    }

    //点击截图的回调
    const handleCut = function () {
        let timer = null
        return function () {

            let cut = () => {
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
                    console.log('失败')
                ])
            }
            clearTimeout(timer)
           timer = setTimeout(cut,100) 
        }()
    }


    return (
        <div id='box'>
            <div className='use'>
                <div className="controls">
                    <label >边框:</label>
                    <input className='input' type="range" name="imgborder" min="5" max="100" value={imgborder} data-sizing="px" onChange={handleBorder} />

                    <label >字体大小:</label>
                    <input className='input' type="range" name="fontsize" min="5" max="30" value={fontsize} data-sizing="px" onChange={handleFontSize} />

                    <label >边框颜色:</label>
                    <input className='input' type="color" name="bordercolor" value={bordercolor} onChange={handleColor} />
                    <br />

                </div>
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
                        <Select.Option value="markdown" />
                    </Select>
                    <Button className='btn' onClick={() => handleCopy()}>复制文本</Button>
                    <Button className='btn' onClick={() => handleCut()}>截图</Button>
                </div>
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
