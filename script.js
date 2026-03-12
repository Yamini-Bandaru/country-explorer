
let allCountries=[];

/* load all countries */

fetch("https://restcountries.com/v3.1/all")

.then(res=>res.json())

.then(data=>{

allCountries=data;

});


/* suggestions */

document.getElementById("country").addEventListener("input",function(){

let value=this.value.toLowerCase();

let suggestionBox=document.getElementById("suggestions");

suggestionBox.innerHTML="";

if(value.length===0) return;

let filtered=allCountries.filter(c=>

c.name.common.toLowerCase().includes(value)

).slice(0,5);

filtered.forEach(c=>{

let div=document.createElement("div");

div.className="suggestionItem";

div.innerText=c.name.common;

div.onclick=function(){

document.getElementById("country").value=c.name.common;

suggestionBox.innerHTML="";

getCountry();

};

suggestionBox.appendChild(div);

});

});


function getCountry(){

let name=document.getElementById("country").value.toLowerCase();

/* fix america search */

if(name==="america" || name==="usa" || name==="us"){

name="united states of america";

}

fetch("https://restcountries.com/v3.1/name/"+name+"?fullText=true")

.then(res=>res.json())

.then(data=>{

let c=data[0];

let currency=Object.values(c.currencies)[0].name;

let language=Object.values(c.languages).join(", ");

document.getElementById("result").innerHTML=`

<div class="card">

<h2>${c.name.common}</h2>

<img src="${c.flags.png}">

<div class="grid">

<p><b>Capital:</b> ${c.capital}</p>

<p><b>Region:</b> ${c.region}</p>

<p><b>Population:</b> ${c.population.toLocaleString()}</p>

<p><b>Currency:</b> ${currency}</p>

<p><b>Languages:</b> ${language}</p>

<p><b>Area:</b> ${c.area} km²</p>

</div>

</div>

`;

})

.catch(()=>{

document.getElementById("result").innerHTML="❌ Country not found";

});

}


/* clear */

function clearResult(){

document.getElementById("country").value="";

document.getElementById("result").innerHTML="";

document.getElementById("suggestions").innerHTML="";

}


/* enter key */

document.getElementById("country").addEventListener("keypress",function(e){

if(e.key==="Enter"){

getCountry();

}

});
