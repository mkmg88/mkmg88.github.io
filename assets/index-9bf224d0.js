import{y as m,z as d,A as g,B as a,k as c,C as k,D as f,F as T,E as w,G as N,H as C,I as p,t as L,V as x}from"./vendors-4ef35f12.js";import{I as O,S as E,U as M}from"./vant-669d4264.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const B="/assets/tiger-1-fbd9f986.png",D="/assets/tiger-2-ed70775d.png",P="/assets/tiger-3-f75892ab.png",X="/assets/tiger-4-b58ddbf2.png",Y="/assets/tiger-5-fdac5807.png",A="/assets/tiger-6-458ea839.png";const K=(s,e)=>{const r=s.__vccOpts||s;for(const[o,t]of e)r[o]=t;return r},u=window.innerWidth,R=[B,D,P,X,Y,A],z={data(){return{tigerList:R,configKonva:{width:u,height:u},configUpImage:{name:"upimg",image:null,x:0,y:0,width:u,height:0,scaleX:1,scaleY:1,draggable:!0},configTigers:[],selectedShapeName:"",slideValue:1}},methods:{afterRead(s){const e=new window.Image;e.src=s.content,e.onload=()=>{this.configUpImage.image=e,this.configUpImage.height=parseInt(u/(e.width/e.height)),this.slideValue=1}},addTiger(s,e){const r=this.configTigers.findIndex(o=>o.name===`tiger${e}`);if(r>-1)this.configTigers.splice(r,1),this.selectedShapeName="",this.updateTransformer();else{const o=new window.Image;o.src=s,o.onload=()=>{this.configTigers.push({name:`tiger${e}`,image:o,x:0,y:0,width:260,height:300,draggable:!0,scaleX:1,scaleY:1})}}},slideChange(s){this.configUpImage.scaleX=s,this.configUpImage.scaleY=s},downLoad(){this.selectedShapeName="",this.updateTransformer();const s=this.$refs.stage.getNode().toDataURL({pixelRatio:3});let e=document.createElement("a");e.download="tiger",e.href=s,document.body.appendChild(e),e.click(),document.body.removeChild(e)},handleTransformEnd(s){const e=this.configTigers.find(r=>r.name===this.selectedShapeName);e.x=s.target.x(),e.y=s.target.y(),e.rotation=s.target.rotation(),e.scaleX=s.target.scaleX(),e.scaleY=s.target.scaleY()},handleStageMouseDown(s){if(s.target===s.target.getStage()){this.selectedShapeName="",this.updateTransformer();return}if(s.target.getParent().className==="Transformer")return;const r=s.target.name();this.configTigers.find(t=>t.name===r)?this.selectedShapeName=r:this.selectedShapeName="",this.updateTransformer()},updateTransformer(){const s=this.$refs.transformer.getNode(),e=s.getStage(),{selectedShapeName:r}=this,o=e.findOne("."+r);o!==s.node()&&(o?s.nodes([o]):s.nodes([]))}}},F={class:"g-tiger ignore"},j={class:"m-upimg"},W={key:0,class:"no-img"},q=a("p",null,"请上传图片",-1),G={class:"m-tiger"},H=a("p",{class:"titi"},"图片缩放：",-1),Z={class:"slide"},J={class:"m-tiger"},Q=a("p",{class:"titi"},"点击选择你的头套：",-1),$=["onClick"],ee=["src"],te={class:"m-btn"},se=a("p",{class:"create-name"},"@抖音：老孙_zZ",-1);function ne(s,e,r,o,t,n){const l=O,h=m("v-image"),_=m("v-layer"),b=m("v-transformer"),S=m("v-stage"),U=E,V=M;return d(),g("div",F,[a("div",j,[t.configUpImage.image?k("",!0):(d(),g("div",W,[c(l,{name:"photo",class:"icon"}),q])),c(S,{ref:"stage",config:t.configKonva,onMousedown:n.handleStageMouseDown,onTouchstart:n.handleStageMouseDown},{default:f(()=>[c(_,{ref:"upimg"},{default:f(()=>[c(h,{config:t.configUpImage},null,8,["config"])]),_:1},512),c(_,{ref:"tiger"},{default:f(()=>[(d(!0),g(T,null,w(t.configTigers,i=>(d(),N(h,{key:i.name,config:i,onTransformend:n.handleTransformEnd},null,8,["config","onTransformend"]))),128)),c(b,{ref:"transformer"},null,512)]),_:1},512)]),_:1},8,["config","onMousedown","onTouchstart"])]),a("div",G,[H,a("div",Z,[c(U,{modelValue:t.slideValue,"onUpdate:modelValue":[e[0]||(e[0]=i=>t.slideValue=i),n.slideChange],step:.01,min:0,max:5},null,8,["modelValue","onUpdate:modelValue"])])]),a("div",J,[Q,a("ul",null,[(d(!0),g(T,null,w(t.tigerList,(i,v)=>(d(),g("li",{onClick:y=>n.addTiger(i,v),class:C(t.configTigers.find(y=>y.name===`tiger${v}`)&&"active")},[a("img",{src:i},null,8,ee)],10,$))),256))])]),a("div",te,[t.configUpImage.image?(d(),g("a",{key:1,href:"javascript:;",class:"btn del",onClick:e[1]||(e[1]=i=>t.configUpImage.image=null)},[c(l,{name:"delete-o"}),p(" 删除图片 ")])):(d(),N(V,{key:0,"after-read":n.afterRead,class:"btn"},{default:f(()=>[c(l,{name:"back-top"}),p(" 上传图片 ")]),_:1},8,["after-read"])),a("a",{href:"javascript:;",class:"btn active",onClick:e[2]||(e[2]=(...i)=>n.downLoad&&n.downLoad(...i))},[c(l,{name:"down"}),p(" 下载图片 ")])]),se])}const oe=K(z,[["render",ne]]),I=L(oe);I.use(x);I.mount("#app");