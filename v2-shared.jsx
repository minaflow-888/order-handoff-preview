// v2-shared.jsx
// Shared state, URLs and reusable primitives.

const V2_PORTFOLIO_URL = 'https://portfolio-site-9d14e9.webflow.io/';
const V2_LEAD_CAPTURE_URL = 'https://minaflow-888.github.io/lead-capture-fixed-preview/';
const V2_ORDER_HANDOFF_URL = 'https://minaflow-888.github.io/02-order-handoff-automation/';
const V2_AI_RESEARCH_URL = 'https://minaflow-888.github.io/03-ai-research-agent/';

const AppContext = React.createContext(null);

function useApp() {
  const value = React.useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}

function AppProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    const saved = window.localStorage.getItem('order-handoff-language');
    return saved === 'sv' ? 'sv' : 'en';
  });
  const [theme, setTheme] = React.useState(() => {
    const saved = window.localStorage.getItem('order-handoff-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const copy = window.CASE_CONTENT[lang] || window.CASE_CONTENT.en;

  React.useEffect(() => {
    window.localStorage.setItem('order-handoff-language', lang);
    document.documentElement.lang = lang;
    document.title = copy.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', copy.meta.description);
  }, [lang, copy]);

  React.useEffect(() => {
    window.localStorage.setItem('order-handoff-theme', theme);
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
  }, [theme]);

  // Lucide's CDN helper replaces icon DOM nodes after React renders them.
  // A full page reload on language change avoids a React/Lucide DOM mismatch
  // while keeping the selected language in localStorage.
  const changeLanguage = React.useCallback((nextLang) => {
    const normalized = nextLang === 'sv' ? 'sv' : 'en';
    if (normalized === lang) return;
    window.localStorage.setItem('order-handoff-language', normalized);
    window.location.reload();
  }, [lang]);

  const value = React.useMemo(() => ({
    lang,
    setLang: changeLanguage,
    theme,
    toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark'),
    copy,
  }), [lang, theme, copy, changeLanguage]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function Icon({ name, size = 18, color, style, className }) {
  return (
    <i
      data-lucide={name}
      className={className}
      aria-hidden="true"
      style={{ width: size, height: size, display: 'inline-block', color, flexShrink: 0, ...style }}
    ></i>
  );
}

function Shell({ id, tone = 'ink', grid = false, children, style, pad = 'lg', className = '' }) {
  return (
    <section
      id={id}
      className={`shell shell--${tone} shell--pad-${pad}${grid ? ' dotgrid' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <div className="shell__inner">{children}</div>
    </section>
  );
}

function Eyebrow({ children, dark = true }) {
  return (
    <div className={`eyebrow${dark ? '' : ' eyebrow--light'}`}>
      <span className="eyebrow__line" aria-hidden="true"></span>
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, lede, dark = true, center = false, maxWidth = 680 }) {
  return (
    <div
      className={`section-head reveal-up${center ? ' section-head--center' : ''}`}
      style={{ maxWidth }}
    >
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={dark ? 'section-head__title section-head__title--dark' : 'section-head__title'}>{title}</h2>
      {lede && <p className={dark ? 'section-head__lede section-head__lede--dark' : 'section-head__lede'}>{lede}</p>}
    </div>
  );
}

function Glow({ x = '50%', y = '50%', size = 640, opacity = 0.22, color = '242, 92, 42' }) {
  return (
    <div
      aria-hidden="true"
      className="glow"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 68%)`,
      }}
    ></div>
  );
}

Object.assign(window, {
  V2_PORTFOLIO_URL,
  V2_LEAD_CAPTURE_URL,
  V2_ORDER_HANDOFF_URL,
  V2_AI_RESEARCH_URL,
  AppProvider,
  useApp,
  Icon,
  Shell,
  Eyebrow,
  SectionHead,
  Glow,
});
