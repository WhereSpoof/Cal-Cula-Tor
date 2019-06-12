var coef1, coef2, bet1, bet2, profit1, profit2, profit_percent, profit_percent_cont

window.onload = () => {
    // Setup selectors
    coef1 = document.getElementsByClassName('coef')[0]
    bet1 = document.getElementsByClassName('bet')[0]
    profit1 = document.getElementsByClassName('profit')[0]
    coef2 = document.getElementsByClassName('coef')[1]
    bet2 = document.getElementsByClassName('bet')[1]
    profit2 = document.getElementsByClassName('profit')[1]
    profit_percent = document.getElementsByClassName('profit-percent')[0]
    profit_percent_cont = document.getElementsByClassName('profit-percent-cont')[0]

    // Setup event listners
    coef1.addEventListener('input', click_c1, true)
    bet1.addEventListener('input', click_b1, true)
    coef2.addEventListener('input', click_c2, true)
    bet2.addEventListener('input', click_b2, true)

    // For profit percent calculation
    coef1.addEventListener('input', calc_profit_percent, true)
    coef2.addEventListener('input', calc_profit_percent, true)

    // For tabs
    for (i = 0; i < 4; i++) document.getElementsByClassName('field')[i].addEventListener('keydown', tabbed, false)

    // Set up from GET args
    get_args()
    calc(coef1, bet1, coef2, bet2)
    calc(coef2, bet2, coef1, bet1)
}

function click_c1() {
    fix_mode = get_fix_mode()

    if (fix_mode == 3 || fix_mode == 1)
        calc(coef1, bet1, coef2, bet2)
    else
        calc(coef2, bet2, coef1, bet1)
}

function click_c2() {
    fix_mode = get_fix_mode()

    if (fix_mode == 3 || fix_mode == 2)
        calc(coef2, bet2, coef1, bet1)
    else
        calc(coef1, bet1, coef2, bet2)
}

function click_b1() {
    fix_mode = get_fix_mode()

    if (fix_mode == 3 || fix_mode == 1)
        calc(coef1, bet1, coef2, bet2)
    else
        calc_profit()
}

function click_b2() {
    fix_mode = get_fix_mode()

    if (fix_mode == 3 || fix_mode == 2)
        calc(coef2, bet2, coef1, bet1)
    else
        calc_profit()
}

function get_args() {
    var url_string = window.location.href
    var url = new URL(url_string)
    var c = url.searchParams.get('coefs')
    coef1.value = url.searchParams.get('c1')
    coef2.value = url.searchParams.get('c2')
    bet1.value = url.searchParams.get('b1')
    bet2.value = url.searchParams.get('b2')
}

function tabbed(ev) {
    if (ev.key != 'Tab')
        return true

    for (i = 0; i < 4; i++)
        if (document.getElementsByClassName('field')[i] == ev.target) {
            if (i == 3)
                document.getElementsByClassName('field')[0].focus()
            else
                document.getElementsByClassName('field')[i+1].focus()
            break
        }

    ev.preventDefault()
    return false
}

function get_fix_mode() {
    if (document.getElementsByClassName('fix-choice')[0].checked)
        return 1
    if (document.getElementsByClassName('fix-choice')[1].checked)
        return 2
    if (document.getElementsByClassName('fix-choice')[2].checked)
        return 3
}

function calc_profit_percent() {
    c1 = get_float(coef1)
    c2 = get_float(coef2)

    v = 100
    l = 1 / c1 + 1 / c2
    v1 = v / (l * c1)
    v2 = v / (l * c2)
    p1 = v1 * c1 - (v1 + v2)
    p2 = v2 * c2 - (v1 + v2)
    p = (p1 + p2) / 2

    p = ~~(p * 10) / 10
    color = ~~p * 13
    MAX_COLOR = 165
    if (color < 0) {
        color = -color + 40
        if (color > MAX_COLOR) color = MAX_COLOR
        profit_percent_cont.style.color = 'rgb(' + color + ',0,0)'
    } else {
        color += 20
        if (color > MAX_COLOR) color = MAX_COLOR
        profit_percent_cont.style.color = 'rgb(0,' + color + ',0)'
    }

    profit_percent.innerHTML = p
}

function calc(c0, b0, c1, b1) {
    max_num = 1000000
    if (get_int(b0) > max_num)
        b0.value = max_num
    bet = get_float(c0) * get_int(b0) / get_float(c1)
    if (isNaN(bet))
        return
    b1.value = hybrid_round(bet)

    calc_profit()
}

function calc_profit() {
    bet_cost = get_float(bet1) + get_float(bet2)
    profit1.innerHTML = ~~(get_float(coef1) * get_float(bet1) - bet_cost)
    profit2.innerHTML = ~~(get_float(coef2) * get_float(bet2) - bet_cost)
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
    return parseFloat(check_float(elem))
}

function check_float(elem) {
    num = elem.value.replace('ю', '.').replace('б', '.').replace(',', '.')
    elem.value = num
    return num
}

function fork_to_copy_buffer() {
    bet_cost = get_float(bet1) + get_float(bet2)
    var profit1 = ~~(get_float(coef1) * get_float(bet1) - bet_cost)
    var profit2 = ~~(get_float(coef2) * get_float(bet2) - bet_cost)
    const str =
    `${get_float(bet1)} X ${get_float(coef1)} --> ${profit1}
    ${get_float(bet2)} X ${get_float(coef2)} --> ${profit2}`;
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = str;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
