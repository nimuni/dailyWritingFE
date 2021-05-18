/* 사용예
import numberFormat from '../filters/numberFormat.js'

export default {
  data() { return { amount: 1000 } },
  filters: { numberFormat } // 컴포넌트 생성시 등록한다 
} 
*/
export default (value = '') => {
  value = '' + value

  // 숫자를 세 자리 마다 쉼표를 넣은 문자로 변환 (1000 -> '1,000')
  return value.split('').reverse().reduce((acc, digit, i) => {
    if (i > 0 && i % 3 === 0) {
      acc.push(',')
    }
    return [...acc, digit]
  }, []).reverse().join('')
}

