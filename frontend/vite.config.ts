import { defineConfig, mergeConfig, UserConfig } from "vite";
import hrmsConfig from "../../hrms/frontend/vite.config";
import path from "path";

export default defineConfig(
  mergeConfig(
    hrmsConfig as UserConfig,
    {
      resolve: {
        alias: [
          {
            find: /^~@\//,
            replacement:
              path.resolve(__dirname, "../../hrms/frontend/node_modules") + "/",
          },
          {
            find: /@\/components\/BaseLayout.vue$/,
            replacement: path.resolve(
              __dirname,
              "src/components/BaseLayout.vue"
            ),
          },
          {
            find: /@\/components\/InstallPrompt.vue$/,
            replacement: path.resolve(
              __dirname,
              "src/components/InstallPrompt.vue"
            ),
          },
          {
            find: /@\/views\/Login.vue$/,
            replacement: path.resolve(__dirname, "src/views/Login.vue"),
          },
        ],
      },
    } as UserConfig
  )
);
