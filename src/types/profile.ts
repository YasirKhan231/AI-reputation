export interface SocialMediaLinks {
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

export interface PersonProfile {
  id: number
  name: string
  location: string
  profession: string
  company: string
  previousCompany?: string
  email: string
  profilePicture: string
  tags: string[]
  socialMedia: SocialMediaLinks
  saved: boolean
}
