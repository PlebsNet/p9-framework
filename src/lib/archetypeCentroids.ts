export type Dimension =
  | "Honesty-Humility"
  | "Emotionality"
  | "Extraversion"
  | "Agreeableness"
  | "Conscientiousness"
  | "Openness"
  | "Adaptability"
  | "Analytical"
  | "Pragmatic"
  | "Strategic"
  | "Intrinsic"
  | "Extrinsic"
  | "Values";

export interface Centroid {
  dimension: Dimension;
  [slug: string]: number | string;
}

// Percentile scores for each archetype (0–100)
export const archetypeCentroids: Record<string, Centroid[]> = {
  visionary: [
    { dimension: "Openness", visionary: 90 }, // High openness reflects creativity and openness to novelty (Costa & McCrae, 1992)
    { dimension: "Extraversion", visionary: 80 }, // High extraversion supports assertive idea sharing (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", visionary: 49.1 }, // Lower conscientiousness allows flexibility and risk-taking (Costa & McCrae, 1992)
    { dimension: "Agreeableness", visionary: 50 }, // Moderate agreeableness balances collaboration with independent vision (Costa & McCrae, 1992)
    { dimension: "Emotionality", visionary: 45 }, // Moderate-low emotionality aids resilience in ambiguity (Ashton & Lee, 2007)
    { dimension: "Adaptability", visionary: 75 }, // High adaptability enables adjustment to change (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", visionary: 60 }, // Moderately high humility supports ethical vision (Ashton & Lee, 2007)
    { dimension: "Analytical", visionary: 70 }, // Strong analytical thinking underpins strategic foresight (Kruglanski et al., 2018)
    { dimension: "Pragmatic", visionary: 40 }, // Lower pragmatism reflects focus on ideals over practicality (Costa & McCrae, 1992)
    { dimension: "Strategic", visionary: 85 }, // High strategic orientation enables long-term planning (Kruglanski et al., 2018)
    { dimension: "Intrinsic", visionary: 80 }, // High intrinsic motivation drives purpose and vision (Ryan & Deci, 2000)
    { dimension: "Extrinsic", visionary: 30 }, // Low extrinsic motivation; less driven by external rewards (Ryan & Deci, 2000)
    { dimension: "Values", visionary: 75 }, // Strong values orientation aligns with visionary ideals (Costa & McCrae, 1992)
  ],
  innovator: [
    { dimension: "Openness", innovator: 88 }, // High openness drives creativity and innovation (Costa & McCrae, 1992)
    { dimension: "Extraversion", innovator: 50 }, // Moderate extraversion supports collaboration but allows focus (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", innovator: 85 }, // High conscientiousness supports disciplined experimentation (Costa & McCrae, 1992)
    { dimension: "Agreeableness", innovator: 45 }, // Moderate-low agreeableness enables challenging the status quo (Costa & McCrae, 1992)
    { dimension: "Emotionality", innovator: 40 }, // Low emotionality aids risk-taking and resilience (Ashton & Lee, 2007)
    { dimension: "Adaptability", innovator: 70 }, // High adaptability enables pivoting and creative problem-solving (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", innovator: 55 }, // Moderate humility supports openness to input (Ashton & Lee, 2007)
    { dimension: "Analytical", innovator: 85 }, // High analytical ability enables idea evaluation (Kruglanski et al., 2018; Cacioppo et al., 1996)
    { dimension: "Pragmatic", innovator: 50 }, // Balanced pragmatism ensures ideas are actionable (Costa & McCrae, 1992)
    { dimension: "Strategic", innovator: 70 }, // Strategic thinking supports innovation implementation (Kruglanski et al., 2018)
    { dimension: "Intrinsic", innovator: 75 }, // High intrinsic motivation fuels creative drive (Ryan & Deci, 2000)
    { dimension: "Extrinsic", innovator: 40 }, // Lower extrinsic motivation; less focus on external rewards (Ryan & Deci, 2000)
    { dimension: "Values", innovator: 85 }, // Strong values orientation supports meaningful innovation (Costa & McCrae, 1992)
  ],
  commander: [
    { dimension: "Openness", commander: 55 }, // Moderate openness allows some flexibility, but not distractibility (Costa & McCrae, 1992)
    { dimension: "Extraversion", commander: 90 }, // High extraversion supports assertive leadership (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", commander: 92 }, // High conscientiousness drives goal focus and organization (Costa & McCrae, 1992)
    { dimension: "Agreeableness", commander: 35 }, // Low agreeableness allows for tough decision-making (Costa & McCrae, 1992)
    { dimension: "Emotionality", commander: 30 }, // Low emotionality supports stress-resilience (Ashton & Lee, 2007)
    { dimension: "Adaptability", commander: 60 }, // Moderate adaptability allows adjustment while maintaining direction (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", commander: 44.0 }, // Lower humility may facilitate assertive leadership (Ashton & Lee, 2007)
    { dimension: "Analytical", commander: 65 }, // Analytical ability aids in complex decision-making (Kruglanski et al., 2018)
    { dimension: "Pragmatic", commander: 80 }, // High pragmatism focuses on practical results (Costa & McCrae, 1992)
    { dimension: "Strategic", commander: 95 }, // Very high strategic thinking for vision and execution (Kruglanski et al., 2018)
    { dimension: "Intrinsic", commander: 30 }, // Lower intrinsic motivation; more driven by external goals (Ryan & Deci, 2000)
    { dimension: "Extrinsic", commander: 90 }, // High extrinsic motivation; seeks recognition and status (Ryan & Deci, 2000)
    { dimension: "Values", commander: 45 }, // Moderate values orientation; flexible for leadership priorities (Costa & McCrae, 1992)
  ],
  influencer: [
    { dimension: "Openness", influencer: 65 }, // Moderate-high openness supports creativity in communication (Costa & McCrae, 1992)
    { dimension: "Extraversion", influencer: 88 }, // High extraversion is essential for social engagement (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", influencer: 50 }, // Moderate conscientiousness balances organization with spontaneity (Costa & McCrae, 1992)
    { dimension: "Agreeableness", influencer: 90 }, // Very high agreeableness fosters likability and persuasion (Costa & McCrae, 1992)
    { dimension: "Emotionality", influencer: 80 }, // High emotionality aids empathy and emotional expression (Ashton & Lee, 2007)
    { dimension: "Adaptability", influencer: 85 }, // High adaptability enables responding to diverse audiences (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", influencer: 55 }, // Moderate humility supports authenticity (Ashton & Lee, 2007)
    { dimension: "Analytical", influencer: 40 }, // Lower analytical focus; more intuitive communication (Kruglanski et al., 2018)
    { dimension: "Pragmatic", influencer: 50 }, // Balanced pragmatism for practical messaging (Costa & McCrae, 1992)
    { dimension: "Strategic", influencer: 60 }, // Moderate strategic thinking for goal-oriented influence (Kruglanski et al., 2018)
    { dimension: "Intrinsic", influencer: 60 }, // Moderate intrinsic motivation; some internal drive (Ryan & Deci, 2000)
    { dimension: "Extrinsic", influencer: 85 }, // High extrinsic motivation; seeks social approval (Ryan & Deci, 2000)
    { dimension: "Values", influencer: 70 }, // Strong values orientation supports advocacy (Costa & McCrae, 1992)
  ],
  strategist: [
    { dimension: "Openness", strategist: 70 }, // High openness aids in envisioning possibilities (Costa & McCrae, 1992)
    { dimension: "Extraversion", strategist: 45 }, // Moderate extraversion; effective in both group and solo planning (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", strategist: 95 }, // Very high conscientiousness supports long-term planning (Costa & McCrae, 1992)
    { dimension: "Agreeableness", strategist: 50 }, // Moderate agreeableness; balances collaboration and critical analysis (Costa & McCrae, 1992)
    { dimension: "Emotionality", strategist: 40 }, // Low emotionality aids in rational decision-making (Ashton & Lee, 2007)
    { dimension: "Adaptability", strategist: 65 }, // High adaptability supports revising strategies as needed (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", strategist: 60 }, // Moderately high humility supports ethical planning (Ashton & Lee, 2007)
    { dimension: "Analytical", strategist: 95 }, // Very high analytical ability for complex problem solving (Kruglanski et al., 2018; Cacioppo et al., 1996)
    { dimension: "Pragmatic", strategist: 75 }, // High pragmatism ensures actionable strategies (Costa & McCrae, 1992)
    { dimension: "Strategic", strategist: 90 }, // High strategic orientation is essential (Kruglanski et al., 2018)
    { dimension: "Intrinsic", strategist: 55 }, // Moderate intrinsic motivation; some internal drive (Ryan & Deci, 2000)
    { dimension: "Extrinsic", strategist: 50 }, // Balanced extrinsic motivation (Ryan & Deci, 2000)
    { dimension: "Values", strategist: 80 }, // Strong values orientation ensures principled strategy (Costa & McCrae, 1992)
  ],
  investigator: [
    { dimension: "Openness", investigator: 92 }, // Very high openness supports intellectual curiosity (Costa & McCrae, 1992)
    { dimension: "Extraversion", investigator: 30 }, // Low extraversion allows for focused, independent work (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", investigator: 75 }, // High conscientiousness supports systematic inquiry (Costa & McCrae, 1992)
    { dimension: "Agreeableness", investigator: 70 }, // High agreeableness supports collaborative research (Costa & McCrae, 1992)
    { dimension: "Emotionality", investigator: 55 }, // Moderate emotionality enables both resilience and empathy (Ashton & Lee, 2007)
    { dimension: "Adaptability", investigator: 50 }, // Moderate adaptability allows for hypothesis revision (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", investigator: 70 }, // High humility supports objectivity and integrity (Ashton & Lee, 2007)
    { dimension: "Analytical", investigator: 90 }, // Very high analytical ability is core to investigation (Kruglanski et al., 2018; Cacioppo et al., 1996)
    { dimension: "Pragmatic", investigator: 45 }, // Moderate pragmatism; balances theory and application (Costa & McCrae, 1992)
    { dimension: "Strategic", investigator: 65 }, // Moderate-high strategic thinking for research planning (Kruglanski et al., 2018)
    { dimension: "Intrinsic", investigator: 65 }, // High intrinsic motivation; curiosity-driven (Ryan & Deci, 2000)
    { dimension: "Extrinsic", investigator: 40 }, // Lower extrinsic motivation (Ryan & Deci, 2000)
    { dimension: "Values", investigator: 85 }, // Strong values orientation for scientific integrity (Costa & McCrae, 1992)
  ],
  mediator: [
    { dimension: "Openness", mediator: 60 }, // Moderate-high openness aids in understanding perspectives (Costa & McCrae, 1992)
    { dimension: "Extraversion", mediator: 55 }, // Moderate extraversion supports group facilitation (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", mediator: 65 }, // Moderately high conscientiousness for reliability (Costa & McCrae, 1992)
    { dimension: "Agreeableness", mediator: 89.0 }, // Very high agreeableness is essential for mediation (Costa & McCrae, 1992)
    { dimension: "Emotionality", mediator: 83.6 }, // Very high emotionality fosters empathy (Ashton & Lee, 2007)
    { dimension: "Adaptability", mediator: 80 }, // High adaptability enables flexibility in conflict resolution (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", mediator: 81.0 }, // High humility supports fairness and trust (Ashton & Lee, 2007)
    { dimension: "Analytical", mediator: 50 }, // Moderate analytical ability for balanced judgment (Kruglanski et al., 2018)
    { dimension: "Pragmatic", mediator: 35 }, // Lower pragmatism; more values-driven (Costa & McCrae, 1992)
    { dimension: "Strategic", mediator: 55 }, // Moderate strategic thinking for optimal outcomes (Kruglanski et al., 2018)
    { dimension: "Intrinsic", mediator: 85 }, // High intrinsic motivation; driven by helping others (Ryan & Deci, 2000)
    { dimension: "Extrinsic", mediator: 45 }, // Moderate extrinsic motivation (Ryan & Deci, 2000)
    { dimension: "Values", mediator: 95 }, // Very strong values orientation (Costa & McCrae, 1992)
  ],
  guardian: [
    { dimension: "Openness", guardian: 45 }, // Lower openness; prefers tradition and stability (Costa & McCrae, 1992)
    { dimension: "Extraversion", guardian: 40 }, // Moderate-low extraversion; reliable but not attention-seeking (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", guardian: 98 }, // Extremely high conscientiousness for duty and reliability (Costa & McCrae, 1992)
    { dimension: "Agreeableness", guardian: 75 }, // High agreeableness for trustworthiness (Costa & McCrae, 1992)
    { dimension: "Emotionality", guardian: 50 }, // Moderate emotionality; balanced response to stress (Ashton & Lee, 2007)
    { dimension: "Adaptability", guardian: 55 }, // Moderate adaptability; able to adjust as needed (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", guardian: 75 }, // High humility for ethical guardianship (Ashton & Lee, 2007)
    { dimension: "Analytical", guardian: 70 }, // High analytical ability for problem-solving (Kruglanski et al., 2018)
    { dimension: "Pragmatic", guardian: 85 }, // Very high pragmatism for practical solutions (Costa & McCrae, 1992)
    { dimension: "Strategic", guardian: 50 }, // Moderate strategic thinking (Kruglanski et al., 2018)
    { dimension: "Intrinsic", guardian: 60 }, // Moderate intrinsic motivation; sense of duty (Ryan & Deci, 2000)
    { dimension: "Extrinsic", guardian: 35 }, // Lower extrinsic motivation (Ryan & Deci, 2000)
    { dimension: "Values", guardian: 80 }, // Strong values orientation for upholding standards (Costa & McCrae, 1992)
  ],
  integrator: [
    { dimension: "Openness", integrator: 65 }, // Moderate-high openness supports synthesis of ideas (Costa & McCrae, 1992)
    { dimension: "Extraversion", integrator: 65 }, // Moderately high extraversion enables team integration (Costa & McCrae, 1992)
    { dimension: "Conscientiousness", integrator: 65 }, // Moderately high conscientiousness for follow-through (Costa & McCrae, 1992)
    { dimension: "Agreeableness", integrator: 65 }, // Moderately high agreeableness for collaboration (Costa & McCrae, 1992)
    { dimension: "Emotionality", integrator: 65 }, // Moderate-high emotionality for empathy and understanding (Ashton & Lee, 2007)
    { dimension: "Adaptability", integrator: 95 }, // Very high adaptability for integration across contexts (Ashton & Lee, 2007)
    { dimension: "Honesty-Humility", integrator: 65 }, // Moderately high humility for openness to input (Ashton & Lee, 2007)
    { dimension: "Analytical", integrator: 65 }, // Moderately high analytical ability for integrating perspectives (Kruglanski et al., 2018)
    { dimension: "Pragmatic", integrator: 65 }, // Moderately high pragmatism for practical synthesis (Costa & McCrae, 1992)
    { dimension: "Strategic", integrator: 65 }, // Moderately high strategic thinking for coordinated action (Kruglanski et al., 2018)
    { dimension: "Intrinsic", integrator: 65 }, // Moderate-high intrinsic motivation (Ryan & Deci, 2000)
    { dimension: "Extrinsic", integrator: 65 }, // Moderate-high extrinsic motivation (Ryan & Deci, 2000)
    { dimension: "Values", integrator: 65 }, // Moderately strong values orientation (Costa & McCrae, 1992)
  ],
};
