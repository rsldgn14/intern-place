import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useMemo } from 'react';
dayjs.extend(utc);
dayjs.extend(timezone);

function utcDate(date?: dayjs.ConfigType, ...args: undefined[]) {
  return dayjs(date, ...args).utc(true);
}

function localdayjs(date?: dayjs.ConfigType, ...args: any[]) {
  return dayjs(date, ...args).utc();
}

function costaRicaTz(format: string) {
  return dayjs().tz('America/Costa_Rica').format(format);
}

function guessTz() {
  return dayjs.tz.guess();
}

function utcTz(date?: dayjs.ConfigType, ...args: any[]) {
  return dayjs(date, ...args)
    .utc()
    .tz('Etc/UTC');
}

// function formatDefault(d: Dayjs) {
//   return d.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ ([GMT]Z)');
// }

utcDate.extend = dayjs.extend;
utcDate.locale = dayjs.locale;
utcDate.isDayjs = dayjs.isDayjs;
utcDate.unix = dayjs.unix;

function useMemoDayjs(tz: string) {
  const dayjsTZ = useMemo(() => dayjs().tz(tz), [tz]);
  return dayjsTZ;
}

export { utcDate as dayjsUTC, dayjs, localdayjs, costaRicaTz, guessTz, utcTz, Dayjs, useMemoDayjs };