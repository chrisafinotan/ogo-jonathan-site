(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{6699:function(a,e,t){"use strict";var n=t(7294),i=t(8440),r=t(4782),s=t(8694),o=t.n(s),c=t(5893);e.Z=function(a){var e=a.text,t=void 0===e?"empty":e,s=(a.startFont,a.endFont,a.startSize,a.endSize,a.color,a.startColor,a.className),l=a.id,d=a.index,u=(a.onMouseEnter,a.onMouseExit,a.originX),p=void 0===u?0:u,v=a.originY,h=void 0===v?0:v,_=((0,i._)(),(0,n.useState)(!1)),x=(_[0],_[1],{init:{transition:{duration:.2},filter:"invert(1)"},anim:{filter:"invert(0)",originX:p,originY:h,backgroundColor:"#0028ff",transition:{duration:.2}}});return(0,c.jsx)(r.E.div,{className:"".concat(o().cdiv),id:l,"data-index":d,children:(0,c.jsx)(r.E.span,{variants:x,whileHover:"anim",className:s,index:d,children:t})})}},831:function(a,e,t){"use strict";var n=t(7294),i=t(6030),r=t(5893);e.Z=function(a){var e=a.text,t=a.className,s=(0,n.useState)(),o=s[0],c=s[1],l=(0,n.useState)(!1),d=l[0],u=l[1],p=(0,n.useRef)();(0,n.useEffect)((function(){p.current.innerHTML=p.current.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),u(!0)}),[]),(0,n.useEffect)((function(){d&&function(a){c([i.Z.timeline({targets:a,autoplay:!1}).add({duration:100,delay:i.Z.stagger(30),easing:"easeOutSine",opacity:1,rotateY:[90,0],color:"#F00"}),i.Z.timeline({targets:a,autoplay:!1}).add({duration:100,delay:i.Z.stagger(30,{direction:"reverse"}),easing:"easeOutSine",opacity:1,color:"#FFF",rotateY:[-90,0]})])}(".text_".concat(String(e).replace(/\s+/g,"")," .letter"))}),[d]),(0,n.useEffect)((function(){o&&o[0]&&o[1].play()}),[o]);return(0,r.jsx)("div",{className:t,children:(0,r.jsx)("span",{className:"text_".concat(String(e).replace(/\s+/g,"")),onMouseEnter:function(a){o&&o[0].play()},onMouseLeave:function(a){o&&o[1].play()},children:(0,r.jsx)("span",{ref:p,className:"letters",children:e})})})}},1555:function(a,e,t){"use strict";t.d(e,{Z:function(){return C}});var n=t(7294),i=t(1664),r=t(4782),s=t(4421),o=t(1770),c=t.n(o),l=t(6699),d=t(4942),u=t(4925),p=t(1163),v=t(5893),h=["activeClassName","children","router"];function _(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(a);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.push.apply(t,n)}return t}function x(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?_(Object(t),!0).forEach((function(e){(0,d.Z)(a,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):_(Object(t)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(t,e))}))}return a}var m=(0,p.withRouter)((function(a){var e=a.activeClassName,t=void 0===e?"activeLink":e,r=a.children,s=a.router,o=(0,u.Z)(a,h),c=n.Children.only(r),l=c.props.className||"",d="string"===typeof o.href?o.href:o.href.pathname||null;return(s.pathname===d||"/"!==d&&String(s.pathname).includes(d))&&(l+=" ".concat(t)),(0,v.jsx)(i.default,x(x({},o),{},{children:(0,n.cloneElement)(c,{className:l})}))})),g=t(9812),b=t(743),f=t(831),j=["#3addcd","#3524a3","#af4778","#b5c762","#dcb450","#e91c1c"],N={show:{transition:{staggerChildren:.5}},exit:{transition:{staggerChildren:1}}},y={hidden:{opacity:0,y:20,rotateX:-90},show:{opacity:1,y:0,rotateX:0,transition:{ease:[.6,.01,-.05,.95],duration:.7}},exit:{opacity:0,y:-10,transition:{ease:"easeInOut",duration:.7,when:"afterChildren"}}},O={hidden:{opacity:0},exit:{opacity:0,transition:{ease:"easeInOut",duration:.75}}};function E(){var a=(0,b.G)(),e=(0,n.useState)(!1),t=e[0],o=e[1],d=(0,n.useState)("none"),u=d[0],p=d[1],h=function(){o(!1),p()};return(0,v.jsx)("div",{className:c().navbarWrapper,children:a.md?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{className:c().header__wrapper,children:(0,v.jsx)(g.N,{toggled:t,onToggle:function(a){a?(p(j[Math.floor(Math.random()*j.length)]),o(!0)):(p("white"),o(!1))},distance:"lg"})}),t&&(0,v.jsx)(r.E.div,{className:c().navbar,children:(0,v.jsx)(s.M,{children:(0,v.jsx)(r.E.div,{variants:O,initial:"hidden",animate:{opacity:1,backgroundColor:u},exit:"exit",className:c().navbarContent,onClick:h,children:(0,v.jsxs)(r.E.div,{variants:N,style:{originY:0},initial:"hidden",animate:"show",exit:"exit",className:c().navbarLinks,children:[(0,v.jsx)(r.E.div,{variants:y,className:"".concat(c().page),children:(0,v.jsx)(i.default,{href:"/",children:(0,v.jsx)("a",{className:c().navbar__link,children:(0,v.jsx)(l.Z,{className:"".concat(c().home),text:"OGO JONATHAN",color:u})})})},"navbar-link-home-motion"),(0,v.jsx)(r.E.div,{variants:y,className:"".concat(c().page),children:(0,v.jsx)(i.default,{href:"/projects",children:(0,v.jsx)("a",{children:(0,v.jsx)(l.Z,{className:"".concat(c().projects),text:"PROJECTS",color:u})})})},"navbar-link-projects-motion"),(0,v.jsx)(r.E.div,{variants:y,className:"".concat(c().page),children:(0,v.jsx)(i.default,{href:"/about",children:(0,v.jsx)("a",{children:(0,v.jsx)(l.Z,{className:"".concat(c().about),text:"ABOUT",color:u})})})},"navbar-link-about-motion"),(0,v.jsx)(r.E.div,{variants:y,className:"".concat(c().page),children:(0,v.jsx)(i.default,{href:"/contact",children:(0,v.jsx)("a",{children:(0,v.jsx)(l.Z,{className:"".concat(c().contact),text:"CONTACT",color:u})})})},"navbar-link-contact-motion")]},"navbar-links-container-motion")},"navbar-wrapper-motion")})})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{className:"".concat(c().navbar__home),children:(0,v.jsx)(m,{href:"/",children:(0,v.jsx)("a",{className:c().navbar__link,children:(0,v.jsx)(f.Z,{text:"OJ"})})})}),(0,v.jsxs)(r.E.div,{className:c().navbar__lrg,onClick:h,children:[(0,v.jsx)("div",{className:"".concat(c().page__lrg),children:(0,v.jsx)(m,{href:"/projects",children:(0,v.jsx)("a",{children:(0,v.jsx)(f.Z,{text:"PROJECTS"})})})},"navbar-link-projects-motion__lrg"),(0,v.jsx)("div",{className:"".concat(c().page__lrg),children:(0,v.jsx)(m,{href:"/about",children:(0,v.jsx)("a",{children:(0,v.jsx)(f.Z,{text:"ABOUT"})})})},"navbar-link-about-motion__lrg"),(0,v.jsx)("div",{className:"".concat(c().page__lrg),children:(0,v.jsx)(m,{href:"/contact",children:(0,v.jsx)("a",{children:(0,v.jsx)(f.Z,{text:"CONTACT"})})})},"navbar-link-contact-motion")]})]})})}var w=t(9008);function C(a){var e=a.children;return(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(w.default,{children:(0,v.jsx)("title",{children:"Ogo Jonathan"})}),(0,v.jsx)(E,{}),(0,v.jsx)("div",{className:"siteContent",children:e})]})}},5288:function(a,e,t){"use strict";t.r(e),t.d(e,{default:function(){return u}});var n=t(1555),i=t(4261),r=t.n(i),s=t(4782),o=t(5893),c={init:{opacity:0,transition:{duration:.2}},anim:{opacity:1,transition:{duration:1}},color:{filter:"invert(1)"},exit:{transition:{staggerChildren:1}}},l={show:{transition:{staggerChildren:.2}}},d={hidden:{opacity:0,y:20,rotateX:-90},show:{opacity:1,y:0,rotateX:0,transition:{ease:[.6,.01,-.05,.95],duration:1.7}},exit:{opacity:0,y:-10,transition:{ease:"easeInOut",duration:.7}}};function u(){return(0,o.jsx)(n.Z,{children:(0,o.jsxs)(s.E.div,{className:r().aboutWrapper,children:[(0,o.jsx)(s.E.div,{variants:c,initial:"init",animate:"anim",whileHover:"color",className:r().imageWrapper,children:(0,o.jsx)("img",{src:"/images/profilePic.jpg",alt:"Profile Picture of Ogo Jonathan",width:1440,height:1440,layout:"fill",className:r().imageComponent,style:{position:"relative"}})}),(0,o.jsx)(s.E.div,{className:r().aboutText,children:(0,o.jsxs)(s.E.div,{variants:l,initial:"hidden",animate:"show",exit:"exit",className:r().aboutText__span,children:[(0,o.jsx)(s.E.div,{variants:d,style:{originX:0},children:"BLAH BLAH BLAH BLAH ...This is taking longer than expected"}),(0,o.jsx)(s.E.div,{variants:d,style:{originX:0},children:"words words words words words i actually typed it out... not copy and paste"}),(0,o.jsx)(s.E.div,{variants:d,style:{originX:0},children:"Lorem ipsum dolor sit amet consectetur, adipisicing"}),(0,o.jsx)(s.E.div,{variants:d,style:{originX:0},children:"elit. Aliquid cupiditate dolores suscipit error, ratione"}),(0,o.jsx)(s.E.div,{variants:d,style:{originX:0},children:"accusamus explicabo aperiam! Officiis esse obcaecati"}),(0,o.jsx)(s.E.div,{variants:d,style:{originX:0},children:"iusto, ipsam cupiditate."})]})})]})})}},8961:function(a,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return t(5288)}])},4261:function(a){a.exports={aboutWrapper:"About_aboutWrapper__2VBWQ",imageWrapper:"About_imageWrapper__1J_SR",imageComponent:"About_imageComponent__1Nr1E",aboutText:"About_aboutText__nuyZ0",aboutText__span:"About_aboutText__span__1vrTO"}},8694:function(a){a.exports={cdiv:"CDiv_cdiv__2GigB"}},1770:function(a){a.exports={navbarWrapper:"Navbar_navbarWrapper__nulNp",navbar:"Navbar_navbar__3KWoz",navbarContent:"Navbar_navbarContent__h-opP",navbarLinks:"Navbar_navbarLinks__lx-ld",navbar__home:"Navbar_navbar__home__3ixT8",navbar__link:"Navbar_navbar__link__2Y4Ip",page:"Navbar_page__sWHhG",menuBtnWrapper:"Navbar_menuBtnWrapper__289jW",homepage:"Navbar_homepage__2S5RT",svgt:"Navbar_svgt__2lQLn",header__wrapper:"Navbar_header__wrapper__czRe3",navbar__lrg:"Navbar_navbar__lrg__313DS",page__lrg:"Navbar_page__lrg__2O__x",left:"Navbar_left__2otBb"}}},function(a){a.O(0,[427,774,888,179],(function(){return e=8961,a(a.s=e);var e}));var e=a.O();_N_E=e}]);