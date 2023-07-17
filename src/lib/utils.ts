import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'

//the arg for the cn function is a rest parameter with any number of args and an array type
//ClassValue is used as the array type so the function is not limited to a single type
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))   //twMerge combines tailwind classes together ex. my-2 mx-2 -> m-2
                                 //clsx allows conditional rendering and combining of classnames
                                 //cn is kept as a util function here because it is used throughout
                                 //the project and reduces inline code
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}
