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
    max_num = 1000000
    if (get_int(b0) > max_num)
        b0.value = max_num
    bet = get_float(c0) * get_float(b0) / get_float(c1)
    if (isNaN(bet))
        return
    b1.value = hybrid_round(bet)

    calc_profit()
}

function calc_profit() {
    bet_cost = get_float(bet0) + get_float(bet1)
    profit0.innerHTML = ~~(get_float(coef0) * get_float(bet0) - bet_cost)
    profit1.innerHTML = ~~(get_float(coef1) * get_float(bet1) - bet_cost)
}

function hybrid_round(num) {
    num = ~~num
    size = num.toString().length
    floor_to_arr = [1, 1, 5, 10, 50, 100, 1000, 10000]
    to = floor_to_arr[size]
    num = round_to(num, to)
    return num;
}

function round_to(x, to) {
    return (x % to) >= to / 2 ? parseInt(x / to) * to + to : parseInt(x / to) * to;
}

function get_int(elem) {
    return parseInt(elem.value)
}

function get_float(elem) {
    return parseFloat(elem.value.replace(",", "."))
}
