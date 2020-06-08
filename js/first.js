let myData = [],
    myRequest = new XMLHttpRequest();

window.onload = getData('general');
function getData(category)
{
    myRequest.open('GET', "https://newsapi.org/v2/top-headlines?country=eg&category="+category+"&apiKey=8ff03184db634924951eb1a6c14d9bc1");
    myRequest.send(); 
    myRequest.addEventListener('readystatechange',  function ()
    {
        if (myRequest.readyState == 4 && myRequest.status == 200)
        {
            myData = JSON.parse(myRequest.response).articles;
            displayData();
        }   
    });
}

function displayData ()
{
    var container = '';
    for (var i = 0; i < myData.length; i++)
    {
        container += `<div class="col-md-4 text-center mb-2">
                        <img class="w-100" src="`+myData[i].urlToImage+`"/>
                        <h3>`+myData[i].title+`</h3>
                        <p>`+myData[i].description+`</p>
                     </div>`;
    }
    document.getElementById('items').innerHTML = container;
}

let links = document.getElementsByClassName('nav-link');
for (let i = 0; i < links.length; i++)
{
    links[i].addEventListener('click', function (eventInfo) {
        
        category = eventInfo.target.text.toLowerCase();
        getData(category);
        
        changeColor(eventInfo.target);
    });
}
function changeColor(target)
{
    removeColor();
    // console.log(eventInfo.target);
    target.classList.add('active');
          
}
let childs = document.getElementById('test').children;
function removeColor() { 
    
    for( let i = 0; i < childs.length; i++)
    {
        childs[i].classList.remove('active');
        childs[i].firstElementChild.classList.remove('active');
    }
}