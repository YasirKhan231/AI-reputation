import type { PersonProfile } from "@/types/profile"

export const mockProfiles: PersonProfile[] = [
  {
    id: 1,
    name: "Alex Johnson",
    location: "Austin, TX",
    profession: "Software Engineer",
    company: "Google",
    previousCompany: "Apple",
    email: "alex.johnson@gmail.com",
    profilePicture: "/profiles/profile1.jpg",
    tags: ["Philosophy", "Technology", "Design"],
    socialMedia: {
      facebook: "https://facebook.com/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      instagram: "https://instagram.com/alexjohnson",
    },
    saved: true,
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    location: "San Francisco, CA",
    profession: "Product Manager",
    company: "Meta",
    email: "maria.rodriguez@meta.com",
    profilePicture: "/profiles/profile2.jpg",
    tags: ["Gaming", "Engineering", "Development"],
    socialMedia: {
      twitter: "https://twitter.com/mariarodriguez",
      linkedin: "https://linkedin.com/in/mariarodriguez",
      instagram: "https://instagram.com/mariarodriguez",
    },
    saved: true,
  },
  {
    id: 3,
    name: "David Chen",
    location: "Seattle, WA",
    profession: "Data Scientist",
    company: "Microsoft",
    email: "david.chen@microsoft.com",
    profilePicture: "/profiles/profile3.jpg",
    tags: ["Machine Learning", "Analytics", "Research"],
    socialMedia: {
      twitter: "https://twitter.com/davidchen",
      linkedin: "https://linkedin.com/in/davidchen",
      instagram: "https://instagram.com/davidchen",
    },
    saved: true,
  },
  {
    id: 4,
    name: "Sarah Williams",
    location: "New York, NY",
    profession: "UX Designer",
    company: "Airbnb",
    email: "sarah.williams@airbnb.com",
    profilePicture: "/profiles/profile4.jpg",
    tags: ["Design", "User Experience", "Creative"],
    socialMedia: {
      twitter: "https://twitter.com/sarahwilliams",
      linkedin: "https://linkedin.com/in/sarahwilliams",
      instagram: "https://instagram.com/sarahwilliams",
    },
    saved: true,
  },
  {
    id: 5,
    name: "Michael Brown",
    location: "Boston, MA",
    profession: "DevOps Engineer",
    company: "Amazon",
    email: "michael.brown@amazon.com",
    profilePicture: "/profiles/profile5.jpg",
    tags: ["Cloud Computing", "Infrastructure", "Automation"],
    socialMedia: {
      twitter: "https://twitter.com/michaelbrown",
      linkedin: "https://linkedin.com/in/michaelbrown",
      instagram: "https://instagram.com/michaelbrown",
    },
    saved: true,
  },
]

// Async function to simulate fetching profiles from backend
export async function fetchProfiles(): Promise<PersonProfile[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be an actual API call
    // const response = await fetch('/api/profiles')
    // const profiles = await response.json()

    return mockProfiles
  } catch (error) {
    console.error("Error fetching profiles:", error)
    throw new Error("Failed to fetch profiles")
  }
}

// Async function to update profile save status
export async function updateProfileSaveStatus(profileId: number, saved: boolean): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // In a real app, this would be an actual API call
    // await fetch(`/api/profiles/${profileId}/save`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ saved })
    // })

    console.log(`Profile ${profileId} save status updated to: ${saved}`)
  } catch (error) {
    console.error("Error updating profile save status:", error)
    throw new Error("Failed to update profile save status")
  }
}
