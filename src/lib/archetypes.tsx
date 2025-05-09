export interface Applications {
  growth: string[];
  collaboration: string[];
  career: string[];
}

export interface Archetype {
  slug: string;
  name: string;
  signature: string;
  description: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  applications: Applications;
}

export const archetypes: Archetype[] = [
  {
    slug: "visionary",
    name: "Visionary",
    signature: "Future-focused ideation",
    description:
      "Creative, forward-thinking ideators who envision bold futures and possibilities.",
    strengths: [
      "Innovative idea generation",
      "Big-picture strategic thinking",
      "Inspiring and motivational communication",
    ],
    challenges: [
      "Tendency to overlook practical details",
      "Prone to idealism without follow-through",
      "May struggle with routine tasks",
    ],
    recommendations: [
      "Develop structured planning habits",
      "Pair with detail-focused partners",
      "Use milestone tracking tools to stay grounded",
    ],
    applications: {
      growth: [
        // Epstein’s Cognitive-Experiential Self-Theory
        "Alternate “blue-sky” ideation phases with analytical reality checks to balance creativity and feasibility (Epstein, 1994).",
        // Self-Determination Theory
        "Use autonomy-supportive framing (“How might you…?”) to fuel intrinsic motivation for ideation (Ryan & Deci, 2000).",
        // Metacognition research (Schraw & Dennison, 1994)
        "Keep a weekly journal: note which ideas advanced vs. stalled to refine idea-to-action ratios.",
        // Psychological distancing
        "Use “third-person self-talk” when evaluating big ideas to reduce bias and over-optimism (Kross et al., 2014).",
        // Chunking strategy
        "Break visionary concepts into 3–5 actionable milestones to reduce overwhelm (Miller, 1956).",
      ],
      collaboration: [
        // Belbin Team Roles
        "Pair with an Integrator or Guardian who naturally handles detail and follow-through (Belbin, 2010).",
        // Kotter’s change model
        "Lead with a “vision rally,” then establish concrete “short-term wins” to maintain momentum (Kotter, 1996).",
        // Nolan’s “pitch and pull”
        "Frame bold ideas (“pitch”), then solicit structured feedback (“pull”) to refine and align (Nolan, 2005).",
        // Shared mental models
        "Co-create simple visual roadmaps so all team members see both the big picture and next steps (Mathieu et al., 2000).",
        // Psychological safety
        "Foster an environment where “wild ideas” are welcomed before feasibility is critiqued (Edmondson, 1999).",
      ],
      career: [
        // Corporate foresight
        "Seek roles in strategic foresight or innovation labs, where big-picture thinking is core (O’Connor & McDermott, 2004).",
        // Advisory & board work
        "Consider non-executive directorships to leverage vision without day-to-day operations.",
        // Entrepreneurship
        "Found or join early-stage ventures where ideation drives value creation.",
        // Futures research
        "Explore careers in think-tanks or policy institutes focused on long-range scenarios.",
        // Thought leadership
        "Publish white papers or give keynote talks—your visionary insights become organizational compass points.",
      ],
    },
  },
  {
    slug: "innovator",
    name: "Innovator",
    signature: "Structured creativity",
    description:
      "Systematic creators who blend analytical rigor with creative solutions to optimize processes.",
    strengths: [
      "Structured creativity",
      "Methodical problem-solving",
      "Process optimization expertise",
    ],
    challenges: [
      "May overanalyze and slow progress",
      "Can be inflexible to spontaneous change",
      "Risk of perfectionism",
    ],
    recommendations: [
      "Set clear deadlines to curb analysis paralysis",
      "Practice rapid prototyping techniques",
      "Balance rigor with periodic creative play",
    ],
    applications: {
      growth: [
        // Dual-Process Theory
        "Alternate structured problem-solving blocks with unconstrained brainstorming to optimize creativity (Stanovich & West, 2000).",
        // Lean Startup / Ries (2011)
        "Adopt MVP cycles: build → measure → learn to validate solutions rapidly and avoid perfectionism.",
        // Cognitive load theory
        "Use checklists to free working memory during complex analyses (Sweller, 1988).",
        // SCAMPER technique
        "Regularly apply SCAMPER (Substitute, Combine, Adapt…) to existing processes for systematic innovation (Michalko, 2006).",
        // Time-boxing
        "Set fixed time slots for deep analysis vs. creative play to prevent overanalysis.",
      ],
      collaboration: [
        // Collective intelligence
        "Host cross-functional ideation sessions using structured frameworks (e.g., “brainwriting”) to tap diverse expertise (Woolley et al., 2010).",
        // Process documentation
        "Publish clear process maps (SIPOC) so teams can adopt improvements consistently (Hammer & Champy, 1993).",
        // Rapid prototyping workshops
        "Facilitate hands-on prototyping jams where users co-design under your guidance.",
        // Feedback loops
        "Implement weekly “innovation stand-ups” to iterate fast and share learnings.",
        // Gamification
        "Use simple point or badge systems to reward rapid idea contributions.",
      ],
      career: [
        // Product management
        "Roles where you define MVP features and iterate based on data.",
        // UX/UI design
        "Blend research, prototyping, and analysis to craft user-centered experiences.",
        // Process engineering
        "Functions like Six Sigma or Kaizen coaching leverage your structured creativity.",
        // R&D engineering
        "Labs or hi-tech incubators value your mix of rigor and innovation.",
        // Innovation consulting
        "Help organizations implement systematic idea pipelines and scaling.",
      ],
    },
  },
  {
    slug: "integrator",
    name: "Integrator",
    signature: "Versatile problem-solving",
    description:
      "Versatile collaborators who adapt fluidly to roles and bridge diverse perspectives.",
    strengths: [
      "Exceptional adaptability",
      "Balanced skill set across dimensions",
      "Effective at unifying teams",
    ],
    challenges: [
      "May lack a clear specialty",
      "Risk of overextending",
      "Can struggle to prioritize tasks",
    ],
    recommendations: [
      "Define core focus areas for each project",
      "Use time-blocking for task prioritization",
      "Leverage specialist support when needed",
    ],
    applications: {
      growth: [
        // Role diversification
        "Rotate through different project roles quarterly to deepen expertise without losing breadth.",
        // Time-blocking
        "Allocate alternating deep-work and context-switch blocks to protect focus (Newport, 2016).",
        // Boundary setting
        "Use explicit “in/out of role” signals (e.g., calendar color-coding) to manage expectations.",
        // Systems thinking
        "Map end-to-end value streams to identify integration points (Goldratt, 1990).",
        // Self-compassion
        "Practice self-compassion exercises to prevent burnout from overextension (Neff, 2003).",
      ],
      collaboration: [
        // Cross-pollination forums
        "Host monthly “show-and-tell” where teams share successes and lessons learned.",
        // RACI coordination
        "Develop lightweight RACI or DACI charts to clarify decision roles across functions.",
        // Integration stand-ups
        "Run brief daily cross-team syncs to surface blockers and dependencies.",
        // Knowledge repositories
        "Maintain a centralized wiki for process flows and integration guidelines.",
        // Mentoring circles
        "Lead triad mentoring groups to share best practices and build collective intelligence.",
      ],
      career: [
        // Program/portfolio management
        "Manage multi-project portfolios in PMO or PM roles that demand broad oversight.",
        // Product owner
        "Serve as the single point of integration between business stakeholders and delivery teams.",
        // Management consulting
        "Advise clients on systems integration and process alignment.",
        // Enterprise architecture
        "Design organizational or IT architectures that unify diverse components.",
        // Generalist leadership
        "Act as a Chief of Staff or operations lead in dynamic, high-change environments.",
      ],
    },
  },
  {
    slug: "commander",
    name: "Commander",
    signature: "Directive leadership",
    description:
      "Assertive leaders who drive teams toward high-stakes goals with discipline and authority.",
    strengths: [
      "Decisive, goal-oriented leadership",
      "High energy and assertiveness",
      "Strong organizational skills",
    ],
    challenges: [
      "May appear domineering under stress",
      "Risk of undervaluing team input",
      "Can prioritize results over relationships",
    ],
    recommendations: [
      "Solicit regular team feedback",
      "Cultivate active listening practices",
      "Include collaborative decision checkpoints",
    ],
    applications: {
      growth: [
        // Transformational leadership (Bass & Avolio, 1994)
        "Practice crafting inspiring vision statements that connect to team values.",
        // Emotional Intelligence (Goleman, 1998)
        "Engage in EI workshops to improve empathy and reduce perceived authoritarianism.",
        // Mindful leadership
        "Incorporate brief daily mindfulness breaks to lower stress and enhance presence (Kabat-Zinn, 1994).",
        // 360-degree feedback
        "Use structured 360 surveys to uncover blind spots in decision style.",
        // Assertiveness training
        "Role-play delegation conversations to balance authority with support.",
      ],
      collaboration: [
        // Psychological safety (Edmondson, 1999)
        "Hold “failure post-mortems” to normalize risk-taking and learn from mistakes.",
        // RACI clarity
        "Define Roles, Accountability, Consulted, and Informed to prevent confusion.",
        // Active listening circles
        "Rotate facilitation so every team member is heard before directives are given.",
        // Inclusive decision-making
        "Use small-group SWOT analyses before final decisions to build buy-in.",
        // Appreciative inquiry
        "Start meetings by highlighting recent successes to fuel positive momentum.",
      ],
      career: [
        // Executive tracks
        "COO, Operations Lead, or Project Director roles capitalize on your decisive nature.",
        // Crisis management
        "Emergency services or turnaround consulting where rapid authority is crucial.",
        // Military or defense leadership
        "Environments valuing chain-of-command and clear directives.",
        // Sports team captaincy
        "Leadership in competitive team settings leverages your drive.",
        // Corporate restructuring
        "Lead M&A integration or process-reengineering initiatives.",
      ],
    },
  },
  {
    slug: "influencer",
    name: "Influencer",
    signature: "Empathic persuasion",
    description:
      "Empathic networkers who excel at persuasion, relationship building, and community engagement.",
    strengths: [
      "High emotional intelligence",
      "Natural persuasion and rapport-building",
      "Skilled at fostering community",
    ],
    challenges: [
      "May struggle with boundaries",
      "Risk of people-pleasing",
      "Can get distracted by social dynamics",
    ],
    recommendations: [
      "Set clear personal boundaries",
      "Prioritize deep one-on-one connections",
      "Use agendas to stay on task in meetings",
    ],
    applications: {
      growth: [
        // Social network theory (Burt, 2000)
        "Map your network to identify key connectors and schedule regular check-ins.",
        // Cialdini’s principles (2006)
        "Practice reciprocity and social proof when persuading stakeholders.",
        // Active empathetic listening (Rogers, 1957)
        "Reflect back feelings during conversations to deepen rapport.",
        // Emotional contagion research
        "Leverage positive affect—smile and posture—to boost group mood (Hatfield et al., 1994).",
        // Storytelling skills
        "Develop narrative competence by practicing “problem → solution → impact” pitches.",
      ],
      collaboration: [
        // Community of practice (Wenger, 1998)
        "Establish informal communities to share best practices and build cohesion.",
        // Boundary setting
        "Use time-boxed “office hours” to manage availability and prevent overcommitment.",
        // Meeting facilitation
        "Structure meetings with clear roles (facilitator, timekeeper, scribe) to stay on track.",
        // Peer coaching circles
        "Host small peer groups where members both support and hold each other accountable.",
        // Feedback culture
        "Train teams in SBI (Situation-Behavior-Impact) feedback model for clarity.",
      ],
      career: [
        // Sales and customer success
        "Roles where relationship-building and persuasion are central.",
        // Community management
        "Lead user groups, forums, or brand ambassador programs.",
        // Public relations
        "Use your empathy to craft messages that resonate widely.",
        // Internal communications
        "Drive culture and engagement through compelling storytelling.",
        // Talent acquisition
        "Interview and onboard with a personal touch that attracts top talent.",
      ],
    },
  },
  {
    slug: "strategist",
    name: "Strategist",
    signature: "Long-term planning",
    description:
      "Long-term planners who evaluate risks and opportunities to chart optimal pathways forward.",
    strengths: [
      "Exceptional planning and foresight",
      "Risk analysis abilities",
      "Systematic evaluation of scenarios",
    ],
    challenges: [
      "May overplan and delay action",
      "Can be averse to rapid change",
      "Risk of analysis paralysis",
    ],
    recommendations: [
      "Adopt iterative planning sprints",
      "Balance long-range and short-term goals",
      "Use decision matrices to streamline choices",
    ],
    applications: {
      growth: [
        // Scenario planning (Schwartz, 1991)
        "Develop 3–5 plausible future scenarios for key decisions.",
        // Decision matrix (Kepner-Tregoe)
        "Use weighted scoring models to evaluate complex options.",
        // Backcasting
        "Start with desired future end-state and work backward to today’s actions.",
        // Mental models mapping
        "Draw causal loop diagrams to reveal leverage points in systems thinking.",
        // Critical path analysis
        "Identify and focus on tasks that determine project duration (CPM).",
      ],
      collaboration: [
        // Strategy workshops
        "Lead facilitated SWOT and PESTLE sessions to align teams on context.",
        // Visual roadmaps
        "Use Gantt charts or Kanban boards to share timelines and dependencies.",
        // Balanced scorecards
        "Translate strategy into KPIs across Finance, Customer, Process, Learning.",
        // Cross-functional councils
        "Organize regular cross-dept strategy reviews to maintain alignment.",
        // Cognitive diversity
        "Invite contrarian viewpoints to stress-test strategic plans (Nemeth, 1995).",
      ],
      career: [
        // Management consulting
        "Strategic advisory roles in top firms or internal COE functions.",
        // Corporate strategy
        "Lead corporate development or strategic planning teams.",
        // Policy analysis
        "Shape public policy or regulatory strategy in government or NGOs.",
        // Venture capital
        "Assess startup strategies and market fit for investment decisions.",
        // Research think-tanks
        "Deep-dive into industry trends and advise on long-term positioning.",
      ],
    },
  },
  {
    slug: "investigator",
    name: "Investigator",
    signature: "Rigorous inquiry",
    description:
      "Inquisitive researchers driven by ethical rigor and deep analytical inquiry.",
    strengths: [
      "Thorough research skills",
      "High integrity and ethical standards",
      "Deep analytical thinking",
    ],
    challenges: [
      "May overfocus on details",
      "Risk of information overload",
      "Can struggle to communicate insights succinctly",
    ],
    recommendations: [
      "Set information boundaries",
      "Practice summary and synthesis techniques",
      "Use visual aids to present complex data",
    ],
    applications: {
      growth: [
        // Meta-cognitive summaries
        "Write 300-word abstracts of key papers to hone distillation skills.",
        // Stop-rule heuristics
        "Set clear stopping criteria (e.g., 20 articles) to avoid endless research loops.",
        // Synthesis frameworks
        "Use frameworks like PICO (medicine) or SWOT for structured insight generation.",
        // Lateral thinking
        "Practice “random entry” provocations to break analytical blind spots (De Bono, 1967).",
        // Data triangulation
        "Combine qualitative and quantitative sources for robust conclusions.",
      ],
      collaboration: [
        // “Lunch & Learn” demos
        "Host short sessions to share key findings and foster data literacy.",
        // Infographics creation
        "Translate complex data into visual stories using tools like Power BI.",
        // Research sprints
        "Run focused 2-day research sprints with cross-functional teams.",
        // Peer review circles
        "Establish peer feedback groups to critique and refine reports.",
        // Methodological training
        "Offer internal workshops on research methods and ethical standards.",
      ],
      career: [
        // Academic research
        "Publish in peer-reviewed journals to establish subject-matter authority.",
        // Compliance & audit
        "Roles in finance or healthcare where rigorous verification is vital.",
        // Data science & analytics
        "Data-scientist or BI roles drawing on your deep analytical rigor.",
        // UX research
        "Lead user-research initiatives combining ethics and insight.",
        // Policy evaluation
        "Assess program outcomes in government or NGO settings.",
      ],
    },
  },
  {
    slug: "mediator",
    name: "Mediator",
    signature: "Team harmony",
    description:
      "Compassionate harmonizers who navigate conflicts and foster cooperative environments.",
    strengths: [
      "Strong conflict resolution skills",
      "High empathy and compassion",
      "Skilled at building consensus",
    ],
    challenges: [
      "May avoid necessary confrontations",
      "Can over-prioritize harmony at cost of efficiency",
      "Risk of internalizing others’ stress",
    ],
    recommendations: [
      "Practice assertive communication",
      "Set clear conflict-resolution protocols",
      "Schedule personal decompression time",
    ],
    applications: {
      growth: [
        // Thomas-Kilmann Conflict Mode Instrument
        "Learn to flex between competing, avoiding, accommodating, collaborating, and compromising (TKI).",
        // Mindfulness (Kabat-Zinn, 1994)
        "Daily mindfulness practice to center yourself before engaging in conflict.",
        // Perspective-taking
        "Use role-play exercises to deliberately adopt others’ viewpoints (Galinsky et al., 2008).",
        // Nonviolent Communication
        "Apply NVC’s observation-feeling-need-request model to clear communication (Rosenberg, 2003).",
        // Emotional granularity
        "Label emotions precisely to avoid conflating different feelings (Barrett, 2001).",
      ],
      collaboration: [
        // Liberating Structures
        "Use facilitation formats like “1-2-4-All” to ensure every voice is heard (Lipmanowicz & McCandless).",
        // Empathy mapping
        "Lead workshops to map stakeholder thoughts, feelings, and needs to foster understanding.",
        // Mediation frameworks
        "Apply the five-step mediation process: opening, issue framing, option generation, negotiation, closure.",
        // Safe space creation
        "Establish ground rules and confidentiality to encourage honest dialogue.",
        // Group norms setting
        "Co-author team charters that clarify values and conflict protocols.",
      ],
      career: [
        // HR Business Partner
        "Coach leaders and design interventions that enhance organizational health.",
        // Professional mediator
        "Certify through recognized bodies (e.g., CPR, IMI) and practice in dispute resolution.",
        // Organizational development
        "Lead culture-change initiatives and team-building programs.",
        // Counseling & coaching
        "Consider roles in EAP, life coaching, or rehabilitation settings.",
        // Community engagement
        "Design and facilitate community forums and stakeholder dialogues.",
      ],
    },
  },
  {
    slug: "guardian",
    name: "Guardian",
    signature: "Reliable execution",
    description:
      "Dependable executors who ensure stability, compliance, and ethical standards.",
    strengths: [
      "Highly reliable and responsible",
      "Strong adherence to rules and policies",
      "Excellent organizational maintenance",
    ],
    challenges: [
      "May resist necessary innovation",
      "Risk of rigidity in processes",
      "Can become stressed by ambiguity",
    ],
    recommendations: [
      "Incorporate periodic innovation reviews",
      "Build in flexible exception protocols",
      "Use scenario planning for ambiguity management",
    ],
    applications: {
      growth: [
        // Fleeson & Jayawickreme (2015)
        "Practice situational role-plays to build adaptability under ambiguity.",
        // Adaptive self-regulation
        "Use cyclical PDSA (Plan-Do-Study-Act) to iterate processes without chaos.",
        // Cognitive reframing
        "Apply cognitive restructuring to reinterpret uncertainty as opportunity (Beck, 1976).",
        // Policy review cycles
        "Schedule quarterly reviews to update procedures based on new data.",
        // Stress inoculation
        "Gradually expose yourself to controlled ambiguity to build tolerance (Meichenbaum, 1985).",
      ],
      collaboration: [
        // SOP co-creation
        "Involve cross-functional teams in writing SOPs to ensure practicality and buy-in.",
        // Exception dashboards
        "Create live dashboards highlighting deviations so teams can adapt without full rewrites.",
        // Compliance gamification
        "Incentivize adherence through recognition programs or “compliance champions.”",
        // Scenario drills
        "Run tabletop exercises to test protocols under simulated crises.",
        // Feedback loops
        "Establish rapid debrief processes so lessons learned feed back into standards.",
      ],
      career: [
        // Quality assurance
        "Roles in QA, regulatory affairs, and audit leverage your reliability.",
        // Program management
        "Lead large, complex programs where process discipline is critical.",
        // Compliance leadership
        "Oversee governance and risk frameworks in financial or healthcare sectors.",
        // Facilities management
        "Manage operations where maintenance and safety are paramount.",
        // Standards development
        "Work with ISO or industry bodies to draft and maintain global standards.",
      ],
    },
  },
];
