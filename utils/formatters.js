import moment from 'moment'

export const formatDate = (value, key, item) => {
  const date = new Date(value)
  return [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ].join('/')
}

export const formatPretty = (value, key, item) => {
  const date = new Date(value)
  return moment(date).format('MMM Do YY, h:mm a')
}

export const formatPrettyTime = (value, key, item) => {
  return moment(value, 'HH:mm:ss').format('hh:mm A')
}
