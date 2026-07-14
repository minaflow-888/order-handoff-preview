// v2-quality.jsx
// Validation comparison, core capabilities and technology stack.

const { Icon: QualityIcon, Shell: QualityShell, SectionHead: QualitySectionHead } = window;

function QualitySection() {
  const { copy } = window.useApp();
  return (
    <QualityShell tone="lightAlt" pad="lg" id="quality">
      <QualitySectionHead dark={false} center eyebrow={copy.quality.eyebrow} title={copy.quality.title} lede={copy.quality.lede} />

      <div className="quality-flow reveal-up">
        {copy.quality.flow.map((step, index) => (
          <React.Fragment key={step}>
            {index > 0 && <QualityIcon name="arrow-right" size={18} color="var(--brand-500)" />}
            <span>{step}</span>
          </React.Fragment>
        ))}
      </div>

      <div className="quality-grid reveal-up">
        <article className="quality-card quality-card--warning">
          <div className="quality-card__title"><QualityIcon name="x-circle" size={18} /> {copy.quality.incompleteTitle}</div>
          <ul>{copy.quality.incomplete.map((item) => <li key={item}><span>—</span>{item}</li>)}</ul>
        </article>
        <article className="quality-card quality-card--success">
          <div className="quality-card__title"><QualityIcon name="check-circle-2" size={18} /> {copy.quality.readyTitle}</div>
          <ul>{copy.quality.ready.map((item) => <li key={item}><QualityIcon name="check" size={15} />{item}</li>)}</ul>
        </article>
      </div>
      <p className="quality-clarification reveal-up">{copy.quality.clarification}</p>
    </QualityShell>
  );
}

function CapabilitiesSection() {
  const { copy } = window.useApp();
  return (
    <QualityShell tone="ink" pad="md" id="capabilities">
      <QualitySectionHead eyebrow={copy.capabilities.eyebrow} title={copy.capabilities.title} />
      <div className="capabilities-grid reveal-up">
        {copy.capabilities.items.map((item) => (
          <article key={item.label} className="capability-card panel-dark">
            <QualityIcon name={item.icon} size={20} color="var(--brand-400)" />
            <strong>{item.label}</strong>
          </article>
        ))}
      </div>
    </QualityShell>
  );
}

function StackSection() {
  const { copy } = window.useApp();
  return (
    <QualityShell tone="navy" pad="md" id="stack">
      <QualitySectionHead eyebrow={copy.stack.eyebrow} title={copy.stack.title} />
      <div className="stack-grid reveal-up">
        {copy.stack.tools.map((tool) => (
          <article key={tool.label} className="stack-card panel-dark">
            <div className="stack-card__heading">
              <span style={{ '--tool-color': tool.color }}><QualityIcon name={tool.icon} size={19} color={tool.color} /></span>
              <strong>{tool.label}</strong>
            </div>
            <p>{tool.description}</p>
          </article>
        ))}
      </div>
    </QualityShell>
  );
}

Object.assign(window, { QualitySection, CapabilitiesSection, StackSection });
