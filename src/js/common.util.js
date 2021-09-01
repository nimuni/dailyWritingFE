export function exp_Email(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
}

export function exp_numberEnglishSmall(str) {
  const reg = /^[a-z0-9+]*$/;
  return reg.test(String(str));
}

export function exp_numberEnglishAll(str) {
  const reg = /^[A-Za-z0-9+]*$/;
  return reg.test(String(str));
}

export function exp_english(str) {
  const reg = /^[a-zA-Z]*$/;
  return reg.test(String(str));
}

export function exp_phone(str) {
  const reg = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return reg.test(String(str));
}

export function exp_koreanNumberEnglish(str){
  const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  return reg.test(String(str));
}

export function exp_remove_html_tag(str) {
  // br을 띄어쓰기로 변경
  // let text = str.replace(/<br\/>/ig, "\n")
  return str.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
}

export function exp_timezoneStrToYYYYMMDD(time){
  let YYYYMMDD = time.substring(0, 10);
  return YYYYMMDD;
}