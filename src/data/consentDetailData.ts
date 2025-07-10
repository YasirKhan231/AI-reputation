export interface ConsentDetailData {
  id: number
  name: string
  role: string
  email: string
  uploadDate: string
  riskLevel: "Low" | "Moderate" | "High"
  status: "Consented" | "Pending" | "Declined"
  responseDate: string | null
}

export const consentDetailData: ConsentDetailData[] = [
  {
    id: 1,
    name: "Baby Billah",
    role: "Software Engineer",
    email: "babybillah@gmail.com",
    uploadDate: "12 June 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "12 June 2025",
  },
  {
    id: 2,
    name: "Jhon Smith",
    role: "UI Designer",
    email: "jhonsmith@gmail.com",
    uploadDate: "10 June 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "10 June 2025",
  },
  {
    id: 3,
    name: "Juan Elle",
    role: "UX Designer",
    email: "juanelle45@gmail.com",
    uploadDate: "—",
    riskLevel: "Moderate",
    status: "Pending",
    responseDate: null,
  },
  {
    id: 4,
    name: "Andrew Gosling",
    role: "Product Manager",
    email: "goslingandrew@gmail.com",
    uploadDate: "15 May 2025",
    riskLevel: "High",
    status: "Declined",
    responseDate: "15 May 2025",
  },
  {
    id: 5,
    name: "Peter Tinkle",
    role: "React Developer",
    email: "petertinkle@gmail.com",
    uploadDate: "—",
    riskLevel: "Moderate",
    status: "Pending",
    responseDate: null,
  },
  {
    id: 6,
    name: "Judge Judy",
    role: "Software Engineer",
    email: "judgejudy@gmail.com",
    uploadDate: "12 May 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "12 May 2025",
  },
  {
    id: 7,
    name: "Elener Rugby",
    role: "UI Designer",
    email: "elenerugby@gmail.com",
    uploadDate: "8 May 2025",
    riskLevel: "High",
    status: "Declined",
    responseDate: "8 May 2025",
  },
  {
    id: 8,
    name: "Jhon Lemon",
    role: "UX Designer",
    email: "jhonlemon@gmail.com",
    uploadDate: "12 June 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "12 June 2025",
  },
  {
    id: 9,
    name: "Paul McCartney",
    role: "Product Manager",
    email: "paulmccartney@gmail.com",
    uploadDate: "15 May 2025",
    riskLevel: "High",
    status: "Declined",
    responseDate: "15 May 2025",
  },
  {
    id: 10,
    name: "Lambrelle Fogerty",
    role: "Info Hacker, Web coder",
    email: "lambrellefogarty@gmail.com",
    uploadDate: "—",
    riskLevel: "Moderate",
    status: "Pending",
    responseDate: null,
  },
]

export const getConsentStats = () => {
  const total = consentDetailData.length
  const consented = consentDetailData.filter((item) => item.status === "Consented").length
  const pending = consentDetailData.filter((item) => item.status === "Pending").length
  const declined = consentDetailData.filter((item) => item.status === "Declined").length

  return {
    totalProfiles: 520,
    consented: 6890,
    pending: 45,
    declined: 3,
    // For filter counts
    all: total,
    consentedCount: consented,
    pendingCount: pending,
    declinedCount: declined,
  }
}
