import {defineConfig} from 'vite'
import viteTsconfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [viteTsconfigPath()]
})