Object.assign||(Object.assign=function(){const a=arguments,b=a.length,c=a[0];for(let d,e,f,g=1;g<b;g++){d=a[g],e=Object.keys(d),f=e.length;for(let a,b=0;b<f;b++)a=e[b],c[a]=d[a]}return c}),Object.values||(Object.values=function(a){const b=Object.keys(a),c=b.length,d=Array(c);for(let e=0;e<c;e++)d[e]=a[b[e]];return d}),window.requestAnimationFrame||(window.requestAnimationFrame=window.setTimeout),window.cancelAnimationFrame||(window.cancelAnimationFrame=window.clearTimeout),window.Promise||(window.Promise=function(){function a(a){this.callback=null;const b=this;a(function(a){b.callback&&(b.callback(a),b.callback=null)})}return a.prototype.then=function(a){this.callback=a},a}());