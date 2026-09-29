// jiajun.site — personal landing page with live per-site status.
// Single-file Cloudflare Worker: inline CSS / JS / SVG, no runtime dependencies.

// Lucide icons (ISC license, https://lucide.dev) — inner SVG markup, 24px grid.
const ICONS = {
  library: '<rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/>',
  pot: '<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/>',
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
  { host: 'recipes.jiajun.site', group: 'daily', icon: 'pot',
    zh: ['菜谱', '收藏里的菜谱、本周菜单、采购清单和做饭模式'], en: ['Recipes', 'Saved recipes, weekly menu, grocery list and cook mode'] },
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
  { host: 'jc-design.jiajun.site', group: 'dev', icon: 'palette',
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

function section(group, items, status, index) {
  if (!items.length) return '';
  const idx = String(index).padStart(2, '0');
  return `<section class="group${group.id === 'offline' ? ' offline' : ''}"><h2><span class="idx">§ ${idx}</span><span class="title">${t(group.zh, group.en)}</span><span class="count">${items.length}</span></h2><div class="grid">${items.map((s) => card(s, status?.sites[s.host])).join('')}</div></section>`;
}

// Deterministic 12×12 pixel face (ported from jiajun's jc-design pixel-art/pixel-face.ts).
// Tones: 0 empty, 1 lightest … 4 darkest; mirror-symmetric like handheld sprites.
function hashSeed(seed) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) { hash ^= seed.charCodeAt(i); hash = Math.imul(hash, 0x01000193); }
  return hash >>> 0;
}
function mulberry32(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let v = Math.imul(state ^ (state >>> 15), 1 | state);
    v = (v + Math.imul(v ^ (v >>> 7), 61 | v)) ^ v;
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296;
  };
}
const HEADS = [
  { top: 2, rows: [3, 4, 5, 5, 5, 5, 5, 4, 3] },
  { top: 2, rows: [4, 5, 5, 5, 5, 5, 5, 5, 4] },
  { top: 1, rows: [3, 4, 4, 4, 4, 4, 4, 4, 4, 3] },
  { top: 3, rows: [4, 5, 5, 5, 5, 5, 4, 3] },
];
const HAIR = ['none', 'cap', 'fringe', 'spiky', 'long'];
const EXPRESSIONS = ['smile', 'neutral', 'surprised', 'sleepy', 'grin'];
function pixelFace(seed, options = {}) {
  const next = mulberry32(hashSeed(seed));
  const pick = (list) => list[Math.floor(next() * list.length)];
  const size = 12;
  const grid = Array.from({ length: size }, () => Array(size).fill(options.framed ? 2 : 0));
  const set = (row, col, tone) => {
    if (row < 0 || row >= size || col < 0 || col >= size / 2) return;
    grid[row][col] = tone; grid[row][size - 1 - col] = tone;
  };
  const head = pick(HEADS);
  const hair = pick(HAIR);
  const expression = options.expression ?? pick(EXPRESSIONS);
  const eyeCol = next() < 0.5 ? 3 : 4;
  const cheeks = next() < 0.45;
  const bottom = head.top + head.rows.length - 1;
  const inHead = (row, col) => { const half = head.rows[row - head.top]; return half !== undefined && col >= size / 2 - half && col < size / 2; };
  for (let r = 0; r < size; r += 1) for (let c = 0; c < size / 2; c += 1) if (inHead(r, c)) set(r, c, 1);
  for (let r = 0; r < size; r += 1) for (let c = 0; c < size / 2; c += 1) {
    if (inHead(r, c)) continue;
    if (inHead(r - 1, c) || inHead(r + 1, c) || inHead(r, c - 1) || (c === size / 2 - 1 ? false : inHead(r, c + 1))) set(r, c, 4);
  }
  const hairTone = next() < 0.5 ? 3 : 4;
  const top = head.top;
  if (hair === 'cap' || hair === 'fringe' || hair === 'long') {
    for (let c = 0; c < size / 2; c += 1) { if (inHead(top, c)) set(top, c, hairTone); if (inHead(top + 1, c)) set(top + 1, c, hairTone); }
  }
  if (hair === 'fringe') for (let c = 0; c < size / 2; c += 1) if (inHead(top + 2, c) && (c + (eyeCol === 3 ? 0 : 1)) % 2 === 0) set(top + 2, c, hairTone);
  if (hair === 'long') for (let r = top + 2; r <= Math.min(bottom + 1, size - 1); r += 1) { const half = head.rows[Math.min(r - top, head.rows.length - 1)]; set(r, size / 2 - half - 1, hairTone); }
  if (hair === 'spiky') for (let c = 1; c < size / 2; c += 2) if (inHead(top, c)) set(top - 1, c, 4);
  const eyeRow = top + 4;
  const mouthRow = Math.min(top + 6, bottom - 1);
  if (expression === 'sleepy') { set(eyeRow, eyeCol, 4); set(eyeRow, eyeCol - 1, 4); }
  else if (expression === 'surprised') { set(eyeRow - 1, eyeCol, 4); set(eyeRow, eyeCol, 4); }
  else set(eyeRow, eyeCol, 4);
  if (cheeks && expression !== 'sleepy') set(eyeRow + 1, eyeCol - 1, 2);
  switch (expression) {
    case 'smile': set(mouthRow - 1, 4, 4); set(mouthRow, 5, 4); break;
    case 'grin': set(mouthRow, 4, 4); set(mouthRow, 5, 4); set(mouthRow + 1, 5, 3); break;
    case 'surprised': set(mouthRow, 5, 4); set(mouthRow + 1, 5, 4); break;
    case 'sleepy': set(mouthRow, 5, 3); break;
    default: set(mouthRow, 4, 4); set(mouthRow, 5, 4);
  }
  return grid;
}
// Horizontal runs of one tone, so a row is a few rects instead of twelve.
function pixelSvg(grid, fill, attrs = '') {
  const rects = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const tone = row[x]; let end = x + 1;
      while (end < row.length && row[end] === tone) end += 1;
      if (tone) rects.push(`<rect x="${x}" y="${y}" width="${end - x}" height="1" fill="${fill(tone)}"/>`);
      x = end;
    }
  });
  return `<svg ${attrs} viewBox="0 0 12 12" shape-rendering="crispEdges">${rects.join('')}</svg>`;
}
const FACE = pixelFace('jiajun', { expression: 'smile' });
const FACE_SVG = pixelSvg(FACE, (tone) => `var(--pixel-${tone})`, 'class="face" aria-hidden="true"');
// Favicon pins the Newsprint light values (a data: URI cannot read CSS variables).
const FAVICON = pixelSvg(FACE, (tone) => ({ 1: '#ece9da', 2: '#b0ad9d', 3: '#717064', 4: '#2b2b24' }[tone]), 'xmlns="http://www.w3.org/2000/svg"')
  .replace('<rect', '<rect width="12" height="12" fill="#e4e0cc"/><rect');

function renderPage(status) {
  const known = Boolean(status);
  const isOffline = (s) => known && !s.comingSoon && !status.sites[s.host]?.online;
  const online = known ? SITES.filter((s) => !s.comingSoon && status.sites[s.host]?.online).length : 0;
  const offline = SITES.filter(isOffline).length;
  // Number only the sections that render, so an all-offline group leaves no gap.
  const sections = [...GROUPS.map((g) => [g, SITES.filter((s) => s.group === g.id && !isOffline(s))]), [OFFLINE_GROUP, SITES.filter(isOffline)]]
    .filter(([, items]) => items.length)
    .map(([g, items], i) => section(g, items, status, i + 1)).join('');
  const time = known ? new Date(status.checkedAt).toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' }) : '';
  const summary = known
    ? `<span class="dot on"></span>${t(`${online} 个在线 · ${offline} 个离线`, `${online} online · ${offline} offline`)}`
    : `<span class="dot"></span>${t('正在检查各站点状态…', 'Checking site status…')}`;
  const counter = known
    ? `<div class="counter" aria-hidden="true"><span class="num">${String(online).padStart(2, '0')}</span><span class="label"><span class="led"></span>${t('个站点在线', 'sites online')}</span></div>`
    : '';
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
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(FAVICON)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Doto:wght,ROND@800,100&family=Instrument+Serif&family=JetBrains+Mono:wght@400..600&display=swap">
<script>try{var d=document.documentElement,l=localStorage.getItem('lang'),p=localStorage.getItem('palette');if(l==='en'){d.dataset.lang='en';d.lang='en';}if(p==='ultramarine')d.dataset.palette='ultramarine';}catch(e){}</script>
<style>
/* Retro-future themes, base colours copied from jc-design themes.css (--rt-*).
   Newsprint is the default; Ultramarine is opt-in via data-palette.
   Light/dark follow the system; data-theme="light|dark" on <html> forces one. */
:root{
  --rt-paper:#e4e0cc;--rt-paper-raised:#ece9da;--rt-paper-sunken:#d8d3bc;
  --rt-ink:#2b2b24;--rt-ink-2:#5a5c4f;--rt-signal:#d71920;--rt-signal-ink:#b3141b;--rt-success-ink:#3f6b2a;
  --grain-opacity:.1;--grain-invert:0;
  color-scheme:light;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --rt-paper:#121210;--rt-paper-raised:#1b1b18;--rt-paper-sunken:#24241f;
  --rt-ink:#e4e0cc;--rt-ink-2:#9a9886;--rt-signal:#f0463c;--rt-signal-ink:#ff6b5e;--rt-success-ink:#8dbf6a;
  --grain-opacity:.08;--grain-invert:1;color-scheme:dark;
}}
:root[data-theme="dark"]{
  --rt-paper:#121210;--rt-paper-raised:#1b1b18;--rt-paper-sunken:#24241f;
  --rt-ink:#e4e0cc;--rt-ink-2:#9a9886;--rt-signal:#f0463c;--rt-signal-ink:#ff6b5e;--rt-success-ink:#8dbf6a;
  --grain-opacity:.08;--grain-invert:1;color-scheme:dark;
}
:root[data-palette="ultramarine"]{
  --rt-paper:#e4e4e6;--rt-paper-raised:#efeff1;--rt-paper-sunken:#d6d6db;
  --rt-ink:#1f10d8;--rt-ink-2:#5a52c8;--rt-signal:#e5322b;--rt-signal-ink:#c21f1a;--rt-success-ink:#2f6b3a;
}
@media (prefers-color-scheme:dark){:root[data-palette="ultramarine"]:not([data-theme="light"]){
  --rt-paper:#0c0a1f;--rt-paper-raised:#15122e;--rt-paper-sunken:#1e1a3d;
  --rt-ink:#c9c4ff;--rt-ink-2:#8e88d0;--rt-signal:#ff5a4e;--rt-signal-ink:#ff7a70;--rt-success-ink:#8dbf8a;
}}
:root[data-palette="ultramarine"][data-theme="dark"]{
  --rt-paper:#0c0a1f;--rt-paper-raised:#15122e;--rt-paper-sunken:#1e1a3d;
  --rt-ink:#c9c4ff;--rt-ink-2:#8e88d0;--rt-signal:#ff5a4e;--rt-signal-ink:#ff7a70;--rt-success-ink:#8dbf8a;
}
/* Derived tokens, same formulas as jc-design themes.css. */
:root{
  --hairline:color-mix(in srgb,var(--rt-ink) 16%,transparent);
  --border-strong:color-mix(in srgb,var(--rt-ink) 28%,transparent);
  --control-hover:color-mix(in srgb,var(--rt-ink) 6%,transparent);
  --dot-grid:color-mix(in srgb,var(--rt-ink) 16%,transparent);
  --pixel-1:var(--rt-paper-raised);
  --pixel-2:color-mix(in srgb,var(--rt-ink) 28%,var(--rt-paper));
  --pixel-3:color-mix(in srgb,var(--rt-ink) 62%,var(--rt-paper));
  --pixel-4:var(--rt-ink);
  --font-sans:-apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC","Inter","Noto Sans CJK SC","Noto Sans SC","Microsoft YaHei",system-ui,sans-serif;
  --font-display:"Instrument Serif","Songti SC","Noto Serif SC","Source Han Serif SC",ui-serif,Georgia,serif;
  --font-mono:"JetBrains Mono",ui-monospace,"SF Mono","PingFang SC","Noto Sans SC",monospace;
  --font-dot:"Doto","JetBrains Mono",ui-monospace,monospace;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;background:var(--rt-paper)}
body{margin:0;background:var(--rt-paper);color:var(--rt-ink);font-family:var(--font-sans);-webkit-font-smoothing:antialiased;line-height:1.45}
[data-lang="zh"] [data-l="en"],[data-lang="en"] [data-l="zh"]{display:none}
.label,.eyebrow{font-family:var(--font-mono);font-size:11px;line-height:1.35;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--rt-ink-2)}
.bar{border-bottom:1px solid var(--hairline)}
.bar-in{max-width:1080px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.brand{display:inline-flex;align-items:center;gap:10px;color:inherit;text-decoration:none;font-family:var(--font-mono);font-size:13px;font-weight:500;min-width:0}
.face{width:28px;height:28px;flex:none;display:block}
.ctrls{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
.seg{display:inline-flex;border:1px solid var(--hairline);border-radius:3px;padding:2px;flex:none}
.seg button{position:relative;font-family:var(--font-mono);font-size:12px;font-weight:500;color:var(--rt-ink-2);background:none;border:0;border-radius:2px;padding:5px 11px;cursor:pointer;min-width:44px;min-height:30px}
.seg button:hover{background:var(--control-hover);color:var(--rt-ink)}
.seg button[aria-pressed="true"]{background:var(--rt-ink);color:var(--rt-paper)}
.seg button[aria-pressed="true"]::before{content:"";position:absolute;top:4px;left:4px;width:4px;height:4px;border-radius:50%;background:var(--rt-signal)}
.seg button:focus-visible{outline:2px solid var(--rt-ink);outline-offset:1px}
main{max-width:1080px;margin:0 auto;padding:0 24px 48px}
.hero{position:relative;overflow:hidden;margin:0 -24px;padding:40px 24px 36px;background-image:radial-gradient(var(--dot-grid) 1px,transparent 1.2px);background-size:14px 14px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
.hero::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--grain-opacity);filter:invert(var(--grain-invert));background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.4 -.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.hero>*{position:relative;z-index:1;min-width:0}
h1{font-family:var(--font-display);font-weight:400;font-synthesis-weight:none;font-size:clamp(48px,8vw,88px);line-height:.95;letter-spacing:-.01em;margin:10px 0 14px}
.sub{margin:0;color:var(--rt-ink-2);font-family:var(--font-mono);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.counter{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex:none}
.counter .num{font-family:var(--font-dot);font-weight:800;font-size:64px;line-height:.8;font-variant-numeric:tabular-nums}
.counter .label{display:inline-flex;align-items:center;gap:6px}
.led{width:6px;height:6px;border-radius:50%;background:var(--rt-signal);flex:none}
.group{margin-top:40px}
h2{display:flex;align-items:baseline;gap:12px;margin:0 0 14px;padding-top:12px;border-top:1px solid var(--hairline);font-weight:400}
h2 .idx,h2 .count{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;color:var(--rt-ink-2)}
h2 .title{font-family:var(--font-display);font-size:30px;line-height:1.1;letter-spacing:-.01em}
h2 .count{margin-left:auto}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.card{display:flex;gap:14px;align-items:flex-start;padding:16px;background:var(--rt-paper-raised);border:1px solid var(--hairline);border-radius:4px;color:inherit;text-decoration:none;min-width:0;transition:border-color .15s ease,background-color .15s ease}
a.card:hover{border-color:var(--border-strong);background:color-mix(in srgb,var(--rt-ink) 4%,var(--rt-paper-raised))}
a.card:focus-visible{outline:2px solid var(--rt-ink);outline-offset:2px}
.app{flex:none;width:44px;height:44px;border-radius:3px;display:grid;place-items:center;color:var(--rt-ink);background:var(--rt-paper-sunken);border:1px solid var(--hairline)}
.app .i{width:22px;height:22px;stroke-width:1.6}
.body{display:flex;flex-direction:column;gap:3px;min-width:0;flex:1}
.name{font-size:16px;font-weight:600;letter-spacing:-.005em}
.desc{font-size:14px;color:var(--rt-ink-2)}
.meta{display:flex;align-items:center;flex-wrap:wrap;gap:4px 12px;margin-top:10px;font-family:var(--font-mono);font-size:11px;color:var(--rt-ink-2)}
.state,.auth{display:inline-flex;align-items:center;gap:6px;font-weight:500}
.dot{width:7px;height:7px;border-radius:50%;border:1px solid var(--rt-ink-2);flex:none;background:transparent}
.dot.on,.s-online .dot{background:var(--rt-success-ink);border-color:var(--rt-success-ink)}
.s-online{color:var(--rt-success-ink)}
.s-soon{color:var(--rt-signal-ink)}
.s-soon .dot{background:var(--rt-signal);border-color:var(--rt-signal)}
.lk{width:11px;height:11px}
.host{margin-left:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}
.offline .card{background:transparent;border-style:dashed}
.offline .app,.is-soon .app{color:var(--rt-ink-2);background:transparent}
.offline .name,.offline .desc{opacity:.65}
.is-soon{border-style:dashed;cursor:default}
footer{margin-top:48px;padding-top:12px;border-top:1px solid var(--hairline)}
@media (max-width:600px){
  .bar-in{padding:10px 16px}
  .brand span{display:none}
  main{padding:0 16px 40px}
  .hero{margin:0 -16px;padding:28px 16px 24px}
  .counter{display:none}
  .group{margin-top:32px}
  h2 .title{font-size:26px}
  .grid{grid-template-columns:1fr;gap:8px}
  .card{padding:14px;gap:12px}
  .app{width:40px;height:40px}
  .app .i{width:20px;height:20px}
  .host{margin-left:0}
}
@media (prefers-reduced-motion:reduce){.card{transition:none}}
</style>
</head>
<body>
<header class="bar"><div class="bar-in">
  <a class="brand" href="/">${FACE_SVG}<span>jiajun.site</span></a>
  <div class="ctrls">
    <div class="seg" role="group" aria-label="Language">
      <button type="button" data-lang-set="zh" aria-pressed="true">中文</button>
      <button type="button" data-lang-set="en" aria-pressed="false">EN</button>
    </div>
    <div class="seg" role="group" aria-label="Theme">
      <button type="button" data-palette-set="newsprint" aria-pressed="true">${t('新闻纸', 'Newsprint')}</button>
      <button type="button" data-palette-set="ultramarine" aria-pressed="false">${t('群青', 'Ultramarine')}</button>
    </div>
  </div>
</div></header>
<main>
<section class="hero">
  <div>
    <p class="eyebrow">${t('服务目录 · 实时状态', 'Service directory · live status')}</p>
    <h1>${t('jiajun 的站点', "jiajun's sites")}</h1>
    <p class="sub">${summary}</p>
  </div>
  ${counter}
</section>
${sections}
<footer class="label">${footer}</footer>
</main>
<script>
(function(){
  var root=document.documentElement;
  var langBtns=document.querySelectorAll('[data-lang-set]'),palBtns=document.querySelectorAll('[data-palette-set]');
  function press(btns,key,v){btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset[key]===v))});}
  function lang(l){root.dataset.lang=l;root.lang=l==='en'?'en':'zh-CN';document.title=l==='en'?"jiajun's sites":'jiajun 的站点';press(langBtns,'langSet',l);}
  function palette(p){if(p==='ultramarine')root.dataset.palette=p;else delete root.dataset.palette;press(palBtns,'paletteSet',p);}
  lang(root.dataset.lang||'zh');palette(root.dataset.palette||'newsprint');
  langBtns.forEach(function(b){b.addEventListener('click',function(){lang(b.dataset.langSet);try{localStorage.setItem('lang',b.dataset.langSet)}catch(e){}})});
  palBtns.forEach(function(b){b.addEventListener('click',function(){palette(b.dataset.paletteSet);try{localStorage.setItem('palette',b.dataset.paletteSet)}catch(e){}})});
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
