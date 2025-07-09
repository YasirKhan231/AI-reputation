export interface ConsentData {
  id: number
  title: string
  date: string
  profiles: number
  consented: number
  declined: number
  inProgress: number
}

export const consentData: ConsentData[] = [
  {
    id: 1,
    title: "UGC Creators for Quran AI",
    date: "10 June 2025",
    profiles: 450,
    consented: 320,
    declined: 20,
    inProgress: 45,
  },
  {
    id: 2,
    title: "HR Hiring 2024 Q4",
    date: "10 June 2025",
    profiles: 450,
    consented: 320,
    declined: 20,
    inProgress: 45,
  },
  {
    id: 3,
    title: "UI UX Designer hiring Q3",
    date: "10 June 2025",
    profiles: 450,
    consented: 320,
    declined: 20,
    inProgress: 45,
  },
  {
    id: 4,
    title: "Front-End devleoper hiring",
    date: "10 June 2025",
    profiles: 450,
    consented: 320,
    declined: 20,
    inProgress: 45,
  },
  {
    id: 5,
    title: "TikToker analysis",
    date: "10 June 2025",
    profiles: 450,
    consented: 320,
    declined: 20,
    inProgress: 45,
  },
  {
    id: 6,
    title: "Teacher analysis",
    date: "10 June 2025",
    profiles: 450,
    consented: 320,
    declined: 20,
    inProgress: 45,
  },
]
