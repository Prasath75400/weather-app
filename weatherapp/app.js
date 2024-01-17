const form=document.querySelector('form');
const card=document.querySelector('.card');
const time=document.querySelector('.time');
const details=document.querySelector('.details');
const icon=document.querySelector('.icon img');

const ui=(data)=>{
  const{citydet,weatherdet}=data;
  const html= `<div class="text-muted text-uppercase text-center details">
  <h5 class="my-3">${citydet.EnglishName}</h5>
  <div class="my-3">${weatherdet.WeatherText}</div>
  <div class="display-4 my-4">
    <span></span>
    <span>${weatherdet.Temperature.Metric.Value}C</span>
  </div>`;
  details.innerHTML=html;
  //update ui\
  const iconSrc=`icons/${weatherdet.WeatherIcon}.svg`;
  icon.setAttribute('src',iconSrc);
let timesrc=null;
if(weatherdet.IsDayTime){
  timesrc='day.svg';
}else{
  timesrc='night.svg';
}
time.setAttribute('src',timesrc);

if(card.classList.contains('d-none')){
  card.classList.remove('d-none')
}
}

const updatecity=async(city)=>{
  const citydet=await getlocation(city);
  const weatherdet=await currentweather(citydet.Key);
  return {
    citydet,
    weatherdet
  }
}


form.addEventListener('submit',e=>{
e.preventDefault();
const city=form.city.value.trim();
form.reset();
updatecity(city).then(data=>{
return ui(data);
}).catch(err=>{
  console.log(err)

localStorage.setItem('city',city)

})
});

if(localStorage.getItem('city')){
  updatecity(localStorage.getItem('city')).then(data=>{
    return ui(data);
    }).catch(err=>{
      console.log(err)
})
}