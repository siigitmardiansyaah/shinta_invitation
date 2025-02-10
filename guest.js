(()=>{var H=(()=>{let n=null,i=null,d=0,o=0,m=!0,s=()=>{d+=1},c=()=>`(${o}/${d}) [${parseInt(o/d*100).toFixed(0)}%]`;return{init:()=>{n=document.getElementById("progress-info"),i=document.getElementById("progress-bar"),n.style.display="block"},add:s,invalid:w=>{m=!1,i.style.backgroundColor="red",n.innerText=`Error loading ${w} ${c()}`},complete:w=>{m&&(o+=1,n.innerText=`Loading ${w} complete ${c()}`,i.style.width=Math.min(o/d*100,100).toString()+"%",o===d&&document.dispatchEvent(new Event("progress.done")))}}})();var J=(()=>{let n=null,i=null,d=!0,o=1e3*60*60*6,m="images",s=async b=>{let u=b.getAttribute("data-src"),l="x-expiration-time",y=new Image;if(y.onload=()=>{b.src=y.src,b.width=y.width,b.height=y.height,H.complete("image")},n.has(u)){y.src=n.get(u);return}let x=k=>new Promise((a,t)=>{let p=document.createElement("canvas");p.width=k.width,p.height=k.height,p.getContext("2d").drawImage(k,0,0);let e=r=>{r?a(r):t(new Error("Failed to convert image to WebP"))};p.onerror=t,p.toBlob(e,"image/webp",.8)}),v=(k,a=3,t=1e3)=>fetch(u).then(p=>p.blob()).then(p=>window.createImageBitmap(p)).then(p=>x(p)).then(p=>{let e=new Headers;return e.set("Content-Type","image/webp"),e.set("Content-Length",String(p.size)),e.set(l,String(Date.now()+o)),k.put(u,new Response(p,{headers:e})).then(()=>p)}).catch(p=>{if(a<=0)throw p;return console.warn("Retrying fetch:"+u),new Promise(e=>setTimeout(()=>e(v(k,a-1,t+500)),t))}),E=k=>k.match(u).then(a=>a?Date.now()<=parseInt(a.headers.get(l))?a.blob():k.delete(u).then(t=>t?v(k):a.blob()):v(k));await caches.open(m).then(k=>E(k)).then(k=>{y.src=URL.createObjectURL(k),n.set(u,y.src)}).catch(()=>H.invalid("image"))},c=b=>{b.onerror=()=>H.invalid("image"),b.onload=()=>{b.width=b.naturalWidth,b.height=b.naturalHeight,H.complete("image")},b.complete&&b.naturalWidth!==0&&b.naturalHeight!==0?H.complete("image"):b.complete&&H.invalid("image")},g=()=>d,f=b=>{o=Number(b)},h=()=>{(async()=>{for(let b of i)b.hasAttribute("data-src")?await s(b):c(b)})()};return{init:()=>(n=new Map,i=document.querySelectorAll("img"),i.forEach(H.add),d=Array.from(i).some(b=>b.hasAttribute("data-src")),{load:h,setTtl:f,hasDataSrc:g})}})();var G=(()=>{let n=null,i=null,d=!1,o='<i class="fa-solid fa-circle-pause spin-button"></i>',m='<i class="fa-solid fa-circle-play"></i>',s=async()=>{if(navigator.onLine){n.disabled=!0;try{await i.play(),d=!0,n.disabled=!1,n.innerHTML=o}catch(f){d=!1,alert(f)}}},c=()=>{d=!1,i.pause(),n.innerHTML=m};return{init:()=>{n=document.getElementById("button-music"),n.style.display="block",i=new Audio(n.getAttribute("data-url")),i.volume=1,i.loop=!0,i.muted=!1,i.currentTime=0,i.autoplay=!1,i.controls=!1,i.addEventListener("canplay",s),n.addEventListener("offline",c),n.addEventListener("click",()=>d?c():s())}}})();var $=(()=>{let n=f=>String(f).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),i=(f,h)=>{let w=null;w=setTimeout(()=>{f(),clearTimeout(w),w=null},h)};return{copy:async(f,h=null,w=1500)=>{let b=f.getAttribute("data-copy");if(!b||b.length===0){alert("Nothing to copy");return}f.disabled=!0;try{await navigator.clipboard.writeText(b)}catch{f.disabled=!1,alert("Failed to copy");return}let u=f.innerHTML;f.innerHTML=h||'<i class="fa-solid fa-check"></i>',i(()=>{f.disabled=!1,f.innerHTML=u},w)},timeOut:i,escapeHtml:n,base64Encode:f=>{let w=new TextEncoder().encode(f);return window.btoa(String.fromCharCode(...w))},base64Decode:f=>{let h=new TextDecoder,w=Uint8Array.from(window.atob(f),b=>b.charCodeAt(0));return h.decode(w)},disableButton:(f,h="Loading")=>{f.disabled=!0;let w=f.innerHTML;return f.innerHTML=`<span class="spinner-border spinner-border-sm my-0 ms-0 me-1 p-0" style="height: 0.8rem; width: 0.8rem"></span>${h}`,{restore:()=>{f.innerHTML=w,f.disabled=!1}}},disableCheckbox:f=>{f.disabled=!0;let h=document.querySelector(`label[for="${f.id}"]`),w=h.innerHTML;return h.innerHTML=`<span class="spinner-border spinner-border-sm my-0 ms-0 me-1 p-0" style="height: 0.8rem; width: 0.8rem"></span>${w}`,{restore:()=>{h.innerHTML=w,f.disabled=!1}}},parseUserAgent:f=>{let h=[{type:"Mobile",regex:/Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i},{type:"Tablet",regex:/iPad|Android(?!.*Mobile)|Tablet/i},{type:"Desktop",regex:/Windows NT|Macintosh|Linux/i}],w=[{name:"Chrome",regex:/Chrome|CriOS/i},{name:"Safari",regex:/Safari/i},{name:"Edge",regex:/Edg|Edge/i},{name:"Firefox",regex:/Firefox|FxiOS/i},{name:"Opera",regex:/Opera|OPR/i},{name:"Internet Explorer",regex:/MSIE|Trident/i}],b=[{name:"Windows",regex:/Windows NT ([\d.]+)/i},{name:"MacOS",regex:/Mac OS X ([\d_]+)/i},{name:"Android",regex:/Android ([\d.]+)/i},{name:"iOS",regex:/OS ([\d_]+) like Mac OS X/i},{name:"Linux",regex:/Linux/i}],u=h.find(E=>E.regex.test(f))?.type||"Unknown",l=w.find(E=>E.regex.test(f))?.name||"Unknown",y=b.find(E=>E.regex.test(f)),x=y&&f.match(y.regex)?.[1]?.replace(/_/g,".")||"",v=y?y.name:"Unknown";return x=x?`${v} ${x}`:v,`${l} ${u} ${x}`}}})();var K={tab:d=>window.bootstrap.Tab.getOrCreateInstance(document.getElementById(d)),modal:d=>window.bootstrap.Modal.getOrCreateInstance(document.getElementById(d))};var L=n=>{let i=(c=null)=>{let g=JSON.parse(localStorage.getItem(n));return c?g[String(c)]:g},d=(c,g)=>{let f=i();f[String(c)]=g,localStorage.setItem(n,JSON.stringify(f))},o=c=>Object.keys(i()).includes(String(c)),m=c=>{if(!o(c))return;let g=i();delete g[String(c)],localStorage.setItem(n,JSON.stringify(g))},s=()=>localStorage.setItem(n,"{}");return localStorage.getItem(n)||s(),{set:d,get:i,has:o,clear:s,unset:m}};var F=(()=>{let n={"#000000":"#ffffff","#ffffff":"#000000","#212529":"#f8f9fa","#f8f9fa":"#212529"},i=["#ffffff","#f8f9fa"],d=["#000000","#212529"],o=!1,m=null,s=null,c=()=>m.set("active","light"),g=()=>m.set("active","dark"),f=v=>{let E=s.getAttribute("content");s.setAttribute("content",v.some(k=>k===E)?n[E]:E)},h=()=>{c(),document.documentElement.setAttribute("data-bs-theme","light"),f(d)},w=()=>{g(),document.documentElement.setAttribute("data-bs-theme","dark"),f(i)},b=(v=null,E=null)=>{let k=m.get("active")==="dark";return v&&E?k?v:E:k};return{init:()=>{switch(m=L("theme"),s=document.querySelector('meta[name="theme-color"]'),m.has("active")||(window.matchMedia("(prefers-color-scheme: dark)").matches?g():c()),document.documentElement.getAttribute("data-bs-theme")){case"dark":g();break;case"light":c();break;default:o=!0}b()?w():h()},spyTop:()=>{let v=k=>k.filter(a=>a.isIntersecting).forEach(a=>{let t=a.target.classList.contains("bg-white-black")?b(d[0],i[0]):b(d[1],i[1]);s.setAttribute("content",t)}),E=new IntersectionObserver(v,{rootMargin:"0% 0% -95% 0%"});document.querySelectorAll("section").forEach(k=>E.observe(k))},change:()=>b()?h():w(),isDarkMode:b,isAutoMode:()=>o}})();var M=(()=>{let n=(u,l,y)=>({code:u,data:l,error:y}),i=(u=0)=>({love:u}),d=({uuid:u,own:l,name:y,presence:x,comment:v,created_at:E,is_admin:k,ip:a,user_agent:t,comments:p,like:e})=>({uuid:u,own:l,name:y,presence:x,comment:v,created_at:E,is_admin:k??!1,ip:a,user_agent:t,comments:p?.map(d)??[],like:i(e?.love??0)});return{uuidResponse:({uuid:u})=>({uuid:u}),baseResponse:n,tokenResponse:({token:u})=>({token:u}),statusResponse:({status:u})=>({status:u}),commentResponse:({name:u,presence:l,comment:y,is_admin:x,created_at:v})=>({name:u,presence:l,comment:y,is_admin:x,created_at:v}),likeCommentResponse:i,getCommentResponse:d,getCommentsResponse:u=>u.map(d),commentShowMore:(u,l=!1)=>({uuid:u,show:l}),postCommentRequest:(u,l,y,x)=>({id:u,name:l,presence:y,comment:x}),postSessionRequest:(u,l)=>({email:u,password:l}),updateCommentRequest:(u,l)=>({presence:u,comment:l})}})();var j="GET",Z="PUT",U="POST",X="PATCH",Y="DELETE",z=200,V=201,ie=500,O=(n,i)=>{let d=new AbortController,o=document.body.getAttribute("data-url"),m={signal:d.signal,method:String(n).toUpperCase(),headers:new Headers({Accept:"application/json","Content-Type":"application/json"})};return window.addEventListener("offline",()=>d.abort()),window.addEventListener("popstate",()=>d.abort()),window.addEventListener("beforeunload",()=>d.abort()),o.slice(-1)==="/"&&(o=o.slice(0,-1)),{send(s=null){return fetch(o+i,m).then(c=>c.json().then(g=>{if(c.status>=ie&&(g.message??g[0]))throw new Error(g.message??g[0]);if(g.error)throw new Error(g.error[0]);return s&&(g.data=s(g.data)),M.baseResponse(g.code,g.data,g.error)})).catch(c=>{if(c.name==="AbortError")return console.warn("Fetch abort:",c),c;throw alert(c),new Error(c)})},download(){return fetch(o+i,m).then(s=>{if(s.status!==z)return!1;let c=document.querySelector("a[download]");c&&document.body.removeChild(c);let g=s.headers.get("content-disposition")?.match(/filename="(.+)"/)?.[1]??"download.csv";return s.blob().then(f=>{let h=document.createElement("a"),w=window.URL.createObjectURL(f);return h.href=w,h.download=g,document.body.appendChild(h),h.click(),document.body.removeChild(h),window.URL.revokeObjectURL(w),!0})}).catch(s=>{if(s.name==="AbortError")return console.warn("Fetch abort:",s),s;throw alert(s),new Error(s)})},token(s){return s.split(".").length===3?(m.headers.append("Authorization","Bearer "+s),this):(m.headers.append("x-access-key",s),this)},body(s){return m.body=JSON.stringify(s),this}}};var S=(()=>{let n=null,i=()=>n.get("token"),d=h=>n.set("token",h),o=h=>O(U,"/api/session").body(h).send(M.tokenResponse).then(w=>(w.code===z&&d(w.data.token),w.code===z),()=>!1),m=()=>n.unset("token"),s=()=>String(i()??".").split(".").length===3;return{init:()=>{n=L("session")},guest:()=>O(j,"/api/config").token(i()).send().then(h=>{if(h.code!==z)throw new Error("failed to get config.");let w=L("config");for(let[b,u]of Object.entries(h.data))w.set(b,u);return h}),login:o,logout:m,decode:()=>{if(!s())return null;try{return JSON.parse(window.atob(i().split(".")[1]))}catch{return null}},isAdmin:s,setToken:d,getToken:i}})();var Q=(()=>{let n=null,i=!0,d=()=>i,o=u=>new Promise(l=>{let y=parseFloat(n.style.opacity),x=null,v=u?.05:-.05,E=u?1:0;x=setInterval(()=>{y=Math.max(0,Math.min(1,y+v)),n.style.opacity=y.toFixed(2),y===E&&(l(),clearInterval(x),x=null)},10)}),m=()=>{let u=n.firstElementChild.firstElementChild;u.classList.remove("bg-success"),u.classList.add("bg-danger"),u.firstElementChild.innerHTML='<i class="fa-solid fa-ban me-2"></i>Koneksi tidak tersedia'},s=()=>{let u=n.firstElementChild.firstElementChild;u.classList.remove("bg-danger"),u.classList.add("bg-success"),u.firstElementChild.innerHTML='<i class="fa-solid fa-cloud me-2"></i>Koneksi tersedia kembali'},c=async()=>{await o(!1),m()},g=()=>{let u=null;u=setTimeout(()=>{clearTimeout(u),u=null,i&&c()},3e3)},f=()=>{let u=["input[data-offline-disabled]","button[data-offline-disabled]","select[data-offline-disabled]","textarea[data-offline-disabled]"].join(", ");document.querySelectorAll(u).forEach(l=>{l.dispatchEvent(new Event(d()?"online":"offline")),l.setAttribute("data-offline-disabled",d()?"false":"true"),l.tagName==="BUTTON"?d()?l.classList.remove("disabled"):l.classList.add("disabled"):d()?l.removeAttribute("disabled"):l.setAttribute("disabled","true")})},h=()=>{i=!1,m(),o(!0),f()},w=()=>{i=!0,s(),g(),f()};return{init:()=>{window.addEventListener("online",w),window.addEventListener("offline",h),n=document.getElementById("offline-mode"),n.innerHTML=`
        <div class="d-flex justify-content-center mx-auto">
            <div class="d-flex justify-content-center align-items-center rounded-pill my-2 bg-danger shadow">
                <small class="text-center py-1 px-2 mx-1 mt-1 mb-0 text-white" style="font-size: 0.8rem;"></small>
            </div>
        </div>`},isOnline:d}})();var R=(()=>{let n=null,i=null,d=null,o=null,m=null,s=null,c=250,g=()=>`
        <div class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center placeholder-wave">
                <span class="placeholder bg-secondary col-5 rounded-3 my-1"></span>
                <span class="placeholder bg-secondary col-3 rounded-3 my-1"></span>
            </div>
            <hr class="my-1">
            <p class="placeholder-wave m-0">
                <span class="placeholder bg-secondary col-6 rounded-3"></span>
                <span class="placeholder bg-secondary col-5 rounded-3"></span>
                <span class="placeholder bg-secondary col-12 rounded-3 my-1"></span>
            </p>
        </div>`,f=e=>([["*",'<strong class="text-theme-auto">$1</strong>'],["_",'<em class="text-theme-auto">$1</em>'],["~",'<del class="text-theme-auto">$1</del>'],["```",'<code class="font-monospace text-theme-auto">$1</code>']].forEach(T=>{let A=T[0],P=T[1];e=e.replace(new RegExp(`\\${A}(?=\\S)(.*?)(?<!\\s)\\${A}`,"gs"),P)}),e),h=e=>`
        <button style="font-size: 0.8rem;" onclick="undangan.comment.like.love(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto ms-auto rounded-3 p-0 shadow-sm d-flex justify-content-start align-items-center" data-offline-disabled="false">
            <span class="my-0 mx-1" data-count-like="${e.like.love}">${e.like.love}</span>
            <i class="me-1 ${d.has(e.uuid)?"fa-solid fa-heart text-danger":"fa-regular fa-heart"}"></i>
        </button>`,w=e=>{let r=`<div class="d-flex flex-wrap justify-content-start align-items-center" data-button-action="${e.uuid}">`;return(o.get("can_reply")===!0||o.get("can_reply")===void 0)&&(r+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.reply(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Reply</button>`),i.has(e.uuid)&&(o.get("can_edit")===!0||o.get("can_edit")===void 0)&&(r+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.edit(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Edit</button>`),S.isAdmin()?r+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.remove(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-own="${e.own}" data-offline-disabled="false">Delete</button>`:i.has(e.uuid)&&(o.get("can_delete")===!0||o.get("can_delete")===void 0)&&(r+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.remove(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Delete</button>`),r+="</div>",r},b=(e,r)=>{let T=s.get("show").includes(e);return`<a class="text-theme-auto" style="font-size: 0.8rem;" onclick="undangan.comment.showOrHide(this)" data-uuid="${e}" data-uuids="${r.join(",")}" data-show="${T?"true":"false"}" role="button" class="me-auto ms-1 py-0">${T?"Hide replies":`Show replies (${r.length})`}</a>`},u=e=>`
        <div class="d-flex flex-wrap justify-content-between align-items-center" id="button-${e.uuid}">
            ${w(e)}
            ${e.comments.length>0?b(e.uuid,e.comments.map(r=>r.uuid)):""}
            ${h(e)}
        </div>`,l=e=>e.ip===void 0||e.user_agent===void 0||e.is_admin?"":`
        <div class="mb-1 mt-3">
            <p class="text-theme-auto mb-1 mx-0 mt-0 p-0" style="font-size: 0.7rem;" id="ip-${e.uuid}"><i class="fa-solid fa-location-dot me-1"></i>${$.escapeHtml(e.ip)} ${m.has(e.ip)?`<strong>${m.get(e.ip)}</strong>`:'<span class="mb-1 placeholder col-2 rounded-3"></span>'}</p>
            <p class="text-theme-auto m-0 p-0" style="font-size: 0.7rem;"><i class="fa-solid fa-mobile-screen-button me-1"></i>${$.parseUserAgent($.escapeHtml(e.user_agent))}</p>
        </div>`,y=(e,r)=>r?'class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4" data-parent="true"':`class="${s.get("hidden").find(T=>T.uuid===e.uuid).show?"":"d-none"} overflow-x-scroll mw-100 border-start bg-theme-auto py-2 ps-2 pe-0 my-2 ms-2 me-0"`,x=(e,r)=>e.is_admin?`<strong class="me-1">${$.escapeHtml(n.get("name")??o.get("name"))}</strong><i class="fa-solid fa-certificate text-primary"></i>`:r?`<strong class="me-1">${$.escapeHtml(e.name)}</strong><i id="badge-${e.uuid}" class="fa-solid ${e.presence?"fa-circle-check text-success":"fa-circle-xmark text-danger"}"></i>`:`<strong>${$.escapeHtml(e.name)}</strong>`,v=(e,r)=>{let T=f($.escapeHtml(e.comment)),A=T.length>c;return`
        <div class="d-flex flex-wrap justify-content-between align-items-center">
            <p class="text-theme-auto text-truncate m-0 p-0" style="font-size: 0.95rem;">${x(e,r)}</p>
            <small class="text-theme-auto m-0 p-0" style="font-size: 0.75rem;">${e.created_at}</small>
        </div>
        <hr class="my-1">
        <p class="text-theme-auto my-1 mx-0 p-0" style="white-space: pre-wrap !important; font-size: 0.95rem;" ${A?`data-comment="${$.base64Encode(T)}"`:""} id="content-${e.uuid}">${A?T.slice(0,c)+"...":T}</p>
        ${A?`<p class="mb-2 mt-0 mx-0 p-0"><a class="text-theme-auto" role="button" style="font-size: 0.85rem; display: block;" data-show="false" onclick="undangan.comment.showMore(this, '${e.uuid}')">Selengkapnya</a></p>`:""}`},E=(e,r)=>`
        <div ${y(e,r)} id="${e.uuid}" style="overflow-wrap: break-word !important;">
            <div id="body-content-${e.uuid}" data-tapTime="0" data-liked="false" tabindex="0">
            ${v(e,r)}
            </div>
            ${l(e)}
            ${u(e)}
            <div id="reply-content-${e.uuid}">${e.comments.map(T=>k(T)).join("")}</div>
        </div>`,k=e=>E(e,!1);return{init:()=>{n=L("user"),i=L("owns"),d=L("likes"),o=L("config"),m=L("tracker"),s=L("comment")},renderEdit:(e,r)=>{let T=document.createElement("div");return T.classList.add("my-2"),T.id=`inner-${e}`,T.innerHTML=`
        <label for="form-inner-${e}" class="form-label my-1" style="font-size: 0.95rem;"><i class="fa-solid fa-pen me-2"></i>Edit</label>
        ${document.getElementById(e).getAttribute("data-parent")==="true"&&!S.isAdmin()?`
        <select class="form-select shadow-sm mb-2 rounded-4" id="form-inner-presence-${e}" data-offline-disabled="false">
            <option value="1" ${r?"selected":""}>Datang</option>
            <option value="2" ${r?"":"selected"}>Berhalangan</option>
        </select>`:""}
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${e}" minlength="1" maxlength="1000" placeholder="Type update comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="undangan.comment.cancel('${e}')" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="undangan.comment.update(this)" data-uuid="${e}" class="btn btn-sm btn-outline-auto rounded-4 py-0" data-offline-disabled="false">Update</button>
        </div>`,T},renderReply:e=>{let r=document.createElement("div");return r.classList.add("my-2"),r.id=`inner-${e}`,r.innerHTML=`
        <label for="form-inner-${e}" class="form-label my-1" style="font-size: 0.95rem;"><i class="fa-solid fa-reply me-2"></i>Reply</label>
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${e}" minlength="1" maxlength="1000" placeholder="Type reply comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="undangan.comment.cancel('${e}')" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="undangan.comment.send(this)" data-uuid="${e}" class="btn btn-sm btn-outline-auto rounded-4 py-0" data-offline-disabled="false">Send</button>
        </div>`,r},renderLoading:g,renderReadMore:b,renderInnerContent:k,renderContent:e=>E(e,!0),convertMarkdownToHTML:f,maxCommentLength:c}})();var ee=()=>window.confetti.shapeFromPath({path:"M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",matrix:[.03333333333333333,0,0,.03333333333333333,-5.566666666666666,-5.533333333333333]}),te=()=>{window.confetti({origin:{y:1},zIndex:1057})},ne=(n=!0)=>{let i=ee(),d=["#FFC0CB","#FF1493","#C71585"],o=(m,s)=>Math.random()*(s-m)+m;n&&function m(){d.forEach(s=>{window.confetti({particleCount:1,startVelocity:0,ticks:100,origin:{x:Math.random(),y:Math.abs(Math.random())},zIndex:1057,colors:[s],shapes:[i],drift:o(-.3,.3),gravity:o(.2,.4),scalar:o(.5,1)})}),requestAnimationFrame(m)}()},ae=n=>{if(!window.confetti)return;let i=Date.now()+25,d=Math.max(.3,Math.min(1,n.getBoundingClientRect().top/window.innerHeight+.2)),o=ee(),m=["#FF69B4","#FF1493"];(function s(){m.forEach(c=>{window.confetti({particleCount:2,angle:60,spread:55,shapes:[o],origin:{x:0,y:d},zIndex:1057,colors:[c]}),window.confetti({particleCount:2,angle:120,spread:55,shapes:[o],origin:{x:1,y:d},zIndex:1057,colors:[c]})}),Date.now()<i&&requestAnimationFrame(s)})()};var W=(()=>{let n=null,i=async m=>{let s=m.firstElementChild,c=m.lastElementChild,g=m.getAttribute("data-uuid"),f=parseInt(s.getAttribute("data-count-like"));m.disabled=!0,n.has(g)?await O(X,"/api/comment/"+n.get(g)).token(S.getToken()).send(M.statusResponse).then(h=>{h.data.status&&(n.unset(g),c.classList.remove("fa-solid","text-danger"),c.classList.add("fa-regular"),s.setAttribute("data-count-like",String(f-1)))}):await O(U,"/api/comment/"+g).token(S.getToken()).send(M.uuidResponse).then(h=>{h.code===V&&(n.set(g,h.data.uuid),c.classList.remove("fa-regular"),c.classList.add("fa-solid","text-danger"),s.setAttribute("data-count-like",String(f+1)))}),s.innerText=s.getAttribute("data-count-like"),m.disabled=!1};return{init:()=>{n=L("likes")},love:i,tapTap:async m=>{if(!navigator.onLine)return;let s=Date.now(),c=s-parseInt(m.getAttribute("data-tapTime")),g=m.id.replace("body-content-",""),f=c<300&&c>0,h=!n.has(g)&&m.getAttribute("data-liked")!=="true";if(f&&h){navigator.vibrate&&navigator.vibrate(100),ae(m);let w=document.querySelector(`[onclick="undangan.comment.like.love(this)"][data-uuid="${g}"]`);m.setAttribute("data-liked","true"),await i(w),m.setAttribute("data-liked","false")}m.setAttribute("data-tapTime",s)}}})();var _=(()=>{let n=10,i=0,d=0,o=null,m=null,s=null,c=null,g=e=>{n=Number(e)},f=()=>n,h=()=>i,w=()=>d,b=()=>m.classList.contains("disabled")?null:m.classList.add("disabled"),u=()=>m.classList.contains("disabled")?m.classList.remove("disabled"):null,l=()=>s.classList.contains("disabled")?null:s.classList.add("disabled"),y=()=>s.classList.contains("disabled")?s.classList.remove("disabled"):null,x=()=>{c.classList.contains("d-none")&&c.classList.remove("d-none")},v=e=>{e.disabled=!0;let r=e.innerHTML;e.innerHTML='<span class="spinner-border spinner-border-sm my-0 mx-1 p-0" style="height: 0.8rem; width: 0.8rem;"></span>';let T=async()=>{await q.show(),e.disabled=!1,e.innerHTML=r,q.scroll()};return{next:async()=>{i+=n,e.innerHTML="Next"+e.innerHTML,await T(),o.innerText=String(parseInt(o.innerText)+1)},prev:async()=>{i-=n,e.innerHTML=e.innerHTML+"Prev",await T(),o.innerText=String(parseInt(o.innerText)-1)}}};return{init:()=>{c=document.getElementById("pagination"),c.innerHTML=`
        <ul class="pagination mb-2 shadow-sm rounded-4">
            <li class="page-item disabled" id="previous">
                <button class="page-link rounded-start-4" onclick="undangan.comment.pagination.previous(this)" data-offline-disabled="false">
                    <i class="fa-solid fa-circle-left me-1"></i>Prev
                </button>
            </li>
            <li class="page-item disabled">
                <span class="page-link text-theme-auto" id="page">1</span>
            </li>
            <li class="page-item" id="next">
                <button class="page-link rounded-end-4" onclick="undangan.comment.pagination.next(this)" data-offline-disabled="false">
                    Next<i class="fa-solid fa-circle-right ms-1"></i>
                </button>
            </li>
        </ul>`,o=document.getElementById("page"),m=document.getElementById("previous"),s=document.getElementById("next")},setPer:g,getPer:f,getNext:h,reset:async()=>i===0?!1:(i=0,d=0,o.innerText=1,l(),b(),await q.show(),!0),setResultData:e=>{if(d=e,i>0&&u(),d<n){l();return}y(),x()},getResultData:w,previous:async e=>{b(),!(i<0)&&(l(),await v(e).prev())},next:async e=>{l(),!(d<n)&&(b(),await v(e).next())}}})();var q=(()=>{let n=null,i=null,d=null,o=null,m=()=>'<div class="text-center p-4 my-2 bg-theme-auto rounded-4 shadow"><p class="fw-bold p-0 m-0" style="font-size: 0.95rem;">Yuk bagikan undangan ini biar banyak komentarnya</p></div>',s=(a,t)=>{document.querySelector(`[data-button-action="${a}"]`).childNodes.forEach(p=>{p.disabled=t})},c=()=>document.getElementById("comments").scrollIntoView({behavior:"smooth"}),g=a=>{a.comments&&a.comments.forEach(g);let t=document.getElementById(`body-content-${a.uuid}`);t.addEventListener("touchend",()=>W.tapTap(t))},f=async a=>{if(!confirm("Are you sure?"))return;let t=a.getAttribute("data-uuid");S.isAdmin()&&n.set(t,a.getAttribute("data-own")),s(t,!0);let p=$.disableButton(a),e=document.querySelector(`[onclick="undangan.comment.like.love(this)"][data-uuid="${t}"]`);if(e.disabled=!0,!await O(Y,"/api/comment/"+n.get(t)).token(S.getToken()).send(M.statusResponse).then(A=>A.data.status,()=>!1)){p.restore(),e.disabled=!1;return}document.querySelectorAll('a[onclick="undangan.comment.showOrHide(this)"]').forEach(A=>{let P=A.getAttribute("data-uuids").split(",");if(P.find(D=>D===t)){let D=P.filter(B=>B!==t).join(",");D.length===0?A.remove():A.setAttribute("data-uuids",D)}}),n.unset(t),document.getElementById(t).remove();let T=document.getElementById("comments");T.children.length===0&&(T.innerHTML=m())},h=async a=>{let t=a.getAttribute("data-uuid"),p=!1,e=document.getElementById(`form-inner-presence-${t}`);e&&(e.disabled=!0,p=e.value==="1");let r=document.getElementById(`form-${t?`inner-${t}`:"comment"}`),T=!1,A=document.getElementById(`badge-${t}`);if(A&&(T=A.classList.contains("text-success")),t&&$.base64Encode(r.value)===r.getAttribute("data-original")&&T===p){s(t,!1),document.getElementById(`inner-${t}`).remove();return}r.disabled=!0;let P=document.querySelector(`[onclick="undangan.comment.cancel('${t}')"]`);P&&(P.disabled=!0);let D=$.disableButton(a),B=await O(Z,"/api/comment/"+n.get(t)).token(S.getToken()).body(M.updateCommentRequest(e?p:null,r.value)).send(M.statusResponse).then(oe=>oe.data.status,()=>!1);if(r.disabled=!1,P&&(P.disabled=!1),e&&(e.disabled=!1),D.restore(),!B)return;s(t,!1),document.getElementById(`inner-${t}`).remove();let C=document.querySelector(`[onclick="undangan.comment.showMore(this, '${t}')"]`),I=R.convertMarkdownToHTML($.escapeHtml(r.value)),N=document.getElementById(`content-${t}`);if(I.length>R.maxCommentLength?(N.innerHTML=C?.getAttribute("data-show")==="false"?I.slice(0,R.maxCommentLength)+"...":I,N.setAttribute("data-comment",$.base64Encode(I)),C?.style.display==="none"&&(C.style.display="block")):(N.innerHTML=I,N.removeAttribute("data-comment"),C?.style.display==="block"&&(C.style.display="none")),e&&(document.getElementById("form-presence").value=p?"1":"2",L("information").set("presence",p)),!(!e||!A)){if(p){A.classList.remove("fa-circle-xmark","text-danger"),A.classList.add("fa-circle-check","text-success");return}A.classList.remove("fa-circle-check","text-success"),A.classList.add("fa-circle-xmark","text-danger")}},w=async a=>{let t=a.getAttribute("data-uuid"),p=document.getElementById("form-name"),e=p.value;if(S.isAdmin()&&(e=i.get("name")),e.length===0){t&&document.getElementById("comment").scrollIntoView({behavior:"smooth"}),alert("Silakan masukkan nama Anda.");return}let r=document.getElementById("form-presence");if(!t&&r&&r.value==="0"){alert("Silakan pilih status kehadiran Anda.");return}!t&&p&&!S.isAdmin()&&(p.disabled=!0),r&&r.value!=="0"&&(r.disabled=!0);let T=document.getElementById(`form-${t?`inner-${t}`:"comment"}`);T.disabled=!0;let A=document.querySelector(`[onclick="undangan.comment.cancel('${t}')"]`);A&&(A.disabled=!0);let P=$.disableButton(a),D=r?r.value==="1":!0;if(!S.isAdmin()){let C=L("information");C.set("name",e),t||C.set("presence",D)}let B=await O(U,"/api/comment").token(S.getToken()).body(M.postCommentRequest(t,e,D,T.value)).send(M.getCommentResponse).then(C=>C,()=>null);if(p&&(p.disabled=!1),T.disabled=!1,A&&(A.disabled=!1),r&&(r.disabled=!1),P.restore(),!(!B||B.code!==V)){if(n.set(B.data.uuid,B.data.own),T.value=null,!t){if(await _.reset()){c();return}let I=document.getElementById("comments");_.setResultData(I.children.length),_.getResultData()===_.getPer()&&I.lastElementChild.remove(),B.data.is_admin=S.isAdmin(),I.innerHTML=R.renderContent(B.data)+I.innerHTML,c()}if(t){o.set("hidden",o.get("hidden").concat([M.commentShowMore(B.data.uuid,!0)])),o.set("show",o.get("show").concat([t])),s(t,!1),document.getElementById(`inner-${t}`).remove(),B.data.is_admin=S.isAdmin(),document.getElementById(`reply-content-${t}`).insertAdjacentHTML("beforeend",R.renderInnerContent(B.data));let C=document.getElementById(`button-${t}`),I=C.querySelector("a"),N=[B.data.uuid];I&&(I.getAttribute("data-show")==="false"&&x(I),I.remove()),C.querySelector(`button[onclick="undangan.comment.like.love(this)"][data-uuid="${t}"]`).insertAdjacentHTML("beforebegin",R.renderReadMore(t,I?I.getAttribute("data-uuids").split(",").concat(N):N))}g(B.data)}},b=a=>{let t=document.getElementById(`form-inner-${a}`),p=!1,e=document.getElementById(`form-inner-presence-${a}`);e&&(p=e.value==="1");let r=!1,T=document.getElementById(`badge-${a}`);T&&(r=T.classList.contains("text-success")),(t.value.length===0||$.base64Encode(t.value)===t.getAttribute("data-original")&&r===p||confirm("Are you sure?"))&&(s(a,!1),document.getElementById(`inner-${a}`).remove())},u=a=>{let t=a.getAttribute("data-uuid");document.getElementById(`inner-${t}`)||(s(t,!0),document.getElementById(`button-${t}`).insertAdjacentElement("afterend",R.renderReply(t)))},l=async a=>{let t=a.getAttribute("data-uuid");if(document.getElementById(`inner-${t}`))return;s(t,!0);let p=$.disableButton(a);await O(j,"/api/comment/"+t).token(S.getToken()).send(M.commentResponse).then(e=>{if(e.code!==z)return;document.getElementById(`button-${t}`).insertAdjacentElement("afterend",R.renderEdit(t,e.data.presence));let r=document.getElementById(`form-inner-${t}`);r.value=e.data.comment,r.setAttribute("data-original",$.base64Encode(e.data.comment))}),p.restore(),a.disabled=!0},y=()=>{let a=document.getElementById("comments");return a.getAttribute("data-loading")==="false"&&(a.setAttribute("data-loading","true"),a.innerHTML=R.renderLoading().repeat(_.getPer())),O(j,`/api/comment?per=${_.getPer()}&next=${_.getNext()}`).token(S.getToken()).send(M.getCommentsResponse).then(t=>{if(_.setResultData(t.data.length),a.setAttribute("data-loading","false"),t.data.length===0)return a.innerHTML=m(),t;let p=(e,r)=>(e.forEach(T=>{r.find(A=>A.uuid===T.uuid)||r.push(M.commentShowMore(T.uuid)),T.comments&&T.comments.length>0&&p(T.comments,r)}),r);return o.set("hidden",p(t.data,o.get("hidden"))),a.innerHTML=t.data.map(e=>R.renderContent(e)).join(""),t.data.forEach(E),t.data.forEach(g),t})},x=a=>{let t=a.getAttribute("data-uuids").split(","),p=a.getAttribute("data-show")==="true",e=a.getAttribute("data-uuid");p?(a.setAttribute("data-show","false"),a.innerText="Show replies",a.innerText+=" ("+t.length+")",o.set("show",o.get("show").filter(r=>r!==e))):(a.setAttribute("data-show","true"),a.innerText="Hide replies",o.set("show",o.get("show").concat([e])));for(let r of t){o.set("hidden",o.get("hidden").map(A=>(A.uuid===r&&(A.show=!p),A)));let T=document.getElementById(r).classList;p?T.add("d-none"):T.remove("d-none")}},v=(a,t)=>{let p=document.getElementById(`content-${t}`),e=$.base64Decode(p.getAttribute("data-comment")),r=a.getAttribute("data-show")==="false";p.innerHTML=r?e:e.slice(0,R.maxCommentLength)+"...",a.innerText=r?"Sebagian":"Selengkapnya",a.setAttribute("data-show",r?"true":"false")},E=a=>{S.isAdmin()&&(a.comments&&a.comments.forEach(E),!(a.ip===void 0||a.user_agent===void 0||a.is_admin||d.has(a.ip))&&fetch(`https://freeipapi.com/api/json/${a.ip}`).then(t=>t.json()).then(t=>{let p=t.cityName+" - "+t.regionName;t.cityName==="-"&&t.regionName==="-"&&(p="localhost"),d.set(a.ip,p),document.getElementById(`ip-${a.uuid}`).innerHTML=`<i class="fa-solid fa-location-dot me-1"></i>${$.escapeHtml(a.ip)} <strong>${p}</strong>`}).catch(t=>{document.getElementById(`ip-${a.uuid}`).innerHTML=`<i class="fa-solid fa-location-dot me-1"></i>${$.escapeHtml(a.ip)} <strong>${$.escapeHtml(t.message)}</strong>`}))};return{like:W,pagination:_,init:()=>{W.init(),R.init(),_.init(),n=L("owns"),i=L("user"),d=L("tracker"),o=L("comment"),o.has("hidden")||o.set("hidden",[]),o.has("show")||o.set("show",[])},scroll:c,cancel:b,send:w,edit:l,reply:u,remove:f,update:h,show:y,showMore:v,showOrHide:x}})();var se=(()=>{let n=null,i=()=>{let l=document.getElementById("count-down")?.getAttribute("data-time")?.replace(" ","T");if(!l){alert("invalid count down date.");return}let y=new Date(l).getTime();setInterval(()=>{let x=Math.abs(y-Date.now());document.getElementById("day").innerText=Math.floor(x/(1e3*60*60*24)),document.getElementById("hour").innerText=Math.floor(x%(1e3*60*60*24)/(1e3*60*60)),document.getElementById("minute").innerText=Math.floor(x%(1e3*60*60)/(1e3*60)),document.getElementById("second").innerText=Math.floor(x%(1e3*60)/1e3)},1e3)},d=(l,y=.01)=>{let x=document.getElementById(l),v=parseFloat(x.style.opacity),E=null;E=setInterval(()=>{if(v>0){x.style.opacity=v.toFixed(3),v-=y;return}clearInterval(E),E=null,x.remove()},10)},o=()=>{let l=window.location.search.split("to="),y=null;if(l.length>1&&l[1].length>=1&&(y=window.decodeURIComponent(l[1])),y){let v=document.getElementById("guest-name"),E=document.createElement("div");E.classList.add("m-2"),E.innerHTML=`
                <small class="mt-0 mb-1 mx-0 p-0">${v?.getAttribute("data-message")}</small>
                <p class="m-0 p-0" style="font-size: 1.5rem">${$.escapeHtml(y)}</p>
            `,v?.appendChild(E)}let x=document.getElementById("form-name");x&&(x.value=n.get("name")??y)},m=l=>{l.disabled=!0,document.body.scrollIntoView({behavior:"instant"}),F.isAutoMode()&&(document.getElementById("button-theme").style.display="block"),G.init(),F.spyTop(),te(),d("welcome",.025),$.timeOut(ne,1500)},s=l=>{let y=document.getElementById("show-modal-image");y.src=l.src,y.width=l.width,y.height=l.height,K.modal("modal-image").show()},c=()=>n.set("info",!0),g=()=>{document.querySelectorAll(".font-arabic").forEach(l=>{l.innerHTML=String(l.innerHTML).normalize("NFC")})},f=()=>{document.querySelectorAll("svg").forEach(l=>{$.timeOut(()=>l.classList.add(l.getAttribute("data-class")),parseInt(l.getAttribute("data-time")))})},h=()=>{let l=v=>new Date(v+"Z").toISOString().replace(/[-:]/g,"").split(".")[0],y=new URL("https://calendar.google.com/calendar/render"),x={action:"TEMPLATE",text:"The Wedding of Wahyu and Riski",dates:"2023-03-15 10:00:00/2023-03-15 11:00:00",details:"Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami. Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.",location:"https://goo.gl/maps/ALZR6FJZU3kxVwN86",ctz:"Asia/Jakarta"};x.dates=`${l(x.dates.split("/")[0])}/${l(x.dates.split("/")[1])}`,Object.entries(x).forEach(([v,E])=>y.searchParams.set(v,E)),document.querySelector("#home button")?.addEventListener("click",()=>window.open(y,"_blank"))},w=()=>{f(),i(),o(),g(),h(),document.getElementById("root").style.opacity="1",n.has("presence")&&(document.getElementById("form-presence").value=n.get("presence")?"1":"2"),n.get("info")&&document.getElementById("information")?.remove(),window.AOS.init(),document.body.scrollIntoView({behavior:"instant"}),d("loading",.025)},b=()=>{Q.init(),H.init(),n=L("information");let l=document.body.getAttribute("data-key");if(document.addEventListener("progress.done",()=>w()),document.addEventListener("hide.bs.modal",()=>document.activeElement?.blur()),(!l||l.length<=0)&&(J.init().load(),document.getElementById("comment")?.remove(),document.querySelector('a.nav-link[href="#comment"]')?.closest("li.nav-item")?.remove()),l.length>0){H.add(),H.add();let y=J.init();y.hasDataSrc()||y.load();let x=new URLSearchParams(window.location.search);S.setToken(x.get("k")??l),window.addEventListener("load",()=>S.guest().then(()=>{H.complete("config"),y.hasDataSrc()&&y.load(),q.init(),q.show().then(()=>H.complete("comment")).catch(()=>H.invalid("comment"))}).catch(()=>H.invalid("config")))}};return{init:()=>(F.init(),S.init(),S.isAdmin()&&(L("user").clear(),L("owns").clear(),L("likes").clear(),L("session").clear(),L("comment").clear(),L("tracker").clear()),window.addEventListener("DOMContentLoaded",b),{util:$,theme:F,comment:q,guest:{open:m,modal:s,closeInformation:c}})}})();(n=>{n.undangan=se.init()})(window);})();
