import{a as y,S as h,i as n}from"./assets/vendor-D_Kruy52.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const p="49113920-f9af0cc3a936c3f1f6e808981",b="https://pixabay.com/api/",f=15;async function g(i,o=1){try{return(await y.get(b,{params:{key:p,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:f}})).data}catch(r){console.error("Error fetching data:",r)}}let u=null;function m(i=[]){const o=document.querySelector(".gallery"),r=i.map(t=>`
      <div class="card-container">
        <div class="card">
          <a href="${t.largeImageURL}">
            <img class="card-image" src="${t.webformatURL}" alt="${t.tags}" />
          </a>
          <div class="card-body">
            <div class="card-item">
              <h4>Likes</h4><p>${t.likes}</p>
            </div>
            <div class="card-item">
              <h4>Views</h4><p>${t.views}</p>
            </div>
            <div class="card-item">
              <h4>Comments</h4><p>${t.comments}</p>
            </div>
            <div class="card-item">
              <h4>Downloads</h4><p>${t.downloads}</p>
            </div>
          </div>
        </div>
      </div>
    `).join("");o.insertAdjacentHTML("beforeend",r),u?u.refresh():u=new h(".gallery a")}let c=1,l="";const a={form:document.querySelector(".form"),searchQueryInput:document.querySelector(".form-input"),imagesContainer:document.querySelector(".gallery"),button:document.querySelector(".form-button"),loader:document.querySelector(".loader"),buttomLoadMore:document.querySelector(".add-posts-button")};a.form.addEventListener("submit",async i=>{i.preventDefault(),l=a.searchQueryInput.value.trim(),c=1;const o=document.querySelector(".gallery");if(o.innerHTML="",!l){n.error({messageColor:"#FAFAFB",iconUrl:"./img/bi_x-octagon.svg",iconColor:"white",message:"Please enter a search word!",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"});return}a.loader.style.display="inline-block";try{const r=await g(l),t=Math.ceil(r.totalHits/f);if(r.hits.length===0){n.error({messageColor:"#FAFAFB",iconUrl:"./img/bi_x-octagon.svg",iconColor:"white",message:"Sorry, there are no images matching</br> your search query. Please, try again!",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"}),a.buttomLoadMore.style.display="none";return}t>c?a.buttomLoadMore.style.display="flex":(a.buttomLoadMore.style.display="none",n.error({messageColor:"#FAFAFB",iconUrl:"./img/bi_x-octagon.svg",iconColor:"white",message:"We are sorry, but you have reached the end of search results.",position:"topRight",backgroundColor:"#4e75ff",color:"#fafafb"})),m(r.hits),console.log(r)}catch{n.error({messageColor:"#FAFAFB",iconUrl:"./img/bi_x-octagon.svg",iconColor:"white",message:"Sorry, there are no images matching</br> your search query. Please, try again!",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"})}finally{a.loader.style.display="none"}});a.buttomLoadMore.addEventListener("click",async i=>{i.preventDefault(),l=a.searchQueryInput.value.trim(),c++;try{const o=await g(l,c);m(o.hits),console.log(o);const r=document.querySelector(".card-container").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),a.buttomLoadMore.style.display="flex",Math.ceil(o.totalHits/f)>c?a.buttomLoadMore.style.display="flex":(a.buttomLoadMore.style.display="none",n.error({messageColor:"#FAFAFB",iconUrl:"./img/bi_x-octagon.svg",iconColor:"white",message:"We are sorry, but you have reached the end of search results.",position:"topRight",backgroundColor:"#4e75ff",color:"#fafafb"}))}catch{n.error({messageColor:"#FAFAFB",iconUrl:"./img/bi_x-octagon.svg",iconColor:"white",message:"Sorry, there are no images matching</br> your search query. Please, try again!",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"})}});
//# sourceMappingURL=index.js.map
