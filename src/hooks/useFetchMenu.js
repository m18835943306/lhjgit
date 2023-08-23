import { useEffect, useState } from 'react'
import { getConfigList } from '../api'
import { toPascalCase } from '@/utils'
import { merge } from 'lodash'
import { getParamterByUrl } from '@/utils'

const code = getParamterByUrl('code')
export const useFetchMenu = () => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getConfigList({
        config_code: code + '_menu',
        system_code: 'COMBINE',
        token
      })

      if (result) {
        const trimResult = result.map((item) => {
          const { config_key, config_value } = item
          return {
            config_key: config_key.replace(/\s/g, ''),
            config_value: config_value.replace(/\s/g, '')
          }
        })
        const menuObj =
          trimResult.find((item) => {
            return item.config_key == 'menu'
          }) || {}

        const menuList = menuObj['config_value'].split(';').filter(Boolean)

        const sliderMenu = menuList.map((item) => {
          const [menuName, menu] = item.split(',')
          const hasSubMenu = trimResult.some(
            (r) => r.config_key === menuName && r.config_value !== '0'
          )
          if (hasSubMenu) {
            const subMenu = (trimResult.find(
              (r) => r.config_key === menuName
            ) || {})['config_value']
            const subList = subMenu?.split(';')
            const list = subList?.map((li) => {
              const [menuItemName, menuItem] = li.split(',')
              return {
                url: toPascalCase(menuItem),
                menuName: menuItemName
              }
            })
            return {
              url: menu,
              menuName: menuName,
              list: list
            }
          }
          return {
            url: toPascalCase(menu),
            menuName: menuName,
            list: []
          }
        })
        setData(merge(sliderMenu))
      }
    }
    fetchData()
  }, [code])

  return {
    data,
    code
  }
}
