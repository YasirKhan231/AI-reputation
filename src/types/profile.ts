export interface SocialMediaLinks {
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

export interface RelatedPerson {
  id: number
  name: string
  relationship: string
  profilePicture: string
}

export interface MediaItem {
  id: number
  type: "photo" | "video"
  url: string
  platform: "facebook" | "instagram" | "twitter" | "tiktok" | "youtube"
  thumbnail?: string
}

export interface SentimentData {
  date: string
  score: number
}

export interface PublicMention {
  id: number
  text: string
  type: "achievement" | "mention" | "feature"
  date: string
  source: string
}

export interface FlaggedContent {
  id: number
  text: string
  tags: string[]
  date: string
  source: string
  sourceUrl?: string
}

export interface PositiveMark {
  id: number
  type: "endorsement" | "clean_record" | "achievement" | "community"
  title: string
  description: string
  icon: string
}

export interface EducationProfession {
  id: number
  type: "education" | "profession"
  title: string
  organization: string
  startYear: number
  endYear?: number
  current?: boolean
}

export interface PersonProfile {
  id: number
  name: string
  nickname?: string
  location: string
  profession: string
  company: string
  previousCompany?: string
  email: string
  phone?: string
  profilePicture: string
  tags: string[]
  socialMedia: SocialMediaLinks
  saved: boolean

  // Extended profile data
  personalInfo: {
    age?: number
    height?: string
    gender?: string
    currentCity: string
  }

  relatedPeople: RelatedPerson[]
  photos: MediaItem[]
  videos: MediaItem[]

  publicSentiment: {
    score: number
    trend: SentimentData[]
    mentions: PublicMention[]
  }

  flaggedContents: FlaggedContent[]
  positiveMarks: PositiveMark[]
  educationProfession: EducationProfession[]
}
