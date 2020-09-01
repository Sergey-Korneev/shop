export default function numberFilter(value) {
  return new Intl.NumberFormat().format(value);
}
