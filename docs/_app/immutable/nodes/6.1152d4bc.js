import{d as J,l as Z,p as $}from"../chunks/db.00e54736.js";import{r as x,D as ee,d as te}from"../chunks/download-square-bold.19a039a6.js";import{s as se,d as N,o as ae,i as le,n as ne,f as re}from"../chunks/scheduler.16dc3c9f.js";import{S as oe,i as ie,g as C,r as ce,s as P,h as E,j as T,u as de,c as S,y as H,f as b,k as c,a as A,x as p,v as ue,F as K,d as fe,t as me,w as _e,z as he,m as Q,n as W,o as X,I as G}from"../chunks/index.f062f94d.js";import{e as R}from"../chunks/each.e59479a4.js";import"../chunks/paths.05d322ba.js";import{p as pe,a as ve}from"../chunks/_layout.0cdfbe74.js";const ge=async({params:s})=>{const e=parseInt(s.id);if(await J.playsets.get(e)===void 0)throw x(302,"/");return{playset_id:e}},Pe=Object.freeze(Object.defineProperty({__proto__:null,load:ge},Symbol.toStringTag,{value:"Module"}));function U(s,e,t){const a=s.slice();return a[8]=e[t],a[9]=e,a[10]=t,a}function B(s){let e,t=s[0].name+"",a;return{c(){e=C("span"),a=Q(t),this.h()},l(n){e=E(n,"SPAN",{class:!0});var r=T(e);a=W(r,t),r.forEach(b),this.h()},h(){c(e,"class","svelte-1ykmdda")},m(n,r){A(n,e,r),p(e,a)},p(n,r){r&1&&t!==(t=n[0].name+"")&&X(a,t)},d(n){n&&b(e)}}}function F(s){let e,t=s[8].name+"",a;return{c(){e=C("span"),a=Q(t),this.h()},l(n){e=E(n,"SPAN",{class:!0});var r=T(e);a=W(r,t),r.forEach(b),this.h()},h(){c(e,"class","svelte-1ykmdda")},m(n,r){A(n,e,r),p(e,a)},p(n,r){r&4&&t!==(t=n[8].name+"")&&X(a,t)},d(n){n&&b(e)}}}function Y(s){let e,t,a,n,r,g,v,k='<img src="/logo.png" class="svelte-1ykmdda"/>',D,I,y,i=s[8].name!==void 0&&F(s);function f(){return s[7](s[8],s[9],s[10])}return{c(){e=C("li"),t=C("div"),a=C("img"),r=P(),i&&i.c(),g=P(),v=C("div"),v.innerHTML=k,D=P(),this.h()},l(m){e=E(m,"LI",{class:!0});var o=T(e);t=E(o,"DIV",{class:!0});var M=T(t);a=E(M,"IMG",{src:!0,alt:!0,class:!0}),r=S(M),i&&i.l(M),M.forEach(b),g=S(o),v=E(o,"DIV",{class:!0,"data-svelte-h":!0}),H(v)!=="svelte-xuqv8"&&(v.innerHTML=k),D=S(o),o.forEach(b),this.h()},h(){N(a.src,n=s[8].img_blob)||c(a,"src",n),c(a,"alt","Character"),c(a,"class","svelte-1ykmdda"),c(t,"class","front svelte-1ykmdda"),c(v,"class","back svelte-1ykmdda"),c(e,"class","character svelte-1ykmdda"),G(e,"selected",s[8].selected)},m(m,o){A(m,e,o),p(e,t),p(t,a),p(t,r),i&&i.m(t,null),p(e,g),p(e,v),p(e,D),I||(y=K(e,"click",f),I=!0)},p(m,o){s=m,o&4&&!N(a.src,n=s[8].img_blob)&&c(a,"src",n),s[8].name!==void 0?i?i.p(s,o):(i=F(s),i.c(),i.m(t,null)):i&&(i.d(1),i=null),o&4&&G(e,"selected",s[8].selected)},d(m){m&&b(e),i&&i.d(),I=!1,y()}}}function ye(s){var V;let e,t,a,n,r,g="Download Playset",v,k,D="Your Character Is:",I,y,i,f,m,o,M,j,O;a=new ee({});let _=((V=s[0])==null?void 0:V.name)!==void 0&&B(s),q=R(s[2]??[]),d=[];for(let l=0;l<q.length;l+=1)d[l]=Y(U(s,q,l));return{c(){e=C("div"),t=C("button"),ce(a.$$.fragment),n=P(),r=C("span"),r.textContent=g,v=P(),k=C("header"),k.textContent=D,I=P(),y=C("img"),f=P(),_&&_.c(),m=P(),o=C("ul");for(let l=0;l<d.length;l+=1)d[l].c();this.h()},l(l){e=E(l,"DIV",{class:!0});var u=T(e);t=E(u,"BUTTON",{class:!0});var w=T(t);de(a.$$.fragment,w),n=S(w),r=E(w,"SPAN",{class:!0,"data-svelte-h":!0}),H(r)!=="svelte-7ssi5c"&&(r.textContent=g),w.forEach(b),v=S(u),k=E(u,"HEADER",{class:!0,"data-svelte-h":!0}),H(k)!=="svelte-1xc1ida"&&(k.textContent=D),I=S(u),y=E(u,"IMG",{src:!0,alt:!0,class:!0}),f=S(u),_&&_.l(u),u.forEach(b),m=S(l),o=E(l,"UL",{class:!0});var L=T(o);for(let h=0;h<d.length;h+=1)d[h].l(L);L.forEach(b),this.h()},h(){var l;c(r,"class","svelte-1ykmdda"),c(t,"class","download svelte-1ykmdda"),c(k,"class","svelte-1ykmdda"),N(y.src,i=((l=s[0])==null?void 0:l.img_blob)??"/logo.png")||c(y,"src",i),c(y,"alt","My Character"),c(y,"class","svelte-1ykmdda"),c(e,"class","metadata svelte-1ykmdda"),c(o,"class","characters svelte-1ykmdda")},m(l,u){A(l,e,u),p(e,t),ue(a,t,null),p(t,n),p(t,r),p(e,v),p(e,k),p(e,I),p(e,y),p(e,f),_&&_.m(e,null),A(l,m,u),A(l,o,u);for(let w=0;w<d.length;w+=1)d[w]&&d[w].m(o,null);M=!0,j||(O=K(t,"click",s[3]),j=!0)},p(l,[u]){var w,L;if((!M||u&1&&!N(y.src,i=((w=l[0])==null?void 0:w.img_blob)??"/logo.png"))&&c(y,"src",i),((L=l[0])==null?void 0:L.name)!==void 0?_?_.p(l,u):(_=B(l),_.c(),_.m(e,null)):_&&(_.d(1),_=null),u&4){q=R(l[2]??[]);let h;for(h=0;h<q.length;h+=1){const z=U(l,q,h);d[h]?d[h].p(z,u):(d[h]=Y(z),d[h].c(),d[h].m(o,null))}for(;h<d.length;h+=1)d[h].d(1);d.length=q.length}},i(l){M||(fe(a.$$.fragment,l),M=!0)},o(l){me(a.$$.fragment,l),M=!1},d(l){l&&(b(e),b(m),b(o)),_e(a),_&&_.d(),he(d,l),j=!1,O()}}}function be(s,e,t){let a,n,r,g,v=ne,k=()=>(v(),v=re(n,f=>t(6,g=f)),n);s.$$.on_destroy.push(()=>v());let{data:D}=e,I;ae(async()=>{const f=await new Promise(m=>{n.subscribe(o=>{o!==void 0&&m(o)})});pe(f.title??"Play!"),t(0,I=f.characters[Math.floor(Math.random()*f.characters.length)])}),le(()=>{ve()});function y(){if(g===void 0)throw new Error("Attempting to download before playset is loaded");te(g)}const i=(f,m,o)=>t(2,m[o].selected=!f.selected,r);return s.$$set=f=>{"data"in f&&t(4,D=f.data)},s.$$.update=()=>{s.$$.dirty&16&&t(5,a=D.playset_id),s.$$.dirty&32&&k(t(1,n=Z(()=>J.playsets.get(a)))),s.$$.dirty&64&&t(2,r=(g==null?void 0:g.characters)??[]),s.$$.dirty&32&&a!==void 0&&$(a)},[I,n,r,y,D,a,g,i]}class Se extends oe{constructor(e){super(),ie(this,e,be,ye,se,{data:4})}}export{Se as component,Pe as universal};
