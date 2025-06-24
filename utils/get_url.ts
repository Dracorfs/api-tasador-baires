export default function get_url(price_bottom: number, price_top: number): string {
    const parameter = `-${price_bottom}-${price_top}-dolar`
    const order = `-orden-precio-m2-ascendente`
    return `https://www.zonaprop.com.ar/departamentos-venta${parameter+order}.html`
}