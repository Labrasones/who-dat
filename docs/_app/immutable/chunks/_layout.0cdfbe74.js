import{s as O,c as Ve,e as ne,g as M,n as T,o as Ze,h as G,k as De,u as qe,l as je,m as Re,r as Ue}from"./scheduler.16dc3c9f.js";import{S as K,i as W,e as Te,a as B,d as x,p as we,t as C,b as ye,f as h,q as Pe,g as p,r as R,h as w,j as y,u as Q,k as v,x as _,v as U,w as F,A as se,H as ie,D as re,B as be,C as $e,E as J,s as A,c as H,m as Fe,y as z,n as Ge,F as Be,o as Je,J as Se,K as Oe}from"./index.f062f94d.js";import{f as ge,a as ae,d as Ke,b as We}from"./db.00e54736.js";import{w as Ie}from"./paths.05d322ba.js";function X(i,e){const s={},t={},a={$$scope:1};let l=i.length;for(;l--;){const n=i[l],r=e[l];if(r){for(const c in n)c in r||(t[c]=1);for(const c in r)a[c]||(s[c]=r[c],a[c]=1);i[l]=r}else for(const c in n)a[c]=1}for(const n in t)n in s||(s[n]=void 0);return s}function Le(i){return typeof i=="object"&&i!==null?i:{}}function Ne(i){let e,s,t,a,l,n;const r=[{dismiss:i[0].dismiss},i[0].props];var c=i[0].component;function f(o,u){let d={};if(u!==void 0&&u&1)d=X(r,[{dismiss:o[0].dismiss},Le(o[0].props)]);else for(let g=0;g<r.length;g+=1)d=M(d,r[g]);return{props:d}}return c&&(t=Pe(c,f(i))),{c(){e=p("div"),s=p("span"),t&&R(t.$$.fragment),this.h()},l(o){e=w(o,"DIV",{class:!0});var u=y(e);s=w(u,"SPAN",{class:!0});var d=y(s);t&&Q(t.$$.fragment,d),d.forEach(h),u.forEach(h),this.h()},h(){v(s,"class","svelte-1kik9dq"),v(e,"class","svelte-1kik9dq")},m(o,u){B(o,e,u),_(e,s),t&&U(t,s,null),n=!0},p(o,u){if(u&1&&c!==(c=o[0].component)){if(t){we();const d=t;C(d.$$.fragment,1,0,()=>{F(d,1)}),ye()}c?(t=Pe(c,f(o,u)),R(t.$$.fragment),x(t.$$.fragment,1),U(t,s,null)):t=null}else if(c){const d=u&1?X(r,[{dismiss:o[0].dismiss},Le(o[0].props)]):{};t.$set(d)}},i(o){n||(t&&x(t.$$.fragment,o),o&&ne(()=>{n&&(a||(a=se(s,ge,{y:-25,duration:450,delay:125},!0)),a.run(1))}),o&&ne(()=>{n&&(l||(l=se(e,ae,{duration:250},!0)),l.run(1))}),n=!0)},o(o){t&&C(t.$$.fragment,o),o&&(a||(a=se(s,ge,{y:-25,duration:450,delay:125},!1)),a.run(0)),o&&(l||(l=se(e,ae,{duration:250},!1)),l.run(0)),n=!1},d(o){o&&h(e),t&&F(t),o&&a&&a.end(),o&&l&&l.end()}}}function ze(i){let e,s,t=i[0]!==void 0&&Ne(i);return{c(){t&&t.c(),e=Te()},l(a){t&&t.l(a),e=Te()},m(a,l){t&&t.m(a,l),B(a,e,l),s=!0},p(a,[l]){a[0]!==void 0?t?(t.p(a,l),l&1&&x(t,1)):(t=Ne(a),t.c(),x(t,1),t.m(e.parentNode,e)):t&&(we(),C(t,1,1,()=>{t=null}),ye())},i(a){s||(x(t),s=!0)},o(a){C(t),s=!1},d(a){a&&h(e),t&&t.d(a)}}}const pe=Ie([]);function Qe(i,e){let s;const t=new Promise(a=>s=a);return pe.update(a=>{const l=a.push({component:i,props:e,dismiss:n=>{pe.update(r=>(r.splice(l-1,1),r)),s(n)}});return a}),t}function Xe(i,e,s){let t,a;return Ve(i,pe,l=>s(1,a=l)),i.$$.update=()=>{i.$$.dirty&2&&s(0,t=a[0])},[t,a]}class Ye extends K{constructor(e){super(),W(this,e,Xe,ze,O,{})}}function et(i){let e,s,t;return{c(){e=p("article"),s=p("p"),t=new ie(!1),this.h()},l(a){e=w(a,"ARTICLE",{class:!0});var l=y(e);s=w(l,"P",{class:!0});var n=y(s);t=re(n,!1),n.forEach(h),l.forEach(h),this.h()},h(){t.a=null,v(s,"class","svelte-g3kbh3"),v(e,"class","svelte-g3kbh3")},m(a,l){B(a,e,l),_(e,s),t.m(i[0],s)},p(a,[l]){l&1&&t.p(a[0])},i:T,o:T,d(a){a&&h(e)}}}function tt(i,e,s){let{dismiss:t}=e,{message:a}=e,{display_ms:l=1e3}=e;return Ze(()=>{setTimeout(t,l)}),i.$$set=n=>{"dismiss"in n&&s(1,t=n.dismiss),"message"in n&&s(0,a=n.message),"display_ms"in n&&s(2,l=n.display_ms)},[a,t,l]}class st extends K{constructor(e){super(),W(this,e,tt,et,O,{dismiss:1,message:0,display_ms:2})}}function nt(i){let e,s,t='<path fill="currentColor" d="M19 22H5v-2h14v2m-3-4H8l2.18-8H8V8h2.72l.07-.26A2.97 2.97 0 0 1 9.25 6.2c-.67-1.52.02-3.29 1.54-3.95c1.52-.67 3.29.02 3.95 1.54a2.99 2.99 0 0 1-1.54 3.95l.07.26H16v2h-2.18L16 18Z"/>',a=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},i[0]],l={};for(let n=0;n<a.length;n+=1)l=M(l,a[n]);return{c(){e=be("svg"),s=new ie(!0),this.h()},l(n){e=$e(n,"svg",{viewBox:!0,width:!0,height:!0});var r=y(e);s=re(r,!0),r.forEach(h),this.h()},h(){s.a=null,J(e,l)},m(n,r){B(n,e,r),s.m(t,e)},p(n,[r]){J(e,l=X(a,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},r&1&&n[0]]))},i:T,o:T,d(n){n&&h(e)}}}function at(i,e,s){return i.$$set=t=>{s(0,e=M(M({},e),G(t)))},e=G(e),[e]}class lt extends K{constructor(e){super(),W(this,e,at,nt,O,{})}}function it(i){let e,s,t='<path fill="currentColor" fill-rule="evenodd" d="m10.667 6.134l-.502-.355A4.241 4.241 0 0 0 7.715 5h-.612c-.405 0-.813.025-1.194.16c-2.383.846-4.022 3.935-3.903 10.943c.024 1.412.354 2.972 1.628 3.581A3.2 3.2 0 0 0 5.027 20a2.74 2.74 0 0 0 1.53-.437c.41-.268.77-.616 1.13-.964c.444-.43.888-.86 1.424-1.138a4.106 4.106 0 0 1 1.89-.461H13c.658 0 1.306.158 1.89.46c.536.279.98.709 1.425 1.139c.36.348.72.696 1.128.964c.39.256.895.437 1.531.437a3.2 3.2 0 0 0 1.393-.316c1.274-.609 1.604-2.17 1.628-3.581c.119-7.008-1.52-10.097-3.903-10.942C17.71 5.025 17.3 5 16.897 5h-.612a4.24 4.24 0 0 0-2.45.78l-.502.354a2.308 2.308 0 0 1-2.666 0ZM16.75 9a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5Zm-9.25.25a.75.75 0 0 1 .75.75v.75H9a.75.75 0 0 1 0 1.5h-.75V13a.75.75 0 0 1-1.5 0v-.75H6a.75.75 0 0 1 0-1.5h.75V10a.75.75 0 0 1 .75-.75Zm11.5 2a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0Zm-3.75.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5Zm2.25.75a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0Z" clip-rule="evenodd"/>',a=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},i[0]],l={};for(let n=0;n<a.length;n+=1)l=M(l,a[n]);return{c(){e=be("svg"),s=new ie(!0),this.h()},l(n){e=$e(n,"svg",{viewBox:!0,width:!0,height:!0});var r=y(e);s=re(r,!0),r.forEach(h),this.h()},h(){s.a=null,J(e,l)},m(n,r){B(n,e,r),s.m(t,e)},p(n,[r]){J(e,l=X(a,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},r&1&&n[0]]))},i:T,o:T,d(n){n&&h(e)}}}function rt(i,e,s){return i.$$set=t=>{s(0,e=M(M({},e),G(t)))},e=G(e),[e]}class ot extends K{constructor(e){super(),W(this,e,rt,it,O,{})}}function ct(i){let e,s,t='<path fill="currentColor" fill-rule="evenodd" d="M12 15.75a.75.75 0 0 0 .75-.75V4.027l1.68 1.961a.75.75 0 1 0 1.14-.976l-3-3.5a.75.75 0 0 0-1.14 0l-3 3.5a.75.75 0 1 0 1.14.976l1.68-1.96V15c0 .414.336.75.75.75Z" clip-rule="evenodd"/><path fill="currentColor" d="M16 9c-.702 0-1.053 0-1.306.169a1 1 0 0 0-.275.275c-.169.253-.169.604-.169 1.306V15a2.25 2.25 0 1 1-4.5 0v-4.25c0-.702 0-1.053-.169-1.306a1 1 0 0 0-.275-.275C9.053 9 8.702 9 8 9c-2.828 0-4.243 0-5.121.879C2 10.757 2 12.17 2 14.999v1c0 2.83 0 4.243.879 5.122C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.879C22 20.242 22 18.828 22 16v-1c0-2.829 0-4.243-.879-5.121C20.243 9 18.828 9 16 9Z"/>',a=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},i[0]],l={};for(let n=0;n<a.length;n+=1)l=M(l,a[n]);return{c(){e=be("svg"),s=new ie(!0),this.h()},l(n){e=$e(n,"svg",{viewBox:!0,width:!0,height:!0});var r=y(e);s=re(r,!0),r.forEach(h),this.h()},h(){s.a=null,J(e,l)},m(n,r){B(n,e,r),s.m(t,e)},p(n,[r]){J(e,l=X(a,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},r&1&&n[0]]))},i:T,o:T,d(n){n&&h(e)}}}function ft(i,e,s){return i.$$set=t=>{s(0,e=M(M({},e),G(t)))},e=G(e),[e]}class ut extends K{constructor(e){super(),W(this,e,ft,ct,O,{})}}function dt(i){let e,s,t,a='<img src="/logo.png" alt="Who Dat Logo" class="svelte-few9xe"/>',l,n,r=(i[2]??"")+"",c,f,o,u,d,g,E,oe,S,ke="Manage",ce,P,N,fe,I,Ce="New game",ue,k,V,de,D,Ee="Upload",_e,L,he,Z,me,Ae;const ve=i[5].default,b=De(ve,i,i[4],null);return E=new lt({}),N=new ot({}),V=new ut({}),{c(){e=p("div"),s=p("header"),t=p("a"),t.innerHTML=a,l=A(),n=p("span"),c=Fe(r),f=A(),o=p("page"),b&&b.c(),u=A(),d=p("nav"),g=p("a"),R(E.$$.fragment),oe=A(),S=p("span"),S.textContent=ke,ce=A(),P=p("a"),R(N.$$.fragment),fe=A(),I=p("span"),I.textContent=Ce,ue=A(),k=p("label"),R(V.$$.fragment),de=A(),D=p("span"),D.textContent=Ee,_e=A(),L=p("input"),this.h()},l(m){e=w(m,"DIV",{class:!0});var $=y(e);s=w($,"HEADER",{class:!0});var Y=y(s);t=w(Y,"A",{href:!0,class:!0,"data-svelte-h":!0}),z(t)!=="svelte-fqax1x"&&(t.innerHTML=a),l=H(Y),n=w(Y,"SPAN",{class:!0});var He=y(n);c=Ge(He,r),He.forEach(h),Y.forEach(h),f=H($),o=w($,"PAGE",{class:!0});var Me=y(o);b&&b.l(Me),Me.forEach(h),u=H($),d=w($,"NAV",{class:!0});var q=y(d);g=w(q,"A",{href:!0,class:!0});var ee=y(g);Q(E.$$.fragment,ee),oe=H(ee),S=w(ee,"SPAN",{"data-svelte-h":!0}),z(S)!=="svelte-1y5w8gx"&&(S.textContent=ke),ee.forEach(h),ce=H(q),P=w(q,"A",{href:!0,class:!0});var te=y(P);Q(N.$$.fragment,te),fe=H(te),I=w(te,"SPAN",{"data-svelte-h":!0}),z(I)!=="svelte-1ukeily"&&(I.textContent=Ce),te.forEach(h),ue=H(q),k=w(q,"LABEL",{for:!0,class:!0});var j=y(k);Q(V.$$.fragment,j),de=H(j),D=w(j,"SPAN",{"data-svelte-h":!0}),z(D)!=="svelte-1brphr3"&&(D.textContent=Ee),_e=H(j),L=w(j,"INPUT",{id:!0,type:!0,class:!0}),j.forEach(h),q.forEach(h),$.forEach(h),this.h()},h(){v(t,"href","/"),v(t,"class","svelte-few9xe"),v(n,"class","logo-theme svelte-few9xe"),v(s,"class","svelte-few9xe"),v(o,"class","svelte-few9xe"),v(g,"href","/editor"),v(g,"class","svelte-few9xe"),v(P,"href","/game"),v(P,"class","newgame svelte-few9xe"),v(L,"id","importPlayset"),v(L,"type","file"),v(L,"class","svelte-few9xe"),v(k,"for","importPlayset"),v(k,"class","svelte-few9xe"),v(d,"class","svelte-few9xe"),v(e,"class","container svelte-few9xe")},m(m,$){B(m,e,$),_(e,s),_(s,t),_(s,l),_(s,n),_(n,c),_(e,f),_(e,o),b&&b.m(o,null),_(e,u),_(e,d),_(d,g),U(E,g,null),_(g,oe),_(g,S),_(d,ce),_(d,P),U(N,P,null),_(P,fe),_(P,I),_(d,ue),_(d,k),U(V,k,null),_(k,de),_(k,D),_(k,_e),_(k,L),Z=!0,me||(Ae=[Be(L,"change",i[6]),Be(L,"change",i[3])],me=!0)},p(m,$){(!Z||$&4)&&r!==(r=(m[2]??"")+"")&&Je(c,r),b&&b.p&&(!Z||$&16)&&qe(b,ve,m,m[4],Z?Re(ve,m[4],$,null):je(m[4]),null)},i(m){Z||(x(b,m),x(E.$$.fragment,m),x(N.$$.fragment,m),x(V.$$.fragment,m),m&&(he||ne(()=>{he=Se(e,ae,{duration:250}),he.start()})),Z=!0)},o(m){C(b,m),C(E.$$.fragment,m),C(N.$$.fragment,m),C(V.$$.fragment,m),Z=!1},d(m){m&&h(e),b&&b.d(m),F(E),F(N),F(V),me=!1,Ue(Ae)}}}function _t(i){let e,s='<img src="/logo.png" alt="splash" class="svelte-few9xe"/>',t,a,l;return{c(){e=p("div"),e.innerHTML=s,this.h()},l(n){e=w(n,"DIV",{class:!0,"data-svelte-h":!0}),z(e)!=="svelte-1cgpn6"&&(e.innerHTML=s),this.h()},h(){v(e,"class","splash svelte-few9xe")},m(n,r){B(n,e,r),l=!0},p:T,i(n){l||(n&&ne(()=>{l&&(a&&a.end(1),t=Se(e,ge,{duration:1e3,y:1e3,easing:We,opacity:0}),t.start())}),l=!0)},o(n){t&&t.invalidate(),n&&(a=Oe(e,ae,{duration:250})),l=!1},d(n){n&&h(e),n&&a&&a.end()}}}function ht(i){let e,s,t,a,l;const n=[_t,dt],r=[];function c(f,o){return f[0]?0:1}return e=c(i),s=r[e]=n[e](i),a=new Ye({}),{c(){s.c(),t=A(),R(a.$$.fragment)},l(f){s.l(f),t=H(f),Q(a.$$.fragment,f)},m(f,o){r[e].m(f,o),B(f,t,o),U(a,f,o),l=!0},p(f,[o]){let u=e;e=c(f),e===u?r[e].p(f,o):(we(),C(r[u],1,1,()=>{r[u]=null}),ye(),s=r[e],s?s.p(f,o):(s=r[e]=n[e](f),s.c()),x(s,1),s.m(t.parentNode,t))},i(f){l||(x(s),x(a.$$.fragment,f),l=!0)},o(f){C(s),C(a.$$.fragment,f),l=!1},d(f){f&&h(t),r[e].d(f),F(a,f)}}}let le=[];function bt(i){le.unshift(i),xe.set(le[0])}function $t(){le.shift(),xe.set(le[0])}let xe=Ie("");const mt=3e3;function vt(i,e,s){let t,a=T;Ve(i,xe,u=>s(2,t=u)),i.$$.on_destroy.push(()=>a());let{$$slots:l={},$$scope:n}=e,r=!1,c;Ze(()=>{setTimeout(()=>{s(0,r=!1)},mt)});async function f(){if((c==null?void 0:c.length)<1)return;const u=await new Promise(d=>{const g=new FileReader;g.onload=()=>{if(typeof g.result!="string")return;const E=JSON.parse(g.result);delete E.id,d(E)},g.readAsText(c[0])});Ke.playsets.add(u),Qe(st,{message:`Imported ${u.title}!`})}function o(){c=this.files,s(1,c)}return i.$$set=u=>{"$$scope"in u&&s(4,n=u.$$scope)},[r,c,t,f,n,l,o]}class xt extends K{constructor(e){super(),W(this,e,vt,ht,O,{})}}export{xt as L,$t as a,Qe as b,X as g,bt as p};
