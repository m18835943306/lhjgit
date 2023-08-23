import { lazy, Suspense } from 'react'
import TestComponent from '@/appComponents/TestComponent'
import { Spin } from 'antd'
/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
export const LazyLoad = (importer) => {
  const Comp = lazy(importer)
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        />
      }
    >
      <TestComponent>
        <Comp />
      </TestComponent>
    </Suspense>
  )
}
