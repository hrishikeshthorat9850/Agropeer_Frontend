// app/head.js  (server component — injects small inline script to set theme early)
export default function Head() {
  const script = `
  (function(){
    // Polyfill for Android WebView compatibility
    if (!String.prototype.repeat) {
      String.prototype.repeat = function(count) {
        if (this == null) throw new TypeError('can\'t convert ' + this + ' to object');
        var str = '' + this;
        count = +count;
        if (count != count) count = 0;
        if (count < 0 || count == Infinity) throw new RangeError('repeat count must be non-negative');
        count = Math.floor(count);
        if (str.length == 0 || count == 0) return '';
        if (str.length * count >= 1 << 28) throw new RangeError('repeat count must not overflow maximum string size');
        var maxCount = str.length * count;
        count = Math.floor(Math.log(maxCount) / Math.log(str.length));
        while (count > 0) {
          if (count % 2 == 1) str += str;
          count /= 2;
          str = str + str;
        }
        return str;
      };
    }
    
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
