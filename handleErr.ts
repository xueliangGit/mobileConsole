(function () {

  // 创建 dom
  let _i = 1
  let isruning = false
  let keyword = ['textContent', 'attributes', 'childNodes', 'children', 'firstChild', 'firstElementChild', 'lastChild', 'lastElementChild', 'nextSibling', 'ownerDocument', 'parentElement', 'parentNode', 'previousElementSibling', 'previousSibling', 'outerHTML', 'innerHTML', 'innerText', 'outerText', 'enabledPlugin', 'description', 'Plugin', 'plugins', 'type', 'suffixes', 'MimeTypeArray', 'PluginArray', 'MimeType ', 'CSSRuleList', 'navigator', 'screen', 'performance', 'parent', 'self', 'document', 'customElements', 'crypto', 'createImageBitmap', 'clientInformation', 'location', 'locationbar', 'menubar', 'postMessage', 'scrollbars', 'speechSynthesis', 'window', 'frames', 'style', 'constructor', 'nextElementSibling', 'MediaList', 'ownerNode', 'rules', 'parentStyleSheet'];
  function creatDom(el, cN = '', id = '') {
    let els = document.createElement(el)
    els.className = cN
    els.id = id
    return els
  }
  class Creatdom {
    constructor() {
      //document.body.appendChild(this.Dom)
      this.d = creatDom('div', 'sloth-debug-table')
      let inputdiv = creatDom('div', 'sloth-debug-input');
      let input = creatDom('input')
      input.autocomplete = 'on'
      let span = creatDom('span', 'sendShell', 'sendShell')
      span.innerText = '执行'
      let clear = creatDom('span', 'clear-code')
      clear.innerText = '清空'
      clear.onclick=()=>{
        this.d.innerHTML='';
        _i=1
      }
      span.onclick = function () {
        if (input.value == ''||isruning) return;
        isruning=true
        try {
          let t = eval(input.value);
          input.value=''
          if (t) {
            handleErr.log(t);
          }
          isruning = false
        } catch (e) {
          isruning = false
          throw new Error(e);
        }
        isruning = false
      }
      inputdiv.appendChild(input)
      inputdiv.appendChild(span)
      let close = creatDom('span', 'sloth-debug-zhan')
      close.innerText = '展开/收缩';
      close.onclick = () => {
        content.style.height = content.style.height != '72px' ? '72px' : '60vh'
      }
      let content = creatDom('div', 'sloth-debug-con');
      content.appendChild(this.d);
      content.appendChild(close);
      content.appendChild(clear);
      content.appendChild(inputdiv);
      document.body.appendChild(content);
      this.deeps = 20
    }
    creatInnerDom(type, content) {
      let str = this.creatObjctEles(type, content)
      return this.creatInlineBlock(str);
    }
    creatObjctEles(type, content, key = 0, s = '&nbsp;') {
      let str = ''
      switch (type) {
        case 'string':
          str = content;
          break
        case 'number':
          str = content;
          break
        case 'boolean':
          str = content;
          break
        case 'function':
          str = content.toString();
          break
        case 'object':
          if (Array.isArray(content)) {
            for (let j = 0; j < content.length; j++) {
              if (key < this.deeps) {
                content[j] = this.creatObjctEles(typeof content[j], content[j], key + 1, s + '&nbsp;')
              }
            }
            str = '[' + content.join(',') + ']';
          } else {
            str = '{<br />'
            //  console.log(key,s)
            for (let k in content) {
              if (keyword.indexOf(k) > -1) {
                continue;
              }
              if (key < this.deeps && !(k == 'top' && content[k].toString() == '[object Window]')) {
                let s_t = this.creatObjctEles(typeof content[k], content[k], key + 1, s + '&nbsp;');
                str += `${s} ${k}:${s_t}<br />`;
              } else {
                // console.log(k,key,s)
                // console.log(content[k]);
                str += `${s} ${k}:${content[k]}<br />`;
              }
            }
            str += s + '}'
          }
          break
      }
      // console.log(str);
      if(typeof str =='string'){
        str= str.replace(/\n/g, s + '<br />')
      }
      return str
    }
    creatInlineBlock(obj) {
      return `<span class="sloth-debug-table-cell">${obj}</span>　`;
    }
    creatLine(...arg) {
      let str = `
      <div class='sloth-debug-line' style="height:auto" ondblclick ='this.style.height=this.style.height=="auto"?"28px":"auto"'>
      <em class='sloth-table-index'>${_i}</em>   ${arg.join(' ')}
      </div>
    `;
      _i++
      return str
    }
    creatDom(...arg) {
      let tline = this.creatLine(arg);
      this.d.innerHTML += tline;
      this.d.scrollTop = this.d.scrollHeight - this.d.offsetHeight
      //return {html:this.d.outerHTML,el:this.d}
    }
  }
  // 处理 信息
  class Con extends Creatdom {
    log(...arg) {
      let startT = (new Date()).getTime();
      let str = []
      for (let i = 0; i < arg.length; i++) {
        str.push(this.creatInnerDom(typeof arg[i], arg[i]))
      }
      this.creatDom.apply(this, str);
      let duration = ((new Date()).getTime() - startT) + 'ms';
      this.print(duration + '执行完成',(new Date()).toString())
    }
    print(...arg) {
      let str = []
      for (let i = 0; i < arg.length; i++) {
        str.push(this.creatInnerDom(typeof arg[i], arg[i]))
      }
      this.creatDom.apply(this, str);
    }
    warn(...arg) {
      this.log(arguments)
    }
    error(...arg) {
      this.log(arguments)
    }
  }
  let styles = `
.sloth-debug-con{
  position:fixed;
  bottom:0;left:0;right:0;
  height:500px;
  max-height:50%;
  font-family: 'Comic Sans MS','Tahoma';
  overflow: hidden;
}
.sloth-debug-table{
  font-family: 'Comic Sans MS','Tahoma';
  overflow: auto;
  height:100%;
  padding-bottom: 60px;
  box-sizing: border-box;
  background:rgba(0,0,0,.2)
}
.sloth-debug-table-cell{
  display:inline-block;
  vertical-align: top;
}
.sloth-debug-line{
  background:rgba(238,238,238,.8);
  padding:5px;
  margin-bottom:5px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 14px;
}
.sloth-table-index{
  color:#999;
  font-style:normal;
}
.sloth-debug-input{
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  padding:10px;
}
.sloth-debug-input input{
  width:80%;
  border:1px #333 solid;
  padding:3px;
  height:26px;
  line-height:26px;
}
.sloth-debug-input span{
  border:1px #333 solid;
  margin:0 0 0 13px;
  background:#fff;
}
.sloth-debug-zhan{
  display:block;
  position:absolute;
  top:0;
  right:0;
  width:75px;
  text-align:center;
  height:30px;
  line-height:30px;
  background:rgba(0,0,0,.5);
  color:#fff;
  cursor:pointer;
  font-size:14px;
}
.clear-code{
  display:block;
  position:absolute;
  top:0;
  right:75px;
  width:75px;
  text-align:center;
  height:30px;
  line-height:30px;
  background:rgba(0,0,0,.5);
  color:#fff;
  cursor:pointer;
  font-size:14px;
}
`
  let style = creatDom('style');
  style.innerHTML = styles;
  document.head.appendChild(style);
  class HandleErr extends Con {

  }
  let handleErr = e = window.handleErr=window.e=new HandleErr()
  let _console = {
    log: console.log,
    warn: console.warn,
  }
  console.log = function(...arg){
    handleErr.log(...arg)
  }
  console.warn = handleErr.warn
  window.onerror = function (...arg) {
    handleErr.error(arguments[4].stack)
  }
})()
