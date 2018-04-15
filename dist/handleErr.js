var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function () {
    // 创建 dom
    var _i = 1;
    var isruning = false;
    var keyword = ['textContent', 'attributes', 'childNodes', 'children', 'firstChild', 'firstElementChild', 'lastChild', 'lastElementChild', 'nextSibling', 'ownerDocument', 'parentElement', 'parentNode', 'previousElementSibling', 'previousSibling', 'outerHTML', 'innerHTML', 'innerText', 'outerText', 'enabledPlugin', 'description', 'Plugin', 'plugins', 'type', 'suffixes', 'MimeTypeArray', 'PluginArray', 'MimeType ', 'CSSRuleList', 'navigator', 'screen', 'performance', 'parent', 'self', 'document', 'customElements', 'crypto', 'createImageBitmap', 'clientInformation', 'location', 'locationbar', 'menubar', 'postMessage', 'scrollbars', 'speechSynthesis', 'window', 'frames', 'style', 'constructor', 'nextElementSibling', 'MediaList', 'ownerNode', 'rules', 'parentStyleSheet', 'shadowRoot'];
    function creatDom(el, cN, id, html, fn) {
        if (cN === void 0) { cN = ''; }
        if (id === void 0) { id = ''; }
        if (html === void 0) { html = ''; }
        if (fn === void 0) { fn = function (els) { }; }
        var els = document.createElement(el);
        els.className = cN;
        els.id = id;
        els.innerHTML = html;
        fn(els);
        return els;
    }
    var Creatdom = /** @class */ (function () {
        function Creatdom() {
            var _this = this;
            //document.body.appendChild(this.Dom)
            this.d = creatDom('div', 'sloth-debug-table');
            var inputdiv = creatDom('div', 'sloth-debug-input');
            var input = creatDom('input');
            input.autocomplete = 'on';
            var span = creatDom('span', 'sendShell', 'sendShell');
            span.innerText = '执行';
            var clear = creatDom('span', 'clear-code');
            clear.innerText = '清空';
            clear.onclick = function () {
                _this.d.innerHTML = '';
                _i = 1;
            };
            var loading = creatDom('span', 'sloth-debug-loading', '', '命令执行中...');
            loading.style.display = 'none';
            span.onclick = function () {
                if (input.value == '' || isruning)
                    return;
                loading.style.display = 'block';
                isruning = true;
                try {
                    handleErr.print(input.value + ":");
                    var t = window.eval(input.value);
                    handleErr.log(t);
                    input.value = '';
                    isruning = false;
                }
                catch (e) {
                    isruning = false;
                    loading.style.display = 'none';
                    handleErr.error(e.message);
                    // throw new Error(e);
                }
                isruning = false;
                loading.style.display = 'none';
            };
            inputdiv.appendChild(input);
            inputdiv.appendChild(span);
            var close = creatDom('span', 'sloth-debug-zhan');
            close.innerText = '展开/收缩';
            close.onclick = function () {
                content.style.height = content.style.height != '72px' ? '72px' : '60vh';
            };
            var content = creatDom('div', 'sloth-debug-con');
            content.appendChild(this.d);
            content.appendChild(close);
            content.appendChild(clear);
            content.appendChild(loading);
            content.appendChild(inputdiv);
            document.body.appendChild(content);
            this.deeps = 20;
        }
        Creatdom.prototype.creatInnerDom = function (type, content) {
            var str = this.creatObjctEles(type, content);
            return this.creatInlineBlock(str);
        };
        Creatdom.prototype.creatObjctEles = function (type, content, key, s) {
            if (key === void 0) { key = 0; }
            if (s === void 0) { s = '&nbsp;'; }
            var str = '';
            switch (type) {
                case 'string':
                    str = content;
                    break;
                case 'number':
                    str = content;
                    break;
                case 'boolean':
                    str = content;
                    break;
                case 'function':
                    str = content.toString();
                    break;
                case 'object':
                    if (Array.isArray(content)) {
                        for (var j = 0; j < content.length; j++) {
                            if (key < this.deeps) {
                                content[j] = this.creatObjctEles(typeof content[j], content[j], key + 1, s + '&nbsp;');
                            }
                        }
                        str = '[' + content.join(',') + ']';
                    }
                    else {
                        str = '{<br />';
                        //  console.log(key,s)
                        for (var k in content) {
                            if (keyword.indexOf(k) > -1) {
                                continue;
                            }
                            if (key < this.deeps && !(k == 'top' && content[k].toString() == '[object Window]')) {
                                var s_t = this.creatObjctEles(typeof content[k], content[k], key + 1, s + '&nbsp;');
                                str += s + " " + k + ":" + s_t + "<br />";
                            }
                            else {
                                // console.log(k,key,s)
                                // console.log(content[k]);
                                str += s + " " + k + ":" + content[k] + "<br />";
                            }
                        }
                        str += s + '}';
                    }
                    break;
            }
            // console.log(str);
            if (typeof str == 'string') {
                str = str.replace(/\n/g, s + '<br />');
            }
            return str;
        };
        Creatdom.prototype.creatInlineBlock = function (obj) {
            return "<span class=\"sloth-debug-table-cell\">" + obj + "</span>\u3000";
        };
        Creatdom.prototype.creatLineDom = function () {
            var line = creatDom('div', 'sloth-debug-line', '', '');
            return;
        };
        Creatdom.prototype.creatLine = function () {
            var arg = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                arg[_a] = arguments[_a];
            }
            var str = "\n      <em class='sloth-table-index'>" + _i + "</em>   " + arg.join(' ') + "\n    ";
            _i++;
            return creatDom('div', 'sloth-debug-line', '', str, function (ele) { ele.style.height = '24px'; ele.ondblclick = function () { this.style.height = this.style.height == "auto" ? "24px" : "auto"; }; });
        };
        Creatdom.prototype.creatDom = function () {
            var arg = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                arg[_a] = arguments[_a];
            }
            this.d.appendChild(this.creatLine(arg));
            this.d.scrollTop = this.d.scrollHeight - this.d.offsetHeight;
            //return {html:this.d.outerHTML,el:this.d}
        };
        return Creatdom;
    }());
    // 处理 信息
    var Con = /** @class */ (function (_super) {
        __extends(Con, _super);
        function Con() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Con.prototype.log = function () {
            var arg = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                arg[_a] = arguments[_a];
            }
            var startT = (new Date()).getTime();
            var str = [];
            for (var i = 0; i < arg.length; i++) {
                str.push(this.creatInnerDom(typeof arg[i], arg[i]));
            }
            this.creatDom.apply(this, str);
            var duration = ((new Date()).getTime() - startT) + 'ms';
            this.print(duration + '执行完成', (new Date()).toString());
        };
        Con.prototype.print = function () {
            var arg = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                arg[_a] = arguments[_a];
            }
            var str = [];
            for (var i = 0; i < arg.length; i++) {
                str.push(this.creatInnerDom(typeof arg[i], arg[i]));
            }
            this.creatDom.apply(this, str);
        };
        Con.prototype.warn = function () {
            var arg = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                arg[_a] = arguments[_a];
            }
            this.log(arguments);
        };
        Con.prototype.error = function () {
            var arg = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                arg[_a] = arguments[_a];
            }
            this.log(arguments);
        };
        return Con;
    }(Creatdom));
    var styles = "\n  body{\n    padding-bottom: 60px!important;\n  }\n.sloth-debug-con{\n  position:fixed;\n  bottom:0;left:0;right:0;\n  height:500px;\n  max-height:50%;\n  font-family: 'Comic Sans MS','Tahoma';\n  overflow: hidden;\n  z-index:9999;\n}\n.sloth-debug-table{\n  font-family: 'Comic Sans MS','Tahoma';\n  overflow: auto;\n  height:100%;\n  padding-bottom: 60px;\n  box-sizing: border-box;\n  background:rgba(0,0,0,.5)\n}\n.sloth-debug-table-cell{\n  display:inline-block;\n  vertical-align: top;\n}\n.sloth-debug-line{\n  background:rgba(238,238,238,.9);\n  padding:5px;\n  margin-bottom:5px;\n  overflow-x: auto;\n  font-size: 12px;\n  line-height: 14px;\n}\n.sloth-table-index{\n  color:#999;\n  font-style:normal;\n}\n.sloth-debug-input{\n  position:absolute;\n  bottom:0;\n  left:0;\n  right:0;\n  padding:10px;\n}\n.sloth-debug-input input{\n  width:80%;\n  border:1px #333 solid;\n  padding:3px;\n  height:26px;\n  line-height:26px;\n}\n.sloth-debug-input span{\n  border:1px #333 solid;\n  margin:0 0 0 13px;\n  background:#fff;\n  padding:3px;\n}\n.sloth-debug-zhan{\n  display:block;\n  position:absolute;\n  top:0;\n  right:0;\n  width:75px;\n  text-align:center;\n  height:22px;\n  line-height:22px;\n  background:rgba(0,0,0,.5);\n  color:#fff;\n  cursor:pointer;\n  font-size:12px;\n}\n.clear-code{\n  display:block;\n  position:absolute;\n  top:0;\n  right:75px;\n  width:45px;\n  text-align:center;\n  height:22px;\n  line-height:22px;\n  background:rgba(0,0,0,.5);\n  color:#fff;\n  cursor:pointer;\n  font-size:12px;\n  margin-right:5px;\n}\n.sloth-debug-loading{\n  position:absolute;\n  bottom:70px;left:0;right:0;margin:0 auto;\n  text-align:center;\n  background:rgba(255,255,255,.6)\n}\n";
    var style = creatDom('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
    var HandleErr = /** @class */ (function (_super) {
        __extends(HandleErr, _super);
        function HandleErr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HandleErr.prototype.ignore = function () {
            var arg = [];
            for (var _a = 0; _a < arguments.length; _a++) {
                arg[_a] = arguments[_a];
            }
            for (var i in arg) {
                if (typeof arg[i] === 'object') {
                    keyword = keyword.concat(arg[i]);
                }
                else {
                    keyword.push(arg[i]);
                }
            }
        };
        return HandleErr;
    }(Con));
    var handleErr = e = window.handleErr = window.e = new HandleErr();
    var _console = {
        log: console.log,
        warn: console.warn
    };
    console.log = function () {
        var arg = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            arg[_a] = arguments[_a];
        }
        handleErr.log.apply(handleErr, arg);
    };
    handleErr.log(decodeURIComponent('%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%AE%80%E6%98%93%E7%9A%84%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7%EF%BC%8C%E4%B8%BA%E4%BA%86%E6%96%B9%E4%BE%BF%E5%BC%80%E5%8F%91%E8%80%85%E5%9C%A8%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%89%93%E5%8D%B0%E6%95%B0%E6%8D%AE%E7%94%A8%EF%BC%8C---%E6%A0%91%E6%87%92%40%E6%97%A0%E5%A3%B0%E7%BC%96%E5%86%99'));
    console.warn = handleErr.warn;
    window.onerror = function () {
        var arg = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            arg[_a] = arguments[_a];
        }
        if (arg[4]) {
            handleErr.error(arg[4].stack);
        }
        else {
            handleErr.error(arg[0]);
        }
    };
})();
