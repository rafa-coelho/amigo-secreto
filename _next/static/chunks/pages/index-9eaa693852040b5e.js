(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7237)}])},7237:function(e,t,n){"use strict";let r;n.r(t),n.d(t,{default:function(){return w}});var a,o,i=n(5893),s=n(4791),c=n.n(s),l=n(9008),d=n.n(l),u=n(7294);function m(e,t){let n=(0,u.useRef)(!1);(0,u.useEffect)(()=>{n.current?e():n.current=!0},t)}function h(...e){return e.filter(e=>e).join(" ")}function p({text:e,remove:t,disabled:n,className:r}){return u.createElement("span",{className:h("rti--tag",r)},u.createElement("span",null,e),!n&&u.createElement("button",{type:"button",onClick:n=>{n.stopPropagation(),t(e)},"aria-label":`remove ${e}`},"✕"))}!function(e,{insertAt:t}={}){if(!e||typeof document>"u")return;let n=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===t&&n.firstChild?n.insertBefore(r,n.firstChild):n.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}(`.rti--container *{box-sizing:border-box;transition:all .2s ease}.rti--container{--rti-bg: #fff;--rti-border: #ccc;--rti-main: #3182ce;--rti-radius: .375rem;--rti-s: .5rem;--rti-tag: #edf2f7;--rti-tag-remove: #e53e3e;--rti-tag-padding: .15rem .25rem;align-items:center;background:var(--rti-bg);border:1px solid var(--rti-border);border-radius:var(--rti-radius);display:flex;flex-wrap:wrap;gap:var(--rti-s);line-height:1.4;padding:var(--rti-s)}.rti--container:focus-within{border-color:var(--rti-main);box-shadow:var(--rti-main) 0 0 0 1px}.rti--input{border:0;outline:0;font-size:inherit;line-height:inherit;width:50%}.rti--tag{align-items:center;background:var(--rti-tag);border-radius:var(--rti-radius);display:inline-flex;justify-content:center;padding:var(--rti-tag-padding)}.rti--tag button{background:none;border:0;border-radius:50%;cursor:pointer;line-height:inherit;padding:0 var(--rti-s)}.rti--tag button:hover{color:var(--rti-tag-remove)}
`);var b=["Enter"],f=({name:e,placeHolder:t,value:n,onChange:r,onBlur:a,separators:o,disableBackspaceRemove:i,onExisting:s,onRemoved:c,disabled:l,isEditOnRemove:d,beforeAddValidate:f,onKeyUp:g,classNames:_})=>{let[x,v]=(0,u.useState)(n||[]);m(()=>{r&&r(x)},[x]),m(()=>{JSON.stringify(n)!==JSON.stringify(x)&&v(n)},[n]);let N=e=>{v(x.filter(t=>t!==e)),c&&c(e)};return u.createElement("div",{"aria-labelledby":e,className:"rti--container"},x.map(e=>u.createElement(p,{key:e,className:null==_?void 0:_.tag,text:e,remove:N,disabled:l})),u.createElement("input",{className:h("rti--input",null==_?void 0:_.input),type:"text",name:e,placeholder:t,onKeyDown:e=>{e.stopPropagation();let t=e.target.value;if(t||i||!x.length||"Backspace"!==e.key||(e.target.value=d?`${x.at(-1)} `:"",v([...x.slice(0,-1)])),t&&(o||b).includes(e.key)){if(e.preventDefault(),f&&!f(t,x))return;if(x.includes(t)){s&&s(t);return}v([...x,t]),e.target.value=""}},onBlur:a,disabled:l,onKeyUp:g}))},g=n(9647),_=n.n(g),x=n(315);class v{async connect(){return new Promise((e,t)=>{let n=indexedDB.open(this.dbName,this.dbVersion);n.onerror=()=>{t(Error("Erro ao abrir o banco de dados."))},n.onsuccess=t=>{this.db=t.target.result,e()},n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(this.tableName)||t.createObjectStore(this.tableName,{keyPath:"id"})}})}async addEditItem(e){return new Promise((t,n)=>{this.connect().then(()=>{if(!this.db){n(Error("Banco de dados n\xe3o conectado."));return}let r=this.db.transaction([this.tableName],"readwrite").objectStore(this.tableName).put(e);r.onsuccess=()=>{t()},r.onerror=()=>{n(Error("Erro ao adicionar/editar item no banco de dados."))}})})}async getItems(){return new Promise((e,t)=>{this.connect().then(()=>{if(!this.db){t(Error("Banco de dados n\xe3o conectado."));return}let n=this.db.transaction([this.tableName],"readonly").objectStore(this.tableName).getAll();n.onsuccess=t=>{e(t.target.result||[])},n.onerror=()=>{t(Error("Erro ao obter itens do banco de dados."))}})})}async getItemById(e){return new Promise((t,n)=>{this.connect().then(()=>{if(!this.db){n(Error("Banco de dados n\xe3o conectado."));return}let r=this.db.transaction([this.tableName],"readonly").objectStore(this.tableName).get(e);r.onsuccess=e=>{t(e.target.result||null)},r.onerror=()=>{n(Error("Erro ao obter item do banco de dados."))}})})}async deleteItem(e){return new Promise((t,n)=>{this.connect().then(()=>{if(!this.db){n(Error("Banco de dados n\xe3o conectado."));return}let r=this.db.transaction([this.tableName],"readwrite").objectStore(this.tableName).delete(e);r.onsuccess=()=>{t()},r.onerror=()=>{n(Error("Erro ao excluir item do banco de dados."))}})})}constructor(){this.dbName="RcSecretSantaDB",this.dbVersion=1,this.db=null,this.tableName="secretSantas"}}var N={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let j=new Uint8Array(16),y=[];for(let e=0;e<256;++e)y.push((e+256).toString(16).slice(1));var S=function(e,t,n){if(N.randomUUID&&!t&&!e)return N.randomUUID();let a=(e=e||{}).random||(e.rng||function(){if(!r&&!(r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(j)})();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=a[e];return t}return function(e,t=0){return y[e[t+0]]+y[e[t+1]]+y[e[t+2]]+y[e[t+3]]+"-"+y[e[t+4]]+y[e[t+5]]+"-"+y[e[t+6]]+y[e[t+7]]+"-"+y[e[t+8]]+y[e[t+9]]+"-"+y[e[t+10]]+y[e[t+11]]+y[e[t+12]]+y[e[t+13]]+y[e[t+14]]+y[e[t+15]]}(a)},E=e=>{let{title:t,text:n}=e;return(0,i.jsx)("button",{onClick:()=>{navigator.share?navigator.share({title:t,text:n}).then(()=>console.log("Conte\xfado compartilhado com sucesso!")).catch(e=>console.error("Erro ao compartilhar:",e)):console.error("Web Share API n\xe3o \xe9 suportada neste navegador.")},children:t})};function w(){let[e,t]=(0,u.useState)(""),[n,r]=(0,u.useState)([]),[a,o]=(0,u.useState)([]),[s,l]=(0,u.useState)(),[m,h]=(0,u.useState)(0),p=e=>{let t=[],n=[...e];n.sort(()=>Math.random()-.5);for(let e=0;e<n.length;e++){let r=n[e].trim(),a=n[e!=n.length-1?e+1:0].trim(),o=(0,x.P)(r,a);t.push({name:r,hash:o})}return t},b=async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=new v;await n.addEditItem({id:S(),title:e,pairs:t})},g=async()=>{let e=new v;o(await e.getItems())},N=async e=>{let t=new v;await t.deleteItem(e),g()};return(0,u.useEffect)(()=>{0==m&&(g(),t(""),r([]))},[m]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(d(),{children:[(0,i.jsx)("title",{children:"Amigo Secreto"}),(0,i.jsx)("meta",{name:"description",content:"Amigo Secreto"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsxs)("main",{className:"".concat(_().main," ").concat(c().className),children:[0==m&&(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"".concat(_().container),children:[(0,i.jsxs)("div",{className:_().title,children:[(0,i.jsx)("h3",{children:"Amigo Secreto"}),(0,i.jsx)("button",{className:"".concat(_().button," ").concat(_().addButton),onClick:()=>h(1),children:"Criar novo"})]}),a.length>0&&(0,i.jsx)("h4",{children:"Seus sorteios"}),(0,i.jsx)("div",{className:"".concat(_().homeContainer," ").concat(0==a.length?_().emptySecretSantaList:_().secretSantaList),children:0==a.length?"N\xe3o h\xe1 nada aqui":a.map(e=>(0,i.jsxs)("div",{className:_().secretSantaCard,children:[e.title,(0,i.jsx)("br",{}),(0,i.jsxs)("div",{className:_().cardButtonsContainer,children:[(0,i.jsx)("button",{className:_().cardButton,onClick:()=>{l(e),h(2)},children:"Visualizar"}),"|",(0,i.jsx)("button",{className:_().cardButton,onClick:()=>{confirm("Deseja mesmo excluir?")&&N(e.id)},children:"Excluir"})]})]},e.id))})]})}),1==m&&(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("form",{onSubmit:t=>{t.preventDefault(),b(e,p(n)),h(0)},children:(0,i.jsxs)("div",{className:"".concat(_().container),onKeyDown:e=>{"Escape"===e.key&&1==m&&h(0)},children:[(0,i.jsxs)("div",{className:_().title,children:[(0,i.jsx)("h3",{children:"Novo Sorteio"}),(0,i.jsx)("span",{className:_().closeButton,onClick:()=>h(0),children:"\xd7"})]}),(0,i.jsxs)("div",{className:"".concat(_().input_container),children:[(0,i.jsx)("label",{htmlFor:"secretSantaTitle",children:"Nome do sorteio"}),(0,i.jsx)("input",{id:"secretSantaTitle",type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"Titulo do Sorteio",required:!0})]}),(0,i.jsxs)("div",{className:"".concat(_().input_container),children:[(0,i.jsx)("label",{children:"Nomes"}),(0,i.jsx)(f,{value:n,onChange:r,placeHolder:"Adicione os nomes",separators:["Enter",","]}),(0,i.jsx)("small",{children:(0,i.jsx)("em",{children:'Aperte "enter" ou adicione uma v\xedrgurla para novo nome'})})]}),(0,i.jsx)("div",{className:"".concat(_().buttonRow),children:(0,i.jsx)("button",{disabled:n.length<2,className:"".concat(_().button," ").concat(_().addButton),type:"submit",children:"Salvar"})})]})})}),2==m&&s&&(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"".concat(_().container),children:[(0,i.jsxs)("div",{className:_().title,children:[(0,i.jsx)("h3",{children:s.title}),(0,i.jsx)("span",{className:_().closeButton,onClick:()=>h(0),children:"\xd7"})]}),(0,i.jsx)("ul",{className:_().namesList,children:s.pairs.map((e,t)=>(0,i.jsxs)("li",{className:_().pairNameCard,children:[e.name,(0,i.jsx)(E,{title:"Enviar link",text:'Voc\xea foi adicionado ao Amigo Secreto: "'.concat(s.title,'"!\nE aqui est\xe1 o seu link:\nhttp://racoelho.com.br/').concat(e.hash,"\n                          ")})]},t))})]})})]})]})}(a=o||(o={}))[a.Home=0]="Home",a[a.Form=1]="Form",a[a.View=2]="View"},315:function(e,t,n){"use strict";n.d(t,{P:function(){return r},o:function(){return a}});let r=(e,t)=>btoa(unescape(encodeURIComponent("".concat(e.replace(/ /g,"+").trim(),"-").concat(t.replace(/ /g,"+").trim())))),a=e=>{let t=decodeURIComponent(escape(atob(e)));return/(.*)-(.*)/.test(t)?t.replace(/\+/g," ").split("-"):null}},4791:function(e){e.exports={style:{fontFamily:"'__Inter_e66fe9', '__Inter_Fallback_e66fe9'",fontStyle:"normal"},className:"__className_e66fe9"}},9647:function(e){e.exports={main:"Home_main__VkIEL",container:"Home_container__d256j",formContainer:"Home_formContainer__qHEMI",input_container:"Home_input_container__XNuhH",buttonRow:"Home_buttonRow__Nrj5f",button:"Home_button__G93Ef",addButton:"Home_addButton__cy8L5",homeContainer:"Home_homeContainer__h7U1S",emptySecretSantaList:"Home_emptySecretSantaList__vFTO3",title:"Home_title__hYX6j",closeButton:"Home_closeButton__rDX9l",secretSantaList:"Home_secretSantaList__wo9CA",secretSantaCard:"Home_secretSantaCard__Tc0Iy",cardButtonsContainer:"Home_cardButtonsContainer__VJ6Sf",cardButton:"Home_cardButton__UYIBp",namesList:"Home_namesList__RVNbf",pairNameCard:"Home_pairNameCard__TB7t7"}},9008:function(e,t,n){e.exports=n(4764)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);