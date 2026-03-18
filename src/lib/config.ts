export const siteConfig = {
  name: "Rasoi Royal",
  tagline: "Fine Indian Cuisine",
  description: "Edmonton's most celebrated Indian dining experience. Authentic royal recipes, finest ingredients, and an ambiance that transports you to the palaces of Rajasthan.",
  url: "https://rasoiroyal.ca",
  restaurant: {
    address: "10123 Jasper Ave NW, Edmonton, AB T5J 1W8",
    phone: "+1 (780) 555-0142",
    email: "reservations@rasoiroyal.ca",
    hours: {
      "Mon–Thu": "11:30 AM – 10:00 PM",
      "Fri–Sat":  "11:30 AM – 11:00 PM",
      "Sunday":   "12:00 PM – 9:30 PM",
    },
    instagram: "https://instagram.com/rasoiroyal",
    opentable: "#",
  },
  og: {
    image: "/og-image.jpg",
    imageAlt: "Rasoi Royal — Fine Indian Cuisine Edmonton",
    twitterCard: "summary_large_image" as const,
    twitterHandle: "@rasoiroyal",
  },
};
