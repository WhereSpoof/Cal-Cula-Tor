currency_names = [null, '$', '€']

s = ''

for (i = 1; i < 3; i++)
    s += currency_names[i] + ' ' + currency[i] + '  '

console.log(s)
document.getElementById('bottom-bar').innerText = s