(()=>{"use strict";const e=(e,t)=>t.some((t=>e instanceof t));let t,n;const r=new WeakMap,o=new WeakMap,s=new WeakMap,a=new WeakMap,i=new WeakMap;let c={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return o.get(e);if("objectStoreNames"===t)return e.objectStoreNames||s.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return u(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function d(a){return"function"==typeof a?(i=a)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(i)?function(...e){return i.apply(l(this),e),u(r.get(this))}:function(...e){return u(i.apply(l(this),e))}:function(e,...t){const n=i.call(l(this),e,...t);return s.set(n,e.sort?e.sort():[e]),u(n)}:(a instanceof IDBTransaction&&function(e){if(o.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)}));o.set(e,t)}(a),e(a,t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(a,c):a);var i}function u(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(u(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",s)}));return t.then((t=>{t instanceof IDBCursor&&r.set(t,e)})).catch((()=>{})),i.set(t,e),t}(e);if(a.has(e))return a.get(e);const t=d(e);return t!==e&&(a.set(e,t),i.set(t,e)),t}const l=e=>i.get(e),p=["get","getKey","getAll","getAllKeys","count"],f=["put","add","delete","clear"],v=new Map;function g(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(v.get(t))return v.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=f.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!p.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let a=s.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),o&&s.done]))[0]};return v.set(t,s),s}async function m(){return await function(e,t,{blocked:n,upgrade:r,blocking:o,terminated:s}={}){const a=indexedDB.open(e,t),i=u(a);return r&&a.addEventListener("upgradeneeded",(e=>{r(u(a.result),e.oldVersion,e.newVersion,u(a.transaction))})),n&&a.addEventListener("blocked",(()=>n())),i.then((e=>{s&&e.addEventListener("close",(()=>s())),o&&e.addEventListener("versionchange",(()=>o()))})).catch((()=>{})),i}("NotesDB",1,{upgrade(e){e.createObjectStore("notes")}})}let y;var D;D=c,c={...D,get:(e,t,n)=>g(e,t)||D.get(e,t,n),has:(e,t)=>!!g(e,t)||D.has(e,t)},window.addEventListener("DOMContentLoaded",(async()=>{const e=document.getElementById("editor"),t=await async function(){return(await m()).getAll("notes")}();t.length>0&&(e.value=t[0]),e.addEventListener("blur",(()=>{!async function(e){(await m()).put("notes",e,Date.now())}(e.value)}))})),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/sw.js")})),window.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),y=e;const t=document.getElementById("install");t.style.display="block",t.addEventListener("click",(e=>{t.style.display="none",y.prompt(),y.userChoice.then((e=>{"accepted"===e.outcome?console.log("User accepted the install prompt"):console.log("User dismissed the install prompt"),y=null}))}))}))})();