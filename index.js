// jiajun.site — personal landing page with live per-site status.
// Single-file Cloudflare Worker: inline CSS / JS / SVG, no runtime dependencies.

// Lucide icons (ISC license, https://lucide.dev) — inner SVG markup, 24px grid.
const ICONS = {
  library: '<rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  train: '<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  printer: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  code: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  terminal: '<path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>',
  radar: '<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/>',
  palette: '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',
  clapperboard: '<path d="m12.296 3.464 3.02 3.956"/><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m6.18 5.276 3.1 3.899"/>',
  book: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z"/>',
  download: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
  flask: '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>',
  dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  message: '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
};

const GROUPS = [
  { id: 'daily', zh: '日常工具', en: 'Everyday tools' },
  { id: 'dev', zh: '开发与远程', en: 'Dev & remote' },
  { id: 'media', zh: '媒体与娱乐', en: 'Media & fun' },
  { id: 'other', zh: '其他', en: 'Other' },
];

// Offline sites are pulled out of their group into this section at render time.
const OFFLINE_GROUP = { id: 'offline', zh: '暂时离线', en: 'Offline for now' };

const SITES = [
  { host: 'hub.jiajun.site', group: 'daily', icon: 'library',
    zh: ['信息库', '个人信息汇总与资料库'], en: ['Info Hub', 'Personal info hub and reference library'] },
  { host: 'english.jiajun.site', group: 'daily', icon: 'languages',
    zh: ['英语练习', '英语表达练习'], en: ['English Practice', 'English expression practice'] },
  { host: 'caltrain.jiajun.site', group: 'daily', icon: 'train',
    zh: ['Caltrain 通勤', '实时查看 Caltrain 通勤班次状态'], en: ['Caltrain Commute', 'Live Caltrain commute status'] },
  { host: 'screenshot.jiajun.site', group: 'daily', icon: 'scan',
    zh: ['截图归档', '截图归档到云端，随时翻看'], en: ['Screenshot Archive', 'Screenshots archived to the cloud'] },
  { host: 'print.jiajun.site', group: 'daily', icon: 'printer',
    zh: ['3D 打印库', '打印过的模型、拓竹打印记录与耗材'], en: ['3D Print Library', 'Printed models, Bambu print history and cost'] },
  { host: 'card.jiajun.site', group: 'daily', icon: 'layers',
    zh: ['浮雕卡片', '把 SVG 线稿转成可打印的浮雕卡片 STL'], en: ['Relief Card', 'Turn SVG line art into a printable relief STL'] },

  { host: 'claude.jiajun.site', group: 'dev', icon: 'code',
    zh: ['Claude 工作区', '浏览器里的 code-server 编程环境'], en: ['Claude Workspace', 'code-server coding environment in the browser'] },
  { host: 'ssh.jiajun.site', group: 'dev', icon: 'terminal',
    zh: ['SSH 终端', '浏览器里的远程终端'], en: ['SSH Terminal', 'Remote terminal in the browser'] },
  { host: 'tower.jiajun.site', group: 'dev', icon: 'radar',
    zh: ['塔台', '查看各台机器的推理服务、节点状态与任务'], en: ['Tower', 'Inference nodes, machine status and jobs'] },
  { host: 'jc-design.jiajun.site', group: 'dev', icon: 'palette', comingSoon: true,
    zh: ['jc-design 设计系统', '个人设计系统：颜色、字体与组件'], en: ['jc-design', 'Personal design system: color, type, components'] },
  { host: 'research.jiajun.site', group: 'dev', icon: 'flask',
    zh: ['研究工作台', '调研与资料整理'], en: ['Research', 'Research workbench'] },

  { host: 'emby.jiajun.site', group: 'media', icon: 'clapperboard',
    zh: ['Emby 媒体库', '家里的电影与剧集'], en: ['Emby', 'Home movies and TV library'] },
  { host: 'komga.jiajun.site', group: 'media', icon: 'book',
    zh: ['Komga 漫画', '在线漫画阅读'], en: ['Komga', 'Comics and manga reader'] },
  { host: 'dj.jiajun.site', group: 'media', icon: 'download',
    zh: ['下载工具', '下载与媒体处理'], en: ['Downloader', 'Download and media tools'] },
  { host: 'reels.jiajun.site', group: 'media', icon: 'film',
    zh: ['Reels', '短视频素材与工具'], en: ['Reels', 'Short-video assets and tools'] },
  { host: 'matting.jiajun.site', group: 'media', icon: 'scissors',
    zh: ['抠图', '图片与视频抠图'], en: ['Matting', 'Image and video background removal'] },

  { host: 'dashboard.jiajun.site', group: 'other', icon: 'dashboard',
    zh: ['控制面板', '总览面板'], en: ['Dashboard', 'Overview dashboard'] },
  { host: 'office.jiajun.site', group: 'other', icon: 'briefcase',
    zh: ['Office', 'Office 工作区'], en: ['Office', 'Office workspace'] },
  { host: 'sms.jiajun.site', group: 'other', icon: 'message',
    zh: ['短信', '短信收发服务'], en: ['SMS', 'SMS service'] },
  { host: 'linq.jiajun.site', group: 'other', icon: 'link',
    zh: ['Linq', '链接与自动化'], en: ['Linq', 'Links and automation'] },
];

const STATUS_CACHE_KEY = 'https://jiajun.site/__status-v2';
const STATUS_TTL_SECONDS = 60; // refresh in the background once the map is older than this
const STATUS_KEEP_SECONDS = 7 * 24 * 3600; // keep the stale map around so the page never blocks
const COLD_WAIT_MS = 1500; // with no cached map at all, wait at most this long before rendering "checking"
const CHECK_TIMEOUT_MS = 3000;

const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function checkHost(host) {
  try {
    const res = await fetch(`https://${host}/`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
      headers: { 'user-agent': 'jiajun.site-status/1.0' },
    });
    res.body?.cancel();
    const location = res.headers.get('location') || '';
    if (res.status >= 300 && res.status < 400 && location.includes('cloudflareaccess.com')) {
      return { online: true, auth: true };
    }
    return { online: res.status >= 200 && res.status < 400, auth: false };
  } catch {
    return { online: false, auth: false };
  }
}

async function checkAll() {
  const targets = SITES.filter((s) => !s.comingSoon);
  const results = await Promise.all(targets.map((s) => checkHost(s.host)));
  const map = {};
  targets.forEach((s, i) => { map[s.host] = results[i]; });
  return { checkedAt: Date.now(), sites: map };
}

// Per-isolate guard: skip a background refresh if this isolate started one in the last 15s.
// (Promises are not shared across requests — Workers disallow cross-request I/O.)
let lastRefreshStartedAt = 0;

async function refreshStatus() {
  lastRefreshStartedAt = Date.now();
  const status = await checkAll();
  const res = new Response(JSON.stringify(status), {
    headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${STATUS_KEEP_SECONDS}` },
  });
  await caches.default.put(STATUS_CACHE_KEY, res);
  return status;
}

// Stale-while-revalidate: always answer from the cached map; refresh it in the background when old.
// Returns null only on a cold cache when checks take longer than COLD_WAIT_MS.
async function getStatus(ctx) {
  const cached = await caches.default.match(STATUS_CACHE_KEY);
  if (cached) {
    const status = await cached.json();
    const stale = Date.now() - status.checkedAt > STATUS_TTL_SECONDS * 1000;
    if (stale && Date.now() - lastRefreshStartedAt > 15000) ctx.waitUntil(refreshStatus().catch(() => {}));
    return status;
  }
  const pending = refreshStatus().catch(() => null);
  ctx.waitUntil(pending);
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), COLD_WAIT_MS));
  return Promise.race([pending, timeout]);
}

// Renders both languages; CSS hides the inactive one so switching needs no re-render.
const t = (zh, en) => `<span lang="zh-CN" data-l="zh">${esc(zh)}</span><span lang="en" data-l="en">${esc(en)}</span>`;
const icon = (name, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

function card(site, st) {
  const state = site.comingSoon ? 'soon' : !st ? 'checking' : st.online ? 'online' : 'offline';
  const stateLabel = {
    online: t('在线', 'Online'),
    offline: t('离线', 'Offline'),
    soon: t('即将上线', 'Coming soon'),
    checking: t('检查中…', 'Checking…'),
  }[state];
  const lock = st?.auth ? `<span class="auth" title="需要登录 / Sign-in required">${icon('lock', 'lk')}${t('需登录', 'Sign-in')}</span>` : '';
  const inner = `
    <span class="app g-${esc(site.group)}">${icon(site.icon)}</span>
    <span class="body">
      <span class="name">${t(site.zh[0], site.en[0])}</span>
      <span class="desc">${t(site.zh[1], site.en[1])}</span>
      <span class="meta"><span class="state s-${state}"><span class="dot"></span>${stateLabel}</span>${lock}<span class="host">${esc(site.host)}</span></span>
    </span>`;
  if (state === 'soon') return `<div class="card is-soon" aria-disabled="true">${inner}</div>`;
  return `<a class="card is-${state}" href="https://${esc(site.host)}/">${inner}</a>`;
}

function section(group, items, status) {
  if (!items.length) return '';
  return `<section class="group${group.id === 'offline' ? ' offline' : ''}"><h2>${t(group.zh, group.en)}<span class="count">${items.length}</span></h2><div class="grid">${items.map((s) => card(s, status?.sites[s.host])).join('')}</div></section>`;
}

function renderPage(status) {
  const known = Boolean(status);
  const isOffline = (s) => known && !s.comingSoon && !status.sites[s.host]?.online;
  const online = known ? SITES.filter((s) => !s.comingSoon && status.sites[s.host]?.online).length : 0;
  const offline = SITES.filter(isOffline).length;
  const sections = GROUPS.map((g) => section(g, SITES.filter((s) => s.group === g.id && !isOffline(s)), status)).join('')
    + section(OFFLINE_GROUP, SITES.filter(isOffline), status);
  const time = known ? new Date(status.checkedAt).toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' }) : '';
  const summary = known
    ? `<span class="dot" style="background:var(--online)"></span>${t(`${online} 个在线 · ${offline} 个离线`, `${online} online · ${offline} offline`)}`
    : `<span class="dot"></span>${t('正在检查各站点状态…', 'Checking site status…')}`;
  const footer = known
    ? t(`状态每分钟刷新 · 上次检查 ${time} PT`, `Status refreshes every minute · last checked ${time} PT`)
    : t('状态检查中，刷新页面即可看到结果', 'Checking status — reload in a moment to see results');

  return `<!doctype html>
<html lang="zh-CN" data-lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>jiajun 的站点</title>
<meta name="description" content="jiajun.site 上所有服务的入口与实时状态">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0071e3"/><text x="16" y="22" font-family="-apple-system,Helvetica,sans-serif" font-size="17" font-weight="700" fill="#fff" text-anchor="middle">j</text></svg>')}">
<script>try{var l=localStorage.getItem('lang');if(l==='en'){document.documentElement.dataset.lang='en';document.documentElement.lang='en';}}catch(e){}</script>
<style>
:root{
  --bg:#f5f5f7;--card:#ffffff;--text:#1d1d1f;--text-2:#6e6e73;--border:rgba(29,29,31,.08);--brand:#0071e3;
  --online:#30b158;--offline:#aeaeb2;--seg:rgba(29,29,31,.06);--seg-on:#ffffff;
  --shadow:0 1px 2px rgba(29,29,31,.04),0 4px 12px -2px rgba(29,29,31,.08);
  --shadow-hover:0 2px 4px rgba(29,29,31,.05),0 12px 28px -6px rgba(29,29,31,.16);
  --radius:18px;
  color-scheme:light;
}
@media (prefers-color-scheme:dark){:root{
  --bg:#000000;--card:#1c1c1e;--text:#f5f5f7;--text-2:#a1a1a6;--border:rgba(255,255,255,.08);--brand:#2997ff;
  --online:#32d74b;--offline:#636366;--seg:rgba(255,255,255,.08);--seg-on:#3a3a3c;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 4px 12px -2px rgba(0,0,0,.5);
  --shadow-hover:0 2px 4px rgba(0,0,0,.4),0 12px 28px -6px rgba(0,0,0,.7);
  color-scheme:dark;
}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC","Inter","Noto Sans CJK SC","Noto Sans SC","Microsoft YaHei",system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.4}
[data-lang="zh"] [data-l="en"],[data-lang="en"] [data-l="zh"]{display:none}
main{max-width:1080px;margin:0 auto;padding:56px 24px 48px}
header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:40px}
h1{font-size:clamp(34px,6vw,52px);line-height:1.05;letter-spacing:-.025em;font-weight:700;margin:0 0 10px}
.sub{margin:0;color:var(--text-2);font-size:17px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.sub .dot{width:8px;height:8px}
.seg{display:inline-flex;padding:2px;border-radius:9px;background:var(--seg);flex:none;margin-top:6px}
.seg button{font:inherit;font-size:13px;font-weight:500;color:var(--text-2);background:none;border:0;border-radius:7px;padding:5px 12px;cursor:pointer;min-width:52px}
.seg button[aria-pressed="true"]{background:var(--seg-on);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.12)}
.seg button:focus-visible{outline:2px solid var(--brand);outline-offset:1px}
.group{margin-top:36px}
h2{font-size:21px;font-weight:600;letter-spacing:-.01em;margin:0 0 14px;display:flex;align-items:baseline;gap:8px}
h2 .count{font-size:15px;font-weight:400;color:var(--text-2)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.card{display:flex;gap:16px;align-items:flex-start;padding:18px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);color:inherit;text-decoration:none;min-width:0;transition:transform .2s ease,box-shadow .2s ease}
a.card:hover{transform:translateY(-2px);box-shadow:var(--shadow-hover)}
a.card:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.app{flex:none;width:52px;height:52px;border-radius:22%;display:grid;place-items:center;color:#fff;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.25),0 1px 2px rgba(0,0,0,.12)}
.app .i{width:28px;height:28px}
.g-daily{background:linear-gradient(160deg,#5ac8fa,#0071e3)}
.g-dev{background:linear-gradient(160deg,#8e8cff,#5147d8)}
.g-media{background:linear-gradient(160deg,#ffae45,#ff375f)}
.g-other{background:linear-gradient(160deg,#63e6be,#1f9d8b)}
.body{display:flex;flex-direction:column;gap:3px;min-width:0;flex:1}
.name{font-size:17px;font-weight:600;letter-spacing:-.01em}
.desc{font-size:14px;color:var(--text-2)}
.meta{display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;margin-top:8px;font-size:12px;color:var(--text-2)}
.state,.auth{display:inline-flex;align-items:center;gap:5px;font-weight:500}
.dot{width:7px;height:7px;border-radius:50%;background:var(--offline);flex:none}
.s-online .dot{background:var(--online);box-shadow:0 0 0 3px color-mix(in srgb,var(--online) 18%,transparent)}
.s-soon{color:var(--brand)}
.s-soon .dot{background:var(--brand)}
.lk{width:12px;height:12px}
.host{margin-left:auto;font-variant-numeric:tabular-nums;opacity:.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}
.offline .card{box-shadow:none;background:transparent}
.offline .app,.is-soon .app{filter:grayscale(1);opacity:.45}
.offline .name,.offline .desc{opacity:.6}
.is-soon{border-style:dashed;box-shadow:none;cursor:default}
footer{margin-top:48px;color:var(--text-2);font-size:12px}
@media (max-width:600px){
  main{padding:32px 16px 40px}
  header{margin-bottom:28px}
  .sub{font-size:15px}
  .grid{grid-template-columns:1fr;gap:10px}
  .card{padding:14px;gap:14px}
  .app{width:46px;height:46px}
  .app .i{width:24px;height:24px}
  .host{margin-left:0}
}
@media (prefers-reduced-motion:reduce){.card{transition:none}a.card:hover{transform:none}}
</style>
</head>
<body>
<main>
<header>
  <div>
    <h1>${t('jiajun 的站点', "jiajun's sites")}</h1>
    <p class="sub">${summary}</p>
  </div>
  <div class="seg" role="group" aria-label="Language">
    <button type="button" data-set="zh" aria-pressed="true">中文</button>
    <button type="button" data-set="en" aria-pressed="false">EN</button>
  </div>
</header>
${sections}
<footer>${footer}</footer>
</main>
<script>
(function(){
  var root=document.documentElement,btns=document.querySelectorAll('.seg button');
  function apply(l){root.dataset.lang=l;root.lang=l==='en'?'en':'zh-CN';document.title=l==='en'?"jiajun's sites":'jiajun 的站点';btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.set===l))});}
  apply(root.dataset.lang||'zh');
  btns.forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.set);try{localStorage.setItem('lang',b.dataset.set)}catch(e){}})});
})();
</script>
</body>
</html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/') return new Response('Not found', { status: 404 });
    const status = await getStatus(ctx);
    return new Response(renderPage(status), {
      headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'no-cache' },
    });
  },
};
