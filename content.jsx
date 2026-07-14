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
      description: "I built a workflow that starts when a HubSpot deal is marked Closed Won. It checks the associated contact and email, prevents duplicate sends, sends a customer welcome email, updates the deal, records the result and sends an internal handoff email.",
      workflowButton: "View the workflow",
      portfolioButton: "Back to Portfolio",
      previewLabel: "Order Handoff workflow preview",
      nodes: [
        { label: "Trigger", detail: "HubSpot deal becomes Closed Won", icon: "circle-play" },
        { label: "Retrieve", detail: "Deal, associations and contact", icon: "database" },
        { label: "Validate", detail: "Contact and email checked", icon: "badge-check", hot: true },
        { label: "Deduplicate", detail: "Deal ID checked before sending", icon: "copy-check", hot: true },
        { label: "Welcome", detail: "Customer email and CRM update", icon: "mail-check" },
        { label: "Record", detail: "Success, errors and internal email", icon: "clipboard-list" }
      ]
    },
    snapshot: [
      { icon: "flask-conical", label: "Project type", value: "Functional portfolio demonstration" },
      { icon: "git-branch", label: "Workflow structure", value: "One Make.com scenario with decision and error routes" },
      { icon: "shield-check", label: "Main differentiator", value: "Validation and duplicate prevention before customer communication" },
      { icon: "layers", label: "Tools", value: "HubSpot, Make.com, Google Sheets and Brevo" }
    ],
    problem: {
      eyebrow: "The business problem",
      title: "Closing the deal is only the start of a clean customer handoff.",
      paragraphs: [
        "A salesperson can mark a deal Closed Won, but the customer handoff still depends on several follow-up steps: finding the right contact, checking the email address, sending the welcome message, updating the CRM, recording the outcome and informing the internal team.",
        "When those steps are handled manually, missing data, duplicate messages and unclear handoff status can appear at the exact moment when the customer expects a smooth start."
      ],
      cards: [
        { icon: "user-x", title: "Missing handoff data", description: "A won deal may have no associated contact, or the contact may not have an email address ready for customer communication." },
        { icon: "copy-x", title: "Duplicate customer communication", description: "Without a previous-processing check, the same deal can trigger the welcome email more than once." },
        { icon: "clipboard-x", title: "No visible completion record", description: "If the email, CRM update or internal handoff fails, the team needs a clear record of what happened and where the process stopped." }
      ]
    },
    map: {
      eyebrow: "System map",
      title: "One handoff, with checks before every important action",
      lede: "The workflow retrieves the deal and its associations, checks contact data, searches the log for previous processing and then runs the customer handoff only on the safe path. Missing data and failed actions are written to clear logs.",
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
      lede: "The scenario moves from a Closed Won trigger to customer and internal communication, but only after the deal, contact and duplicate checks are complete.",
      differentiator: "control point",
      stages: [
        {
          tag: "STAGE 1",
          title: "Detect and load the won deal",
          icon: "circle-play",
          steps: [
            "Watches HubSpot for a deal that enters the Closed Won stage",
            "Retrieves the deal details",
            "Lists the deal associations so the connected contact can be found"
          ]
        },
        {
          tag: "STAGE 2",
          title: "Validate the associated contact",
          icon: "badge-check",
          hot: true,
          steps: [
            "Checks whether the deal has an associated contact",
            "Retrieves the contact details",
            "Checks whether the contact has an email address",
            "Writes Missing Contact, Missing Email or Contact Fetch Failed to Google Sheets when needed"
          ],
          branch: {
            successTitle: "Contact ready",
            successText: "The workflow can continue to the duplicate check.",
            warningTitle: "Contact not ready",
            warningText: "The reason is logged and customer communication stops."
          }
        },
        {
          tag: "STAGE 3",
          title: "Prevent duplicate processing",
          icon: "copy-check",
          hot: true,
          steps: [
            "Searches Google Sheets for the HubSpot deal ID",
            "Checks whether the deal was already recorded as sent",
            "Allows only a new, unprocessed deal to continue"
          ],
          branch: {
            successTitle: "New handoff",
            successText: "The customer welcome email can be sent.",
            warningTitle: "Already processed",
            warningText: "The duplicate route stops before another customer email is sent."
          }
        },
        {
          tag: "STAGE 4",
          title: "Send the customer welcome email",
          icon: "mail-check",
          steps: [
            "Sends the customer email through Brevo",
            "Writes Customer Email Failed to the error log if the action fails"
          ]
        },
        {
          tag: "STAGE 5",
          title: "Update HubSpot and record success",
          icon: "refresh-cw",
          steps: [
            "Updates the HubSpot deal after the customer communication step",
            "Writes HubSpot Update Failed if the CRM update fails",
            "Adds an Email Sent record to Google Sheets for the completed handoff"
          ]
        },
        {
          tag: "STAGE 6",
          title: "Send the internal handoff email",
          icon: "users",
          steps: [
            "Sends an internal email through Brevo so the team knows the customer handoff was completed",
            "Writes Internal Email Failed to the error log if that final notification fails"
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
      title: "A Closed Won status does not guarantee a ready customer handoff.",
      lede: "The workflow separates a completed sale from a handoff that is safe to send and easy to trace.",
      flow: ["Closed Won deal", "Validate & deduplicate", "Send once & record"],
      incompleteTitle: "Unsafe handoff",
      readyTitle: "Ready handoff",
      incomplete: [
        "No associated contact is available",
        "The contact has no email address",
        "The same deal ID is already present in the sent log",
        "A failed email or CRM update would be invisible without an error record"
      ],
      ready: [
        "The associated contact is found",
        "The email field is present",
        "No previous sent record exists for the same deal ID",
        "Customer and internal actions can be recorded clearly"
      ],
      clarification: "Duplicate prevention is based on the HubSpot deal ID stored in Google Sheets. It is a useful safeguard for this demonstration, but it cannot guarantee that every possible production duplicate is prevented."
    },
    capabilities: {
      eyebrow: "Core capabilities",
      title: "What the system actually does",
      items: [
        { icon: "circle-play", label: "Closed Won trigger" },
        { icon: "database", label: "Deal and association retrieval" },
        { icon: "badge-check", label: "Contact and email checks" },
        { icon: "copy-check", label: "Duplicate prevention" },
        { icon: "mail-check", label: "Customer welcome email" },
        { icon: "refresh-cw", label: "HubSpot deal update" },
        { icon: "clipboard-list", label: "Success and error logging" },
        { icon: "users", label: "Internal handoff email" }
      ]
    },
    stack: {
      eyebrow: "Technology stack",
      title: "Four tools with four clear responsibilities",
      tools: [
        { label: "HubSpot", icon: "circle-dot", color: "#FF7A59", description: "Provides the Closed Won trigger, deal data, contact associations and the final CRM update." },
        { label: "Make.com", icon: "workflow", color: "#8B5CF6", description: "Connects the checks, routers, actions and error routes in one scenario." },
        { label: "Google Sheets", icon: "table-2", color: "#34A853", description: "Stores the simple duplicate check, sent record and failure logs for the demonstration." },
        { label: "Brevo", icon: "send", color: "#0B996E", description: "Sends the customer welcome email and the internal handoff email." }
      ]
    },
    states: {
      eyebrow: "Workflow stages & testing",
      title: "The handoff follows a visible, controlled lifecycle",
      lede: "These are explanatory workflow stages — not stored database statuses — showing where the scenario can continue, stop or write a log.",
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
      testingText: "The main modules, routing logic and duplicate check were tested with demonstration records. The scenario includes the error-log routes shown in the screenshot and was not deployed in a live client environment."
    },
    limitations: {
      eyebrow: "Honest by design",
      title: "Current limitations",
      items: [
        "Google Sheets is used as a simple demonstration log and duplicate-check store, not as a transactional production database.",
        "Duplicate protection depends on the previous sent record being written successfully; a failure between sending and logging could still create ambiguity.",
        "The contact check confirms that an email field exists but does not verify deliverability or ownership of the address.",
        "The error routes record failures but do not automatically retry or repair the failed action.",
        "The current version does not create an onboarding task or adapt the handoff by deal type, service or owner.",
        "The workflow was not tested in a live client environment."
      ]
    },
    planned: {
      eyebrow: "What’s next for this project",
      title: "Making the handoff more durable and easier to operate",
      badge: "PLANNED IMPROVEMENTS — NOT IMPLEMENTED",
      description: "The current version validates, prevents duplicate sends, communicates with the customer, updates HubSpot and records outcomes. A future version could strengthen recovery, ownership and monitoring.",
      items: [
        "Use a CRM property or structured database as a stronger processed-deal record",
        "Add an automatic retry and error queue for failed API or email actions",
        "Notify the responsible owner when a handoff fails",
        "Create an onboarding task or ticket after the successful handoff",
        "Use different email templates and internal routes by service or deal type",
        "Add monitoring for delayed or incomplete handoffs",
        "Review privacy, access and data-retention rules before production use"
      ],
      goal: "The goal is not to remove human ownership, but to make every won deal easier to hand over without hiding exceptions.",
      note: "These are planned future improvements and are not part of the current implemented version."
    },
    learned: {
      eyebrow: "What I learned",
      quote: "I learned how to use HubSpot associations, routers and filters to protect a customer handoff before any message is sent.",
      paragraph: "I also learned how a deal ID can support duplicate prevention, how success and failure routes create a clearer audit trail, and why customer and internal communication should be treated as separate actions.",
      transparencyTitle: "Project transparency",
      transparency1: "This is a functional portfolio demonstration built and tested with demonstration records. It was not developed for a live client environment.",
      transparency2: "The project demonstrates workflow logic, validation, duplicate prevention, CRM updates, communication and error logging. It does not provide measured client results."
    },
    related: {
      eyebrow: "More case studies",
      title: "Related work",
      projects: [
        { tag: "Case study 01", title: "Lead Capture Automation", description: "Turns a website enquiry into a validated, logged lead with a team notification and automatic confirmation reply.", action: "View case study", urlKey: "lead" },
        { tag: "Case study 03", title: "AI Research Agent", description: "Turns repeated company research into a checked, structured report through three connected scenarios.", action: "Explore project", urlKey: "research" }
      ]
    },
    cta: {
      eyebrow: "Let’s talk",
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
      description: "Jag byggde ett arbetsflöde som startar när en HubSpot-affär markeras som Closed Won. Det kontrollerar kopplad kontakt och e-post, förhindrar dubbelutskick, skickar ett välkomstmejl till kunden, uppdaterar affären, loggar resultatet och skickar ett internt överlämningsmejl.",
      workflowButton: "Visa arbetsflödet",
      portfolioButton: "Tillbaka till portföljen",
      previewLabel: "Förhandsvisning av Order Handoff-arbetsflödet",
      nodes: [
        { label: "Start", detail: "HubSpot-affär blir Closed Won", icon: "circle-play" },
        { label: "Hämta", detail: "Affär, kopplingar och kontakt", icon: "database" },
        { label: "Validera", detail: "Kontakt och e-post kontrolleras", icon: "badge-check", hot: true },
        { label: "Dubblettkontroll", detail: "Affärs-ID kontrolleras före utskick", icon: "copy-check", hot: true },
        { label: "Välkomstmejl", detail: "Kundmejl och CRM-uppdatering", icon: "mail-check" },
        { label: "Dokumentera", detail: "Resultat, fel och internt mejl", icon: "clipboard-list" }
      ]
    },
    snapshot: [
      { icon: "flask-conical", label: "Projekttyp", value: "Funktionell portföljdemonstration" },
      { icon: "git-branch", label: "Struktur", value: "Ett Make.com-scenario med beslutspunkter och felvägar" },
      { icon: "shield-check", label: "Viktigaste skillnad", value: "Validering och dubblettkontroll före kundkommunikation" },
      { icon: "layers", label: "Verktyg", value: "HubSpot, Make.com, Google Sheets och Brevo" }
    ],
    problem: {
      eyebrow: "Affärsproblemet",
      title: "En avslutad affär är bara början på en bra kundöverlämning.",
      paragraphs: [
        "En säljare kan markera en affär som Closed Won, men kundöverlämningen kräver fortfarande flera uppföljningssteg: hitta rätt kontakt, kontrollera e-postadressen, skicka välkomstmeddelandet, uppdatera CRM-systemet, logga resultatet och informera det interna teamet.",
        "När dessa steg hanteras manuellt kan saknade uppgifter, dubbelutskick och otydlig överlämningsstatus uppstå precis när kunden förväntar sig en smidig start."
      ],
      cards: [
        { icon: "user-x", title: "Saknade kontaktuppgifter", description: "En vunnen affär kan sakna kopplad kontakt, eller så saknar kontakten en e-postadress för kundkommunikation." },
        { icon: "copy-x", title: "Dubbel kundkommunikation", description: "Utan kontroll av tidigare behandling kan samma affär utlösa välkomstmejlet mer än en gång." },
        { icon: "clipboard-x", title: "Ingen tydlig slutstatus", description: "Om mejlet, CRM-uppdateringen eller den interna överlämningen misslyckas behöver teamet se vad som hände och var processen stoppades." }
      ]
    },
    map: {
      eyebrow: "Systemkarta",
      title: "En överlämning med kontroller före varje viktig åtgärd",
      lede: "Arbetsflödet hämtar affären och dess kopplingar, kontrollerar kontaktuppgifterna, söker efter tidigare behandling och kör sedan kundöverlämningen endast på den säkra vägen. Saknade uppgifter och misslyckade åtgärder loggas tydligt.",
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
      lede: "Scenariot går från Closed Won till kund- och internkommunikation, men först efter att affären, kontakten och dubblettstatusen har kontrollerats.",
      differentiator: "kontrollpunkt",
      stages: [
        {
          tag: "STEG 1",
          title: "Identifiera och hämta den vunna affären",
          icon: "circle-play",
          steps: [
            "Bevakar HubSpot efter en affär som går in i fasen Closed Won",
            "Hämtar affärens uppgifter",
            "Hämtar affärens kopplingar så att rätt kontakt kan hittas"
          ]
        },
        {
          tag: "STEG 2",
          title: "Validera den kopplade kontakten",
          icon: "badge-check",
          hot: true,
          steps: [
            "Kontrollerar om affären har en kopplad kontakt",
            "Hämtar kontaktuppgifterna",
            "Kontrollerar om kontakten har en e-postadress",
            "Loggar Missing Contact, Missing Email eller Contact Fetch Failed i Google Sheets när det behövs"
          ],
          branch: {
            successTitle: "Kontakt redo",
            successText: "Arbetsflödet kan fortsätta till dubblettkontrollen.",
            warningTitle: "Kontakt inte redo",
            warningText: "Orsaken loggas och kundkommunikationen stoppas."
          }
        },
        {
          tag: "STEG 3",
          title: "Förhindra dubbel behandling",
          icon: "copy-check",
          hot: true,
          steps: [
            "Söker i Google Sheets efter HubSpot-affärens ID",
            "Kontrollerar om affären redan har loggats som skickad",
            "Låter bara en ny och obehandlad affär fortsätta"
          ],
          branch: {
            successTitle: "Ny överlämning",
            successText: "Kundens välkomstmejl kan skickas.",
            warningTitle: "Redan behandlad",
            warningText: "Dubblettvägen stoppas innan ännu ett kundmejl skickas."
          }
        },
        {
          tag: "STEG 4",
          title: "Skicka kundens välkomstmejl",
          icon: "mail-check",
          steps: [
            "Skickar kundmejlet genom Brevo",
            "Loggar Customer Email Failed om åtgärden misslyckas"
          ]
        },
        {
          tag: "STEG 5",
          title: "Uppdatera HubSpot och logga resultatet",
          icon: "refresh-cw",
          steps: [
            "Uppdaterar HubSpot-affären efter kundkommunikationen",
            "Loggar HubSpot Update Failed om CRM-uppdateringen misslyckas",
            "Lägger till en Email Sent-rad i Google Sheets för den slutförda överlämningen"
          ]
        },
        {
          tag: "STEG 6",
          title: "Skicka det interna överlämningsmejlet",
          icon: "users",
          steps: [
            "Skickar ett internt mejl genom Brevo så att teamet vet att kundöverlämningen är klar",
            "Loggar Internal Email Failed om den sista aviseringen misslyckas"
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
      title: "Statusen Closed Won betyder inte automatiskt att kundöverlämningen är redo.",
      lede: "Arbetsflödet skiljer en avslutad försäljning från en överlämning som är säker att skicka och enkel att följa.",
      flow: ["Closed Won-affär", "Validera & kontrollera dubblett", "Skicka en gång & logga"],
      incompleteTitle: "Osäker överlämning",
      readyTitle: "Redo för överlämning",
      incomplete: [
        "Det finns ingen kopplad kontakt",
        "Kontakten saknar e-postadress",
        "Samma affärs-ID finns redan i skickat-loggen",
        "Ett misslyckat mejl eller en CRM-uppdatering skulle vara osynligt utan fellogg"
      ],
      ready: [
        "Den kopplade kontakten hittas",
        "E-postfältet finns",
        "Det finns ingen tidigare post för samma affärs-ID i loggen över skickade mejl",
        "Kundens och teamets åtgärder kan dokumenteras tydligt"
      ],
      clarification: "Dubblettkontrollen bygger på HubSpot-affärens ID i Google Sheets. Det är ett användbart skydd i demonstrationen, men det kan inte garantera att varje möjlig dubblett förhindras i produktion."
    },
    capabilities: {
      eyebrow: "Grundläggande funktioner",
      title: "Vad systemet faktiskt gör",
      items: [
        { icon: "circle-play", label: "Closed Won-start" },
        { icon: "database", label: "Hämtar affär och kopplingar" },
        { icon: "badge-check", label: "Kontrollerar kontakt och e-post" },
        { icon: "copy-check", label: "Förhindrar dubbletter" },
        { icon: "mail-check", label: "Skickar kundens välkomstmejl" },
        { icon: "refresh-cw", label: "Uppdaterar HubSpot-affären" },
        { icon: "clipboard-list", label: "Loggar resultat och fel" },
        { icon: "users", label: "Skickar internt överlämningsmejl" }
      ]
    },
    stack: {
      eyebrow: "Teknikstack",
      title: "Fyra verktyg med fyra tydliga ansvarsområden",
      tools: [
        { label: "HubSpot", icon: "circle-dot", color: "#FF7A59", description: "Ger Closed Won-starten, affärsdata, kontaktkopplingar och den slutliga CRM-uppdateringen." },
        { label: "Make.com", icon: "workflow", color: "#8B5CF6", description: "Kopplar samman kontroller, routers, åtgärder och felvägar i ett scenario." },
        { label: "Google Sheets", icon: "table-2", color: "#34A853", description: "Lagrar den enkla dubblettkontrollen, skickat-loggen och felloggarna i demonstrationen." },
        { label: "Brevo", icon: "send", color: "#0B996E", description: "Skickar kundens välkomstmejl och det interna överlämningsmejlet." }
      ]
    },
    states: {
      eyebrow: "Arbetsflödessteg & testning",
      title: "Överlämningen följer en synlig och kontrollerad livscykel",
      lede: "Detta är förklarande arbetsflödessteg — inte lagrade databasstatusar — som visar var scenariot kan fortsätta, stoppas eller skriva en logg.",
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
      testingText: "Huvudmodulerna, routinglogiken och dubblettkontrollen testades med demonstrationsposter. Scenariot innehåller felloggarna som visas i skärmbilden och driftsattes inte i en verklig kundmiljö."
    },
    limitations: {
      eyebrow: "Ärligt utformat",
      title: "Nuvarande begränsningar",
      items: [
        "Google Sheets används som en enkel demonstrationslogg och lagring för dubblettkontroll, inte som en transaktionssäker produktionsdatabas.",
        "Dubblettskyddet är beroende av att posten över skickat mejl sparas korrekt; ett fel mellan utskick och loggning kan fortfarande skapa oklarhet.",
        "Kontaktkontrollen bekräftar att ett e-postfält finns men verifierar inte att adressen kan levereras eller tillhör personen.",
        "Felvägarna loggar misslyckanden men försöker inte automatiskt igen och reparerar inte den misslyckade åtgärden.",
        "Den nuvarande versionen skapar ingen onboardinguppgift och anpassar inte överlämningen efter affärstyp, tjänst eller ansvarig person.",
        "Arbetsflödet testades inte i en verklig kundmiljö."
      ]
    },
    planned: {
      eyebrow: "Nästa steg för projektet",
      title: "Göra överlämningen mer robust och enklare att hantera",
      badge: "PLANERADE FÖRBÄTTRINGAR — INTE IMPLEMENTERADE",
      description: "Den nuvarande versionen validerar, förhindrar dubbelutskick, kommunicerar med kunden, uppdaterar HubSpot och loggar resultat. En framtida version kan stärka återställning, ansvar och övervakning.",
      items: [
        "Använd en CRM-egenskap eller strukturerad databas som en säkrare post över behandlade affärer",
        "Lägg till automatiska återförsök och en felkö för misslyckade API- eller mejlåtgärder",
        "Meddela ansvarig person när en överlämning misslyckas",
        "Skapa en onboardinguppgift eller ett ärende efter en lyckad överlämning",
        "Använd olika mejlmallar och interna vägar beroende på tjänst eller affärstyp",
        "Lägg till övervakning av försenade eller ofullständiga överlämningar",
        "Granska integritet, åtkomst och datalagring före produktionsanvändning"
      ],
      goal: "Målet är inte att ta bort mänskligt ansvar, utan att göra varje vunnen affär enklare att lämna över utan att dölja undantag.",
      note: "Detta är planerade framtida förbättringar och ingår inte i den nuvarande implementerade versionen."
    },
    learned: {
      eyebrow: "Vad jag lärde mig",
      quote: "Jag lärde mig att använda HubSpot-kopplingar, routers och filter för att skydda kundöverlämningen innan något meddelande skickas.",
      paragraph: "Jag lärde mig också hur ett affärs-ID kan användas för dubblettkontroll, hur resultat- och felvägar skapar ett tydligare revisionsspår och varför kundkommunikation och intern kommunikation bör behandlas som separata åtgärder.",
      transparencyTitle: "Projekttransparens",
      transparency1: "Detta är en funktionell portföljdemonstration som byggdes och testades med demonstrationsposter. Den utvecklades inte för en verklig kundmiljö.",
      transparency2: "Projektet visar arbetsflödeslogik, validering, dubblettkontroll, CRM-uppdatering, kommunikation och felloggning. Det innehåller inga uppmätta kundresultat."
    },
    related: {
      eyebrow: "Fler fallstudier",
      title: "Relaterade projekt",
      projects: [
        { tag: "Fallstudie 01", title: "Lead Capture Automation", description: "Omvandlar en webbplatsförfrågan till ett validerat och loggat lead med teamnotis och automatiskt bekräftelsesvar.", action: "Visa fallstudien", urlKey: "lead" },
        { tag: "Fallstudie 03", title: "AI Research Agent", description: "Omvandlar återkommande företagsresearch till en kontrollerad och strukturerad rapport genom tre sammankopplade scenarier.", action: "Utforska projektet", urlKey: "research" }
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
