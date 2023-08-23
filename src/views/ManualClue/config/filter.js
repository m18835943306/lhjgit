import dayjs from 'dayjs'

export const start_time = dayjs().add(-1, 'd').format('YYYY-MM-DD')
export const end_time = dayjs().add(-1, 'd').format('YYYY-MM-DD')

export const defaultConfig = {
  start_time,
  end_time,
  floor: 1,
  upper: 10000,
  t_start: dayjs(end_time).add(-1, 'd').add(-1, 'M').format('YYYY-MM-DD'),
  t_end: dayjs(end_time).add(-1, 'd').format('YYYY-MM-DD'),
  ratio: 30
}
