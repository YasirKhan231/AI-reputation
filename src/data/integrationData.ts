export interface Integration {
  id: string
  name: string
  icon: string
  status?: "connected" | "key_provided"
  connectedCount?: number
  category: "your" | "add"
}

export const integrationsData: Integration[] = [
  // Your Integrations
  {
    id: "facebook",
    name: "Facebook",
    icon: "/b2b/integration/facebook.svg",
    status: "connected",
    connectedCount: 1,
    category: "your",
  },
  {
    id: "google",
    name: "Google AI Studio api key",
    icon: "/b2b/integration/google.svg",
    status: "key_provided",
    category: "your",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "/b2b/integration/instagram.svg",
    status: "connected",
    connectedCount: 1,
    category: "your",
  },
  {
    id: "x",
    name: "X",
    icon: "/b2b/integration/x.svg",
    status: "key_provided",
    category: "your",
  },
  // Add Integrations
  {
    id: "linkedin",
    name: "Linkedin",
    icon: "/b2b/integration/linkedin.svg",
    category: "add",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "/b2b/integration/snapchat.svg",
    category: "add",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "/b2b/integration/tiktok.svg",
    category: "add",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "/b2b/integration/youtube.svg",
    category: "add",
  },
  {
    id: "tinder",
    name: "Tinder",
    icon: "/b2b/integration/tinder.svg",
    category: "add",
  },
  {
    id: "hinge",
    name: "Hinge",
    icon: "/b2b/integration/hinge.svg",
    category: "add",
  },
]
