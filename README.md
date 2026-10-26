# 意大利旅行手册（v1）

给 Boya 小同行用的**手机优先静态站**：支付 · 上网 · 火车/巴士 · 城市交通 · 急救 · 就医，以及佛罗伦萨 / 罗马 / 米兰 / 威尼斯分城页。

- **无** AI 对话、**无** 密码门（知链接即可）
- 中文界面；急救页大号 `tel:` 拨号
- PWA：可「添加到主屏幕」；构建后带 Service Worker 缓存

## 本地开发

零构建静态站（HTML + CSS + JS）。在本目录开本地服务：

```bash
cd sites/italy-guide
python3 -m http.server 5173
# 浏览器打开 http://127.0.0.1:5173/
```

或：`npm run dev`

## 构建（打包可托管目录）

```bash
npm run build
```

产物：`dist/`，并同步到 Project 的 `docs/italy-guide-dist/` 方便下载。

## 发布（任选其一，需你本机登录一次）

```bash
# 1) Cloudflare Pages
npx wrangler pages deploy dist --project-name=italy-guide

# 2) Netlify
npx netlify deploy --prod --dir=dist

# 3) Surge
npx surge dist boya-italy-guide.surge.sh
```

把得到的 HTTPS 链接发给同行即可。

本环境无 Cloudflare/Netlify/Surge 登录态，**无法代你落永久托管**。临时预览（进程在线时有效，可能需点一下 localtunnel 确认页）：

`https://boya-italy-guide-2026.loca.lt/`

## 怎么分享 / 加主屏幕

打开站内 **「分享」** 页（`share.html`），按 iPhone Safari / Android Chrome 步骤操作。建议把 **急救页** 单独加到主屏幕。

## 以后怎么加城市

1. 复制 `city-florence.html` → `city-xxx.html`，改标题与机场/票务/注意点。
2. 在 `index.html` 的「城市分册」列表加一行链接。
3. 在 `vite.config.js` 的 `pages` 数组加入 `city-xxx`。
4. `npm run build` 后重新部署。

## 内容来源

紧急电话与实务要点来自 Project 文档 `docs/italy-travel-playbook.md`。保险单号等留了占位，请自行填写。政策会变，出发前复核官网链接。
