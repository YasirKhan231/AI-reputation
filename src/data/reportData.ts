export interface ReportData {
  id: number
  name: string
  date: string
  status: "Completed" | "In Progress"
  risk: number
}

export const reportData: ReportData[] = [
  {
    id: 1,
    name: "UI UX Designer Hiring 2025 Q1",
    date: "Nov 20, 2025",
    status: "Completed",
    risk: 26,
  },
  {
    id: 2,
    name: "HR Hiring 2024 Q4",
    date: "Oct 20, 2025",
    status: "Completed",
    risk: 0,
  },
  {
    id: 3,
    name: "UGC Creators for Gucci AI",
    date: "Oct 20, 2025",
    status: "In Progress",
    risk: 5,
  },
  {
    id: 4,
    name: "TikTok Analysis",
    date: "Oct 20, 2025",
    status: "Completed",
    risk: 8,
  },
  {
    id: 5,
    name: "UGC Creators for Gucci AI",
    date: "Oct 20, 2025",
    status: "In Progress",
    risk: 0,
  },
  {
    id: 6,
    name: "TikTok Analysis",
    date: "Oct 20, 2025",
    status: "Completed",
    risk: 7,
  },
  {
    id: 7,
    name: "UGC Creators for Gucci AI",
    date: "Oct 20, 2025",
    status: "Completed",
    risk: 12,
  },
  {
    id: 8,
    name: "UI UX Designer Hiring 2025 Q1",
    date: "Oct 20, 2025",
    status: "Completed",
    risk: 3,
  },
  {
    id: 9,
    name: "Teacher analysis for MIT",
    date: "Oct 20, 2025",
    status: "Completed",
    risk: 0,
  },
  {
    id: 10,
    name: "UI UX Designer Hiring 2025 Q2",
    date: "Oct 20, 2025",
    status: "In Progress",
    risk: 0,
  },
  {
    id: 11,
    name: "Marketing Campaign Analysis",
    date: "Oct 15, 2025",
    status: "Completed",
    risk: 15,
  },
  {
    id: 12,
    name: "Social Media Audit 2025",
    date: "Oct 10, 2025",
    status: "In Progress",
    risk: 2,
  },
]
