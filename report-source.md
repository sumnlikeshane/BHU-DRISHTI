# BHU-DRISHTI: research foundation for a watershed decision-support system

**Audience:** Smart India Hackathon judges, Ministry/Department stakeholders, watershed programme officials, domain reviewers, and the BHU-DRISHTI product team  
**Research date:** 8 September 2026  
**Geography and programme scope:** India; primarily WDC-PMKSY 2.0 and the published Bhuvan IWMP–SRISHTI monitoring architecture  
**Source brief:** User-provided concept note, “BHU-DRISHTI is a watershed monitoring and decision-support system designed for …”  
**Purpose:** Establish what the product can credibly claim, what evidence it should combine, how it should support decisions, and where the landing page must avoid overstatement.

## Executive answer

BHU-DRISHTI should not be presented as an AI that looks at a photograph and decides whether a watershed structure is healthy. That framing is scientifically weak and operationally unsafe.

The defensible product is a **work-linked evidence and triage layer**. It should:

1. validate whether a geo-coded field observation is usable;
2. preserve its unique work ID, location, capture time, source, and quality;
3. align it with relevant satellite, rainfall, watershed, terrain, and programme records;
4. compare like with like across time and, where feasible, against similar untreated reference areas;
5. keep observations, derived indicators, inferences, and authorised actions visibly separate;
6. rank cases for recollection, analyst review, or field inspection; and
7. record the field outcome so the system can be evaluated and improved.

This is well aligned with the official programme direction. WDC-PMKSY 2.0 guidance already calls for mobile geo-tagging, staged photographs, GIS verification, a web MIS, integrated spatial and non-spatial data, a unique ID for each work, and pre–mid–post remote-sensing comparison. The opportunity is therefore not “bring GIS to watershed monitoring.” It is **make the existing evidence chain comparable, explainable, and operationally reviewable**. [WDC-PMKSY 2.0 Guidelines, Department of Land Resources](https://www.wdcpmksy.dolr.gov.in/reference/WDCPMKSY2.0_Guidelines.pdf)

## 1. What is verified about the programme context

### Official monitoring architecture

The WDC-PMKSY 2.0 Guidelines describe four interacting technology components:

- a mobile application for geo-tagging structures and capturing staged work photographs;
- a GIS application for queries and verification using satellite imagery;
- a web MIS for reports, data management, analytics, and decisions; and
- a portal integrating spatial and non-spatial information.

The same guidance says each work or structure should have a unique ID that connects temporal and attribute data. It also calls for pre-, mid-, and post-project comparison using satellite images of the same resolution and identifies NDVI and NDWI as change indicators. This gives BHU-DRISHTI a clear architectural principle: **the work record is the spine; every image, raster statistic, model output, review, and field outcome attaches to that record**. [WDC-PMKSY 2.0 Guidelines, pp. 18–20](https://www.wdcpmksy.dolr.gov.in/reference/WDCPMKSY2.0_Guidelines.pdf)

NRSC’s published Bhuvan IWMP–SRISHTI overview describes a web GIS for monitoring and evaluation using satellite remote sensing and sample field data from mobile applications. It provides map and image display, monitoring tools, summary statistics, and access at national, state, district, and watershed levels. This supports describing SRISHTI as a precedent for multi-level geospatial monitoring. It does **not**, by itself, prove that a current WDC-PMKSY 2.0 production API or data-sharing agreement is available to this prototype. [Bhuvan IWMP–SRISHTI overview, NRSC/ISRO](https://bhuvan-app1.nrsc.gov.in/iwmp/index_pop.php)

### Scale and outcome direction

On 1 September 2026, the Government of India reported:

- **1,220** WDC-PMKSY 2.0 projects sanctioned;
- **52.93 lakh hectares** covered by those sanctioned projects; and
- **1.24 lakh** water-harvesting structures constructed or rejuvenated.

The same review explicitly said projects should be evaluated not only by expenditure, but also through land reclamation, water availability, irrigation, crop intensity, land productivity, and actual livelihood improvement. The landing page can therefore use the official totals to explain the scale of the evidence estate, but it must label them as **programme outputs**, not as proof that every structure is functioning or that every watershed outcome improved. [WDC-PMKSY progress review, Press Information Bureau, 1 September 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48)

The live WDC-PMKSY MIS changes as states update records. Displayed totals need a visible “as of” date, and the application should not silently mix counts retrieved on different dates. [WDC-PMKSY 2.0 MIS, Department of Land Resources](https://wdcpmksy.dolr.gov.in/)

## 2. The real information problem

The system must bridge four different levels of claim:

| Level                    | Example                                                                                                  | What makes it defensible                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Recorded observation** | “A geo-coded photograph was captured for work MH-NSK-0427 at this time.”                                 | Work ID, coordinates, timestamp, source, file integrity, capture workflow      |
| **Derived signal**       | “The model marked a possible siltation cue” or “season-matched open-water index declined.”               | Model/version, input quality, formula, spatial unit, time window, uncertainty  |
| **Assessment**           | “Multiple signals are consistent with reduced performance, but rainfall may explain part of the change.” | Declared rule/model, supporting and contradictory evidence, baseline/reference |
| **Authorised action**    | “Engineer field verification is recommended.”                                                            | Routing policy, accountable role, urgency, case history, audit trail           |

Most vague “AI for monitoring” language collapses these levels. BHU-DRISHTI should make the separation a visible product feature.

The decisive product output is not a generic “watershed health score.” A single score hides whether the issue is possible damage, lack of recent evidence, climatic variability, a landscape-scale change, or a low-confidence model. A better output is an **evidence packet** containing:

- the question being answered;
- the intervention/work record and watershed context;
- usable inputs and rejected inputs;
- observed cues and derived signals;
- baseline, comparison period, and reference area;
- supporting and contradictory evidence;
- confidence or uncertainty for each component;
- the rule or model version that produced the assessment;
- the recommended verification task; and
- the official decision and eventual field result.

## 3. What each evidence source can—and cannot—say

### Geo-coded field photographs

A photograph can provide high-resolution, local, and human-interpretable evidence. Depending on viewpoint, lighting, image quality, and training data, computer vision may help screen for visible water, vegetation, erosion, obstruction, surface cracking, or possible siltation.

It cannot establish hidden foundation condition, internal structural integrity, storage volume, groundwater recharge, catchment-wide erosion, or causal programme impact. It may not even show the relevant side of the structure. The interface should therefore say “possible visible cue” and route consequential findings for engineer verification.

Before inference, the system should validate:

- work ID and intervention type;
- coordinate presence, accuracy, and plausible distance from the registered work geometry;
- capture time and stage of work;
- image sharpness, exposure, occlusion, and field of view;
- duplication or reuse;
- whether the evidence is current enough for the intended decision; and
- whether consent, retention, and access policies are satisfied.

The historical SRISHTI–DRISHTI manual demonstrates a field workflow with activity selection, GPS capture, photo capture, and “send later,” which is useful evidence that intermittent-connectivity workflows have precedent. Because this manual is historical, it should support an offline-first design principle, not a claim about the exact current application. [SRISHTI–DRISHTI user manual, NRSC](https://bhuvan-app1.nrsc.gov.in/iwmp/downloads/Srishti-Drishti-Eng-USer_Manual.pdf)

### NDVI: a greenness signal, not “vegetation health” in isolation

NDVI uses red and near-infrared reflectance to describe vegetation greenness at pixel scale. It is useful for repeated landscape monitoring, especially when observations are compared with the normal conditions for the same time of year. It is affected by phenological stage, land use, natural disturbance, soil background, and dense-canopy saturation. A higher NDVI can be consistent with denser or greener vegetation; it does not reveal why the change occurred. [NDVI foundation and limitations, U.S. Geological Survey](https://www.usgs.gov/special-topics/remote-sensing-phenology/science/ndvi-foundation-remote-sensing-phenology)

Landing-page language should use **“greenness”** or **“vegetation-cover signal”** rather than asserting plant health or watershed success from NDVI alone.

### “NDWI” is ambiguous and must be defined

Two influential 1996 indices share the label NDWI:

- Gao’s NDWI uses near-infrared and short-wave infrared bands to sense liquid water in vegetation canopies. [Gao, _Remote Sensing of Environment_, 1996](<https://doi.org/10.1016/S0034-4257(96)00067-3>)
- McFeeters’ NDWI uses green and near-infrared bands to delineate open-water features. [McFeeters, _International Journal of Remote Sensing_, 1996](https://doi.org/10.1080/01431169608948714)

Calling either one simply “water presence” is underspecified. BHU-DRISHTI should store and display:

- the exact index variant and formula;
- sensor and bands;
- surface-reflectance product/version;
- cloud, cloud-shadow, and saturation masks;
- spatial resolution and analysis geometry;
- threshold or change statistic; and
- comparison window.

For the current landing demo, “open-water index (McFeeters NDWI)” is the clearer label. It remains a spectral indicator, not a direct measure of water depth, storage, retention, or groundwater recharge.

### Satellite evidence needs quality and scale controls

The WDC guidelines require same-resolution images for pre–mid–post comparison. In practice, comparability also requires consistent processing, spatial registration, season, and quality masking. USGS notes that surface-reflectance products improve multi-date comparison by accounting for atmospheric effects, while their quality bands identify cloud, cloud shadow, snow/ice, aerosols, water flags, and radiometric saturation that can make pixels unusable. [Landsat Surface Reflectance, USGS](https://www.usgs.gov/landsat-missions/landsat-surface-reflectance) and [Landsat 8–9 Surface Reflectance Quality Assessment, USGS](https://www.usgs.gov/landsat-missions/landsat-8-9-surface-reflectance-quality-assessment)

The problem brief refers to 30 m data. A 30 m pixel covers about 900 m² before considering projection and viewing geometry. Many individual watershed structures or narrow channels may occupy only part of a pixel. The product should calculate landscape context over a documented buffer, waterbody polygon, drainage reach, or micro-watershed—not imply that a single pixel inspects a small structure.

### Rainfall is essential context, but not a complete counterfactual

Rainfall should be represented by an explicit statistic such as cumulative rainfall over the preceding 30/60/90 days, seasonal total, onset timing, dry-spell count, or anomaly relative to a declared historical baseline. “Rainfall −12%” is meaningless unless the period, spatial product, baseline years, units, and data quality are known.

Rainfall adjustment can make an interpretation more plausible, but it does not tell us what would have happened without the intervention. Land use, crop choice, irrigation, grazing, fire, other public works, and local management can also change vegetation and water signals.

### Terrain and watershed context supply physical meaning

Slope, drainage, soil, land use/land cover, intervention geometry, and upstream–downstream position should not be decorative map layers. They determine the analysis unit and help test physical plausibility:

- Is the work located where its registered geometry says it is?
- Is an apparent water signal upstream, downstream, or unrelated to the structure?
- Is the buffer hydrologically meaningful?
- Is a greenness change concentrated in cropland, plantation, channel, or untreated land?
- Is the expected effect visible at the scale and time horizon being measured?

## 4. A defensible impact-evaluation design

A two-image “before/after” slider is a communication device, not sufficient impact evidence.

For a pilot, BHU-DRISHTI should implement the following hierarchy:

1. **Define the intervention unit.** Use the official work ID, intervention type, completion date, geometry, and micro-watershed/catchment.
2. **Construct a pre-intervention baseline.** Prefer multiple observations from comparable seasons, not one convenient image.
3. **Construct post-intervention windows.** Use expected response timing appropriate to the intervention; a plantation, check dam, and drainage treatment should not share one evaluation window.
4. **Apply quality controls.** Use analysis-ready surface reflectance, cloud/shadow/saturation masks, registration checks, and a minimum-observation rule.
5. **Normalise for season and rainfall.** Declare rainfall product, accumulation window, baseline years, and anomaly method.
6. **Add comparable reference areas when feasible.** Select untreated areas with similar pre-intervention land cover, climate, terrain, and spatial scale, while excluding other interventions.
7. **Estimate differential change.** A Before–After Control–Impact (BACI) or related matched comparison asks whether the intervention area changed more than comparable areas over the same period.
8. **Corroborate with ground and programme outcomes.** Water-level or storage observations, irrigation area, crop intensity, land productivity, maintenance records, and livelihood measures answer questions spectral indices cannot.
9. **State the strength of the claim.** Use “observed change,” “change consistent with,” or “estimated intervention effect” according to the design and evidence.

Peer-reviewed work applying BACI to semi-arid land restoration shows why this matters: changes in vegetation cannot be attributed to an intervention by looking only at the treated area because seasonality and interannual climate variability also drive change. The authors present remote sensing as an efficient screening and monitoring tool that can guide additional field verification—not as a universal substitute for it. [Meroni et al., 2017](https://doi.org/10.1016/j.jag.2017.02.016)

## 5. Triage model: rank attention, not “health”

The first operational version should use explicit queues rather than one national score:

| Queue                  | Trigger                                                                                                    | Operational response                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Recollect evidence** | Missing work ID, implausible GPS, poor image, stale observation, inadequate satellite coverage             | Send a precise recapture/data-completion task                      |
| **Analyst review**     | Signals conflict, index is unstable, reference is unsuitable, model is out of scope                        | Inspect evidence and revise/withhold assessment                    |
| **Field inspection**   | A plausible visible issue is corroborated, consequence is material, or safety-relevant uncertainty remains | Route to the accountable engineer/official                         |
| **Routine monitoring** | Usable signals remain within the declared baseline and no material issue is detected                       | Schedule the next evidence cycle; do not label “structurally safe” |

Priority should be based on multiple dimensions:

- plausible consequence if the issue is real;
- evidence strength and agreement;
- recency;
- urgency or expected deterioration;
- accessibility and inspection cost;
- equity/programme rules; and
- uncertainty requiring resolution.

These dimensions should remain visible. A score may support sorting, but it should never be the only explanation.

## 6. Human oversight must be designed, not asserted

“Human in the loop” is not a sufficient safety claim. The product needs defined roles and escalation rules:

- who reviews a computer-vision cue;
- who can dismiss, confirm, or escalate it;
- which decisions require an engineer;
- when the system must abstain;
- how overrides and reasons are recorded;
- how errors are sampled and audited; and
- how field results feed model evaluation.

NIST’s AI Risk Management Framework recommends documenting system knowledge limits, the way outputs are used and overseen, performance under conditions similar to deployment, uncertainty, human-oversight processes, and differentiated roles in human–AI configurations. For BHU-DRISHTI, that implies visible provenance, safe failure through abstention, role-based review, and field validation before consequential action. [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1)

### Validation metrics for the pilot

A claimed “82% confidence” is not meaningful without calibration and a defined event. The pilot should report:

- per-class precision and recall for each visible cue;
- false-negative rate for high-consequence cues;
- calibration error or reliability curves for model confidence;
- abstention coverage and error rate after abstention;
- performance by intervention type, season, device/image quality, and geography;
- analyst agreement and field-confirmation rate;
- time saved per reviewed case;
- queue precision: proportion of inspected high-priority cases that warranted action; and
- evidence-completeness and recollection rates.

The primary benchmark is not a generic image-classification accuracy. It is whether the system creates a safer, faster, better-documented review process under pilot conditions.

## 7. Minimum viable district pilot

The strongest demonstration is one district with a complete evidence chain, not a simulated nationwide AI claim.

### Required data contract

For each work:

- stable work ID and intervention type;
- planned and actual geometry;
- implementation stages and dates;
- geo-coded photo metadata and source file;
- project, district, micro-watershed, and drainage identifiers;
- satellite product/version, acquisition dates, masks, and derived statistics;
- rainfall product, window, and anomaly definition;
- terrain/soil/LULC source and vintage;
- model/version and inference record;
- human review, decision, and reason; and
- inspection finding, maintenance action, and closure status.

### Pilot phases

1. **Data readiness:** secure authorised sample records; measure missingness, GPS accuracy, duplicates, class balance, and temporal coverage.
2. **Evidence viewer:** link work records, field images, map context, and time series without AI claims.
3. **Rules-first triage:** implement quality and recency gates, rainfall/season comparison, and evidence-gap queues.
4. **Computer-vision screening:** add only the visible cues that can be validated against field labels.
5. **Prospective validation:** run the queue alongside normal operations, record reviewer decisions and inspection outcomes, and compare with the existing process.
6. **Scale decision:** expand only after accuracy, calibration, workflow burden, data governance, and outcome value meet agreed thresholds.

### Important unresolved dependency

No authorised current corpus of WDC-PMKSY geo-coded intervention photographs or production API was identified during this research. That is not a minor engineering detail; it is the central feasibility dependency for model development and integration. The project should request a sponsor-approved sample, schema, data-sharing route, and labelling protocol. Any synthetic or team-collected data used for the hackathon must remain visibly labelled as demonstration data.

## 8. Landing-page content implications

The landing page should make five ideas memorable:

1. **The evidence estate already exists.** Official guidance already expects mobile, GIS, MIS, and temporal monitoring.
2. **The gap is interpretation and prioritisation.** BHU-DRISHTI adds a review layer, not a replacement collection platform.
3. **Every signal has a boundary.** A photograph sees visible condition; satellite indices describe landscape-scale spectral change; rainfall explains some variability; GIS supplies physical context.
4. **Impact needs a comparison design.** Same-season time series, rainfall, reference areas, and ground outcomes are stronger than a simple before/after claim.
5. **The output is a next step with evidence.** Recollect, review, inspect, or continue monitoring—under accountable human authority.

Recommended vocabulary:

- “possible visible siltation cue,” not “siltation detected”;
- “greenness signal,” not “vegetation health proved”;
- “open-water index (McFeeters NDWI),” not an undefined “NDWI”;
- “change consistent with the intervention,” not “impact,” unless a credible comparison supports attribution;
- “no current flag,” not “healthy” or “safe”;
- “model signal confidence,” not “confidence the structure is defective”; and
- “field verification recommended,” not “intervention required.”

## 9. Material limitations and disagreements

- **Problem-statement provenance:** the exact SIH26015 text and theme were supplied in the user’s attached brief. Public secondary mirrors were inconsistent about theme and deadlines, and an authoritative SIH page was not located during this pass. Product research therefore treats the attached statement as the sponsor brief but does not use third-party SIH mirrors as factual authorities.
- **SRISHTI/Drishti currency:** NRSC pages and the linked manual verify the published historical system and workflow. They do not establish current WDC-PMKSY 2.0 interface availability, current version, API access, or a data-sharing agreement.
- **Programme totals move:** the landing page uses the 1 September 2026 PIB release as a fixed cited snapshot. The live MIS may differ.
- **NDWI terminology:** official WDC guidance names NDWI without specifying a formula. The prototype uses “McFeeters-style open-water index” for conceptual clarity; implementation must confirm the sponsor’s required product.
- **Causal claims:** rainfall normalisation improves interpretation but does not create a counterfactual. Reference areas and ground outcomes materially strengthen attribution, but observational evaluation still has limitations.
- **Prototype boundaries:** the current map data is not an authoritative administrative or political boundary source. The existing release gate in `docs/data-provenance.md` remains in force.

## Claim-to-source ledger

| Material claim                                                                                                                                          | Source                                                                                                                                                                                            | Publisher/author                                                                       | Date                                                               | Confidence / access note                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| WDC-PMKSY guidance calls for mobile geo-tagging, staged work photos, GIS verification, MIS/portal integration, unique work IDs, and temporal comparison | [WDC-PMKSY 2.0 Guidelines](https://www.wdcpmksy.dolr.gov.in/reference/WDCPMKSY2.0_Guidelines.pdf)                                                                                                 | Department of Land Resources, Ministry of Rural Development                            | Publication date not stated in retrieved copy; accessed 8 Sep 2026 | High; official primary document, especially pp. 18–20                                                         |
| 1,220 projects, 52.93 lakh ha, and 1.24 lakh structures as a fixed snapshot                                                                             | [Progress review](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48)                                                                                                        | Press Information Bureau / Ministry of Rural Development                               | 1 Sep 2026                                                         | High; official release, counts may change later                                                               |
| Evaluation should look beyond expenditure to land, water, irrigation, crop, productivity, and livelihood outcomes                                       | [Progress review](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2305550&lang=1&reg=48)                                                                                                        | Press Information Bureau / Ministry of Rural Development                               | 1 Sep 2026                                                         | High; official policy direction                                                                               |
| SRISHTI is a published web-GIS monitoring/evaluation system using remote sensing and sample mobile field data, with multi-level access                  | [Bhuvan IWMP–SRISHTI overview](https://bhuvan-app1.nrsc.gov.in/iwmp/index_pop.php)                                                                                                                | NRSC / ISRO                                                                            | Undated page; accessed 8 Sep 2026                                  | High for published historical role; low for current API/access assumptions                                    |
| Field capture workflow includes GPS, photo capture, and deferred sending                                                                                | [SRISHTI–DRISHTI user manual](https://bhuvan-app1.nrsc.gov.in/iwmp/downloads/Srishti-Drishti-Eng-USer_Manual.pdf)                                                                                 | NRSC / ISRO                                                                            | Manual appears from 2015-era system                                | Medium-high; historical workflow only                                                                         |
| NDVI describes pixel-scale greenness and has soil-background and saturation limitations                                                                 | [NDVI foundation](https://www.usgs.gov/special-topics/remote-sensing-phenology/science/ndvi-foundation-remote-sensing-phenology)                                                                  | U.S. Geological Survey                                                                 | Page updated 29 Nov 2018; accessed 8 Sep 2026                      | High; official technical explanation                                                                          |
| Gao NDWI measures vegetation liquid water                                                                                                               | [Gao 1996](<https://doi.org/10.1016/S0034-4257(96)00067-3>)                                                                                                                                       | Bo-Cai Gao, _Remote Sensing of Environment_                                            | 1996                                                               | High; original peer-reviewed paper                                                                            |
| McFeeters NDWI delineates open-water features                                                                                                           | [McFeeters 1996](https://doi.org/10.1080/01431169608948714)                                                                                                                                       | Stuart K. McFeeters, _International Journal of Remote Sensing_                         | 1996                                                               | High; original peer-reviewed paper                                                                            |
| Surface-reflectance and QA products are necessary for reliable multi-date change analysis                                                               | [Surface Reflectance](https://www.usgs.gov/landsat-missions/landsat-surface-reflectance); [QA guidance](https://www.usgs.gov/landsat-missions/landsat-8-9-surface-reflectance-quality-assessment) | U.S. Geological Survey Landsat Missions                                                | Accessed 8 Sep 2026                                                | High; official technical documentation                                                                        |
| Comparing treated and similar untreated areas over time helps separate intervention change from environmental variability                               | [Meroni et al.](https://doi.org/10.1016/j.jag.2017.02.016)                                                                                                                                        | Meroni et al., _International Journal of Applied Earth Observation and Geoinformation_ | 2017                                                               | High; peer-reviewed, semi-arid restoration context; transfer to Indian watershed projects requires validation |
| AI systems should document knowledge limits, uncertainty, human oversight, validation, and roles                                                        | [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1)                                                                                                                                          | Elham Tabassi / NIST                                                                   | 26 Jan 2023                                                        | High; authoritative general framework, not India-specific regulation                                          |

## Research process and stopping point

Discovery focused on official DoLR/WDC-PMKSY and NRSC/ISRO materials, the cited programme totals, original NDWI literature, official Landsat/NDVI documentation, peer-reviewed remote-sensing impact designs, and an authoritative AI risk-management framework. Follow-up searches resolved the most consequential ambiguities: current programme scale, the historical versus current status of SRISHTI/Drishti claims, NDWI’s competing definitions, satellite quality requirements, and the difference between rainfall adjustment and causal attribution.

Research stopped when each landing-page claim family had either primary support or an explicit limitation. Further general sources were unlikely to change the content direction. Sponsor-specific data access, current integration interfaces, labels, and operational policy remain field-discovery questions rather than web-research questions.
