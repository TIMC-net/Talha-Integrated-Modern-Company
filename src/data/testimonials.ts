export type Testimonial = {
  id: string;
  clientName: string;
  company: string;
  testimonialText: string;
  rating: number;
  service: string;
};

// Dummy placeholder testimonials — swap for real client quotes later.
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "John Smith",
    company: "ABC Infrastructure",
    testimonialText:
      "TIMC delivered exceptional results on our highway project. Their contractor expertise and integrated solutions made a real difference.",
    rating: 5,
    service: "Civil Infrastructure",
  },
  {
    id: "testimonial-2",
    clientName: "Sarah Al-Amri",
    company: "Gulf Energy Holdings",
    testimonialText:
      "From planning to commissioning, TIMC's energy infrastructure team was precise, responsive, and easy to work with throughout.",
    rating: 5,
    service: "Energy Infrastructure",
  },
  {
    id: "testimonial-3",
    clientName: "Michael Chen",
    company: "Continental Builders",
    testimonialText:
      "Their foundation engineering work on our tower project was flawless — thorough geotechnical analysis and zero delays.",
    rating: 5,
    service: "Foundation Engineering",
  },
  {
    id: "testimonial-4",
    clientName: "Fatima Al-Sayed",
    company: "Horizon Development Group",
    testimonialText:
      "TIMC's integrated equipment support kept three concurrent sites running without a single scheduling conflict.",
    rating: 5,
    service: "Equipment Rental",
  },
  {
    id: "testimonial-5",
    clientName: "David Okafor",
    company: "Regional Transport Authority",
    testimonialText:
      "A genuine contractor partner, not just a vendor. TIMC understood our timeline pressures and delivered ahead of schedule.",
    rating: 5,
    service: "Civil Infrastructure",
  },
];
