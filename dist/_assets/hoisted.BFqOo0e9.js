import"./hoisted.D9FO-Yxe.js";const i=document.getElementById("hero-stars");if(i){const s=window.innerWidth>768?80:40;for(let t=0;t<s;t++){const n=document.createElement("div"),o=Math.random()*1.5+.5,a=Math.random()*.5+.1,e=Math.random()*4+2,r=Math.random()*5;n.style.cssText=`
        position: absolute;
        width: ${o}px;
        height: ${o}px;
        background: white;
        border-radius: 50%;
        left: ${Math.random()*100}%;
        top: ${Math.random()*100}%;
        opacity: ${a};
        animation: starTwinkle ${e}s ease-in-out ${r}s infinite;
        --dur: ${e}s;
        --opacity: ${a};
      `,i.appendChild(n)}}
