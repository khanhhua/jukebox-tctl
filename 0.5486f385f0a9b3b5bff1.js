webpackJsonp([0],{382:function(e,n,t){"use strict";function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return{type:i,payload:e}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,n=arguments[1],t=f[n.type];return t?t(e,n):e}Object.defineProperty(n,"__esModule",{value:!0}),n.actions=n.doubleAsync=n.COUNTER_DOUBLE_ASYNC=n.COUNTER_INCREMENT=void 0;var o,c=t(177),l=function(e){return e&&e.__esModule?e:{default:e}}(c);n.increment=u,n.default=r;var i=n.COUNTER_INCREMENT="COUNTER_INCREMENT",a=n.COUNTER_DOUBLE_ASYNC="COUNTER_DOUBLE_ASYNC",d=n.doubleAsync=function(){return function(e,n){return new Promise(function(t){setTimeout(function(){e({type:a,payload:n().counter}),t()},200)})}},f=(n.actions={increment:u,doubleAsync:d},o={},(0,l.default)(o,i,function(e,n){return e+n.payload}),(0,l.default)(o,a,function(e,n){return 2*e}),o),s=0},383:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var u=t(59),r=t(382),o=t(384),c=function(e){return e&&e.__esModule?e:{default:e}}(o),l={increment:function(){return(0,r.increment)(1)},doubleAsync:r.doubleAsync},i=function(e){return{counter:e.counter}};n.default=(0,u.connect)(i,l)(c.default)},384:function(e,n,t){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0}),n.Counter=void 0;var r=t(5),o=u(r),c=t(7),l=u(c),i=n.Counter=function(e){var n=e.counter,t=e.increment,u=e.doubleAsync;return o.default.createElement("div",{style:{margin:"0 auto"}},o.default.createElement("h2",null,"Counter: ",n),o.default.createElement("button",{className:"btn btn-primary",onClick:t},"Increment")," ",o.default.createElement("button",{className:"btn btn-secondary",onClick:u},"Double (Async)"))};i.propTypes={counter:l.default.number.isRequired,increment:l.default.func.isRequired,doubleAsync:l.default.func.isRequired},n.default=i}});
//# sourceMappingURL=0.5486f385f0a9b3b5bff1.js.map