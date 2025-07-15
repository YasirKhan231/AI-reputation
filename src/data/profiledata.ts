export const profileData = {
  user: {
    name: "Robinson Crusoe",
    title: "Ex Software Engineer at Google | Previously at Apple",
    email: "robinsoncrusoe@gmail.com",
    status: "Low Risk",
    downloadPDF: true,
    profileImage: "/path/to/image.jpg",
    socialLinks: ["Twitter", "LinkedIn",  "Facebook", "Instagram"],
  },
  scores: {
    professionalLife: { score: 85, percentage: 85 },
    publicSentiment: { score: 79, percentage: 79 },
    socialRiskProfile: { score: 45, percentage: 45 },
    identityConsistency: { score: 76, percentage: 76 },
    onlineExposure: { score: 8, percentage: 8 },
    personalAuthenticity: { score: 53, percentage: 53 },
  },
  discAssessment: {
    dominance: 10,
    influence: 18,
    steadiness: 22,
    conscientiousness: 50,
    matchStrength: 87,
    strengths: "Reliable, calm under pressure, process-oriented",
    watchouts: "May avoid conflict or fast decision-making",
  },
  flaggedContent: [
    {
      text: 'Diversity hires are just companies trying to look good. We shouldn’t have to lower standards to meet some quota',
      labels: ["Bias", "Untrustworthy"],
      date: "Sep 5, 2023",
      source: "Twitter",
    },
    {
      text: '"The climate crisis is mostly a scam."',
      labels: ["Misinformation", "Conspiracy"],
      date: "Jul 1, 2022",
      source: "Facebook",
    },
    {
      text: "If you can’t handle pressure, you don’t belong in a startup. AggressiveToxic leadership tone",
      labels: ["Aggressive", "Toxic leadership tone"],
      date: "20 Jan 2025",
      source: "Facebook",
    },
  ],
  positiveTraits: ["Endorsement", "Clean Record", "Achievemnt", "Community"],
  positiveMentions: [
    "Endorsements as 'Supporter of new hires' by leadership",
    "Clean Record: No history of harmful or unethical behavior",
    "Community Involvement",
    "This is the community oriented ",
  ],
  educationAndProfession: [
    {
      title: "Product Designer at Orville",
      years: "2020 - CURRENT",
    },
    {
      title: "Graduated from MIT",
      years: "2018 - 2020",
    },
    {
      title: "Graphic Designer at DDC",
      years: "2019 - 2020",
    },
    {
      title: "Graphic Designer at DDC",
      years: "2018 - 2019",
    },
    {
      title: "Graphic Designer at DDC",
      years: "2016 - 2018",
    },
  ],
  analyticSummary: {
    personalityTraits: ["Analytical", "Assertive", "Confident"],
    politicalLean: "Libertarian-left",
    networkCluster: "Connected to VCs, tech leads",
  },
  assessmentDescriptions: {
    professionalLife: "Evaluates professional conduct, work history, and career progression patterns.",
    publicSentiment: "Analyzes public opinion and sentiment towards the individual across various platforms.",
    socialRiskProfile:
      "Measures how risky someone's online presence might be. We flag things like toxic language, extreme opinions, or inappropriate content. Higher score = safer, lower score = more red flags.",
    identityConsistency:
      "Analyzes how consistent a person's online presence is across different platforms and over time.",
    onlineExposure: "Measures the extent of someone's digital footprint and potential privacy risks.",
    personalAuthenticity: "Evaluates how genuine and authentic a person appears to be online.",
  },
}
