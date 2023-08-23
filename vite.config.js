import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = mode === 'production' && command === 'build'
  const alias = {
    '@': path.resolve(process.cwd(), './src'),
    '&': path.resolve(process.cwd(), './src')
  }
  return {
    plugins: [
      react(),
      svgrPlugin({
        svgrOptions: {
          icon: true
          // ...svgr options (https://react-svgr.com/docs/options/)
        }
      })
    ],
    resolve: {
      alias
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/style/_variables.scss";`
        }
      }
    },
    esbuild: {
      drop: isBuild ? ['console'] : []
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        // vite打包是通过rollup来打包的
        output: {
          manualChunks: (id) => {
            // 可以在这里打印看一下id的值，这里做个简单处理将node_modules中的包打包为vendor文件
            if (id.indexOf('node_modules') > -1) {
              return 'vendor'
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name].[hash].[ext]'
        }
      }
    }
  }
})
