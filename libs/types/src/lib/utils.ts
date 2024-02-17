import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function renderDateTime(dateTime: string) {
  return formatYYYYMMDD_HHMMSS(dateTime);
}

export function renderDate(date: string) {
  return formatYYYYMMDD(date);
}

export function renderBirthDate(dateTime: string) {
  return formatYYYYMMDD(dateTime);
}

function formatYYYYMMDD_HHMMSS(original: string): string {
  const d = utcDate(original);
  return d.format('YYYY-MM-DD HH:mm:ss');
}

function formatYYYYMMDD(original: string): string {
  const d = utcDate(original);
  return d.format('DD-MM-YYYY');
}

function utcDate(date?: dayjs.ConfigType, ...args: undefined[]) {
  return dayjs(date, ...args).utc(true);
}

export function checkPasswords(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}


