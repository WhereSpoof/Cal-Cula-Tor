XHR=("onload" in new XMLHttpRequest())?XMLHttpRequest:XDomainRequest
currency_names=[null,'$','€']
xhr=new XHR()
xhr.open('GET','https://api.exchangerate-api.com/v4/latest/RUB',!0)
xhr.onload=function(){resp=JSON.parse(this.responseText)
console.log(resp)
currency=[1,(1/resp.rates.USD).toFixed(2),(1/resp.rates.EUR).toFixed(2)]
s=''
for(i=1;i<3;i++)
s+=currency_names[i]+' '+currency[i]+'     '
console.log(s)
document.getElementById('bottom-bar').innerText=s}
xhr.onerror=function(){console.error('Ошибка '+this.status)}
xhr.send()