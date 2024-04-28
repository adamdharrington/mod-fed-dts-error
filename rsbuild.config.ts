// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack'

export default defineConfig({
  server: {
    port: 2000,
    proxy: {
      '/button_provider': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/button_provider': '' },
        changeOrigin: true,
      },
    },
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'federation_consumer',
          remotes: {
            federation_provider: {
              external: 'federation_provider@/button_provider/mf-manifest.json',
            },
          },
          shared: ['react', 'react-dom'],
        }),
      ])
    },
  },
  plugins: [pluginReact()],
})
