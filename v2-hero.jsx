// v2-hero.jsx
// Navigation, hero and project snapshot.

const { Button: HeroButton } = window.MinaFlowDesignSystem_a5074e;
const { Icon: HeroIcon, Shell: HeroShell, V2_PORTFOLIO_URL: HERO_PORTFOLIO_URL } = window;

function NavBar() {
  const { lang, setLang, theme, toggleTheme, copy } = window.useApp();
  const isLight = theme === 'light';

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-brand">
          <a href={HERO_PORTFOLIO_URL} className="site-brand__logo-link" aria-label={copy.nav.back}>
            <img src="assets/mina-logo.png" alt="Mina" className="site-brand__logo" />
          </a>
          <span className="site-brand__divider" aria-hidden="true"></span>
          <span className="site-brand__title">{copy.nav.title}</span>
        </div>

        <div className="site-controls">
          <div className="language-switch" role="group" aria-label={copy.nav.languageLabel}>
            {['en', 'sv'].map((code) => (
              <button
                key={code}
                type="button"
                className={`language-switch__button${lang === code ? ' is-active' : ''}`}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isLight ? copy.nav.themeLight : copy.nav.themeDark}
            title={isLight ? copy.nav.themeLight : copy.nav.themeDark}
          >
            <span aria-hidden="true" className="theme-toggle__symbol">{isLight ? '☾' : '☀'}</span>
          </button>

          <HeroButton
            variant="onDark"
            size="sm"
            href={HERO_PORTFOLIO_URL}
            icon={<HeroIcon name="arrow-left" size={15} />}
          >
            <span className="header-back__full">{copy.nav.back}</span>
            <span className="header-back__short">{copy.nav.shortBack}</span>
          </HeroButton>
        </div>
      </div>
    </header>
  );
}

const HERO_SEQUENCE = [0, 1, 2, 3, 4, 5, -1];

function HeroPipeline() {
  const { copy } = window.useApp();
  const [active, setActive] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener ? media.addEventListener('change', update) : media.addListener(update);
    return () => media.removeEventListener ? media.removeEventListener('change', update) : media.removeListener(update);
  }, []);

  React.useEffect(() => {
    if (reduced) {
      setActive(-1);
      return undefined;
    }
    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % HERO_SEQUENCE.length;
      setActive(HERO_SEQUENCE[index]);
    }, 1250);
    return () => window.clearInterval(interval);
  }, [reduced]);

  return (
    <div className="hero-pipeline reveal-up" aria-label={copy.hero.previewLabel}>
      <div className="hero-pipeline__rail" aria-hidden="true"></div>
      {copy.hero.nodes.map((node, index) => {
        const stateClass = active === index ? ' is-active' : (active === -1 || index < active ? ' is-complete' : '');
        return (
          <div key={node.label} className={`hero-pipeline__row${stateClass}`}>
            <span className="hero-pipeline__marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className={`hero-pipeline__card${node.hot ? ' hero-pipeline__card--hot' : ''}`}>
              <span className="hero-pipeline__icon">
                <HeroIcon name={node.icon} size={19} />
              </span>
              <span className="hero-pipeline__copy">
                <strong>{node.label}</strong>
                <small>{node.detail}</small>
              </span>
              {node.hot && <span className="hero-pipeline__check"><HeroIcon name="check" size={14} /></span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
  const { copy } = window.useApp();

  return (
    <HeroShell tone="ink" grid pad="lg" className="hero-section">
      <window.Glow x="16%" y="8%" size={720} opacity={0.18} />
      <window.Glow x="88%" y="64%" size={520} opacity={0.13} color="245, 158, 11" />
      <div className="hero-layout">
        <div className="hero-copy reveal-up">
          <window.Eyebrow>{copy.hero.eyebrow}</window.Eyebrow>
          <h1 className="hero-title">
            {copy.hero.headingBefore}
            <span>{copy.hero.headingAccent}</span>
            {copy.hero.headingAfter}
          </h1>
          <p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions">
            <HeroButton variant="primary" size="lg" href="#workflow" icon={<HeroIcon name="git-branch" size={17} />}>
              {copy.hero.workflowButton}
            </HeroButton>
            <HeroButton variant="onDark" size="lg" href={HERO_PORTFOLIO_URL}>
              {copy.hero.portfolioButton}
            </HeroButton>
          </div>
        </div>
        <HeroPipeline />
      </div>
    </HeroShell>
  );
}

function Snapshot() {
  const { copy } = window.useApp();

  return (
    <HeroShell tone="ink" pad="sm" className="snapshot-section">
      <div className="snapshot-grid reveal-up">
        {copy.snapshot.map((item, index) => (
          <article key={item.label} className="snapshot-card">
            <HeroIcon name={item.icon} size={18} color="var(--brand-400)" />
            <div>
              <div className="snapshot-card__label">{item.label}</div>
              <div className="snapshot-card__value">{item.value}</div>
            </div>
          </article>
        ))}
      </div>
    </HeroShell>
  );
}

Object.assign(window, { NavBar, Hero, Snapshot });
