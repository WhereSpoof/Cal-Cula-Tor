from requests import get
from json import loads


VAR_NAME: str = 'var currency ='


def get_by_rates(key, rates):
    return '%.3f' % (1 / rates[key])


def main():
    req = get('https://api.exchangerate-api.com/v4/latest/RUB').text
    struct = loads(req)
    rates = struct['rates']
    usd = get_by_rates('USD', rates)
    eur = get_by_rates('EUR', rates)
    print(VAR_NAME, '[', ', '.join(['1', usd, eur]), ']')


if __name__ == "__main__":
    main()