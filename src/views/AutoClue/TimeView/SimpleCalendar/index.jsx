import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getClueFilterDate } from '&/api/electricity'
import dayjs from 'dayjs'
import './index.scss'
import _ from 'lodash'

const SimpleCalendar = ({ time_type, clue_date }) => {
  const [fullDays, setFullDays] = useState([])
  const [lastWeekDuration, setLastWeekDuration] = useState([])
  const [currentWeekDuration, setCurrentWeekDuration] = useState([])
  const weeks = useMemo(() => {
    return ['一', '二', '三', '四', '五', '六', '日']
  }, [])
  const value = JSON.parse(localStorage.getItem('user'))
  const getFilterDate = async () => {
    const json = {
      time_type,
      clue_date: dayjs(clue_date).add(1, 'd').format('YYYY-MM-DD'),
      project_id: value.project_id
    }
    const { duration1, duration2, full } = await getClueFilterDate(json)
    setFullDays(
      generateTimesByDuration(full, (times) => {
        if (times.length <= 14) {
          times.pop()
          ;[...Array(14 - times.length)].forEach(() => times.push('--'))
        } else {
          times.pop()
        }
        return times
      })
    )
    setLastWeekDuration(generateTimesByDuration(duration2))
    setCurrentWeekDuration(generateTimesByDuration(duration1))
  }
  const generateTimesByDuration = (durations, cb, format = 'DD') => {
    if (!durations.length) return []
    const times = []
    const [startTime, endTime] = durations
    const diffDay = dayjs(endTime).diff(dayjs(startTime), 'days')
    for (let i = 0; i < diffDay + 1; i++) {
      times.push(dayjs(startTime).add(i, 'd').format(format))
    }
    return _.isFunction(cb) ? cb(times) : times
  }
  useEffect(() => {
    if (time_type) {
      getFilterDate()
    }
  }, [time_type, clue_date])

  const isShowBgc = useCallback(
    (day) => {
      return lastWeekDuration.includes(day) || currentWeekDuration.includes(day)
    },
    [lastWeekDuration, currentWeekDuration]
  )
  return (
    <div className="SimpleCalendar">
      <ul className="SimpleCalendar_week">
        {weeks.map((week, i) => (
          <li key={i} className="SimpleCalendar_week__item">
            {week}
          </li>
        ))}
      </ul>
      <ul className="SimpleCalendar_day">
        {fullDays.map((day, i) => (
          <li
            key={i}
            className="SimpleCalendar_day__item"
            style={{
              marginLeft: i % 7 === 0 ? '0px' : '',
              background: isShowBgc(day)
                ? i < 7
                  ? '#0076f6'
                  : '#F77D02'
                : 'none',
              borderColor: day === '--' ? '#ccc' : '#87f3ff',
              color: day === '--' ? '#ccc' : '#000'
            }}
          >
            {day}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimpleCalendar
