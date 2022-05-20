"use strict"
let img=document.querySelector(".img")
const container=document.getElementById("grid-container");
const amountInput=document.getElementById("amount");
const show=document.querySelector(".show");

show.addEventListener("click",()=>{
    amount=amountInput.value;
    clearElement(container);
    sortBy("id");
});

let contain;
let amount=50;
let colors={
  grass:"#0f0",
  poison:"#cc0066",
  fire:"#ff0000",
  water:"#0000ff",
  flying:"#00ffff",
  bug:"#00b300" 
};
const clearElement=(el)=>{
  while (el.firstChild) {
      el.removeChild(el.firstChild);
  }
}

const sortBy=async mode=>{
    let fragment=document.createDocumentFragment();
   
    let data=await testfetch();
    let objs=[];
    for (const i of data.results) {
        objs.push(await testfetch(i.url));
    }
    objs.map(x=>fragment.appendChild(FillContainer(x)))
          container.appendChild(fragment);
}
const typeStyle=(types)=>{
  let type="";
  
  let div= 100/types.length;
  let percent=div;
  types.map(x=>{
    
    type+= type==="" ? `${colors[x.type.name]} ${percent}%`:`,${colors[x.type.name]} ${percent}%`
    percent+=div;
  });
  if(types.length===1) type+=`,${type}`
   return type;
}
const FillContainer=({id,name,sprites,types,...props})=>{
    
    const divId=document.createElement("DIV");
      divId.id=id;
      divId.className="element-container";
    
    const divInfo=document.createElement("DIV");
      divInfo.id="info";
    const h2Number=document.createElement("H2");
      h2Number.className="number";
      h2Number.textContent=id;
    const h3Name=document.createElement("H3");
      h3Name.className="name";
      h3Name.textContent=name;
    const divImg=document.createElement("DIV");
      divImg.id="divImg";
      divImg.style=`--type:${typeStyle(types)}`;
    const img=document.createElement("IMG");
      img.className="img"; 
      img.src=sprites.front_default;
    const h3Ci=document.createElement("H3")
      h3Ci.className="ci";
      h3Ci.textContent=types.map(x=>x.type.name);
    divInfo.appendChild(h2Number);
    divInfo.appendChild(h3Ci);  
    divId.appendChild(divInfo);
    divImg.appendChild(img);
    divId.appendChild(divImg);
    divId.appendChild(h3Name);

    return divId;
    
} 

const testfetch=async(src=`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`)=>{
    try {
        let request=await fetch(src)
        let response= await request.json();
        
        return response;
   
    } catch (e) {
        console.log(e);
    }
   }
   sortBy("id");
