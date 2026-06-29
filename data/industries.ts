export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const industries: Industry[] = [
  {
    id: "doctors",
    name: "Doctors & Dentists",
    icon: "Stethoscope",
    description: "Rank when patients search for doctors near them",
  },
  {
    id: "clinics",
    name: "Clinics & Hospitals",
    icon: "Building2",
    description: "Dominate local health searches in your area",
  },
  {
    id: "salons",
    name: "Salons & Spas",
    icon: "Scissors",
    description: "Get booked by customers searching nearby",
  },
  {
    id: "restaurants",
    name: "Cafes & Restaurants",
    icon: "UtensilsCrossed",
    description: "Win the dinner and lunch search every day",
  },
  {
    id: "retail",
    name: "Retail Shops",
    icon: "ShoppingBag",
    description: "Drive foot traffic from local Google searches",
  },
  {
    id: "coaching",
    name: "Coaching Centers",
    icon: "BookOpen",
    description: "Reach students and parents searching locally",
  },
  {
    id: "realestate",
    name: "Real Estate Consultants",
    icon: "Home",
    description: "Appear when buyers search agents in your city",
  },
  {
    id: "services",
    name: "Local Service Businesses",
    icon: "Wrench",
    description: "Plumbers, electricians, and more — rank #1 locally",
  },
];
