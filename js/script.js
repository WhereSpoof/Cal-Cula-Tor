var coef1, coef2, bet1, bet2, profit1, profit2, profit_percent, profit_percent_cont, hidden_fix

var mults = [currency[0], currency[0]]


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
    coef1.addEventListener('input', () => { click(1, true) })
    bet1.addEventListener('input', () => { click(1) })
    coef2.addEventListener('input', () => { click(2, true) })
    bet2.addEventListener('input', () => { click(2) })

    // For profit percent calculation
    coef1.addEventListener('input', calc_profit_percent)
    coef2.addEventListener('input', calc_profit_percent)

    // Currency selectors
    document.getElementsByClassName('cur-choice')[0].addEventListener('input', () => { set_mult(1, 0, 0) })
    document.getElementsByClassName('cur-choice')[1].addEventListener('input', () => { set_mult(1, 1, 1) })
    document.getElementsByClassName('cur-choice')[2].addEventListener('input', () => { set_mult(2, 2, 0) })
    document.getElementsByClassName('cur-choice')[3].addEventListener('input', () => { set_mult(2, 3, 1) })

    // For tabs
    for (i = 0; i < 4; i++) document.getElementsByClassName('field')[i].addEventListener('keydown', tab_handle)

    // Set up from GET args
    get_args()
    calc_profit_percent()
    calc(coef1, bet1, coef2, bet2)
    calc(coef2, bet2, coef1, bet1)
}

function set_mult(pos, index, multi) {
    if (document.getElementsByClassName('cur-choice')[index].checked)
        mults[multi] = currency[pos]
    else
        mults[multi] = currency[0]
    
    high_calc(true)
}

function set_profit(index, value) {
    if (index === 1) 
        profit1.innerHTML = ~~(value / mults[0])
    else if (index === 2)
        profit2.innerHTML = ~~(value / mults[1])
}

function set_bet(index, value) {
    if (value < 1) return

    if (index === 1)
        bet1.value = hybrid_round(value / mults[0])    
    else if (index === 2)
        bet2.value = hybrid_round(value / mults[1])
}

function get_bet(index) {
    if (index === 1)
        return get_int(bet1) * mults[0]
    else if (index === 2)
        return get_int(bet2) * mults[1]    
}

function click(value, is_fix_a_priority = false) {
    hidden_fix = value
    high_calc(is_fix_a_priority)
}

function get_args() {
    var url_string = window.location.href
    var url = new URL(url_string)
    coef1.value = url.searchParams.get('c1')
    coef2.value = url.searchParams.get('c2')
    bet1.value = url.searchParams.get('b1')
    bet2.value = url.searchParams.get('b2')
}

function tab_handle(ev) {
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
    color = p * 4
    MAX_COLOR = 210
    MIN_COLOR = 90
    if (color < 0) {
        color = -color + MIN_COLOR
        if (color > MAX_COLOR) color = MAX_COLOR
        profit_percent_cont.style.color = 'rgb(' + color + ',0,0)'
    } else {
        color += MIN_COLOR
        if (color > MAX_COLOR) color = MAX_COLOR
        profit_percent_cont.style.color = 'rgb(0,' + color + ',0)'
    }

    profit_percent.innerHTML = p
}

function get_fix_mode() {
    if (document.getElementsByClassName('fix-choice')[0].checked)
        return 1
    if (document.getElementsByClassName('fix-choice')[1].checked)
        return 2
    if (document.getElementsByClassName('fix-choice')[2].checked)
        return 3
}

function high_calc(is_fix_a_priority = false) {
    fix_mode = get_fix_mode()

    if (is_fix_a_priority) {
        if (fix_mode === 1) calc(coef1, bet1, coef2, bet2)
        if (fix_mode === 2) calc(coef2, bet2, coef1, bet1)
        if (fix_mode === 3 && hidden_fix == 1) calc(coef1, bet1, coef2, bet2)
        if (fix_mode === 3 && hidden_fix == 2) calc(coef2, bet2, coef1, bet1)
    } else {
        if (fix_mode === 1)
            if (hidden_fix === 1) calc(coef1, bet1, coef2, bet2)
            else if (hidden_fix === 2) calc_profit()
        
        if (fix_mode === 2)
            if (hidden_fix === 2) calc(coef2, bet2, coef1, bet1)
            else if (hidden_fix === 1) calc_profit()
        
        if (fix_mode === 3)
            if (hidden_fix === 1) calc(coef1, bet1, coef2, bet2)
            else if (hidden_fix === 2) calc(coef2, bet2, coef1, bet1)
    }
}

function calc(c0, b0, c1, b1) {
    b0v = b0 == bet1 ? get_bet(1) : get_bet(2)
    c0v = get_float(c0)
    c1v = get_float(c1)

    max_num = 10000000
    if (get_int(b0) > max_num)
        b0.value = max_num
    bet = c0v * b0v / c1v
    if (isNaN(bet))
        return

    if (b0 == bet1)
        set_bet(2, bet)
    else
        set_bet(1, bet)

    calc_profit()
}

function calc_profit() {
    bet_cost = get_bet(1) + get_bet(2)
    set_profit(1, get_float(coef1) * get_bet(1) - bet_cost)
    set_profit(2, get_float(coef2) * get_bet(2) - bet_cost)
}

function hybrid_round(num) {
    num = ~~num
    size = num.toString().length
    floor_to_arr = [1, 1, 1, 5, 50, 100, 500, 10000]
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

function copy_fork_to_buffer() {
    const str =
    `${get_int(bet1)} * ${get_float(coef1)} --> ${profit1.innerHTML}
     ${get_int(bet2)} * ${get_float(coef2)} --> ${profit2.innerHTML}`;
    var dummy = document.createElement("textarea")
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    document.body.appendChild(dummy)
    // Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = str
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
}