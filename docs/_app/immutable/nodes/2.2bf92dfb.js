import{s as N,c as R,d as E,e as T,n as j,f as z}from"../chunks/scheduler.16dc3c9f.js";import{S as B,i as D,g as m,s as x,h as g,j as v,y as G,c as k,f as b,k as h,a as w,x as d,d as y,b as H,t as A,z as J,m as L,n as M,o as F,A as C,p as K}from"../chunks/index.f062f94d.js";import{e as S}from"../chunks/each.e59479a4.js";import{l as Q,d as U,b as $,f as I,r as V}from"../chunks/db.00e54736.js";function O(o,a,l){const c=o.slice();return c[3]=a[l],c[5]=l,c}function P(o){let a,l,c,f,i,u=o[3].title+"",_,t,p,s,r;return{c(){a=m("a"),l=m("img"),f=x(),i=m("span"),_=L(u),t=x(),this.h()},l(e){a=g(e,"A",{href:!0,class:!0});var n=v(a);l=g(n,"IMG",{src:!0,alt:!0}),f=k(n),i=g(n,"SPAN",{class:!0});var q=v(i);_=M(q,u),q.forEach(b),t=k(n),n.forEach(b),this.h()},h(){E(l.src,c=o[3].img_blob)||h(l,"src",c),h(l,"alt","Playset icon"),h(i,"class","svelte-1xu3qfe"),h(a,"href",p="/game/"+o[3].id),h(a,"class","svelte-1xu3qfe")},m(e,n){w(e,a,n),d(a,l),d(a,f),d(a,i),d(i,_),d(a,t),r=!0},p(e,n){(!r||n&2&&!E(l.src,c=e[3].img_blob))&&h(l,"src",c),(!r||n&2)&&u!==(u=e[3].title+"")&&F(_,u),(!r||n&2&&p!==(p="/game/"+e[3].id))&&h(a,"href",p)},i(e){r||(e&&T(()=>{r&&(s||(s=C(a,I,{duration:1e3,y:50,easing:$},!0)),s.run(1))}),r=!0)},o(e){e&&(s||(s=C(a,I,{duration:1e3,y:50,easing:$},!1)),s.run(0)),r=!1},d(e){e&&b(a),e&&s&&s.end()}}}function W(o){let a,l,c="Jump back in",f,i,u,_=S(o[1]??[]),t=[];for(let s=0;s<_.length;s+=1)t[s]=P(O(o,_,s));const p=s=>A(t[s],1,1,()=>{t[s]=null});return{c(){a=m("article"),l=m("header"),l.textContent=c,f=x(),i=m("section");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){a=g(s,"ARTICLE",{class:!0});var r=v(a);l=g(r,"HEADER",{class:!0,"data-svelte-h":!0}),G(l)!=="svelte-11gbqm"&&(l.textContent=c),f=k(r),i=g(r,"SECTION",{class:!0});var e=v(i);for(let n=0;n<t.length;n+=1)t[n].l(e);e.forEach(b),r.forEach(b),this.h()},h(){h(l,"class","svelte-1xu3qfe"),h(i,"class","svelte-1xu3qfe"),h(a,"class","svelte-1xu3qfe")},m(s,r){w(s,a,r),d(a,l),d(a,f),d(a,i);for(let e=0;e<t.length;e+=1)t[e]&&t[e].m(i,null);u=!0},p(s,[r]){if(r&2){_=S(s[1]??[]);let e;for(e=0;e<_.length;e+=1){const n=O(s,_,e);t[e]?(t[e].p(n,r),y(t[e],1)):(t[e]=P(n),t[e].c(),y(t[e],1),t[e].m(i,null))}for(K(),e=_.length;e<t.length;e+=1)p(e);H()}},i(s){if(!u){for(let r=0;r<_.length;r+=1)y(t[r]);u=!0}},o(s){t=t.filter(Boolean);for(let r=0;r<t.length;r+=1)A(t[r]);u=!1},d(s){s&&b(a),J(t,s)}}}function X(o,a,l){let c,f,i,u=j,_=()=>(u(),u=z(c,t=>l(1,i=t)),c);return R(o,V,t=>l(2,f=t)),o.$$.on_destroy.push(()=>u()),o.$$.update=()=>{o.$$.dirty&4&&_(l(0,c=Q(async()=>await U.playsets.where("id").anyOf(f).toArray())))},[c,i,f]}class se extends B{constructor(a){super(),D(this,a,X,W,N,{})}}export{se as component};
