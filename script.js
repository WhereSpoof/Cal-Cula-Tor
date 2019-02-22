coef0 = document.getElementsByClassName('coef')[0]
bet0 = document.getElementsByClassName('bet')[0]
profit0 = document.getElementsByClassName('profit')[0]
coef1 = document.getElementsByClassName('coef')[1]
bet1 = document.getElementsByClassName('bet')[1]
profit1 = document.getElementsByClassName('profit')[1]

coef0.addEventListener("input", top_string_upd, true);
bet0.addEventListener("input", top_string_upd, true);
coef1.addEventListener("input", bottom_string_upd, true);
bet1.addEventListener("input", bottom_string_upd, true);

function top_string_upd() {
    calc(coef0, bet0, coef1, bet1)
}

function bottom_string_upd() {
    calc(coef1, bet1, coef0, bet0)
}

function calc(c0, b0, c1, b1) {
    bet = get_float(c0) * get_float(b0) / get_float(c1)
    if (isNaN(bet))
        return
    b1.value = hybrid_floor(bet)

    calc_profit()
}

function calc_profit() {
    bet_cost = get_float(bet0) + get_float(bet1)
    profit0.innerHTML = ~~(get_float(coef0) * get_float(bet0) - bet_cost)
    profit1.innerHTML = ~~(get_float(coef1) * get_float(bet1) - bet_cost)
}

function hybrid_floor(num) {
    return floor(num, (~~num).toString().length - 2)
}

function floor(num, pos = 0) {
    if (pos <= 0)
        return ~~num;
    mod = 10 ** pos
    return ~~(num / mod) * mod
}

function get_float(elem) {
    return parseFloat(elem.value)
}
