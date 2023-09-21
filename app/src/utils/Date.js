import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
// Translations
import 'dayjs/locale/es'
import 'dayjs/locale/de'
import 'dayjs/locale/gl'

export function toDate(val,timestamp) {
  return dayjs().locale(val).to(parseInt(timestamp))
}
export function toFullDate(val,timestamp){
  dayjs.extend(localizedFormat)
  return dayjs(parseInt(timestamp)).locale(val).format('LLLL')
}
export function today() {
  return dayjs().unix()*1000;
}
