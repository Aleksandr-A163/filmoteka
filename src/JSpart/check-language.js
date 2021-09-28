export default function checkLanguage(str) {
  const regexpRu = /^[А-Яа-яЁё0-9 ]+$/;
  const regexpEn = /^[A-Za-z0-9 ]+$/;

  if (regexpRu.test(str)) return 'ru';
  if (regexpEn.test(str)) return 'en';
  return false;
}
