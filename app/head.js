// app/head.js  (server component — injects small inline script to set theme early)
export default function Head() {
  const script = `
  (function(){
    try {
      function getCookie(name) {
        const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return m ? m.pop() : null;
      }
      var theme = getCookie('theme') || localStorage.getItem('theme');
      if(!theme) {
        // prefers-color-scheme fallback
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
        else theme = 'light';
      }
      document.documentElement.classList.remove('light','dark');
      document.documentElement.classList.add(theme);
    } catch(e) { /* ignore */ }
  })();
  `;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
