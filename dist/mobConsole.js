function _instanceof (left, right) { if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left) } else { return left instanceof right } }

function _possibleConstructorReturn (self, call) { if (call && (_typeof(call) === 'object' || typeof call === 'function')) { return call } return _assertThisInitialized(self) }

function _assertThisInitialized (self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return self }

function _getPrototypeOf (o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf (o) { return o.__proto__ || Object.getPrototypeOf(o) }; return _getPrototypeOf(o) }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function') } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass) }

function _setPrototypeOf (o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf (o, p) { o.__proto__ = p; return o }; return _setPrototypeOf(o, p) }

function _typeof (obj) { if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

function _classCallCheck (instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

(function () {
  // 创建 dom
  var _i = 1
  var isruning = false
  var win = window
  var keyword = ['textContent', 'attributes', 'childNodes', 'children', 'firstChild', 'firstElementChild', 'lastChild', 'lastElementChild', 'nextSibling', 'ownerDocument', 'parentElement', 'parentNode', 'previousElementSibling', 'previousSibling', 'outerHTML', 'innerHTML', 'innerText', 'outerText', 'enabledPlugin', 'description', 'Plugin', 'plugins', 'type', 'suffixes', 'MimeTypeArray', 'PluginArray', 'MimeType ', 'CSSRuleList', 'navigator', 'screen', 'performance', 'parent', 'self', 'document', 'customElements', 'crypto', 'createImageBitmap', 'clientInformation', 'location', 'locationbar', 'menubar', 'postMessage', 'scrollbars', 'speechSynthesis', 'window', 'frames', 'style', 'constructor', 'nextElementSibling', 'MediaList', 'ownerNode', 'rules', 'parentStyleSheet', 'shadowRoot']

  function creatDom (el) {
    var cN = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ''
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ''
    var html = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ''
    var fn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (els) {}
    var els = document.createElement(el)
    els.className = cN
    els.id = id
    els.innerHTML = html
    fn(els)
    return els
  }

  var Creatdom =
  /* #__PURE__ */
  (function () {
    'use strict';

    function Creatdom () {
      var _this = this

      _classCallCheck(this, Creatdom)

      this.isCanAutoScorll = true // document.body.appendChild(this.Dom)

      this.d = creatDom('div', 'sloth-debug-table')
      var inputdiv = creatDom('div', 'sloth-debug-input')
      var input = creatDom('input')
      input.autocomplete = 'on'
      var span = creatDom('span', 'sendShell', 'sendShell')
      span.innerText = '执行'
      var clear = creatDom('span', 'clear-code')
      clear.innerText = '清空'

      clear.onclick = function () {
        _this.d.innerHTML = ''
        _i = 1
      };

      var loading = creatDom('span', 'sloth-debug-loading', '', '命令执行中...')
      loading.style.display = 'none'

      span.onclick = function () {
        if (input.value === '' || isruning) return
        loading.style.display = 'block'
        isruning = true

        try {
          handleErr.print(input.value + ':')
          /* eslint no-eval: "error" */

          /* eslint-env browser */

          var t = win.eval(input.value)
          handleErr.log(t)
          input.value = ''
          isruning = false
        } catch (e) {
          isruning = false
          loading.style.display = 'none'
          handleErr.error(e.message) // throw new Error(e);
        }

        isruning = false
        loading.style.display = 'none'
      };

      inputdiv.appendChild(input)
      inputdiv.appendChild(span)
      var close = creatDom('span', 'sloth-debug-zhan')
      close.innerText = '展开/收缩'

      close.onclick = function () {
        content.style.height = content.style.height !== '72px' ? '72px' : '50vh'
      }; // 添加全屏展示 半屏展示

      var screenAll = creatDom('span', 'screen-all')
      screenAll.innerText = '全屏/半屏'

      screenAll.onclick = function () {
        content.style.height = content.style.height !== '50vh' ? '50vh' : '99vh'
      };

      var content = creatDom('div', 'sloth-debug-con')
      content.appendChild(this.d)
      content.appendChild(close)
      content.appendChild(clear)
      content.appendChild(screenAll)
      content.appendChild(loading)
      content.appendChild(inputdiv)

      this.d.onscroll = function (e) {
        _this.isScorll()
      };

      document.body.appendChild(content)
      this.deeps = 20
    }

    _createClass(Creatdom, [{
      key: 'isScorll',
      value: function isScorll () {
        if (this.d.scrollHeight - this.d.offsetHeight - this.d.scrollTop > 100) {
          if (this.isCanAutoScorll) {
            console.info('11', this.d.scrollTop, this.d.scrollHeight, this.d.offsetHeight)
            this.isCanAutoScorll = false
          }
        } else {
          if (!this.isCanAutoScorll) {
            this.isCanAutoScorll = true
          }
        }
      }
    }, {
      key: 'creatInnerDom',
      value: function creatInnerDom (type, content) {
        var str = this.creatObjctEles(type, content)
        return this.creatInlineBlock(str)
      }
    }, {
      key: 'creatObjctEles',
      value: function creatObjctEles (type, content) {
        var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
        var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '&nbsp;'
        var str = ''

        switch (type) {
          case 'string':
            str = content
            break;

          case 'number':
            str = content
            break;

          case 'boolean':
            str = content
            break;

          case 'function':
            str = content.toString()
            break;

          case 'object':
            if (Array.isArray(content)) {
              var newContentc = [].concat(content)

              for (var j = 0; j < newContentc.length; j++) {
                if (key < this.deeps) {
                  newContentc[j] = this.creatObjctEles(_typeof(newContentc[j]), newContentc[j], key + 1, s + '&nbsp;')
                }
              }

              str = '[' + newContentc.join(',') + ']'
            } else {
              str = '{<br />' //  console.log(key,s)

              content = JSON.parse(JSON.stringify(content))

              for (var k in content) {
                if (keyword.indexOf(k) > -1) {
                  continue
                }

                if (key < this.deeps && !(k === 'top' && content[k].toString() === '[object Window]')) {
                  var sT = this.creatObjctEles(_typeof(content[k]), content[k], key + 1, s + '&nbsp;')
                  str += ''.concat(s, ' ').concat(k, ':').concat(sT, '<br />')
                } else {
                  // console.log(k,key,s)
                  // console.log(content[k]);
                  str += ''.concat(s, ' ').concat(k, ':').concat(content[k], '<br />')
                }
              }

              str += s + '}'
            }

            break
        } // console.log(str);

        if (typeof str === 'string') {
          str = str.replace(/\n/g, s + '<br />')
        }

        return str
      }
    }, {
      key: 'creatInlineBlock',
      value: function creatInlineBlock (obj) {
        return '<span class="sloth-debug-table-cell">'.concat(obj, '</span>')
      }
    }, {
      key: 'creatLineDom',
      value: function creatLineDom () { // let line = creatDom('div', 'sloth-debug-line', '', '')
      }
    }, {
      key: 'creatLine',
      value: function creatLine () {
        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key]
        }

        var str = "\n      <em class='sloth-table-index'>".concat(_i, '</em>   ').concat(arg.join(' '), '\n    ')
        _i++
        return creatDom('div', 'sloth-debug-line', '', str, function (ele) {
          ele.style.height = '24px'

          ele.ondblclick = function () {
            this.style.height = this.style.height === 'auto' ? '24px' : 'auto'
            console.info('dblClick')
          };
        })
      }
    }, {
      key: 'creatDom',
      value: function creatDom () {
        for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          arg[_key2] = arguments[_key2]
        }

        this.d.appendChild(this.creatLine(arg))

        if (this.isCanAutoScorll) {
          this.d.scrollTop = this.d.scrollHeight - this.d.offsetHeight
        } // return {html:this.d.outerHTML,el:this.d}
      }
    }])

    return Creatdom
  }()) // 处理 信息

  var Con =
  /* #__PURE__ */
  (function (_Creatdom) {
    'use strict';

    _inherits(Con, _Creatdom)

    function Con () {
      _classCallCheck(this, Con)

      return _possibleConstructorReturn(this, _getPrototypeOf(Con).apply(this, arguments))
    }

    _createClass(Con, [{
      key: 'log',
      value: function log () {
        var startT = new Date().getTime()
        var str = []

        for (var i = 0; i < arguments.length; i++) {
          str.push(this.creatInnerDom(_typeof(i < 0 || arguments.length <= i ? undefined : arguments[i]), i < 0 || arguments.length <= i ? undefined : arguments[i]))
        }

        this.creatDom(str)
        var duration = new Date().getTime() - startT + 'ms'
        this.print(duration + '执行完成', new Date().toString())
      }
    }, {
      key: 'print',
      value: function print () {
        var str = []

        for (var i = 0; i < arguments.length; i++) {
          str.push(this.creatInnerDom(_typeof(i < 0 || arguments.length <= i ? undefined : arguments[i]), i < 0 || arguments.length <= i ? undefined : arguments[i]))
        }

        this.creatDom(str)
      }
    }, {
      key: 'warn',
      value: function warn () {
        for (var _len3 = arguments.length, arg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          arg[_key3] = arguments[_key3]
        }

        this.log(arguments)
      }
    }, {
      key: 'error',
      value: function error () {
        for (var _len4 = arguments.length, arg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          arg[_key4] = arguments[_key4]
        }

        this.log(arguments)
      }
    }])

    return Con
  }(Creatdom))

  var styles = "\n  body{\n    padding-bottom: 60px!important;\n  }\n.sloth-debug-con{\n  color:#333;\n  position:fixed;\n  bottom:0;left:0;right:0;\n  height:50vh;\n  max-height:100%;\n  font-family: 'Comic Sans MS','Tahoma';\n  overflow: hidden;\n  z-index:9999;\n}\n.sloth-debug-table{\n  font-family: 'Comic Sans MS','Tahoma';\n  overflow: auto;\n  height:100%;\n  padding-bottom: 60px;\n  box-sizing: border-box;\n  background:rgba(0,0,0,.5)\n}\n.sloth-debug-table-cell{\n  display:inline-block;\n  vertical-align: top;\n}\n.sloth-debug-line{\n  background:rgba(238,238,238,.9);\n  padding:5px;\n  min-height:24px;\n  margin-bottom:5px;\n  overflow-x: auto;\n  font-size: 12px;\n  line-height: 14px;\n}\n.sloth-table-index{\n  color:#999;\n  font-style:normal;\n}\n.sloth-debug-input{\n  position:absolute;\n  bottom:0;\n  left:0;\n  right:0;\n  padding:10px;\n}\n.sloth-debug-input input{\n  width:80%;\n  border:1px #333 solid;\n  padding:3px;\n  height:26px;\n  line-height:26px;\n}\n.sloth-debug-input span{\n  border:1px #333 solid;\n  margin:0 0 0 13px;\n  background:#fff;\n  padding:3px;\n}\n.sloth-debug-zhan{\n  display:block;\n  position:absolute;\n  top:0;\n  right:0;\n  width:75px;\n  text-align:center;\n  height:22px;\n  line-height:22px;\n  background:rgba(0,0,0,.5);\n  color:#fff;\n  cursor:pointer;\n  font-size:12px;\n}\n.clear-code{\n  display:block;\n  position:absolute;\n  top:0;\n  right:75px;\n  width:45px;\n  text-align:center;\n  height:22px;\n  line-height:22px;\n  background:rgba(0,0,0,.5);\n  color:#fff;\n  cursor:pointer;\n  font-size:12px;\n  margin-right:5px;\n}\n.screen-all{\n  display:block;\n  position:absolute;\n  top:0;\n  right: 130px;\n  width: 65px;\n  text-align:center;\n  height:22px;\n  line-height:22px;\n  background:rgba(0,0,0,.5);\n  color:#fff;\n  cursor:pointer;\n  font-size:12px;\n  margin-right:5px;\n}\n.sloth-debug-loading{\n  position:absolute;\n  bottom:70px;left:0;right:0;margin:0 auto;\n  text-align:center;\n  background:rgba(255,255,255,.6)\n}\n"
  var style = creatDom('style')
  style.innerHTML = styles
  document.head.appendChild(style)

  var MobConsole =
  /* #__PURE__ */
  (function (_Con) {
    'use strict';

    _inherits(MobConsole, _Con)

    function MobConsole () {
      _classCallCheck(this, MobConsole)

      return _possibleConstructorReturn(this, _getPrototypeOf(MobConsole).apply(this, arguments))
    }

    _createClass(MobConsole, [{
      key: 'ignore',
      value: function ignore () {
        for (var _len5 = arguments.length, arg = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          arg[_key5] = arguments[_key5]
        }

        for (var i in arg) {
          if (_typeof(arg[i]) === 'object') {
            keyword = keyword.concat(arg[i])
          } else {
            keyword.push(arg[i])
          }
        }
      }
    }])

    return MobConsole
  }(Con))

  var mobConsole = window.mobConsole = window.e = new MobConsole() // let _console = {
  //   log: console.log,
  //   warn: console.warn
  // }

  console.log = function () {
    mobConsole.log.apply(mobConsole, arguments)
  }

  mobConsole.log(decodeURIComponent('%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%AE%80%E6%98%93%E7%9A%84%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7%EF%BC%8C%E4%B8%BA%E4%BA%86%E6%96%B9%E4%BE%BF%E5%BC%80%E5%8F%91%E8%80%85%E5%9C%A8%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%89%93%E5%8D%B0%E6%95%B0%E6%8D%AE%E7%94%A8%EF%BC%8C---%E6%A0%91%E6%87%92%40%E6%97%A0%E5%A3%B0%E7%BC%96%E5%86%99'))
  console.warn = mobConsole.warn

  window.onerror = function () {
    for (var _len6 = arguments.length, arg = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      arg[_key6] = arguments[_key6]
    }

    if (arg[4]) {
      mobConsole.error(arg[4].stack)
    } else {
      mobConsole.error(arg[0])
    }
  }

  return mobConsole
})()
