(this["webpackJsonpthunder-chat"]=this["webpackJsonpthunder-chat"]||[]).push([[0],{17:function(e,t,n){e.exports=n(42)},22:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(12),s=n.n(c),r=(n(22),n(13)),i=n(14),l=n(2),u=n(16),d=n(15),h=function(e){return o.a.createElement("div",{className:"message-container",style:{"padding-top":"10px"}},o.a.createElement("div",{style:{"font-weight":"bold"}},"You:"),o.a.createElement("div",null,e.message))},m=function(e){return o.a.createElement("div",{className:"chat-box"},o.a.createElement("input",{id:"chat",type:"text",placeholder:"Type a Message",onKeyDown:e.accept}))},g=function(e){return o.a.createElement("div",{className:"message-box"},e.messages)},p="ws://6c3ce43b5086.ngrok.io",v=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={message:[]},n.ws=new WebSocket(p),n.handleAccept=n.handleAccept.bind(Object(l.a)(n)),n.onPressEnter=n.onPressEnter.bind(Object(l.a)(n)),n}return Object(i.a)(a,[{key:"onPressEnter",value:function(e){this.handlePost(e),this.updateState(e)}},{key:"updateState",value:function(e){var t=this.state.message;t.push(e),this.setState({message:t})}},{key:"handlePost",value:function(e){n(23).post("http://eaccb35115a3.ngrok.io/postMessage",{text:e}).then((function(e){console.log(e.data)})).catch((function(e){console.log("Error",e)}))}},{key:"componentDidMount",value:function(){var e=this;this.ws.onopen=function(){console.log("connected")},this.ws.onmessage=function(t){var n=JSON.parse(t.data);e.updateState(n.text)},this.ws.onclose=function(){console.log("disconnected"),e.setState({ws:new WebSocket(p)})}}},{key:"handleAccept",value:function(e){if(console.log("Handle Accept Invoked."),"Enter"===e.key){var t={text:e.target.value};this.ws.send(JSON.stringify(t)),this.onPressEnter(e.target.value)}}},{key:"render",value:function(){var e=this.state.message.map((function(e){return o.a.createElement(h,{message:e})}));return o.a.createElement("div",{className:"container-flex"},o.a.createElement("div",{className:"container text-green border-thick-green border-round-50"},o.a.createElement(g,{messages:e}),o.a.createElement(m,{accept:this.handleAccept})))}}]),a}(a.Component);n(41);var f=function(){return document.body.style.background="#000000",o.a.createElement(v,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.4ac493f4.chunk.js.map