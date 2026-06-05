# HerVoice

> 被忽略的女性需求，在这里被看见、被讨论、被改进。

HerVoice 是一个纯静态的女性需求博客网站，聚焦成年人性健康科普、青少年性教育、孕期产品改进与公众留言。

## 页面结构

| 文件 | 说明 |
|------|------|
| `index.html` | 博客首页 |
| `sex-education.html` | 懂·性 — 成年人性健康与产品改进 |
| `youth.html` | 青芽 — 青少年性教育常识（12–18 岁） |
| `pregnancy.html` | 孕悦 — 孕期及产后需求与产品改进 |
| `feedback.html` | 留言板（Cusdis + Google Form 备用） |
| `style.css` | 全局样式 |
| `script.js` | 导航、支持计数等交互 |

## 本地预览

```bash
cd HerVoice
python3 -m http.server 8080
```

浏览器打开 [http://localhost:8080](http://localhost:8080)

## 技术说明

- 纯 HTML / CSS / JavaScript，无需后端
- 响应式布局，适配手机与桌面
- 孕悦页支持按钮使用 `localStorage` 本地计数
- 留言板预留 [Cusdis](https://cusdis.com) 嵌入位，需在 `feedback.html` 中替换 `你的APP_ID`

## 作者

本项目由 **HerVoice** 发起并维护。

## 许可

© 2026 HerVoice. 保留所有权利。
