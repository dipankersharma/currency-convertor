const Base_Url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr=  document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const msg = document.querySelector(".msg");
 for(let select of dropdown){
    for(currcode in countryList ){
         let newoption= document.createElement("option");
         newoption.innerText=currcode;
         newoption.value=currcode;
         if(select.name==="from"&& currcode==="USD"){
            newoption.selected="selected"
         }else if(select.name==="to"&& currcode==="INR"){
            newoption.selected="selected"
         }
         select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
         updateFlag(evt.target);
    })
 }

 const updateFlag =(element)=>{
     let currcode= element.value;
     let countrycode=countryList[currcode];
     let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src=newSrc;
 };

 btn.addEventListener("click",async (evt)=>{
     evt.preventDefault();
     updateExchange();
 })

 const  updateExchange= async ()=>{
   let amount = document.querySelector(".amount input");
   let amtVal= amount.value;
   if(amtVal===""||amtVal<1){
    amtVal=1;
    amount.value="1";
   }

   const URL =`${Base_Url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[tocurr.value.toLowerCase()];
   let finalAmt= amtVal*rate;
  msg.innerText=`${amtVal}${fromcurr.value} = ${finalAmt}${tocurr.value}`;
 }

 window.addEventListener("load",()=>{
   updateExchange();
 })