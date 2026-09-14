
Full Summary — BHU-DRISHTI | Smart India Hackathon 2026
1. What the project is about

BHU-DRISHTI is a watershed monitoring and decision-support system designed for the Smart India Hackathon 2026 problem statement:

SIH26015 — Application of Geospatial Techniques for visualization and analysis to interpret Geo-Coded Images to enhance Watershed Development Outcomes.

Theme: Agriculture, FoodTech & Rural Development
Category: Software
Team: Lethals

The central idea is simple:

Drishti captures what is happening on the ground. Srishti/Bhuvan shows where it is happening. BHU-DRISHTI explains what it means and what officials should do next.

The project does not attempt to replace the government's existing applications. Instead, it adds an AI + GIS interpretation layer on top of the data already being collected.

2. The existing system

The government already has an ecosystem for monitoring watershed-development projects.

Drishti

NRSC's Drishti application is used for collecting geo-tagged field photographs.

A field worker can visit a watershed structure such as a:

check dam
farm pond
water-harvesting structure
drainage intervention
soil/water conservation structure

and capture a photograph along with its geographical location.

So Drishti tells us:

"A structure exists at this location, and this is what it currently looks like."

Srishti / Bhuvan

Those observations can then be visualized through Srishti/Bhuvan, ISRO's geospatial platform.

This allows officials to see things like:

where structures are located
geo-tagged photographs
watershed areas
satellite imagery
GIS layers

So the existing system is already very good at answering:

WHERE is the project?
and
WHAT evidence was collected?

But there is still a major problem.

3. The problem BHU-DRISHTI is solving

A photograph by itself is evidence, but it is not necessarily analysis.

For example, suppose an officer sees this:

"Here is a geo-tagged photograph of a check dam."

The officer still has to determine:

Is the structure functioning properly?
Is there water around it?
Has it become silted?
Is there visible damage?
Has vegetation actually improved?
Has the intervention improved watershed conditions?
Does this site need immediate inspection?
Which sites should officials inspect first?

When the programme contains 1,220 projects and approximately 1.24 lakh water-harvesting structures, manually analysing everything becomes unrealistic.

That creates the main gap BHU-DRISHTI tries to fill:

Existing system

Photo → Location → Display

Proposed system

Photo + GIS + Satellite + Environmental data → Interpretation → Priority → Action

4. The BHU-DRISHTI solution

BHU-DRISHTI combines two broad technologies:

1. Computer Vision

AI examines the Drishti field photograph.

2. Geospatial Evidence Fusion

The information extracted from the photograph is combined with environmental and satellite data around the same location.

Instead of treating every photograph as an isolated piece of evidence, the system tries to build a complete picture of the watershed condition.

5. Computer Vision component

The AI first "reads" the photograph uploaded through Drishti.

It can potentially identify visible features such as:

presence of the water-harvesting structure
water availability
surrounding vegetation
cracks
erosion
siltation
other visible structural deterioration

The model also produces a confidence score.

This is important because the team does not propose blindly trusting AI.

If the AI is uncertain, the system can say:

Human inspection required.

rather than pretending that the AI diagnosis is correct.

This makes the proposed system a decision-support system, rather than a fully automated replacement for field engineers.

6. Why the photograph alone is not enough

One of the strongest ideas in the presentation is that computer vision alone should not determine watershed health.

Imagine an image showing a water-harvesting structure with some vegetation around it.

From the photograph alone, you cannot reliably know:

whether the region recently received unusually heavy rainfall
whether vegetation has genuinely improved over several months
whether surrounding soil is suitable
whether drainage conditions are good
whether groundwater/water retention has improved
whether vegetation changes came from the watershed project or simply the monsoon

Therefore BHU-DRISHTI combines image analysis with other evidence.

This is called Evidence Fusion in the presentation.

7. Evidence Fusion

The system combines information from several sources.

Field evidence

From Drishti:

geo-tagged image
visible structure
water
vegetation
visible damage
GIS information

Such as:

slope
drainage
soil characteristics
geographical location
Environmental information

Such as:

rainfall
Remote-sensing information

Satellite-derived indicators such as:

NDVI
NDWI

All these sources are combined to create a more reliable diagnosis.

8. NDVI explained

NDVI = Normalized Difference Vegetation Index

It is derived from satellite imagery and is commonly used to estimate the amount and health of vegetation.

In simple terms:

Higher NDVI

Usually suggests:

more vegetation
healthier plant growth
potentially improved green cover
Lower NDVI

Can suggest:

sparse vegetation
bare land
stressed vegetation

BHU-DRISHTI could compare NDVI values before and after a watershed intervention.

That gives officials evidence of whether vegetation around the watershed may have improved.

9. NDWI explained

NDWI = Normalized Difference Water Index

It is a satellite-derived measure that can help identify water or changes in surface moisture/water presence.

BHU-DRISHTI can therefore look at whether water conditions around a project appear to have changed.

Together:

NDVI → vegetation information

NDWI → water/moisture information

10. Complete technical workflow

The presentation essentially proposes a five-stage process.

Step 1 — Read the Drishti photograph

Computer Vision analyses the image.

It identifies things such as:

structure
water
vegetation
cracks
siltation
visible deterioration

and gives confidence scores.

Step 2 — Add geospatial context

Using the GPS coordinates from the image, the system retrieves nearby:

slope
soil
drainage
rainfall
satellite data

Now the image is no longer being analysed in isolation.

Step 3 — Calculate watershed health / condition

The different pieces of evidence are combined.

The system generates some form of:

Watershed Health / Condition Score

and importantly explains why that score was assigned.

For example, conceptually:

Good vegetation improvement + increased water presence + no visible structural damage = healthy site.

Or:

Visible siltation + reduced water retention + poor vegetation recovery = potential problem.

The presentation does not yet specify the exact mathematical scoring formula, so that would likely need to be designed during implementation.

11. Explainable AI is important

A useful feature implied by the design is that officials should not simply receive something like:

Score: 42/100

Instead, they should receive the reasoning behind it.

For example:

Priority: High

Possible reasons:

visible siltation detected
low water presence
declining NDWI
limited vegetation improvement
uncertain structural condition

This is important for government use because officials need to understand why a site was flagged.

12. Step 4 — Prioritisation

This is probably the most practically valuable part of the system.

There are approximately 1.24 lakh structures.

It isn't realistic for officials to manually inspect every structure equally.

BHU-DRISHTI therefore ranks sites.

For example:

High Priority
→ immediate field inspection

Medium Priority
→ monitor / review

Low Priority
→ appears healthy

Instead of telling officials:

"Here are 124,000 structures."

the system tells them:

"These 250 structures appear most likely to require attention. Start with these."

13. Step 5 — Before-and-after impact analysis

The system can also compare conditions before and after an intervention.

For example:

Before construction
low vegetation
poor water retention
low NDVI
limited surface water
After construction
increased vegetation
more water
increased NDVI
increased NDWI

This gives officials a way of evaluating whether the watershed intervention may actually have produced measurable environmental improvement.

14. An important distinction — rainfall vs actual impact

One of the presentation's strongest technical observations is that:

Satellite improvement does not automatically mean the watershed project worked.

Suppose satellite imagery suddenly shows much more greenery.

It could be because:

Possibility 1

The watershed intervention genuinely improved water retention and vegetation.

Possibility 2

There happened to be an unusually good monsoon.

So BHU-DRISHTI does not simply look at satellite change.

It compares:

Satellite change + rainfall + field evidence

This reduces the chance of incorrectly claiming that a project caused an improvement.

15. Final dashboard

All the information would ultimately be brought together into one decision-support dashboard.

The dashboard could show:

watershed locations
Drishti images
AI observations
watershed health
NDVI
NDWI
rainfall
GIS information
before/after changes
AI confidence
flagged abnormalities
priority ranking
recommended field inspections

So rather than forcing officials to manually compare multiple systems and datasets, the dashboard provides a consolidated view.

16. Core innovation

The project isn't claiming that the government lacks data.

In fact, the opposite is the argument.

India already has:

Drishti → field evidence

Srishti/Bhuvan → geospatial visualization

Satellite imagery → remote sensing evidence

GIS layers → terrain/environment information

The missing layer is:

Interpretation

BHU-DRISHTI therefore essentially turns existing government data into actionable intelligence.

17. Feasibility

The presentation argues that the project is highly feasible precisely because it does not require rebuilding the existing monitoring system.

Field workers already use Drishti.

Officials already have Bhuvan/Srishti.

So the proposal is:

Don't ask workers to collect an entirely new type of data. Use the evidence they're already collecting and analyse it better.

That greatly lowers the operational burden.

18. Major technical risks

The team also acknowledges several limitations.

Risk 1 — Images cannot reveal everything

A photograph may show:

cracks
erosion
siltation
visible damage

But it cannot reliably reveal the internal structural condition of something like a check dam.

Therefore the AI must not claim:

"The structure is definitely structurally safe."

based solely on an image.

Solution

Use computer vision only for things that images can reliably show.

For uncertain cases:

flag for human inspection.

19. Risk 2 — Satellite data can be misleading

An improvement in NDVI or NDWI might be caused by:

rainfall
seasonal differences
agricultural cycles
natural environmental changes

rather than the watershed intervention itself.

Solution

Cross-check satellite observations against:

field photographs
rainfall
historical conditions
other GIS evidence

before calling something a project impact.

20. Risk 3 — Poor connectivity

Many watershed projects exist in rural or remote areas where internet connectivity may be unreliable.

Proposed solution

Support:

offline data storage → later synchronization

A worker can therefore capture evidence without needing a continuous network connection.

21. Risk 4 — Integration

The new system would need to integrate cleanly with the existing:

WDC-PMKSY MIS

and government systems.

Instead of immediately attempting nationwide deployment, the presentation proposes:

Start with one district → validate the system → scale gradually.

That makes deployment significantly more realistic.

22. Who benefits?

The system provides different benefits at different administrative levels.

Central government officials

They get:

a comparable national view
performance information across regions
large-scale watershed-health analysis
identification of problematic districts/projects
District officials

They get something even more practical:

A ranked to-do list.

Instead of manually examining thousands of records, they can see:

Visit this site first.
Inspect this site next.
These sites appear healthy.
These sites have uncertain evidence.
Field staff

They receive useful feedback from the data they collect.

Instead of their task ending at:

"Upload another photograph."

the photo becomes part of an analysis that can actually influence decisions.

23. The key conceptual improvement

The presentation describes the change extremely well through four questions.

Existing systems largely answer:

WHERE?

Where is the structure?

WHAT?

What photograph/data was captured?

BHU-DRISHTI adds:

WHY?

Why does this location appear healthy or problematic?

WHAT NEXT?

What should the government do about it?

That is the main value proposition of the entire project.

24. PLAN → MONITOR → EVALUATE

The project's overall goal can also be understood through three stages.

PLAN

Use geospatial evidence to decide:

Where should the next watershed intervention be implemented?

MONITOR

After implementation:

Use Drishti images, satellite information and GIS evidence to continuously assess the location.

EVALUATE

Finally determine:

Did the project actually improve water, soil and vegetation conditions?

This shifts evaluation away from simply counting the number of structures constructed.

25. Why this matters for government programmes

Traditional programme reporting can become focused on outputs such as:

"10,000 water-harvesting structures constructed."

But building a structure is not the same as achieving the desired outcome.

The real questions are:

Did water retention improve?
Did vegetation improve?
Was soil degradation reduced?
Is the structure still functioning?
Which interventions worked?
Which interventions failed?

BHU-DRISHTI attempts to move monitoring from:

Output measurement

toward:

Outcome measurement.

26. Research foundation

The project says it is based primarily on the Ministry's existing ecosystem rather than requiring a completely new data infrastructure.

The research mentioned in the presentation includes:

WDC-PMKSY 2.0 Guidelines

Including the use of:

GPS tagging
GIS mapping
satellite monitoring
NRSC/ISRO Drishti

For field-data collection.

Srishti / Bhuvan

For geospatial visualization.

Official programme figures

Approximately:

1,220 projects
1.24 lakh water-harvesting structures
Remote-sensing research

Including:

NDVI
NDWI
Computer-vision research

Especially image-based inspection of structures and its limitations.

The presentation deliberately acknowledges that image analysis cannot reliably determine every aspect of internal structural health.

27. A simple example of the whole system

Imagine there are 10,000 check dams within a region.

One particular structure has a Drishti photograph.

Computer Vision sees:
significant siltation
relatively little visible water
limited vegetation
possible surface damage

The GPS location is then used to retrieve environmental information.

GIS says:
important drainage location
relevant terrain conditions
Satellite analysis says:
NDVI has barely improved
NDWI has fallen compared with previous observations
Rainfall data says:
rainfall was actually normal/good

The system may therefore conclude:

High-priority site — field inspection recommended.

And explain:

Visible siltation, limited water presence and weak satellite vegetation/water improvement despite adequate rainfall.

An officer now knows where to go and why.

That is BHU-DRISHTI's practical value.

28. What BHU-DRISHTI is NOT

This distinction will be useful if judges question the project.

It is not simply:

another geo-tagging app
another satellite map
an AI image classifier
a replacement for Drishti
a replacement for Bhuvan
a system that blindly allows AI to make engineering decisions

It is:

an intelligent evidence-fusion and prioritisation layer built on top of the government's existing watershed-monitoring ecosystem.

29. Strongest selling points of the idea

The strongest aspects of the project are:

It uses existing government data instead of demanding an entirely new collection process.
It combines ground truth + computer vision + GIS + satellite data.
It solves a genuine scale problem created by 1.24 lakh structures.
It focuses on prioritisation, not just detection.
It recognises AI uncertainty and keeps humans in the loop.
It distinguishes seasonal/monsoon changes from actual project impact.
It moves government monitoring from "structures built" to "outcomes achieved."
It can begin as a district-level pilot before nationwide scaling. 30. The entire project in one sentence

BHU-DRISHTI uses AI to interpret geo-tagged Drishti field images, combines those observations with GIS, rainfall and satellite indicators such as NDVI/NDWI, assesses watershed condition, and ranks locations so government officials know which structures need attention and whether watershed interventions are actually producing measurable outcomes.

31. The easiest way to remember the project

Remember this chain:

DRISHTI
↓
Geo-tagged field photo
↓
COMPUTER VISION
What can we see?
↓
GIS + RAINFALL + SATELLITE
What is happening around it?
↓
EVIDENCE FUSION
What does everything together mean?
↓
HEALTH / IMPACT ASSESSMENT
Is the watershed intervention working?
↓
PRIORITY RANKING
Which sites require attention?
↓
DASHBOARD
Why + What Next

And the shortest pitch to remember is:

"Drishti captures the ground, Srishti visualizes it, and BHU-DRISHTI interprets it."

That is essentially the entire presentation distilled into one idea.

Yesterday 6:46 PM
Is this a missle layer
Middle layer

Yes — BHU-DRISHTI is basically a middle layer.

It sits between the existing government data systems and the officials who need to make decisions.

Think of it like this:

Drishti / Bhuvan / Satellite / GIS data
→ BHU-DRISHTI middle intelligence layer
→ Dashboard / alerts / priority list / recommendations

So BHU-DRISHTI does not replace Drishti or Bhuvan. It takes their raw data, analyzes and combines it, then converts it into something actionable.

A very clean way to explain it to judges is:

“BHU-DRISHTI is an AI-powered middleware layer over the existing watershed monitoring ecosystem. It converts raw geotagged images and geospatial data into health assessments, impact analysis, and prioritized actions for officials.”

Technically, “middleware” or “intelligence layer” is more accurate than just saying “middle layer.”
