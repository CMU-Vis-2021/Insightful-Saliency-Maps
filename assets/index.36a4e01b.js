import{o as _,s as x,b as f,a as v,l as w,c as L,d as k}from"./vendor.79436710.js";const A=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function b(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(t){if(t.ep)return;t.ep=!0;const o=b(t);fetch(t.href,o)}};A();var n=[{color:"yellow",pixel_count:1069,percentage:.98,user_percentage:1},{color:"orange",pixel_count:3494,percentage:3.21,user_percentage:2},{color:"red",pixel_count:16193,percentage:14.87,user_percentage:3},{color:"purple",pixel_count:7892,percentage:7.25,user_percentage:4}],m=_().domain(["yellow","orange","red","purple"]).range(["#ffda2e","#f3781e","#bb0f44","#5b0b67"]);const a={top:10,right:30,bottom:20,left:50},u=460-a.left-a.right,l=350-a.top-a.bottom,c=x("#d3-canvas-bar").append("svg").attr("width",u+a.left+a.right).attr("height",l+a.top+a.bottom).append("g").attr("transform",`translate(${a.left},${a.top})`),h=["percentage","user_percentage"],y=n.map(e=>e.color);console.log("groups = "+y);const g=f().domain(y).range([0,u]).padding([.2]);c.append("g").attr("transform",`translate(0, ${l})`).call(v(g).tickSize(0));const s=w().domain([0,15]).range([l,0]);c.append("g").call(L(s));const i=f().domain(h).range([0,g.bandwidth()]).padding([.05]);c.append("g").selectAll("g").data(n).join("g").attr("transform",e=>`translate(${g(e.color)}, 0)`).selectAll("rect").data(function(e){return h.map(function(r){return r=="user_percentage"?{key:r,value:e.user_percentage,color:e.color}:{key:r,value:e.percentage,color:e.color}})}).join("rect").attr("class",e=>e.key).attr("x",e=>i(e.key)).attr("y",e=>s(e.value)).attr("width",i.bandwidth()).attr("height",e=>l-s(e.value)).attr("fill",function(e){return e.key=="percentage"?colorGrey:m(e.color)});c.append("text").attr("class","y label").attr("text-anchor","end").attr("dy","-35px").attr("dx","-"+(u/2-40)+"px").attr("transform","rotate(-90)").text("Percentage");k(".button").on("click",j);function j(){console.log(n[1].user_percentage),n[1].user_percentage+=2;var e=c.selectAll(".user_percentage").data(n);console.log(e),e.join(".user_percentage").transition().duration(1e3).attr("x",r=>i("user_percentage")).attr("y",r=>s(r.user_percentage)).attr("width",i.bandwidth()).attr("height",r=>l-s(r.user_percentage)).attr("fill",r=>m(r.color))}
