import{y as m,z as g,A as f,B as i,k as c,C,D as p,F as T,E as w,G as b,H as N,I as u,t as x,V as O}from"./vendors-4ef35f12.js";import{s as P,I as D,S as E,U as F}from"./vant-28e16aeb.js";import{O as S}from"./common-d147e4ba.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const M="/assets/tiger-1-fbd9f986.png",A="/assets/tiger-2-ed70775d.png",B="/assets/tiger-3-f75892ab.png",R="/assets/tiger-4-b58ddbf2.png",X="/assets/tiger-5-fdac5807.png",Y="/assets/tiger-6-458ea839.png",K="/assets/tiger-7-116d192c.png";const z=(s,e)=>{const r=s.__vccOpts||s;for(const[o,t]of e)r[o]=t;return r},d=S.isPc?500:window.innerWidth,W=[M,A,B,R,X,Y,K],j={data(){return{isPc:S.isPc,tigerList:W,configKonva:{width:d,height:d},configUpImage:{name:"upimg",image:null,x:-d/2,y:0,width:d,height:0,draggable:!0},configUpLayer:{x:d/2,y:d/2,scaleX:1,scaleY:1},configTigers:[],selectedShapeName:"",slideValue:1}},methods:{afterRead(s){const e=new window.Image;e.src=s.content,e.onload=()=>{this.configUpImage.image=e,this.configUpImage.height=parseInt(d/(e.width/e.height)),this.configUpImage.y=-this.configUpImage.height/2,this.slideValue=1}},addTiger(s,e){const r=this.configTigers.findIndex(o=>o.name===`tiger${e}`);if(r>-1)this.configTigers.splice(r,1),this.selectedShapeName="",this.updateTransformer();else{const o=new window.Image;o.src=s,o.onload=()=>{this.configTigers.push({name:`tiger${e}`,image:o,x:0,y:0,width:160,height:200,draggable:!0,scaleX:1,scaleY:1})}}},slideChange(s){this.configUpLayer.scaleX=s,this.configUpLayer.scaleY=s},downLoad(){this.selectedShapeName="",this.updateTransformer();const s=this.$refs.stage.getNode().toDataURL({pixelRatio:2});let e=document.createElement("a");e.download="tiger",e.href=s,document.body.appendChild(e),e.click(),document.body.removeChild(e),P("正在尝试下载... 如果下载不了可以自己截屏哦~")},handleTransformEnd(s){const e=this.configTigers.find(r=>r.name===this.selectedShapeName);e.x=s.target.x(),e.y=s.target.y(),e.rotation=s.target.rotation(),e.scaleX=s.target.scaleX(),e.scaleY=s.target.scaleY()},handleStageMouseDown(s){if(s.target===s.target.getStage()){this.selectedShapeName="",this.updateTransformer();return}if(s.target.getParent().className==="Transformer")return;const r=s.target.name();this.configTigers.find(t=>t.name===r)?this.selectedShapeName=r:this.selectedShapeName="",this.updateTransformer()},updateTransformer(){const s=this.$refs.transformer.getNode(),e=s.getStage(),{selectedShapeName:r}=this,o=e.findOne("."+r);o!==s.node()&&(o?s.nodes([o]):s.nodes([]))}}},q={class:"m-upimg"},G={key:0,class:"no-img"},H=i("p",null,"请上传图片",-1),J={class:"m-tiger"},Q=i("p",{class:"titi"},"图片缩放：",-1),Z={class:"slide"},$={class:"m-tiger"},ee=i("p",{class:"titi"},"点击选择你的头套：",-1),te=["onClick"],se=["src"],ne={class:"m-btn"};function oe(s,e,r,o,t,n){const l=D,h=m("v-image"),_=m("v-layer"),U=m("v-transformer"),k=m("v-stage"),L=E,V=F;return g(),f("div",{class:N(["g-tiger",t.isPc?"ignore":"mobile"])},[i("div",q,[t.configUpImage.image?C("",!0):(g(),f("div",G,[c(l,{name:"photo",class:"icon"}),H])),c(k,{ref:"stage",config:t.configKonva,onMousedown:n.handleStageMouseDown,onTouchstart:n.handleStageMouseDown},{default:p(()=>[c(_,{ref:"upimg",config:t.configUpLayer},{default:p(()=>[c(h,{config:t.configUpImage},null,8,["config"])]),_:1},8,["config"]),c(_,{ref:"tiger"},{default:p(()=>[(g(!0),f(T,null,w(t.configTigers,a=>(g(),b(h,{key:a.name,config:a,onTransformend:n.handleTransformEnd},null,8,["config","onTransformend"]))),128)),c(U,{ref:"transformer",config:{anchorFill:"#fc4459",anchorSize:24,borderStroke:"#898FFA",borderStrokeWidth:2,borderDash:[3,3],keepRatio:!1}},null,512)]),_:1},512)]),_:1},8,["config","onMousedown","onTouchstart"])]),i("div",J,[Q,i("div",Z,[c(L,{modelValue:t.slideValue,"onUpdate:modelValue":[e[0]||(e[0]=a=>t.slideValue=a),n.slideChange],step:.01,min:0,max:5},null,8,["modelValue","onUpdate:modelValue"])])]),i("div",$,[ee,i("ul",null,[(g(!0),f(T,null,w(t.tigerList,(a,v)=>(g(),f("li",{onClick:y=>n.addTiger(a,v),class:N(t.configTigers.find(y=>y.name===`tiger${v}`)&&"active")},[i("img",{src:a},null,8,se)],10,te))),256))])]),i("div",ne,[t.configUpImage.image?(g(),f("a",{key:1,href:"javascript:;",class:"btn del",onClick:e[1]||(e[1]=a=>t.configUpImage.image=null)},[c(l,{name:"delete-o"}),u(" 删除图片 ")])):(g(),b(V,{key:0,"after-read":n.afterRead,class:"btn"},{default:p(()=>[c(l,{name:"back-top"}),u(" 上传图片 ")]),_:1},8,["after-read"])),i("a",{href:"javascript:;",class:"btn active",onClick:e[2]||(e[2]=(...a)=>n.downLoad&&n.downLoad(...a))},[c(l,{name:"down"}),u(" 下载图片 ")])])],2)}const re=z(j,[["render",oe]]),I=x(re);I.use(O);I.mount("#app");
