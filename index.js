const sites = [
  ['Claude Workspace', 'claude.jiajun.site', 'AI coding workspace'],
  ['Reels', 'reels.jiajun.site', '短视频素材与工具'],
  ['Research', 'research.jiajun.site', '研究工作台'],
  ['SMS', 'sms.jiajun.site', '短信服务'],
  ['Emby', 'emby.jiajun.site', '媒体库'],
  ['Komga', 'komga.jiajun.site', '漫画阅读'],
  ['Linq', 'linq.jiajun.site', '链接与自动化'],
  ['Dashboard', 'dashboard.jiajun.site', '控制面板'],
  ['Office', 'office.jiajun.site', 'Office 工作区'],
  ['Control', 'control.jiajun.site', '服务控制台'],
  ['SSH', 'ssh.jiajun.site', '远程终端入口'],
  ['DJ', 'dj.jiajun.site', '下载与媒体工具'],
];

const esc = (value) => value.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== '/') return new Response('Not found', { status: 404 });
    const cards = sites.map(([name, host, description]) => `<a class="card" href="https://${host}"><span class="name">${esc(name)}</span><span class="description">${esc(description)}</span><span class="host">${esc(host)} ↗</span></a>`).join('');
    return new Response(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Jiajun's sites</title><style>
      :root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#101114;color:#f4f4f5}*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at 15% 0,#25304b 0,transparent 42%),#101114}main{width:min(1080px,calc(100% - 40px));margin:0 auto;padding:72px 0 56px}.eyebrow{color:#93a4ff;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.title{font-size:clamp(42px,8vw,82px);letter-spacing:-.06em;line-height:.95;margin:16px 0 20px}.intro{max-width:580px;color:#a7aab4;font-size:18px;line-height:1.6;margin:0 0 44px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}.card{display:flex;flex-direction:column;gap:10px;padding:22px;border:1px solid #2b2e38;border-radius:18px;background:#17191f;color:inherit;text-decoration:none;transition:.18s ease}.card:hover{transform:translateY(-3px);border-color:#7283ff;background:#1d2030}.name{font-size:20px;font-weight:700}.description{color:#b4b7c2;min-height:24px}.host{color:#7784a5;font-size:13px;margin-top:8px}footer{color:#696d79;font-size:13px;margin-top:48px}@media(max-width:520px){main{padding-top:48px;width:min(100% - 28px,1080px)}.intro{font-size:16px}.card{padding:18px}}
    </style></head><body><main><div class="eyebrow">JIAJUN.SITE</div><h1 class="title">我的网站。</h1><p class="intro">所有 jiajun.site 服务的统一入口。选择一个工作区开始。</p><section class="grid">${cards}</section><footer>Personal service directory · ${new Date().getFullYear()}</footer></main></body></html>`, { headers: { 'content-type': 'text/html; charset=UTF-8' } });
  }
};
