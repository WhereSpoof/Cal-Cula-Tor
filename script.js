document.getElementsByClassName('coef')[0].addEventListener("change", calc, true);
document.getElementsByClassName('bet')[0].addEventListener("change", calc, true);
document.getElementsByClassName('coef')[1].addEventListener("change", calc, true);
document.getElementsByClassName('bet')[1].addEventListener("change", calc, true);

function calc() {
    top_string();
    bottom_string();
}

function top_string() {
    coef0 = document.getElementsByClassName('coef')[0].value
    bet0 = document.getElementsByClassName('bet')[0].value
    coef1 = document.getElementsByClassName('coef')[1].value
    bet1 = document.getElementsByClassName('bet')[1].value
    console.log(coef0, bet0)
    document.getElementsByClassName('profit')[0].innerHTML = parseFloat(bet0) * parseFloat(coef0) - (parseFloat(bet0) + parseFloat(bet1))
}

function bottom_string() {
    coef0 = document.getElementsByClassName('coef')[0].value
    bet0 = document.getElementsByClassName('bet')[0].value
    coef1 = document.getElementsByClassName('coef')[1].value
    bet1 = document.getElementsByClassName('bet')[1].value
    console.log(coef1, bet1)
    document.getElementsByClassName('profit')[1].innerHTML = parseFloat(bet1) * parseFloat(coef1) - (parseFloat(bet0) + parseFloat(bet1))
}
