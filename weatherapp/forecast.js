const key='WqVHyPYHC63ENJ092qvW1s3fEkVmWYLg';

const currentweather=async(id)=>{
  const link='http://dataservice.accuweather.com/currentconditions/v1/';
  const query=`${id}?apikey=${key}`;
  const response=await fetch(link+query);
const data=await response.json();
return data[0];
};

const getlocation=async(city)=>{
const link='http://dataservice.accuweather.com/locations/v1/cities/search'; 
const query=`?apikey=${key}&q=${city}`
const response=await fetch(link+query);
const data=await response.json();
return data[0];
}


getlocation('newyork').then(data =>{
  return currentweather(data.Key);
}).then(data =>{
  console.log(data);
}).catch(err=>{
  console.log(err)
});