
import { Machine } from './types';

export const MOCK_MACHINES: Machine[] = [
  {
    id: 'tractor-001',
    name: 'CAT D6T Bulldozer',
    type: 'Bulldozer',
    description: 'A powerful and reliable bulldozer suitable for large-scale earthmoving and construction projects in rough terrain.',
    location: 'Nairobi, Kenya',
    pricePerDay: 450,
    imageUrl: 'https://images.unsplash.com/photo-1583754029151-58763a232292?q=80&w=800&auto=format&fit=crop',
    specs: {
      power: '215 HP',
      capacity: '5.2 m³ blade',
      year: 2019,
    },
  },
  {
    id: 'excavator-002',
    name: 'Komatsu PC200 Excavator',
    type: 'Excavator',
    description: 'Versatile hydraulic excavator perfect for digging trenches, foundations, and material handling.',
    location: 'Lagos, Nigeria',
    pricePerDay: 380,
    imageUrl: 'https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=800',
    specs: {
      power: '155 HP',
      capacity: '0.8 m³ bucket',
      year: 2021,
    },
  },
  {
    id: 'crane-003',
    name: 'Liebherr LTM 1050 Mobile Crane',
    type: 'Crane',
    description: 'A mobile crane with excellent lifting capacity, ideal for urban construction sites and industrial projects.',
    location: 'Accra, Ghana',
    pricePerDay: 800,
    imageUrl: 'https://images.unsplash.com/photo-1621914902241-9512db200c48?q=80&w=800&auto=format&fit=crop',
    specs: {
      power: '367 HP',
      capacity: '50 tons',
      year: 2020,
    },
  },
  {
    id: 'grader-004',
    name: 'John Deere 670G Motor Grader',
    type: 'Grader',
    description: 'Precision motor grader for creating flat surfaces during road construction and maintenance. GPS-ready.',
    location: 'Cape Town, South Africa',
    pricePerDay: 550,
    imageUrl: 'https://images.unsplash.com/photo-1605833552862-559d81615f22?q=80&w=800&auto=format&fit=crop',
    specs: {
      power: '245 HP',
      capacity: '14 ft moldboard',
      year: 2022,
    },
  },
    {
    id: 'tractor-005',
    name: 'Massey Ferguson 4700',
    type: 'Farm Tractor',
    description: 'A small but sturdy tractor perfect for small to medium-sized farms. Ideal for plowing and tilling.',
    location: 'Nakuru, Kenya',
    pricePerDay: 150,
    imageUrl: 'https://images.unsplash.com/photo-1563514227721-6d2273183a00?q=80&w=800&auto=format&fit=crop',
    specs: {
      power: '100 HP',
      capacity: 'N/A',
      year: 2021,
    },
  },
  {
    id: 'loader-006',
    name: 'Volvo L120H Wheel Loader',
    type: 'Loader',
    description: 'High-performance wheel loader for quarries, aggregate yards, and forestry applications.',
    location: 'Johannesburg, South Africa',
    pricePerDay: 600,
    imageUrl: 'https://images.unsplash.com/photo-1599493356244-18a7a7a24ea4?q=80&w=800&auto=format&fit=crop',
    specs: {
      power: '272 HP',
      capacity: '4.2 m³ bucket',
      year: 2020,
    },
  },
];
