export function toCurrencyIdr(val) {
    return `Rp. ${formatCurrency(Number(val))}`   
}

export function formatCurrency(amount, decimal = 2, thousands = ".") {
    try {
        decimal = Math.abs(decimal);
        decimal = isNaN(decimal) ? 2 : decimal;

        const signNegative = amount < 0 ? '-' : '';
        amount = Math.abs(Number(amount) || 0).toFixed(decimal)

        let i = parseInt(amount).toString();
        let j = (i.length > 3) ? i.length % 3 : 0

        return signNegative + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands)
    } catch (e) {
        return '0,00'
    }
}