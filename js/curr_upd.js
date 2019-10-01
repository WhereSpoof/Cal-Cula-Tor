XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest

xhr = new XHR()

xhr.open('GET', 'https://api.exchangerate-api.com/v4/latest/RUB', true)

xhr.onload = function () {
    resp = JSON.parse(this.responseText)
    console.log(resp)
    
    currency = [1, (1 / resp.rates.USD).toFixed(2), (1 / resp.rates.EUR).toFixed(2)]
    set_curr()
}

xhr.onerror = function() {
    console.error('Ошибка ' + this.status)
}

xhr.send()