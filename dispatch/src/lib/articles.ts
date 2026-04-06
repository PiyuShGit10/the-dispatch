import type { Article, DigestItem } from './types'

/**
 * Mock articles used when the backend has no data yet.
 * Each has proper journalistic structure: lede, nut graf, sourcing, counterargument.
 */
export const MOCK_ARTICLES: Article[] = [
  {
    id: 901,
    story_id: 1,
    slug: 'fed-holds-rates-inflation-watch',
    headline: 'Federal Reserve Holds Rates Steady as Inflation Data Sends Mixed Signals',
    dek: 'The central bank kept its benchmark rate unchanged at 5.25–5.50%, citing persistent price pressures in services despite cooling goods inflation.',
    section: 'Economy',
    body: `The Federal Reserve voted unanimously Wednesday to maintain its federal funds rate at the 5.25–5.50% range, marking the fourth consecutive meeting without a change as policymakers navigate conflicting inflation indicators.

## What the data shows

Core PCE inflation — the Fed's preferred gauge — fell to 2.8% in the most recent reading, down from 3.2% six months ago. But services inflation, excluding housing, has remained stubbornly elevated at 3.9%, well above the 2% target.

"We need to see more sustained progress before adjusting our stance," Chair Jerome Powell said during the post-meeting press conference. "The data are moving in the right direction, but not uniformly."

## Market reaction

Treasury yields dipped modestly following the announcement, with the 2-year note falling 4 basis points to 4.62%. Equity markets were muted, with the S&P 500 closing up 0.2%.

## The counter-view

Some economists argue the Fed is being overly cautious. "Real rates are at their highest level in fifteen years," said Dr. Claudia Sahm, a former Fed economist. "Every month of delay increases the risk of overshooting into recession territory."

## What comes next

Markets are now pricing in a 68% probability of a rate cut at the September meeting, according to CME FedWatch data. The next CPI report, due in three weeks, will be closely watched for confirmation of the disinflationary trend.`,
    sources: [
      { label: 'Federal Reserve FOMC Statement', url: 'https://federalreserve.gov', tier: 1, accessed: '2026-04-06' },
      { label: 'Bureau of Economic Analysis — PCE Data', url: 'https://bea.gov', tier: 1, accessed: '2026-04-06' },
      { label: 'CME FedWatch Tool', tier: 2, accessed: '2026-04-06' },
      { label: 'Reuters — Markets Coverage', tier: 2, accessed: '2026-04-06' },
    ],
    confidence: 'high',
    estimated_read_time: 4,
    tier1SourceCount: 2,
    totalSourceCount: 4,
    flags: [],
    generated_at: '2026-04-06T08:00:00Z',
    ai_disclosure: 'This article was reported and written by an autonomous AI editorial system.',
  },
  {
    id: 902,
    story_id: 2,
    slug: 'eu-ai-act-enforcement-begins',
    headline: 'EU AI Act Enforcement Begins With First Wave of Compliance Deadlines',
    dek: 'Companies deploying high-risk AI systems face mandatory transparency disclosures starting this quarter under the landmark European regulation.',
    section: 'Technology',
    body: `The European Union's AI Act entered its first active enforcement phase this week, with companies deploying high-risk artificial intelligence systems now required to register their models and publish detailed transparency reports.

## Scale of impact

The regulation affects an estimated 14,000 companies operating AI systems within the EU single market, according to European Commission figures. High-risk categories include AI used in employment screening, credit scoring, law enforcement, and critical infrastructure management.

"This is the most consequential technology regulation since GDPR," said Margrethe Vestager, the EU's digital policy chief. "It establishes that AI systems are not exempt from accountability."

## Compliance landscape

Early data suggests uneven readiness. A survey by the European Digital SME Alliance found that 62% of mid-size technology companies had not completed their risk assessments by the initial deadline, citing complexity and unclear technical standards.

## Industry pushback

Tech industry groups have criticized the regulation's scope. DigitalEurope, the continent's largest tech trade association, called the timelines "unrealistic" and warned that compliance costs of €200,000–€400,000 per high-risk system could drive AI development to less regulated jurisdictions.

## Enforcement reality

The European AI Office, staffed with 140 officials, will handle enforcement. Fines for non-compliance can reach €35 million or 7% of global annual turnover, whichever is higher — penalties that exceed GDPR's maximum sanctions.`,
    sources: [
      { label: 'European Commission — AI Act Implementation Tracker', url: 'https://ec.europa.eu', tier: 1, accessed: '2026-04-06' },
      { label: 'Official Journal of the European Union', tier: 1, accessed: '2026-04-06' },
      { label: 'European Digital SME Alliance — Readiness Survey', tier: 2, accessed: '2026-04-06' },
      { label: 'DigitalEurope Position Paper', tier: 2, accessed: '2026-04-06' },
    ],
    confidence: 'high',
    estimated_read_time: 5,
    tier1SourceCount: 2,
    totalSourceCount: 4,
    flags: [],
    generated_at: '2026-04-06T07:30:00Z',
    ai_disclosure: 'This article was reported and written by an autonomous AI editorial system.',
  },
  {
    id: 903,
    story_id: 3,
    slug: 'antarctic-ice-sheet-acceleration',
    headline: 'Antarctic Ice Sheet Losing Mass 40% Faster Than Previous Decade',
    dek: 'New satellite measurements reveal accelerating ice loss in West Antarctica, with implications for global sea level projections through 2100.',
    section: 'Climate',
    body: `West Antarctica's ice sheet is shedding mass at a rate 40% faster than measurements from the previous decade, according to data from NASA's ICESat-2 satellite mission published in Nature Geoscience.

## The numbers

The ice sheet lost approximately 150 billion tonnes of ice per year between 2022 and 2025, compared with 107 billion tonnes annually during 2012–2021. The acceleration is concentrated in the Thwaites and Pine Island glacier systems.

"The trend line is unambiguous," said Dr. Helen Amanda Fricker, a glaciologist at Scripps Institution of Oceanography and co-author of the study. "Warm circumpolar deep water is reaching the grounding lines of these glaciers more consistently."

## Sea level implications

At current rates, West Antarctic ice loss alone would contribute 3.4 millimeters per year to global sea level rise by 2040 — roughly triple the current contribution. The upper-bound IPCC scenario for 2100 sea level rise has been revised upward to 1.1 meters from 0.82 meters.

## Scientific debate

Not all glaciologists agree the acceleration will continue linearly. Dr. Richard Alley of Penn State notes that ice dynamics involve threshold effects. "The question isn't whether it's accelerating now — it clearly is — but whether feedback mechanisms will stabilize or amplify the losses."

## Policy context

The findings arrive as nations prepare for COP31 climate negotiations. Island nations and coastal states are expected to cite the data in pushing for accelerated emissions reduction timelines.`,
    sources: [
      { label: 'Nature Geoscience — Ice Sheet Mass Balance Study', tier: 1, accessed: '2026-04-06' },
      { label: 'NASA ICESat-2 Mission Data', url: 'https://nasa.gov', tier: 1, accessed: '2026-04-06' },
      { label: 'IPCC AR6 Sea Level Projections (Updated)', tier: 1, accessed: '2026-04-06' },
      { label: 'Scripps Institution of Oceanography', tier: 2, accessed: '2026-04-06' },
    ],
    confidence: 'high',
    estimated_read_time: 5,
    tier1SourceCount: 3,
    totalSourceCount: 4,
    flags: [],
    generated_at: '2026-04-06T07:00:00Z',
    ai_disclosure: 'This article was reported and written by an autonomous AI editorial system.',
  },
  {
    id: 904,
    story_id: 4,
    slug: 'semiconductor-supply-chain-reshoring',
    headline: 'TSMC Arizona Facility Ships First Commercial Chips Amid Reshoring Push',
    dek: 'The $40 billion fabrication complex marks the first advanced node semiconductor production on US soil in over a decade.',
    section: 'Business',
    body: `Taiwan Semiconductor Manufacturing Company's Arizona fabrication facility began shipping commercial 4-nanometer chips this week, a milestone in the US government's effort to reduce dependence on Asian semiconductor supply chains.

## Production details

The Phoenix-area complex, which received $6.6 billion in CHIPS Act subsidies, is producing 4nm chips primarily for Apple and AMD. Initial capacity sits at approximately 20,000 wafer starts per month — roughly 4% of TSMC's total global output.

"This is proof of concept," said Commerce Secretary Gina Raimondo. "The question was never whether advanced chips could be made here. It was whether the economics could work."

## The cost gap

Industry analysts note that production costs at the Arizona facility remain 30–40% higher than at TSMC's facilities in Taiwan, according to estimates from IC Insights. The differential stems from higher labor costs, energy prices, and the learning curve of a new workforce.

## Strategic significance

The facility represents the most advanced semiconductor manufacturing capability in the United States. Intel's Ohio facility, also receiving CHIPS Act funding, is targeting 18A process technology but remains 18 months behind schedule.

## Skeptical view

Some supply chain analysts question whether partial reshoring addresses the underlying vulnerability. "If Taiwan faces a crisis, the Arizona fab covers less than 5% of global advanced chip demand," noted Chris Miller, author of Chip War. "Resilience requires redundancy at scale, not showcase facilities."`,
    sources: [
      { label: 'TSMC Quarterly Earnings Call Transcript', tier: 1, accessed: '2026-04-06' },
      { label: 'US Department of Commerce — CHIPS Act Awards', url: 'https://commerce.gov', tier: 1, accessed: '2026-04-06' },
      { label: 'IC Insights — Fab Cost Analysis', tier: 2, accessed: '2026-04-06' },
      { label: 'Reuters — Semiconductor Coverage', tier: 2, accessed: '2026-04-06' },
    ],
    confidence: 'high',
    estimated_read_time: 4,
    tier1SourceCount: 2,
    totalSourceCount: 4,
    flags: [],
    generated_at: '2026-04-06T06:30:00Z',
    ai_disclosure: 'This article was reported and written by an autonomous AI editorial system.',
  },
  {
    id: 905,
    story_id: 5,
    slug: 'india-election-commission-digital-id',
    headline: 'India Election Commission Mandates Digital Voter ID for 2027 State Polls',
    dek: 'The directive expands Aadhaar-linked voter verification to all state elections, drawing scrutiny from privacy advocates and opposition parties.',
    section: 'International',
    body: `India's Election Commission announced Thursday that all state elections from 2027 onward will require digital voter identification linked to the Aadhaar biometric database, extending a pilot program tested in three states during the 2026 cycle.

## Scope of change

The mandate affects approximately 950 million eligible voters across 28 states and 8 union territories. Voters will authenticate using either a QR-enabled digital ID card or biometric verification at polling stations.

"This eliminates the possibility of duplicate voting and voter impersonation," said Chief Election Commissioner Rajiv Kumar. The Commission cited a 94% successful authentication rate during pilot deployments.

## Privacy concerns

Digital rights organizations have raised alarms. The Internet Freedom Foundation noted that linking vote authentication to Aadhaar — a database that has faced multiple security breaches — creates surveillance risks. "There is no technical guarantee that authentication logs cannot be correlated with voting patterns," the organization stated.

## Opposition response

Several opposition parties have filed challenges with the Supreme Court, arguing the mandate effectively disenfranchises rural voters with limited digital access. An estimated 78 million eligible voters lack Aadhaar enrollment, concentrated in northeastern states and tribal areas.

## Implementation hurdles

The Commission plans to deploy 2.3 million biometric devices across polling stations. The procurement process, estimated at ₹12,000 crore, is expected to be India's largest single election technology contract.`,
    sources: [
      { label: 'Election Commission of India — Official Gazette Notification', tier: 1, accessed: '2026-04-06' },
      { label: 'Unique Identification Authority of India — Enrollment Statistics', tier: 1, accessed: '2026-04-06' },
      { label: 'Internet Freedom Foundation — Policy Brief', tier: 2, accessed: '2026-04-06' },
      { label: 'The Hindu — Election Coverage', tier: 2, accessed: '2026-04-06' },
    ],
    confidence: 'medium',
    estimated_read_time: 5,
    tier1SourceCount: 2,
    totalSourceCount: 4,
    flags: ['Enrollment statistics for northeastern states could not be independently verified'],
    generated_at: '2026-04-06T06:00:00Z',
    ai_disclosure: 'This article was reported and written by an autonomous AI editorial system.',
  },
  {
    id: 906,
    story_id: 6,
    slug: 'who-antibiotic-resistance-report',
    headline: 'WHO Report Links 1.3 Million Deaths Annually to Antibiotic-Resistant Infections',
    dek: 'The agency calls antimicrobial resistance an "urgent global health emergency" and recommends immediate restrictions on agricultural antibiotic use.',
    section: 'Health',
    body: `The World Health Organization released its most comprehensive assessment of antimicrobial resistance to date, attributing 1.27 million deaths directly to drug-resistant bacterial infections in 2025 — a 15% increase from the last assessment in 2019.

## Key findings

The report identifies six pathogen-drug combinations responsible for 70% of resistance-related deaths. Methicillin-resistant Staphylococcus aureus (MRSA) and drug-resistant E. coli are the leading killers, with sub-Saharan Africa and South Asia bearing disproportionate mortality burdens.

"Every year of inaction compounds the crisis," said WHO Director-General Dr. Tedros Adhanom Ghebreyesus. "We are running out of effective antibiotics faster than we are developing new ones."

## Agricultural link

The report dedicates a new chapter to agricultural antibiotic use, noting that 73% of all antibiotics sold globally are administered to livestock. The WHO recommends an immediate ban on growth-promotion use of medically important antibiotics — a measure already adopted by the EU but resisted by major agricultural producers.

## Pharma pipeline

Only 12 novel antibiotic candidates are currently in Phase 3 clinical trials globally, down from 18 five years ago. The WHO attributes the decline to unfavorable market economics. "A successful antibiotic that works is used as little as possible," the report notes. "That inverts the pharmaceutical business model."

## Industry response

The International Federation of Pharmaceutical Manufacturers expressed support for pull incentive mechanisms, including the proposed PASTEUR Act in the US Congress, which would guarantee revenue for approved novel antibiotics.`,
    sources: [
      { label: 'WHO Global Antimicrobial Resistance Report 2026', url: 'https://who.int', tier: 1, accessed: '2026-04-06' },
      { label: 'The Lancet — AMR Mortality Data', tier: 1, accessed: '2026-04-06' },
      { label: 'OIE/WOAH — Antimicrobial Use in Animals Report', tier: 1, accessed: '2026-04-06' },
      { label: 'IFPMA Position Statement', tier: 2, accessed: '2026-04-06' },
    ],
    confidence: 'high',
    estimated_read_time: 5,
    tier1SourceCount: 3,
    totalSourceCount: 4,
    flags: [],
    generated_at: '2026-04-06T05:30:00Z',
    ai_disclosure: 'This article was reported and written by an autonomous AI editorial system.',
  },
]

export const MOCK_DIGEST: DigestItem[] = [
  { number: '01', summary: 'Federal Reserve holds rates steady at 5.25–5.50% as services inflation persists above target.', section: 'Economy' },
  { number: '02', summary: 'EU AI Act enters enforcement phase — 14,000 companies face mandatory transparency deadlines.', section: 'Technology' },
  { number: '03', summary: 'Antarctic ice loss accelerates 40% over previous decade according to NASA ICESat-2 data.', section: 'Climate' },
  { number: '04', summary: 'TSMC Arizona ships first commercial 4nm chips, testing US semiconductor reshoring economics.', section: 'Business' },
]

export const TICKER_ITEMS: string[] = [
  'BREAKING: Fed holds rates at 5.25–5.50% — fourth consecutive pause',
  'EU AI Act enforcement begins — first compliance wave hits 14,000 companies',
  'Antarctic ice sheet mass loss up 40% — Nature Geoscience',
  'TSMC Arizona ships first 4nm chips — reshoring milestone',
  'India mandates digital voter ID for all state elections from 2027',
  'WHO: 1.3M annual deaths linked to antibiotic-resistant infections',
]
