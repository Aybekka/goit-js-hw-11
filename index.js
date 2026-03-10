import{S as m,i as l}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const d=document.querySelector("#search-form"),c=document.querySelector(".gallery"),a=document.querySelector(".loader"),h="54968565-2cd96adb4d5f069c81d213fb9";let p=new m(".gallery a");d.addEventListener("submit",i=>{i.preventDefault();const o=i.currentTarget.elements.searchQuery.value.trim();if(o==="")return l.warning({title:"Warning!",message:"Please enter a search term!"});c.innerHTML="",b(),y(o)});function y(i){const o=new URLSearchParams({key:h,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true"});fetch(`https://pixabay.com/api/?${o}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(t.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(t.hits)}).catch(t=>{l.error({title:"Hata",message:"Sunucuya bağlanırken bir sorun oluştu."}),console.log("Hata:",t)}).finally(()=>{L()})}function g(i){const o=i.map(({webformatURL:t,largeImageURL:n,tags:e,likes:r,views:s,comments:u,downloads:f})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${n}">
                <img class="gallery-image" src="${t}" alt="${e}" />
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b>${r}</p>
                <p class="info-item"><b>Views</b>${s}</p>
                <p class="info-item"><b>Comments</b>${u}</p>
                <p class="info-item"><b>Downloads</b>${f}</p>
            </div>
        </li>`).join("");c.innerHTML=o,p.refresh()}function b(){a&&(a.style.display="block")}function L(){a&&(a.style.display="none")}
//# sourceMappingURL=index.js.map
