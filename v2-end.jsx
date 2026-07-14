// v2-end.jsx
// Lifecycle, limitations, future improvements, learning, related work and CTA.

const { Button: EndButton } = window.MinaFlowDesignSystem_a5074e;
const {
  Icon: EndIcon,
  Shell: EndShell,
  SectionHead: EndSectionHead,
  V2_PORTFOLIO_URL: END_PORTFOLIO_URL,
  V2_LEAD_CAPTURE_URL: END_LEAD_URL,
  V2_AI_RESEARCH_URL: END_RESEARCH_URL,
} = window;

function StatesSection() {
  const { copy } = window.useApp();
  return (
    <EndShell tone="ink" grid pad="lg" id="states">
      <EndSectionHead eyebrow={copy.states.eyebrow} title={copy.states.title} lede={copy.states.lede} />
      <div className="lifecycle reveal-up lifecycle--handoff">
        {copy.states.stages.map((stage, index) => (
          <React.Fragment key={`${stage.label}-${index}`}>
            {index > 0 && <span className="lifecycle__connector" aria-hidden="true"></span>}
            <div className={`lifecycle__item${stage.branch ? ' lifecycle__item--validation' : ''}${stage.final ? ' lifecycle__item--final' : ''}`}>
              <span>{stage.label}</span>
              {stage.branch && (
                <div className="lifecycle__invalid">
                  <i aria-hidden="true"></i>
                  <strong>{stage.branch.label}</strong>
                  <small>{stage.branch.note}</small>
                </div>
              )}
              {stage.final && <small className="lifecycle__outcome">{copy.states.final}</small>}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="testing-note reveal-up">
        <EndIcon name="flask-conical" size={18} />
        <div><strong>{copy.states.testingTitle}</strong><p>{copy.states.testingText}</p></div>
      </div>
    </EndShell>
  );
}

function LimitationsSection() {
  const { copy } = window.useApp();
  return (
    <EndShell tone="light" pad="lg" id="limitations">
      <EndSectionHead dark={false} eyebrow={copy.limitations.eyebrow} title={copy.limitations.title} />
      <div className="limitations-grid reveal-up">
        {copy.limitations.items.map((item, index) => (
          <article key={item} className="limitation-card">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </EndShell>
  );
}

function PlannedV2Section() {
  const { copy } = window.useApp();
  return (
    <EndShell tone="lightAlt" pad="lg" id="planned-v2">
      <div className="planned-heading reveal-up">
        <window.Eyebrow dark={false}>{copy.planned.eyebrow}</window.Eyebrow>
        <span className="planned-badge">{copy.planned.badge}</span>
        <h2>{copy.planned.title}</h2>
        <p>{copy.planned.description}</p>
      </div>
      <div className="planned-grid reveal-up">
        {copy.planned.items.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
      <div className="planned-summary reveal-up">
        <strong>{copy.planned.goal}</strong>
        <p>{copy.planned.note}</p>
      </div>
    </EndShell>
  );
}

function LearnedSection() {
  const { copy } = window.useApp();
  return (
    <EndShell tone="lightAlt" pad="md" id="learned">
      <div className="learned-layout">
        <div className="reveal-up">
          <window.Eyebrow dark={false}>{copy.learned.eyebrow}</window.Eyebrow>
          <blockquote>“{copy.learned.quote}”</blockquote>
          <p>{copy.learned.paragraph}</p>
        </div>
        <article className="transparency-card reveal-up">
          <div><EndIcon name="shield" size={16} /> {copy.learned.transparencyTitle}</div>
          <p>{copy.learned.transparency1}</p>
          <p>{copy.learned.transparency2}</p>
        </article>
      </div>
    </EndShell>
  );
}

function RelatedSection() {
  const { copy } = window.useApp();
  const links = { lead: END_LEAD_URL, research: END_RESEARCH_URL };
  return (
    <EndShell tone="navy" pad="md" id="related">
      <EndSectionHead eyebrow={copy.related.eyebrow} title={copy.related.title} />
      <div className="related-grid reveal-up">
        {copy.related.projects.map((project) => (
          <a key={project.title} href={links[project.urlKey]} className="related-card panel-dark">
            <span>{project.tag}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <strong>{project.action} <EndIcon name="arrow-right" size={14} /></strong>
          </a>
        ))}
      </div>
    </EndShell>
  );
}

function FinalCTA() {
  const { copy } = window.useApp();
  return (
    <EndShell tone="ink" grid pad="lg" id="contact">
      <window.Glow x="50%" y="42%" size={760} opacity={0.18} />
      <div className="final-cta reveal-up">
        <window.Eyebrow>{copy.cta.eyebrow}</window.Eyebrow>
        <h2>{copy.cta.title}</h2>
        <p>{copy.cta.description}</p>
        <div>
          <EndButton variant="primary" size="lg" href={END_PORTFOLIO_URL}>{copy.cta.portfolio}</EndButton>
          <EndButton variant="onDark" size="lg" href={END_LEAD_URL}>{copy.cta.lead}</EndButton>
        </div>
      </div>
    </EndShell>
  );
}

function Footer() {
  const { copy } = window.useApp();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <img src="assets/mina-logo.png" alt="Mina" />
        <span>{copy.footer.label}</span>
        <a href={END_PORTFOLIO_URL}>{copy.footer.back}</a>
      </div>
    </footer>
  );
}

Object.assign(window, { StatesSection, LimitationsSection, PlannedV2Section, LearnedSection, RelatedSection, FinalCTA, Footer });
