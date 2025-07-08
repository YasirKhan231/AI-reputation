import type { PersonProfile } from "../types/profile"
import { mockProfiles } from "../data/profiles"

// Async function to simulate fetching profiles from backend
export async function fetchProfiles(): Promise<PersonProfile[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
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
    console.log(`Profile ${profileId} save status updated to: ${saved}`)
  } catch (error) {
    console.error("Error updating profile save status:", error)
    throw new Error("Failed to update profile save status")
  }
}
