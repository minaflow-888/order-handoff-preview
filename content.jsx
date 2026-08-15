// content.jsx
// Complete bilingual content for the Order Handoff Automation case study.

window.CASE_CONTENT = {
  en: {
    meta: {
      title: "Order Handoff Automation — Case Study",
      description: "A Make.com workflow that turns a HubSpot Closed Won deal into a validated, documented customer handoff with duplicate prevention, customer communication, CRM updates and error logging."
    },
    nav: {
      title: "Order Handoff Automation",
      back: "Back to Portfolio",
      shortBack: "Portfolio",
      languageLabel: "Choose language",
      themeDark: "Switch to light theme",
      themeLight: "Switch to dark theme"
    },
    hero: {
      eyebrow: "Portfolio demonstration",
      headingBefore: "From Closed Won to a ",
      headingAccent: "validated, documented customer handoff",
      headingAfter: ".",
      description: "I built a Make.com scenario that triggers when a HubSpot deal enters Closed Won. It retrieves the deal and associated contact using HubSpot associations, validates the contact and email with two routers, checks the deal ID against a Google Sheets log to prevent duplicate sends, sends a Brevo welcome email, updates HubSpot and logs every outcome — including failures.",
      workflowButton: "View the workflow",
      portfolioButton: "Back to Portfolio",
      previewLabel: "Order Handoff workflow preview",
      nodes: [
        { label: "Trigger", detail: "HubSpot deal becomes Closed Won", icon: "circle-play" },
        { label: "Retrieve", detail: "Get Deal + List Associations", icon: "database" },
        { label: "Validate", detail: "Contact and email routers", icon: "badge-check", hot: true },
        { label: "Deduplicate", detail: "Deal ID checked in Sheets log", icon: "copy-check", hot: true },
        { label: "Welcome", detail: "Brevo email + HubSpot update", icon: "mail-check" },
        { label: "Record", detail: "Success log + internal email + error logs", icon: "clipboard-list" }
      ]
    },
    snapshot: [
      { icon: "flask-conical", label: "Project type", value: "Functional portfolio demonstration" },
      { icon: "git-branch", label: "Workflow structure", value: "One Make.com scenario with decision and error routes" },
      { icon: "shield-check", label: "Main differentiator", value: "Validation and duplicate check before customer communication" },
      { icon: "layers", label: "Tools", value: "HubSpot, Make.com, Google Sheets and Brevo" }
    ],
    problem: {
      eyebrow: "The business problem",
      title: "Closing the deal is only the start of a clean customer handoff.",
      paragraphs: [
        "A salesperson marks a deal Closed Won, but the customer handoff still requires several steps that happen outside the CRM: confirming the right contact exists, checking that an email address is available, sending the welcome message, updating the deal status, logging the outcome and notifying the internal team. When those steps are manual, they are easy to miss.",
        "Missing contact data, duplicate welcome emails and invisible failures are the three most common problems. This workflow makes all three visible before any message reaches the customer."
      ],
      cards: [
        { icon: "user-x", title: "Missing handoff data", description: "A Closed Won deal may have no linked contact, or the contact may exist in HubSpot without an email address. Without a check, the workflow fails silently." },
        { icon: "copy-x", title: "Duplicate customer emails", description: "Without a deal ID check, the same welcome email can be sent more than once — for example if a webhook fires twice or a scenario reruns." },
        { icon: "clipboard-x", title: "Invisible failures", description: "If the Brevo send, HubSpot update or internal email fails, the team has no way to know unless the failure is explicitly logged." }
      ]
    },
    map: {
      eyebrow: "System map",
      title: "One handoff, with checks before every important action",
      lede: "The workflow retrieves the deal and its HubSpot associations, validates the contact and email with two separate routers, checks the deal ID in the Google Sheets log, then sends the welcome email and logs every outcome. Nothing reaches the customer unless all three checks pass.",
      hubTitle: "Order Handoff Automation",
      hubMeta: "1 MAKE.COM SCENARIO + ERROR ROUTES",
      invalidLabel: "missing, duplicate or failed → logged / stopped",
      groups: [
        { id: "trigger", label: "Trigger", icon: "circle-play", chips: ["HubSpot Closed Won", "Watch CRM Objects"] },
        { id: "deal", label: "Deal data", icon: "database", chips: ["Get Deal", "List Associations"] },
        { id: "contact", label: "Contact checks", icon: "contact", chips: ["contact exists?", "email exists?"] },
        { id: "duplicate", label: "Duplicate check", icon: "copy-check", chips: ["Search Rows", "already sent?"] },
        { id: "actions", label: "Customer handoff", icon: "mail-check", chips: ["Brevo customer email", "Update HubSpot"] },
        { id: "record", label: "Record & inform", icon: "clipboard-list", chips: ["log email sent", "internal email", "error logs"] }
      ]
    },
    workflow: {
      eyebrow: "Connected workflow",
      title: "One continuous handoff, six controlled stages",
      lede: "Every stage either confirms the handoff can continue or writes a log entry explaining why it stopped. Nothing reaches the customer unless the contact check, email check and duplicate check have all passed.",
      differentiator: "control point",
      stages: [
        {
          tag: "STAGE 1",
          title: "Detect and load the won deal",
          icon: "circle-play",
          steps: [
            "Watch CRM Objects detects a deal entering Closed Won — this is the only trigger",
            "Get Deal retrieves the full deal properties — the Watch module alone does not return enough data",
            "List Associations finds the linked contact ID — deals and contacts are separate objects in HubSpot"
          ]
        },
        {
          tag: "STAGE 2",
          title: "Validate the associated contact",
          icon: "badge-check",
          hot: true,
          steps: [
            "Router checks whether an associated contact exists — a Closed Won deal can have no linked contact",
            "Get Contact retrieves the contact details using the association ID",
            "Second router checks whether the contact has an email address — a contact can exist in HubSpot without one",
            "Missing Contact, Missing Email or Contact Fetch Failed is written to Google Sheets if any check fails"
          ],
          branch: {
            successTitle: "Contact ready",
            successText: "Both checks passed. The workflow continues to the duplicate check.",
            warningTitle: "Contact not ready",
            warningText: "The failure reason is logged and customer communication stops here."
          }
        },
        {
          tag: "STAGE 3",
          title: "Prevent duplicate processing",
          icon: "copy-check",
          hot: true,
          steps: [
            "Search Rows looks for the HubSpot deal ID in the Google Sheets sent log",
            "If the deal ID is already there, the scenario routes to the Already Sent branch and stops",
            "Only a deal ID that is not in the log continues to the customer email"
          ],
          branch: {
            successTitle: "New handoff",
            successText: "Deal ID not found in the log. The customer welcome email can be sent.",
            warningTitle: "Already processed",
            warningText: "Deal ID already in the log. No second email is sent."
          }
        },
        {
          tag: "STAGE 4",
          title: "Send the customer welcome email",
          icon: "mail-check",
          steps: [
            "Brevo sends the customer welcome email",
            "If Brevo fails, Customer Email Failed is written to the error log — the next stages do not run"
          ]
        },
        {
          tag: "STAGE 5",
          title: "Update HubSpot and record success",
          icon: "refresh-cw",
          steps: [
            "HubSpot Update Deal marks the deal as handed off in the CRM",
            "If the update fails, HubSpot Update Failed is logged",
            "Google Sheets receives an Email Sent row — this is the record that the duplicate check reads next time"
          ]
        },
        {
          tag: "STAGE 6",
          title: "Send the internal handoff email",
          icon: "users",
          steps: [
            "Brevo sends an internal email so the team knows the customer handoff completed",
            "If it fails, Internal Email Failed is written to the error log"
          ]
        }
      ]
    },
    evidence: {
      eyebrow: "Workflow evidence",
      title: "The working Make.com scenario, shown step by step",
      lede: "These screenshots come from the actual portfolio build. The tabs separate the long scenario into validation, duplicate prevention, customer actions and logging routes.",
      browserLabel: "make.com — Order Handoff Automation",
      viewLarger: "View larger",
      close: "Close enlarged screenshot",
      note: "The main route is supported by dedicated logs for missing data and failed actions. The screenshots show the configured scenario, not a mockup.",
      tabs: [
        { id: "full", label: "Full scenario", detail: "The complete Order Handoff scenario with its main route and side logs", image: "assets/order-handoff-full.png", alt: "Full Make.com Order Handoff Automation scenario" },
        { id: "validate", label: "Contact validation", detail: "Closed Won trigger, deal associations, contact checks and missing-data logs", image: "assets/order-handoff-validation.png", alt: "Contact and email validation routes in Make.com" },
        { id: "duplicate", label: "Duplicate prevention", detail: "Google Sheets search and the route that prevents a repeated customer email", image: "assets/order-handoff-duplicate.png", alt: "Duplicate deal check in Make.com" },
        { id: "handoff", label: "Handoff & logging", detail: "Customer email, HubSpot update, success log, internal email and error logs", image: "assets/order-handoff-actions.png", alt: "Customer handoff actions and error logs in Make.com" }
      ]
    },
    quality: {
      eyebrow: "Why handoff checks matter",
      title: "Marking a deal Closed Won does not mean the customer handoff is ready.",
      lede: "The workflow separates a completed sale from a handoff that is safe to execute. Three checks must pass before anything reaches the customer.",
      flow: ["Closed Won deal", "Validate & deduplicate", "Send once & record"],
      incompleteTitle: "Not ready to send — stops here",
      readyTitle: "Ready to continue",
      incomplete: [
        "No associated contact in HubSpot",
        "Contact exists but has no email address",
        "Deal ID already present in the sent log",
        "A failed Brevo send or HubSpot update is invisible without an error log"
      ],
      ready: [
        "Associated contact found",
        "Contact has an email address",
        "Deal ID not found in the sent log",
        "Customer and internal actions are both logged clearly"
      ],
      clarification: "Duplicate prevention is based on the HubSpot deal ID stored in Google Sheets. It prevents repeated sends in normal operation, but cannot cover every edge case in production — for example if the log write fails after the email sends."
    },
    capabilities: {
      eyebrow: "Core capabilities",
      title: "What the system actually does",
      items: [
        { icon: "circle-play", label: "Closed Won trigger" },
        { icon: "database", label: "Deal and association retrieval" },
        { icon: "badge-check", label: "Contact and email validation" },
        { icon: "copy-check", label: "Deal ID duplicate check" },
        { icon: "mail-check", label: "Customer welcome email via Brevo" },
        { icon: "refresh-cw", label: "HubSpot deal update" },
        { icon: "clipboard-list", label: "Success and error logging" },
        { icon: "users", label: "Internal handoff email" }
      ]
    },
    stack: {
      eyebrow: "Technology stack",
      title: "Four tools with four clear responsibilities",
      tools: [
        { label: "HubSpot", icon: "circle-dot", color: "#FF7A59", description: "Provides the Closed Won trigger, deal properties, contact associations and receives the final CRM update." },
        { label: "Make.com", icon: "workflow", color: "#8B5CF6", description: "Controls the routers, filters, actions and error routes across the full scenario." },
        { label: "Google Sheets", icon: "table-2", color: "#34A853", description: "Stores the sent log for the duplicate check and all error and success records." },
        { label: "Brevo", icon: "send", color: "#0B996E", description: "Sends the customer welcome email and the internal handoff notification." }
      ]
    },
    states: {
      eyebrow: "Workflow stages & testing",
      title: "The handoff follows a visible, controlled lifecycle",
      lede: "These are the stages a deal moves through — not stored database statuses. Every stopping point writes a log so the team can see exactly what happened.",
      stages: [
        { label: "Closed Won" },
        { label: "deal loaded" },
        { label: "contact validated", branch: { label: "missing contact / email", note: "logged and stopped" } },
        { label: "duplicate checked", branch: { label: "already sent", note: "does not send again" } },
        { label: "customer email sent" },
        { label: "deal updated" },
        { label: "handoff logged" },
        { label: "internal email sent", final: true }
      ],
      final: "final outcome",
      testingTitle: "Testing status",
      testingText: "The main modules, both routers, the duplicate check and the error-log routes were tested with demonstration records. The scenario was not deployed in a live client environment."
    },
    limitations: {
      eyebrow: "Honest by design",
      title: "Current limitations",
      items: [
        "Google Sheets is used as a simple log and duplicate-check store, not a transactional production database.",
        "If the Email Sent log write fails after Brevo sends, the duplicate check will not catch a second send — the same deal could be processed again.",
        "The contact check confirms an email field exists but does not verify that the address is deliverable or belongs to the right person.",
        "Error routes log failures but do not retry or repair the failed action automatically.",
        "The current version does not create an onboarding task or adapt the handoff message by deal type, service or responsible owner.",
        "The workflow was tested with demonstration records, not in a live client environment."
      ]
    },
    planned: {
      eyebrow: "What's next for this project",
      title: "Making the handoff more reliable and easier to manage",
      badge: "PLANNED IMPROVEMENTS — NOT IMPLEMENTED",
      description: "The current version validates, deduplicates, communicates and logs. A future version could make recovery automatic and ownership clearer.",
      items: [
        "Use a HubSpot deal property or structured database as a stronger processed-deal record",
        "Add automatic retry and an error queue for failed Brevo or HubSpot actions",
        "Notify the deal owner when a handoff fails rather than only writing a log",
        "Create an onboarding task or ticket automatically after a successful handoff",
        "Use different email templates by service type, deal size or responsible team",
        "Add monitoring for delayed or incomplete handoffs",
        "Review privacy, data retention and access rules before production use"
      ],
      goal: "The goal is not to remove human ownership from the handoff. It is to make every won deal traceable from Closed Won to confirmed customer communication — with every failure visible to the team.",
      note: "These are planned future improvements and are not part of the current implemented version."
    },
    learned: {
      eyebrow: "What I learned",
      quote: "I learned how HubSpot associations work — that deals and contacts are separate objects and that you need List Associations and Get Contact as two distinct steps, not one. I also learned how to use routers and a deal ID log to check handoff conditions before any message leaves the system.",
      paragraph: "Building the error routes taught me something I did not expect: logging a failure is not the same as handling it. A log tells you something went wrong. A retry route or an owner notification actually does something about it. That is the difference between the current version and a production-ready one.",
      transparencyTitle: "Project transparency",
      transparency1: "This is a functional portfolio demonstration built and tested with demonstration records. It was not developed for a live client environment.",
      transparency2: "The project demonstrates workflow logic, CRM integration, validation, duplicate prevention, communication and error logging. It does not include measured client results."
    },
    related: {
      eyebrow: "More case studies",
      title: "Related work",
      projects: [
        { tag: "Case study 01", title: "Lead Capture Automation", description: "Turns a website enquiry into a validated, logged lead with a team notification and automatic confirmation reply.", action: "View case study", urlKey: "lead" },
        { tag: "Case study 03", title: "AI Research Agent", description: "Turns repeated company research into a quality-checked, structured report through three connected Make.com scenarios.", action: "Explore project", urlKey: "research" }
      ]
    },
    cta: {
      eyebrow: "Let's talk",
      title: "Looking for someone who can map, build and clearly document practical workflows?",
      description: "I am looking for an internship, practice placement or junior opportunity in Malmö or Skåne where I can continue learning while contributing practical automation work.",
      portfolio: "Back to Portfolio",
      lead: "View Lead Capture Case Study"
    },
    footer: {
      label: "Order Handoff Automation — functional portfolio demonstration",
      back: "Back to Portfolio"
    }
  },

  sv: {
    meta: {
      title: "Order Handoff Automation — Fallstudie",
      description: "Ett Make.com-arbetsflöde som omvandlar en HubSpot-affär med status Closed Won till en validerad och dokumenterad kundöverlämning med dubblettkontroll, kundkommunikation, CRM-uppdatering och felloggning."
    },
    nav: {
      title: "Order Handoff Automation",
      back: "Tillbaka till portföljen",
      shortBack: "Portfölj",
      languageLabel: "Välj språk",
      themeDark: "Byt till ljust tema",
      themeLight: "Byt till mörkt tema"
    },
    hero: {
      eyebrow: "Portföljdemonstration",
      headingBefore: "Från Closed Won till en ",
      headingAccent: "validerad och dokumenterad kundöverlämning",
      headingAfter: ".",
      description: "Jag byggde ett Make.com-scenario som startar när en HubSpot-affär går in i Closed Won. Det hämtar affären och den kopplade kontakten via HubSpot-associationer, validerar kontakt och e-post med två routrar, kontrollerar affärens ID mot en Google Sheets-logg för att förhindra dubbelutskick, skickar ett välkomstmejl via Brevo, uppdaterar HubSpot och loggar varje utfall — inklusive misslyckanden.",
      workflowButton: "Visa arbetsflödet",
      portfolioButton: "Tillbaka till portföljen",
      previewLabel: "Förhandsvisning av Order Handoff-arbetsflödet",
      nodes: [
        { label: "Start", detail: "HubSpot-affär blir Closed Won", icon: "circle-play" },
        { label: "Hämta", detail: "Get Deal + List Associations", icon: "database" },
        { label: "Validera", detail: "Kontakt- och e-postroutrar", icon: "badge-check", hot: true },
        { label: "Dubblettkontroll", detail: "Affärs-ID kontrolleras i Sheets-logg", icon: "copy-check", hot: true },
        { label: "Välkomstmejl", detail: "Brevo-mejl + HubSpot-uppdatering", icon: "mail-check" },
        { label: "Dokumentera", detail: "Resultatlogg + internt mejl + felloggar", icon: "clipboard-list" }
      ]
    },
    snapshot: [
      { icon: "flask-conical", label: "Projekttyp", value: "Funktionell portföljdemonstration" },
      { icon: "git-branch", label: "Struktur", value: "Ett Make.com-scenario med beslutspunkter och felvägar" },
      { icon: "shield-check", label: "Viktigaste styrka", value: "Validering och dubblettkontroll före kundkommunikation" },
      { icon: "layers", label: "Verktyg", value: "HubSpot, Make.com, Google Sheets och Brevo" }
    ],
    problem: {
      eyebrow: "Affärsproblemet",
      title: "En avslutad affär är bara början på en bra kundöverlämning.",
      paragraphs: [
        "En säljare markerar en affär som Closed Won, men kundöverlämningen kräver fortfarande flera steg utanför CRM-systemet: bekräfta att rätt kontakt finns, kontrollera att en e-postadress är tillgänglig, skicka välkomstmeddelandet, uppdatera affärens status, logga utfallet och informera det interna teamet. När dessa steg hanteras manuellt är de lätta att missa.",
        "Saknade kontaktuppgifter, dubblerade välkomstmejl och osynliga misslyckanden är de tre vanligaste problemen. Det här arbetsflödet gör alla tre synliga innan något meddelande når kunden."
      ],
      cards: [
        { icon: "user-x", title: "Saknade överlämningsuppgifter", description: "En Closed Won-affär kan sakna kopplad kontakt, eller kontakten kan finnas i HubSpot utan e-postadress. Utan kontroll misslyckas arbetsflödet tyst." },
        { icon: "copy-x", title: "Dubbla kundmejl", description: "Utan kontroll av affärens ID kan samma välkomstmejl skickas mer än en gång — till exempel om en webhook aktiveras två gånger eller ett scenario körs om." },
        { icon: "clipboard-x", title: "Osynliga misslyckanden", description: "Om Brevo-utskicket, HubSpot-uppdateringen eller det interna mejlet misslyckas har teamet inget sätt att veta det om felet inte loggas explicit." }
      ]
    },
    map: {
      eyebrow: "Systemkarta",
      title: "En överlämning med kontroller före varje viktig åtgärd",
      lede: "Arbetsflödet hämtar affären och dess HubSpot-associationer, validerar kontakt och e-post med två separata routrar, kontrollerar affärens ID i Google Sheets-loggen, skickar sedan välkomstmejlet och loggar varje utfall. Ingenting når kunden om inte alla tre kontroller godkänns.",
      hubTitle: "Order Handoff Automation",
      hubMeta: "1 MAKE.COM-SCENARIO + FELVÄGAR",
      invalidLabel: "saknas, dubblett eller fel → loggas / stoppas",
      groups: [
        { id: "trigger", label: "Start", icon: "circle-play", chips: ["HubSpot Closed Won", "Watch CRM Objects"] },
        { id: "deal", label: "Affärsdata", icon: "database", chips: ["Get Deal", "List Associations"] },
        { id: "contact", label: "Kontaktkontroller", icon: "contact", chips: ["finns kontakt?", "finns e-post?"] },
        { id: "duplicate", label: "Dubblettkontroll", icon: "copy-check", chips: ["Search Rows", "redan skickat?"] },
        { id: "actions", label: "Kundöverlämning", icon: "mail-check", chips: ["Brevo kundmejl", "uppdatera HubSpot"] },
        { id: "record", label: "Logga & informera", icon: "clipboard-list", chips: ["logga skickat mejl", "internt mejl", "felloggar"] }
      ]
    },
    workflow: {
      eyebrow: "Sammankopplat arbetsflöde",
      title: "En sammanhängande överlämning i sex kontrollerade steg",
      lede: "Varje steg bekräftar antingen att överlämningen kan fortsätta, eller skriver en loggpost som förklarar varför den stoppades. Ingenting når kunden om inte kontaktkontrollen, e-postkontrollen och dubblettkontrollen har godkänts.",
      differentiator: "kontrollpunkt",
      stages: [
        {
          tag: "STEG 1",
          title: "Identifiera och hämta den vunna affären",
          icon: "circle-play",
          steps: [
            "Watch CRM Objects identifierar en affär som går in i Closed Won — det är scenariots enda startpunkt",
            "Get Deal hämtar affärens fullständiga uppgifter — Watch-modulen ensam returnerar inte tillräcklig data",
            "List Associations hittar det kopplade kontakt-ID:t — affärer och kontakter är separata objekt i HubSpot"
          ]
        },
        {
          tag: "STEG 2",
          title: "Validera den kopplade kontakten",
          icon: "badge-check",
          hot: true,
          steps: [
            "Router kontrollerar om en kopplad kontakt finns — en Closed Won-affär kan sakna kopplad kontakt",
            "Get Contact hämtar kontaktuppgifterna med hjälp av associationens ID",
            "Andra routern kontrollerar om kontakten har en e-postadress — en kontakt kan finnas i HubSpot utan en",
            "Missing Contact, Missing Email eller Contact Fetch Failed skrivs till Google Sheets om någon kontroll misslyckas"
          ],
          branch: {
            successTitle: "Kontakt redo",
            successText: "Båda kontrollerna godkändes. Arbetsflödet fortsätter till dubblettkontrollen.",
            warningTitle: "Kontakt inte redo",
            warningText: "Orsaken till felet loggas och kundkommunikationen stoppas här."
          }
        },
        {
          tag: "STEG 3",
          title: "Förhindra att samma affär behandlas två gånger",
          icon: "copy-check",
          hot: true,
          steps: [
            "Search Rows söker efter HubSpot-affärens ID i Google Sheets-loggen över skickade mejl",
            "Om affärens ID redan finns där dirigeras scenariot till grenen Already Sent och stoppas",
            "Endast ett affärs-ID som inte finns i loggen fortsätter till kundmejlet"
          ],
          branch: {
            successTitle: "Ny överlämning",
            successText: "Affärens ID hittades inte i loggen. Kundens välkomstmejl kan skickas.",
            warningTitle: "Redan behandlad",
            warningText: "Affärens ID finns redan i loggen. Inget nytt mejl skickas."
          }
        },
        {
          tag: "STEG 4",
          title: "Skicka kundens välkomstmejl",
          icon: "mail-check",
          steps: [
            "Brevo skickar kundens välkomstmejl",
            "Om Brevo misslyckas skrivs Customer Email Failed till felloggen — de efterföljande stegen körs inte"
          ]
        },
        {
          tag: "STEG 5",
          title: "Uppdatera HubSpot och logga resultatet",
          icon: "refresh-cw",
          steps: [
            "HubSpot Update Deal markerar affären som överlämnad i CRM-systemet",
            "Om uppdateringen misslyckas loggas HubSpot Update Failed",
            "Google Sheets får en Email Sent-rad — det är den post som dubblettkontrollen läser nästa gång"
          ]
        },
        {
          tag: "STEG 6",
          title: "Skicka det interna överlämningsmejlet",
          icon: "users",
          steps: [
            "Brevo skickar ett internt mejl så att teamet vet att kundöverlämningen är klar",
            "Om det misslyckas skrivs Internal Email Failed till felloggen"
          ]
        }
      ]
    },
    evidence: {
      eyebrow: "Dokumentation av arbetsflödet",
      title: "Det fungerande Make.com-scenariot, visat steg för steg",
      lede: "Skärmbilderna kommer från den riktiga portföljdemonstrationen. Flikarna delar upp det långa scenariot i validering, dubblettkontroll, kundåtgärder och loggvägar.",
      browserLabel: "make.com — Order Handoff Automation",
      viewLarger: "Visa större",
      close: "Stäng förstorad skärmbild",
      note: "Huvudvägen stöds av separata loggar för saknade uppgifter och misslyckade åtgärder. Skärmbilderna visar det konfigurerade scenariot, inte en mockup.",
      tabs: [
        { id: "full", label: "Hela scenariot", detail: "Hela Order Handoff-scenariot med huvudväg och sidologgar", image: "assets/order-handoff-full.png", alt: "Hela Make.com-scenariot för Order Handoff Automation" },
        { id: "validate", label: "Kontaktvalidering", detail: "Closed Won-start, affärskopplingar, kontaktkontroller och loggar för saknade uppgifter", image: "assets/order-handoff-validation.png", alt: "Kontakt- och e-postvalidering i Make.com" },
        { id: "duplicate", label: "Dubblettkontroll", detail: "Google Sheets-sökning och vägen som förhindrar ett upprepat kundmejl", image: "assets/order-handoff-duplicate.png", alt: "Dubblettkontroll av affär i Make.com" },
        { id: "handoff", label: "Överlämning & loggning", detail: "Kundmejl, HubSpot-uppdatering, resultatlogg, internt mejl och felloggar", image: "assets/order-handoff-actions.png", alt: "Kundöverlämning och felloggar i Make.com" }
      ]
    },
    quality: {
      eyebrow: "Varför överlämningskontroller är viktiga",
      title: "Att en affär är markerad som Closed Won betyder inte att kundöverlämningen är redo.",
      lede: "Arbetsflödet skiljer en avslutad försäljning från en överlämning som är säker att genomföra. Tre kontroller måste godkännas innan något når kunden.",
      flow: ["Closed Won-affär", "Validera & kontrollera dubblett", "Skicka en gång & logga"],
      incompleteTitle: "Inte redo att skicka — stoppas här",
      readyTitle: "Redo att fortsätta",
      incomplete: [
        "Ingen kopplad kontakt i HubSpot",
        "Kontakten finns men saknar e-postadress",
        "Affärens ID finns redan i loggen över skickade mejl",
        "Ett misslyckat Brevo-utskick eller en HubSpot-uppdatering är osynlig utan fellogg"
      ],
      ready: [
        "Kopplad kontakt hittad",
        "Kontakten har en e-postadress",
        "Affärens ID hittades inte i loggen över skickade mejl",
        "Kundens och teamets åtgärder loggas tydligt"
      ],
      clarification: "Dubblettkontrollen bygger på HubSpot-affärens ID i Google Sheets. Den förhindrar upprepade utskick i normalt läge, men kan inte täcka varje kantfall i produktion — till exempel om loggskrivningen misslyckas efter att mejlet skickats."
    },
    capabilities: {
      eyebrow: "Grundläggande funktioner",
      title: "Vad systemet faktiskt gör",
      items: [
        { icon: "circle-play", label: "Closed Won-start" },
        { icon: "database", label: "Hämtar affär och associationer" },
        { icon: "badge-check", label: "Validerar kontakt och e-post" },
        { icon: "copy-check", label: "Kontrollerar affärs-ID för dubbletter" },
        { icon: "mail-check", label: "Skickar välkomstmejl via Brevo" },
        { icon: "refresh-cw", label: "Uppdaterar HubSpot-affären" },
        { icon: "clipboard-list", label: "Loggar resultat och fel" },
        { icon: "users", label: "Skickar internt överlämningsmejl" }
      ]
    },
    stack: {
      eyebrow: "Teknikstack",
      title: "Fyra verktyg med fyra tydliga ansvarsområden",
      tools: [
        { label: "HubSpot", icon: "circle-dot", color: "#FF7A59", description: "Ger Closed Won-starten, affärsuppgifter, kontaktassociationer och tar emot den slutliga CRM-uppdateringen." },
        { label: "Make.com", icon: "workflow", color: "#8B5CF6", description: "Styr routrarna, filtren, åtgärderna och felvägarna i hela scenariot." },
        { label: "Google Sheets", icon: "table-2", color: "#34A853", description: "Lagrar loggen för dubblettkontrollen och alla fel- och resultatposter." },
        { label: "Brevo", icon: "send", color: "#0B996E", description: "Skickar kundens välkomstmejl och det interna överlämningsmeddelandet." }
      ]
    },
    states: {
      eyebrow: "Arbetsflödessteg & testning",
      title: "Överlämningen följer en synlig och kontrollerad livscykel",
      lede: "Det här är de steg en affär rör sig igenom — inte lagrade databasstatusar. Varje stoppunkt skriver en logg så att teamet kan se exakt vad som hände.",
      stages: [
        { label: "Closed Won" },
        { label: "affär hämtad" },
        { label: "kontakt validerad", branch: { label: "kontakt / e-post saknas", note: "loggas och stoppas" } },
        { label: "dubblettkontroll klar", branch: { label: "redan skickat", note: "skickas inte igen" } },
        { label: "kundmejl skickat" },
        { label: "affär uppdaterad" },
        { label: "överlämning loggad" },
        { label: "internt mejl skickat", final: true }
      ],
      final: "slutresultat",
      testingTitle: "Teststatus",
      testingText: "Huvudmodulerna, båda routrarna, dubblettkontrollen och felloggvägarna testades med demonstrationsposter. Scenariot driftsattes inte i en verklig kundmiljö."
    },
    limitations: {
      eyebrow: "Tydliga begränsningar",
      title: "Nuvarande begränsningar",
      items: [
        "Google Sheets används som en enkel logg och lagring för dubblettkontroll, inte som en transaktionssäker produktionsdatabas.",
        "Om loggskrivningen av Email Sent misslyckas efter att Brevo skickat, fångar inte dubblettkontrollen ett andra utskick — samma affär kan behandlas igen.",
        "Kontaktkontrollen bekräftar att ett e-postfält finns men verifierar inte att adressen kan levereras eller tillhör rätt person.",
        "Felvägar loggar misslyckanden men försöker inte automatiskt igen och reparerar inte den misslyckade åtgärden.",
        "Den nuvarande versionen skapar ingen onboardinguppgift och anpassar inte överlämningsmeddelandet efter affärstyp, tjänst eller ansvarig person.",
        "Arbetsflödet testades med demonstrationsposter, inte i en verklig kundmiljö."
      ]
    },
    planned: {
      eyebrow: "Nästa steg för projektet",
      title: "Göra överlämningen mer robust och enklare att hantera",
      badge: "PLANERADE FÖRBÄTTRINGAR — INTE IMPLEMENTERADE",
      description: "Den nuvarande versionen validerar, kontrollerar dubbletter, kommunicerar och loggar. En framtida version kan göra återställning automatisk och ansvarsfördelningen tydligare.",
      items: [
        "Använd en HubSpot-affärsegenskap eller strukturerad databas som en säkrare post över behandlade affärer",
        "Lägg till automatiska återförsök och en felkö för misslyckade Brevo- eller HubSpot-åtgärder",
        "Meddela affärsansvarig när en överlämning misslyckas, i stället för att bara skriva en logg",
        "Skapa en onboardinguppgift eller ett ärende automatiskt efter en lyckad överlämning",
        "Använd olika mejlmallar beroende på tjänstetyp, affärsstorlek eller ansvarigt team",
        "Lägg till övervakning av försenade eller ofullständiga överlämningar",
        "Granska integritet, datalagring och åtkomstregler före produktionsanvändning"
      ],
      goal: "Målet är inte att ta bort mänskligt ansvar från överlämningen. Det är att göra varje vunnen affär spårbar från Closed Won till bekräftad kundkommunikation — med varje misslyckande synligt för teamet.",
      note: "Detta är planerade framtida förbättringar och ingår inte i den nuvarande implementerade versionen."
    },
    learned: {
      eyebrow: "Vad jag lärde mig",
      quote: "Jag lärde mig hur HubSpot-associationer fungerar — att affärer och kontakter är separata objekt och att du behöver List Associations och Get Contact som två distinkta steg, inte ett. Jag lärde mig också hur man använder routrar och en affärs-ID-logg för att kontrollera överlämningsvillkoren innan något meddelande lämnar systemet.",
      paragraph: "Att bygga felvägarna lärde mig något jag inte väntade mig: att logga ett misslyckande är inte samma sak som att hantera det. En logg talar om att något gick fel. En återförsöksväg eller ett ägarmeddelande gör faktiskt något åt det. Det är skillnaden mellan den nuvarande versionen och en produktionsredo version.",
      transparencyTitle: "Projekttransparens",
      transparency1: "Det här är en funktionell portföljdemonstration som byggdes och testades med demonstrationsposter. Den utvecklades inte för en verklig kundmiljö.",
      transparency2: "Projektet visar arbetsflödeslogik, CRM-integration, validering, dubblettkontroll, kommunikation och felloggning. Det innehåller inga uppmätta kundresultat."
    },
    related: {
      eyebrow: "Fler fallstudier",
      title: "Relaterade projekt",
      projects: [
        { tag: "Fallstudie 01", title: "Lead Capture Automation", description: "Omvandlar en webbplatsförfrågan till ett validerat och loggat lead med teamnotis och automatiskt bekräftelsesvar.", action: "Visa fallstudien", urlKey: "lead" },
        { tag: "Fallstudie 03", title: "AI Research Agent", description: "Omvandlar återkommande företagsresearch till en kvalitetskontrollerad och strukturerad rapport genom tre sammankopplade Make.com-scenarier.", action: "Utforska projektet", urlKey: "research" }
      ]
    },
    cta: {
      eyebrow: "Låt oss prata",
      title: "Söker ni någon som kan kartlägga, bygga och tydligt dokumentera praktiska arbetsflöden?",
      description: "Jag söker en praktikplats, arbetspraktik eller juniorroll i Malmö eller Skåne där jag kan fortsätta lära mig och samtidigt bidra med praktiskt automationsarbete.",
      portfolio: "Tillbaka till portföljen",
      lead: "Visa Lead Capture-fallstudien"
    },
    footer: {
      label: "Order Handoff Automation — funktionell portföljdemonstration",
      back: "Tillbaka till portföljen"
    }
  }
};
