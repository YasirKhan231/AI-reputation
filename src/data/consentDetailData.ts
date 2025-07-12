export interface ConsentDetailData {
  id: number
  name: string
  role: string
  uploadDate: string
  date: string
  riskLevel: "Low" | "Moderate" | "High"
  status: "Consented" | "Pending" | "Declined"
  responseDate: string | null
}

export const consentDetailData: ConsentDetailData[] = [
  {
    id: 1,
    name: "Baby Billah",
    role: "Software Engineer",
    uploadDate: "babybillah@gmail.com",
    date: "12 June 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "12 June 2025",
  },
  {
    id: 2,
    name: "Jhon Smith",
    role: "UI Designer",
    uploadDate: "jhonsmith@gmail.com",
    date: "10 June 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "10 June 2025",
  },
  {
    id: 3,
    name: "Juan Elle",
    role: "UX Designer",
    uploadDate: "juanelle45@gmail.com",
    date: "—",
    riskLevel: "Moderate",
    status: "Pending",
    responseDate: null,
  },
  {
    id: 4,
    name: "Andrew Gosling",
    role: "Product Manager",
    uploadDate: "goslingandrew@gmail.com",
    date: "15 May 2025",
    riskLevel: "High",
    status: "Declined",
    responseDate: "15 May 2025",
  },
  {
    id: 5,
    name: "Peter Tinkle",
    role: "React Developer",
    uploadDate: "petertinkle@gmail.com",
    date: "—",
    riskLevel: "Moderate",
    status: "Pending",
    responseDate: null,
  },
  {
    id: 6,
    name: "Judge Judy",
    role: "Software Engineer",
    uploadDate: "judgejudy@gmail.com",
    date: "12 May 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "12 May 2025",
  },
  {
    id: 7,
    name: "Elener Rugby",
    role: "UI Designer",
    uploadDate: "elenerugby@gmail.com",
    date: "8 May 2025",
    riskLevel: "High",
    status: "Declined",
    responseDate: "8 May 2025",
  },
  {
    id: 8,
    name: "Jhon Lemon",
    role: "UX Designer",
    uploadDate: "jhonlemon@gmail.com",
    date: "12 June 2025",
    riskLevel: "Low",
    status: "Consented",
    responseDate: "12 June 2025",
  },
  {
    id: 9,
    name: "Paul McCartney",
    role: "Product Manager",
    uploadDate: "paulmccartney@gmail.com",
    date: "15 May 2025",
    riskLevel: "High",
    status: "Declined",
    responseDate: "15 May 2025",
  },
  {
    id: 10,
    name: "Lambrelle Fogerty",
    role: "Info Hacker, Web coder",
    uploadDate: "lambrellefogarty@gmail.com",
    date: "—",
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
