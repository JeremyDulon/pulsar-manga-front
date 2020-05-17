import { date } from 'quasar'
import { plz } from '@/utils/string'
import * as dateConsts from '@/consts/date'

const { getDateDiff, formatDate } = date

export const relativeDiff = (d1, d2) => {
  console.log(d1, d2)
  let _h = getDateDiff(d1, d2, 'hours')
  if (_h < 24) return _h + ' hours ago'
  let _d = getDateDiff(d1, d2, 'days')
  if (_d < 30) return _d + ' days ago'
  let _m = getDateDiff(d1, d2, 'months')
  if (_m < 12) return _d + ' months ago'
  let _y = getDateDiff(d1, d2, 'years')
  // d1 = addToDate(d1, { year: _y })
  // _m = getDateDiff(d1, d2, 'months')
  return [_y, plz('year', _y), 'ago'].join(' ')
}

export const todayDiff = (_d) => relativeDiff(new Date(), _d)

export const dateFormatIso = (d) => formatDate(d, dateConsts.DATE_ISO)
