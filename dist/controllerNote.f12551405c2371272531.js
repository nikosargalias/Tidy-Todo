(()=>{var t={5042:(t,e,n)=>{"use strict";n(9826),n(4747),n(6699),n(2023),n(7042),n(4553),n(561);var s=function(t){var e=localStorage.getItem("lists"),n=JSON.parse(e);try{return n||[]}catch(t){return[]}}();function o(t,e){var n=JSON.stringify(e);localStorage.setItem(t,n)}const i=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.title=e,this.todos=[],this.notes="",this.id=n,this.timeCreated=(new Date).getTime(),this.timeLastEdited=this.timeCreated,this.numOfTodosCreated=0};var a=n(4586),d=n(381);n(2222),n(1249);var c=n(381);window.addEventListener("DOMContentLoaded",(function(){var t={pageTitle:document.querySelector("#todoListName"),listTextArea:document.querySelector("#listTextArea"),addTodoForm:document.querySelector("#addTodoForm"),todosList:document.querySelector("#listContainer"),lastUpdatedNotice:document.querySelector("#updatedAtNotice"),deleteListButton:document.querySelector("#deleteList"),todosLengthMessage:document.querySelector("#todoLengthMessage")},e=function(){function t(t){s.push(t),o("lists",s)}function e(t){t.timeLastEdited=d()}return{createNewList:function(e,n){var s=new i(e,(0,a.Z)());return t(s),s},deleteList:function(t){var e=s.findIndex((function(e){return e.id===t}));s.splice(e,1),o("lists",s)},addTodoToList:function(t,n){var i=s.find((function(e){return e.id===t}));i.numOfTodosCreated+=1,i.todos.push({id:i.numOfTodosCreated,text:n,isCompleted:!1}),e(i),o("lists",s)},saveListToListDatabase:t,deleteTodoFromList:function(t,n){var i=s.find((function(e){return t===e.id})),a=i.todos.findIndex((function(t){return n==t.id}));i.todos.splice(a,1),e(i),o("lists",s)},sortByDateLastEdited:function(t){t.sort((function(t,e){return e.timeLastEdited<t.timeLastEdited?-1:1}))},sortByTimeCreated:function(t){t.sort((function(t,e){return e.timeCreated<t.timeCreated?-1:1}))},updateListNotes:function(t,n){t.notes=n,e(t),o("lists",s)},updateTodoText:function(t,n,i){var a=s.find((function(e){return e.id==t}));a.todos.find((function(t){return t.id==n})).text=i,e(a),o("lists",s)},updateListTitle:function(t,n){var i=s.find((function(e){return e.id==t}));i.title=n,e(i),o("lists",s)},updateIsCompleted:function(t,n,i){var a=s.find((function(e){return e.id==t}));a.todos.find((function(t){return t.id==n})).isCompleted=i,e(a),o("lists",s)}}}(),n=e.updateIsCompleted,r=e.updateListTitle,l=e.updateTodoText,u=e.updateListNotes,m=(e.sortByDateLastEdited,e.sortByTimeCreated,e.deleteTodoFromList),f=e.addTodoToList,j=(e.createNewList,e.deleteList),h=(e.saveListToListDatabase,function(){function t(t,e){e.append(t)}function e(t){var e=document.createElement("p");e.textContent="No Tidy Tody Lists To Show!",e.classList.add("empty-message"),t.append(e)}function n(t){var e=document.createElement("div");return e.innerHTML='<span class="list-item" id="'.concat(t.id,'">\n                            <a class="listTitle list-item__title" id="').concat(t.id,"\" href='./note-edit-page.html#").concat(t.id,"'>").concat(t.title,'</a>\n                            <p class="list-item__subtitle">Last edited ').concat(c(t.timeLastEdited).fromNow(),"</p>\n                        </span>"),e.children[0]}return{createNewElementForList:n,renderElement:t,createButton:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.className,n=t.idName,s=t.textContent;try{document.querySelector("#".concat(n)).remove()}finally{var o=document.createElement("div");return o.innerHTML='<button class="'.concat(e,'" id="').concat(n,'"> ').concat(s," </button>"),o.children[0]}},createElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.tag,n=t.type,s=t.className,o=t.idName,i=t.textContent,a=t.rel;if(document.getElementById("".concat(o)))throw new Error("ID is already assigned to existing element");var d=document.createElement("div");return d.innerHTML="<\n            <".concat(e,' type="').concat(n,'" class="').concat(s,'" rel="').concat(a,'" id="').concat(o,'">').concat(i,"</").concat(e||"",">\n        >"),d.children[0]},createTodoListElement:function(t,e,n,s){try{document.getElementById("todoList".concat(e)).remove()}catch(t){}finally{var o=document.createElement("div");return o.innerHTML='<ul id="todoList'.concat(e,'"></ul>'),o.children[0].innerHTML+='<li id="todo_'.concat(t.id,'">').concat(t.text,"</li>"),o.children[0]}},createForm:function(t){var e=document.createElement("div");return e.innerHTML='<form id="quickEditForm_'.concat(t.id,'" class="actions">\n                            <input name="todo_').concat(t.id,'" placeholder="Todo Text" class="input" required>\n                            <button class="button">Add Todo</button>\n                        </form>\n                            '),e.children[0]},renderListsToDom:function(s,o){console.log(s.length),s.length>0?(o.innerHTML="",s.map((function(t){return n(t)})).forEach((function(e){t(e,o)}))):e(o)},removeElements:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach((function(t){t.remove()}))},createListEditElements:function(t){var e=t.todos.length>0?"You have ".concat(t.todos.length," Tidy Todos"):"You don't have any Tidy Todos!",n=document.createElement("div");return n.innerHTML='\n            <span id="spanList'.concat(t.id,'" class="actions list-item"> \n                <details id="quickEdit').concat(t.id,'" name="listDetails" class="actions__container">\n                    <summary class="actions list-item__title">').concat(t.title,' - Quick Edit</summary>\n                    <p class="empty-message" id="todoLengthNotice').concat(t.id,'">').concat(e,'</p>\n                    <form id="addTodoForm').concat(t.id,'" class="form">\n                        <input class="input" required>\n                        <button class="button">Add Todo</button>\n                    </form>\n                </details>\n                <input type="checkbox" class="listCheckbox checkbox" id="checkbox').concat(t.id,'">\n                <button id="deleteList').concat(t.id,'" class="small_button small_button_text">Remove List</button>\n                <p class="list-item__subtitle" id="lastEdited').concat(t.id,'">Last edited ').concat(c(t.timeLastEdited).fromNow(),"</p>\n            </span>"),t.todos.forEach((function(t){n.children[0].children[0].innerHTML+='\n                <div class="list-item">\n                    <span value="'.concat(t.text,'" class="list-item__title">').concat(t.text,'</span>\n                    <button id="deleteTodo').concat(t.id,'" class="small_button small_button_text">Remove Todo</button>\n                </div>')})),n.children[0]},updateTextContent:function(t,e){t.textContent=e},updateLastEditedRender:function(t,e){var n=c(e).fromNow();t.textContent="Last edited ".concat(n)},createTodoElements:function(t){return t.todos.map((function(t){return{html:'\n                <div class="list-item_2" id="todoList'.concat(t.id,'">\n                    <span class="list-item__container_2">\n                        <input id="checkbox_').concat(t.id,'" class="checkbox" type="checkbox">\n                        <p id="editTodo_').concat(t.id,'" class="list-item__title" contenteditable="true">').concat(t.text,' \n                        </p>\n                    </span>\n                    <button id="deleteTodo').concat(t.id,'" class="small_button small_button_text">Remove Todo</button>\n                </div>\n                '),id:t.id,isCompleted:t.isCompleted}}))},clearElement:function(t){t.innerHTML=""},replaceElement:function(t,e){t.replaceWith(e)},createRemoveListConfirmation:function(t){var e=document.createElement("div");return e.innerHTML='\n            <div id="removeListConfirmation'.concat(t,'">\n                <p class="simple-message">Are you sure you want to remove this list?</p>\n                <button id="confirmRemoveListButton').concat(t,'" class="button">Yes</button>\n                <button id="cancelRemoveListButton').concat(t,'" class="button">No</button>\n            </div>'),e},createEmptyListMessage:function(){var t=document.createElement("p");return t.textContent="No Tidy Tody Lists To Edit!",t.classList.add("empty-message"),t},renderEmptyListMessage:e,renderTodosLengthMessage:function(t,e){var n=t.todos.length>0?"You have ".concat(t.todos.length," Tidy Todos"):"You don't have any Tidy Todos!";e.textContent=n}}}()),p=h.renderTodosLengthMessage,v=h.createRemoveListConfirmation,L=h.replaceElement,g=h.clearElement,T=h.createTodoElements,b=h.updateLastEditedRender,y=h.updateTextContent,E=h.removeElements,x=(h.createListEditElements,h.createForm,h.createTodoListElement,h.createEditTodosShortcut,h.createCheckbox,h.createDeleteButton,h.createNewElementForList,h.renderElement,h.createButton,h.addCheckboxesToListElements,h.addDetailsToListElements,h.createElement,h.renderEditListElements,h.renderListsToDom,location.hash.substring(1)),k=s.find((function(t){return t.id===x}));function C(t){j(k.id),location.assign("./index.html")}function _(e){document.querySelector("#removeListConfirmation".concat(k.id)).replaceWith(t.deleteListButton)}function w(){var e=T(k);console.log(e),e.forEach((function(e){t.todosList.innerHTML+=e.html})),console.log(k),k.todos.forEach((function(t){document.querySelector("#checkbox_".concat(t.id)).checked=t.isCompleted}))}y(t.pageTitle,k.title||"Unnamed List"),y(t.listTextArea,k.notes),b(t.lastUpdatedNotice,k.timeLastEdited),t.pageTitle.addEventListener("input",(function(e){var n=e.target.textContent;r(k.id,n),y(t.pageTitle,n),b(t.lastUpdatedNotice,k.timeLastEdited)})),t.listTextArea.addEventListener("input",(function(e){var n=e.target.value;u(k,n),b(t.lastUpdatedNotice,k.timeLastEdited)})),t.todosList.addEventListener("input",(function(t){if(t.target.id.includes("checkbox")){var e=t.target.checked,s=t.target.id.slice(9);n(k.id,s,e)}else{var o=t.target.id.slice(9),i=t.target.textContent;l(k.id,o,i)}})),t.todosList.addEventListener("click",(function(e){if(e.target.id.includes("deleteTodo")){var n=e.target.id.slice(10);m(x,n),E(document.querySelector("#todoList".concat(n))),b(t.lastUpdatedNotice,k.timeLastEdited),p(k,t.todosLengthMessage)}})),t.addTodoForm.addEventListener("submit",(function(e){e.preventDefault();var n=e.target.elements[0].value;f(k.id,n),g(t.todosList),e.target.elements[0].value="",w(),b(t.lastUpdatedNotice,k.timeLastEdited),p(k,t.todosLengthMessage)})),t.deleteListButton.addEventListener("click",(function(t){t.target;var e=v(k.id);L(t.target,e),document.querySelector("#confirmRemoveListButton".concat(k.id)).addEventListener("click",C),document.querySelector("#cancelRemoveListButton".concat(k.id)).addEventListener("click",_)})),p(k,t.todosLengthMessage),w()}))},6700:(t,e,n)=>{var s={"./af":2786,"./af.js":2786,"./ar":867,"./ar-dz":4130,"./ar-dz.js":4130,"./ar-kw":6737,"./ar-kw.js":6737,"./ar-ly":6440,"./ar-ly.js":6440,"./ar-ma":7702,"./ar-ma.js":7702,"./ar-sa":6040,"./ar-sa.js":6040,"./ar-tn":7100,"./ar-tn.js":7100,"./ar.js":867,"./az":1083,"./az.js":1083,"./be":9808,"./be.js":9808,"./bg":8338,"./bg.js":8338,"./bm":7438,"./bm.js":7438,"./bn":8905,"./bn-bd":6225,"./bn-bd.js":6225,"./bn.js":8905,"./bo":1560,"./bo.js":1560,"./br":1278,"./br.js":1278,"./bs":622,"./bs.js":622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":877,"./cv.js":877,"./cy":7373,"./cy.js":7373,"./da":4780,"./da.js":4780,"./de":9740,"./de-at":217,"./de-at.js":217,"./de-ch":894,"./de-ch.js":894,"./de.js":9740,"./dv":5300,"./dv.js":5300,"./el":837,"./el.js":837,"./en-au":8348,"./en-au.js":8348,"./en-ca":7925,"./en-ca.js":7925,"./en-gb":2243,"./en-gb.js":2243,"./en-ie":6436,"./en-ie.js":6436,"./en-il":7207,"./en-il.js":7207,"./en-in":4175,"./en-in.js":4175,"./en-nz":6319,"./en-nz.js":6319,"./en-sg":1662,"./en-sg.js":1662,"./eo":2915,"./eo.js":2915,"./es":5655,"./es-do":5251,"./es-do.js":5251,"./es-mx":6112,"./es-mx.js":6112,"./es-us":1146,"./es-us.js":1146,"./es.js":5655,"./et":5603,"./et.js":5603,"./eu":7763,"./eu.js":7763,"./fa":6959,"./fa.js":6959,"./fi":1897,"./fi.js":1897,"./fil":2549,"./fil.js":2549,"./fo":4694,"./fo.js":4694,"./fr":4470,"./fr-ca":3049,"./fr-ca.js":3049,"./fr-ch":2330,"./fr-ch.js":2330,"./fr.js":4470,"./fy":5044,"./fy.js":5044,"./ga":9295,"./ga.js":9295,"./gd":2101,"./gd.js":2101,"./gl":8794,"./gl.js":8794,"./gom-deva":7884,"./gom-deva.js":7884,"./gom-latn":3168,"./gom-latn.js":3168,"./gu":5349,"./gu.js":5349,"./he":4206,"./he.js":4206,"./hi":94,"./hi.js":94,"./hr":316,"./hr.js":316,"./hu":2138,"./hu.js":2138,"./hy-am":1423,"./hy-am.js":1423,"./id":9218,"./id.js":9218,"./is":135,"./is.js":135,"./it":626,"./it-ch":150,"./it-ch.js":150,"./it.js":626,"./ja":9183,"./ja.js":9183,"./jv":4286,"./jv.js":4286,"./ka":2105,"./ka.js":2105,"./kk":7772,"./kk.js":7772,"./km":8758,"./km.js":8758,"./kn":9282,"./kn.js":9282,"./ko":3730,"./ko.js":3730,"./ku":1408,"./ku.js":1408,"./ky":3291,"./ky.js":3291,"./lb":6841,"./lb.js":6841,"./lo":5466,"./lo.js":5466,"./lt":7010,"./lt.js":7010,"./lv":7595,"./lv.js":7595,"./me":9861,"./me.js":9861,"./mi":5493,"./mi.js":5493,"./mk":5966,"./mk.js":5966,"./ml":7341,"./ml.js":7341,"./mn":5115,"./mn.js":5115,"./mr":370,"./mr.js":370,"./ms":9847,"./ms-my":1237,"./ms-my.js":1237,"./ms.js":9847,"./mt":2126,"./mt.js":2126,"./my":6165,"./my.js":6165,"./nb":4924,"./nb.js":4924,"./ne":6744,"./ne.js":6744,"./nl":3901,"./nl-be":9814,"./nl-be.js":9814,"./nl.js":3901,"./nn":3877,"./nn.js":3877,"./oc-lnc":2135,"./oc-lnc.js":2135,"./pa-in":5858,"./pa-in.js":5858,"./pl":4495,"./pl.js":4495,"./pt":9520,"./pt-br":7971,"./pt-br.js":7971,"./pt.js":9520,"./ro":6459,"./ro.js":6459,"./ru":1793,"./ru.js":1793,"./sd":950,"./sd.js":950,"./se":7930,"./se.js":7930,"./si":124,"./si.js":124,"./sk":4249,"./sk.js":4249,"./sl":4985,"./sl.js":4985,"./sq":1104,"./sq.js":1104,"./sr":9131,"./sr-cyrl":9915,"./sr-cyrl.js":9915,"./sr.js":9131,"./ss":5893,"./ss.js":5893,"./sv":8760,"./sv.js":8760,"./sw":1172,"./sw.js":1172,"./ta":7333,"./ta.js":7333,"./te":3110,"./te.js":3110,"./tet":2095,"./tet.js":2095,"./tg":7321,"./tg.js":7321,"./th":9041,"./th.js":9041,"./tk":9005,"./tk.js":9005,"./tl-ph":5768,"./tl-ph.js":5768,"./tlh":9444,"./tlh.js":9444,"./tr":2397,"./tr.js":2397,"./tzl":8254,"./tzl.js":8254,"./tzm":1106,"./tzm-latn":699,"./tzm-latn.js":699,"./tzm.js":1106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":7691,"./uk.js":7691,"./ur":3795,"./ur.js":3795,"./uz":6791,"./uz-latn":588,"./uz-latn.js":588,"./uz.js":6791,"./vi":5666,"./vi.js":5666,"./x-pseudo":4378,"./x-pseudo.js":4378,"./yo":5805,"./yo.js":5805,"./zh-cn":3839,"./zh-cn.js":3839,"./zh-hk":5726,"./zh-hk.js":5726,"./zh-mo":9807,"./zh-mo.js":9807,"./zh-tw":4152,"./zh-tw.js":4152};function o(t){var e=i(t);return n(e)}function i(t){if(!n.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}o.keys=function(){return Object.keys(s)},o.resolve=i,t.exports=o,o.id=6700}},e={};function n(s){if(e[s])return e[s].exports;var o=e[s]={id:s,loaded:!1,exports:{}};return t[s].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=t,n.x=t=>{},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t={815:0},e=[[5042,234]],s=t=>{},o=(o,i)=>{for(var a,d,[c,r,l,u]=i,m=0,f=[];m<c.length;m++)d=c[m],n.o(t,d)&&t[d]&&f.push(t[d][0]),t[d]=0;for(a in r)n.o(r,a)&&(n.m[a]=r[a]);for(l&&l(n),o&&o(i);f.length;)f.shift()();return u&&e.push.apply(e,u),s()},i=self.webpackChunkTidy_Todo=self.webpackChunkTidy_Todo||[];function a(){for(var s,o=0;o<e.length;o++){for(var i=e[o],a=!0,d=1;d<i.length;d++){var c=i[d];0!==t[c]&&(a=!1)}a&&(e.splice(o--,1),s=n(n.s=i[0]))}return 0===e.length&&(n.x(),n.x=t=>{}),s}i.forEach(o.bind(null,0)),i.push=o.bind(null,i.push.bind(i));var d=n.x;n.x=()=>(n.x=d||(t=>{}),(s=a)())})(),n.x()})();
//# sourceMappingURL=controllerNote.f12551405c2371272531.js.map