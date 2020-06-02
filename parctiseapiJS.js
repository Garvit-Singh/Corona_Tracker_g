//  https://covidtracking.com/api/states
//  https://covidtracking.com/api/us/daily
//  https://api.covid19india.org/state_district_wise.json


// making search options

const search_data = ["State Unassigned",
"Andaman and Nicobar Islands",
"Andhra Pradesh",
"Arunachal Pradesh",
"Assam",
"Bihar",
"Chandigarh",
"Chhattisgarh",
"Delhi",
"Dadra and Nagar Haveli and Daman and Diu",
"Goa",
"Gujarat",
"Himachal Pradesh",
"Haryana",
"Jharkhand",
"Jammu and Kashmir",
"Karnataka",
"Kerala",
"Ladakh",
"Lakshadweep",
"Maharashtra",
"Meghalaya",
"Manipur",
"Madhya Pradesh",
"Mizoram",
"Nagaland",
"Odisha",
"Punjab",
"Puducherry",
"Rajasthan",
"Sikkim",
"Telangana",
"Tamil Nadu",
"Tripura",
"Uttar Pradesh",
"Uttarakhand",
"West Bengal",
];

var n= search_data.length;    
  
function ac(value) { 
   document.getElementById('datalist').innerHTML = ''; 
    //setting datalist empty at the start of function 
    //if we skip this step, same name will be repeated 
      
    l=value.length; 
    //input query length 
for (var i = 0; i<n; i++) { 
    if(((search_data[i].toLowerCase()).localeCompare(value.toLowerCase()))>-1) 
    { 
        //comparing if input string is existing in tags[i] string 
        var node = document.createElement("option"); 
        var val = document.createTextNode(search_data[i]); 
        node.appendChild(val); 
        document.getElementById("datalist").appendChild(node); 
              //creating and appending new elements in data list 
        } 
    } 
} 



// fetching data

const loaddoc = () => {
setTimeout(()=>{
    const search = document.getElementById("search").value;
    const x = document.getElementById("data");
    while(x.firstChild) {
        x.removeChild(x.lastChild);
    }
    search_function(search);
    document.getElementById("search").value="";
}

const search_function = ( value ) => {
    // console.log(value);
    // console.log(search);
    fetch('https://api.covid19india.org/state_district_wise.json')
    .then(response => response.json())
    .then(data => {
        console.log(data[value]);
        let txt = "<table>"+"<tr>"+ `<th id="g-head"><strong>District Name</strong></th>`+
                                    `<th id="g-head"><strong>Confirmed</strong></th>`+
                                    `<th id="g-head"><strong>Recovered</strong></th>`+
                                    `<th id="g-head"><strong>Deceased</strong></th>`+
                                    `<th id="g-head"><strong>Active</strong></th>`+
                                    "</tr>";
        const object1 = data[value].districtData;
        for (let [key, cases] of Object.entries(object1)) {             // console.log(`${key}: ${cases}`);
              txt =txt+ "<tr>"+"<td>"+key+"</td>"+
                                "<td>"+cases.confirmed+`<h6 id="R">+${cases.delta.confirmed}<h6>`+"</td>"+
                                "<td>"+cases.recovered+`<h6 id="G">+${cases.delta.recovered}<h6>`+"</td>"+
                                "<td>"+cases.deceased+`<h6 id="R">+${cases.delta.deceased}<h6>`+"</td>"+
                                "<td>"+cases.active+"</td>"+
                                                            "</tr>" ;
          }
          txt = txt + "</table>";
          document.getElementById("data").innerHTML = txt;
    });
},500);
}

/*
console.log(search);
fetch('https://api.covid19india.org/state_district_wise.json')
    .then(response => response.json())
    .then(data => console.log(data));
*/

// https://api.covid19api.com/summary

const loadworld = () => {
    document.getElementById("hint").style.cssText="visibility: hidden;";
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // console.log(data.Global);
        // console.log(data.Countries);
        const india = data.Countries[76];
        console.log(india);
        const totalin = document.createElement("div");
        totalin.style.cssText="float:left";
        totalin.innerHTML=`<br>
                        Confirmed : ${india.TotalConfirmed}<h6 id="R" style="float:left">+${india.NewConfirmed}</h6><br><br>
                        Deaths : ${india.TotalDeaths}<h6 id="R" style="float:left">+${india.NewDeaths}</h6><br><br>
                        Recovered : ${india.TotalRecovered}<h6 id="G" style="float:left">+${india.NewRecovered}</h6><br><br>`;
        document.getElementById("ind").appendChild(totalin);
        const data_new = document.createElement("p");
        data_new.innerHTML=`Newly Confirmed Cases : ${data.Global.NewConfirmed}`;
        data_new.style.cssText="color: #666600";
        document.getElementById("global").appendChild(data_new);
        const data_total = document.createElement("p");
        data_total.innerHTML=`Total Confirmed Cases : ${data.Global.TotalConfirmed}`;
        data_total.style.cssText="color: #666600";
        document.getElementById("global").appendChild(data_total);
        const data_newD = document.createElement("p");
        data_newD.innerHTML=`New Deaths Cases : ${data.Global.NewDeaths}`;
        data_newD.style.cssText="color: red";
        document.getElementById("global").appendChild(data_newD);
        const data_totalD = document.createElement("p");
        data_totalD.innerHTML=`Total Confirmed Deaths : ${data.Global.TotalDeaths}`;
        document.getElementById("global").appendChild(data_totalD);
        data_totalD.style.cssText="color: red";
        const data_totalR = document.createElement("p");
        data_totalR.innerHTML=`Total Recovered Cases: ${data.Global.TotalRecovered}`;
        data_totalR.style.cssText="color:green";
        document.getElementById("global").appendChild(data_totalR);
        //new table
        let txtC = "<table>"+"<tr>"+`<th id="g-head"><strong>Country</strong></th>`+
                                    `<th id="g-head"><strong>Confirmed</strong></th>`+
                                    `<th id="g-head"><strong>Deaths</strong></th>`+
                                    `<th id="g-head"><strong>Recovered</strong></th>`+
                            "</tr>";
        data.Countries.map((obj)=> {
            // console.log(obj.Country+" "+/*obj.NewConfirmed+*/" "+obj.TotalConfirmed+" "+obj.NewDeaths+" "+
            //                                     obj.TotalDeaths+" "+obj.NewRecovered+" "+obj.TotalRecovered);
            txtC = txtC +"<tr>"+    "<td><strong>"+obj.Country+"<strong></td>"+
                                    "<td><strong>"+obj.TotalConfirmed+`<h6 id="R">+${obj.NewConfirmed}<h6>`+"<strong></td>"+
                                    "<td><strong>"+obj.TotalDeaths+`<h6 id="R">+${obj.NewDeaths}<h6>`+"<strong></td>"+
                                    "<td><strong>"+obj.TotalRecovered+`<h6 id="G">+${obj.NewRecovered}<h6>`+"<strong></td>"+"</tr>";
        })
        txtC = txtC + "</table>";
        const date = new Date(data.Date);
        // console.log(date);
        document.getElementById("global").innerHTML +="Last Update: "+date;
        document.getElementById("global").innerHTML+= txtC;
    }
    );
}
/*
fetch('./text.txt', {mode: 'no-cors'})
.then(response => console.log(response.status));
*/

const canvas = document.querySelector('.myCanvas');
const width = canvas.width = 350;
const height = canvas.height = 150;
canvas.style.border= "1px solid black";
const ctx = canvas.getContext("2d");
ctx.fillStyle = 'rgb(128, 187, 255)';
ctx.font= "12px sans-serif"
ctx.fillText('Confirmed Daily(India)', 100, 140);

// origin of chart at (10,125)  canvas width is 350 and height 150 x axis is 300 and y axis will change bc

fetch('https://api.covid19api.com/total/dayone/country/india/status/confirmed')
.then(response => response.json())
.then(data => {
    // console.log(data);
    // console.log(data.length);
    const day_gap_px = 300/data.length;
    const case_gap_px = 900/data[data.length-1].Cases;
    ctx.lineWidth = 0.1;
    ctx.strokeStyle= 'red';
    let x=10;
    let Yi=125;
    let Yf=0;
    ctx.lineJoin= 'bevel';
//     const totalin = document.createElement("strong");
//     totalin.innerHTML=`Confirmed Cases : ${data[data.length-1].Cases}`;
//     document.getElementById("ind").appendChild(totalin);
    for( let day=0 ; day < data.length ; day++) {
        console.log(data[day].Cases);
        setTimeout(() => {
            if(day < data.length-1){
                Yf=125-case_gap_px*(data[day+1].Cases-data[day].Cases);
                ctx.moveTo(x,Yi);
                x = x + day_gap_px;
                ctx.lineTo(x,Yf);
                ctx.stroke();
                Yi=Yf;
            }else{
                ctx.moveTo(x,Yi);
                ctx.lineTo(x,Yf);
                ctx.rotate(45 * Math.PI / 180);
                ctx.moveTo(x,Yi);
                ctx.lineTo(x,Yf);
                ctx.rotate(45*Math.PI/180);
            }
        }, day*10);
    }
}
);
