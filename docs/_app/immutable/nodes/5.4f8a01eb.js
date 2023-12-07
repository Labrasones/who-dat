import{s as Q,g as I,n as D,h as q,o as re,i as ne,d as x,e as ie,f as oe}from"../chunks/scheduler.16dc3c9f.js";import{S as W,i as X,B as ce,H as ue,C as fe,j as C,D as _e,f as w,E as G,a as N,g as k,s as A,r as Z,h as $,y as he,c as S,u as ee,k as y,x as d,G as O,v as te,F as me,d as E,b as ae,t as P,w as se,z as ge,m as T,n as B,p as le,o as j,A as R}from"../chunks/index.f062f94d.js";import{e as z}from"../chunks/each.e59479a4.js";import{g as pe,p as de,a as ve}from"../chunks/_layout.0cdfbe74.js";import{l as be,d as F,b as U,f as V}from"../chunks/db.00e54736.js";import"../chunks/paths.05d322ba.js";import{S as ye}from"../chunks/shield-warning-bold.a331ddf5.js";function we(f){let e,s,n='<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11.5" cy="11.5" r="9.5"/><path stroke-linecap="round" d="M18.5 18.5L22 22"/></g>',u=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},f[0]],i={};for(let a=0;a<u.length;a+=1)i=I(i,u[a]);return{c(){e=ce("svg"),s=new ue(!0),this.h()},l(a){e=fe(a,"svg",{viewBox:!0,width:!0,height:!0});var o=C(e);s=_e(o,!0),o.forEach(w),this.h()},h(){s.a=null,G(e,i)},m(a,o){N(a,e,o),s.m(n,e)},p(a,[o]){G(e,i=pe(u,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},o&1&&a[0]]))},i:D,o:D,d(a){a&&w(e)}}}function ke(f,e,s){return f.$$set=n=>{s(0,e=I(I({},e),q(n)))},e=q(e),[e]}class $e extends W{constructor(e){super(),X(this,e,ke,we,Q,{})}}function Y(f,e,s){var i;const n=f.slice();n[5]=e[s],n[8]=s;const u=((i=n[5].characters)==null?void 0:i.length)??0;return n[6]=u,n}function J(f){let e,s,n,u,i=f[6]+"",a,o,m=f[6]!==1?"s":"",v,b,g;return s=new ye({}),{c(){e=k("span"),Z(s.$$.fragment),n=A(),u=k("small"),a=T(i),o=T("/24 chacacter"),v=T(m),b=T("!"),this.h()},l(_){e=$(_,"SPAN",{class:!0});var l=C(e);ee(s.$$.fragment,l),n=S(l),u=$(l,"SMALL",{});var r=C(u);a=B(r,i),o=B(r,"/24 chacacter"),v=B(r,m),b=B(r,"!"),r.forEach(w),l.forEach(w),this.h()},h(){y(e,"class","warning svelte-1722kaa")},m(_,l){N(_,e,l),te(s,e,null),d(e,n),d(e,u),d(u,a),d(u,o),d(u,v),d(u,b),g=!0},p(_,l){(!g||l&4)&&i!==(i=_[6]+"")&&j(a,i),(!g||l&4)&&m!==(m=_[6]!==1?"s":"")&&j(v,m)},i(_){g||(E(s.$$.fragment,_),g=!0)},o(_){P(s.$$.fragment,_),g=!1},d(_){_&&w(e),se(s)}}}function K(f){let e,s,n,u,i,a,o=f[5].title+"",m,v,b,g,_,l=f[6]<24&&J(f);return{c(){e=k("a"),l&&l.c(),s=A(),n=k("img"),i=A(),a=k("span"),m=T(o),v=A(),this.h()},l(r){e=$(r,"A",{href:!0,class:!0});var t=C(e);l&&l.l(t),s=S(t),n=$(t,"IMG",{src:!0,alt:!0}),i=S(t),a=$(t,"SPAN",{class:!0});var M=C(a);m=B(M,o),M.forEach(w),v=S(t),t.forEach(w),this.h()},h(){x(n.src,u=f[5].img_blob??"/logo.png")||y(n,"src",u),y(n,"alt","Playset icon"),y(a,"class","svelte-1722kaa"),y(e,"href",b="/game/"+f[5].id),y(e,"class","svelte-1722kaa")},m(r,t){N(r,e,t),l&&l.m(e,null),d(e,s),d(e,n),d(e,i),d(e,a),d(a,m),d(e,v),_=!0},p(r,t){r[6]<24?l?(l.p(r,t),t&4&&E(l,1)):(l=J(r),l.c(),E(l,1),l.m(e,s)):l&&(le(),P(l,1,1,()=>{l=null}),ae()),(!_||t&4&&!x(n.src,u=r[5].img_blob??"/logo.png"))&&y(n,"src",u),(!_||t&4)&&o!==(o=r[5].title+"")&&j(m,o),(!_||t&4&&b!==(b="/game/"+r[5].id))&&y(e,"href",b)},i(r){_||(E(l),r&&ie(()=>{_&&(g||(g=R(e,V,{duration:1e3,y:50,easing:U},!0)),g.run(1))}),_=!0)},o(r){P(l),r&&(g||(g=R(e,V,{duration:1e3,y:50,easing:U},!1)),g.run(0)),_=!1},d(r){r&&w(e),l&&l.d(),r&&g&&g.end()}}}function Ee(f){let e,s,n="Select a Playset",u,i,a,o,m,v,b,g,_,l;m=new $e({});let r=z(f[2]??[]),t=[];for(let c=0;c<r.length;c+=1)t[c]=K(Y(f,r,c));const M=c=>P(t[c],1,1,()=>{t[c]=null});return{c(){e=k("article"),s=k("header"),s.textContent=n,u=A(),i=k("nav"),a=k("input"),o=A(),Z(m.$$.fragment),v=A(),b=k("section");for(let c=0;c<t.length;c+=1)t[c].c();this.h()},l(c){e=$(c,"ARTICLE",{class:!0});var p=C(e);s=$(p,"HEADER",{class:!0,"data-svelte-h":!0}),he(s)!=="svelte-1u1cjxd"&&(s.textContent=n),u=S(p),i=$(p,"NAV",{});var h=C(i);a=$(h,"INPUT",{type:!0,placeholder:!0}),o=S(h),ee(m.$$.fragment,h),h.forEach(w),v=S(p),b=$(p,"SECTION",{class:!0});var L=C(b);for(let H=0;H<t.length;H+=1)t[H].l(L);L.forEach(w),p.forEach(w),this.h()},h(){y(s,"class","svelte-1722kaa"),y(a,"type","text"),y(a,"placeholder","search"),y(b,"class","svelte-1722kaa"),y(e,"class","svelte-1722kaa")},m(c,p){N(c,e,p),d(e,s),d(e,u),d(e,i),d(i,a),O(a,f[0]),d(i,o),te(m,i,null),d(e,v),d(e,b);for(let h=0;h<t.length;h+=1)t[h]&&t[h].m(b,null);g=!0,_||(l=me(a,"input",f[3]),_=!0)},p(c,[p]){if(p&1&&a.value!==c[0]&&O(a,c[0]),p&4){r=z(c[2]??[]);let h;for(h=0;h<r.length;h+=1){const L=Y(c,r,h);t[h]?(t[h].p(L,p),E(t[h],1)):(t[h]=K(L),t[h].c(),E(t[h],1),t[h].m(b,null))}for(le(),h=r.length;h<t.length;h+=1)M(h);ae()}},i(c){if(!g){E(m.$$.fragment,c);for(let p=0;p<r.length;p+=1)E(t[p]);g=!0}},o(c){P(m.$$.fragment,c),t=t.filter(Boolean);for(let p=0;p<t.length;p+=1)P(t[p]);g=!1},d(c){c&&w(e),se(m),ge(t,c),_=!1,l()}}}function Ce(f,e,s){let n,u,i=D,a=()=>(i(),i=oe(n,v=>s(2,u=v)),n);f.$$.on_destroy.push(()=>i());let o;re(()=>{de("Choose Your Playset")}),ne(()=>{ve()});function m(){o=this.value,s(0,o)}return f.$$.update=()=>{f.$$.dirty&1&&a(s(1,n=be(async()=>(console.log("Search with str: ",o),o?await F.playsets.filter(v=>v.title?v.title.toLowerCase().includes(o.toLowerCase()):!1).toArray():await F.playsets.toArray()))))},[o,n,u,m]}class Ne extends W{constructor(e){super(),X(this,e,Ce,Ee,Q,{})}}export{Ne as component};