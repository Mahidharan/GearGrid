const products = [
  {
    name: "Bosch Ceramic Brake Pads",
    description:
      "High-performance ceramic brake pads designed for superior stopping power.",
    image:
      "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Brakes",
    brand: "Bosch",
    retailPrice: 95.99,
    mechanicPrice: 65.99,
    stock: 120,
    compatibility: ["Toyota", "Honda", "Hyundai", "Ford"],
  },
  {
    name: "Brembo Brake Rotors",
    description:
      "Premium ventilated brake rotors engineered for high heat resistance.",
    image:
      "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Brakes",
    brand: "Brembo",
    retailPrice: 189.99,
    mechanicPrice: 139.99,
    stock: 60,
    compatibility: ["BMW", "Audi", "Mercedes"],
  },
  {
    name: "Castrol 5W-30 Engine Oil (4L)",
    description: "Fully synthetic engine oil for maximum engine protection.",
    image:
      "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Engine",
    brand: "Castrol",
    retailPrice: 49.99,
    mechanicPrice: 34.99,
    stock: 150,
    compatibility: ["Toyota", "Honda", "Hyundai"],
  },
  {
    name: "NGK Iridium Spark Plug Set",
    description:
      "Premium spark plugs for enhanced ignition and fuel efficiency.",
    image:
      "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Engine",
    brand: "NGK",
    retailPrice: 42.99,
    mechanicPrice: 29.99,
    stock: 110,
    compatibility: ["Honda", "Toyota", "Suzuki"],
  },
  {
    name: "Denso Air Filter",
    description:
      "High-efficiency air filter ensuring better airflow and engine life.",
    image:
      "https://images.pexels.com/photos/8986070/pexels-photo-8986070.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Engine",
    brand: "Denso",
    retailPrice: 22.99,
    mechanicPrice: 15.99,
    stock: 140,
    compatibility: ["Toyota", "Ford", "Nissan"],
  },
  {
    name: "Valeo Clutch Kit",
    description: "Complete clutch kit for smooth transmission performance.",
    image:
      "https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Transmission",
    brand: "Valeo",
    retailPrice: 299.99,
    mechanicPrice: 219.99,
    stock: 40,
    compatibility: ["Hyundai", "Ford", "Volkswagen"],
  },
  {
    name: "Exide 12V Car Battery",
    description:
      "Maintenance-free battery with strong cold cranking performance.",
    image:
      "https://images.pexels.com/photos/159394/car-battery-vehicle-automobile-159394.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electrical",
    brand: "Exide",
    retailPrice: 159.99,
    mechanicPrice: 109.99,
    stock: 70,
    compatibility: ["Toyota", "Honda", "Mahindra"],
  },
  {
    name: "KYB Shock Absorbers (Front Pair)",
    description: "Gas-charged shock absorbers for improved ride comfort.",
    image:
      "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Suspension",
    brand: "KYB",
    retailPrice: 249.99,
    mechanicPrice: 179.99,
    stock: 55,
    compatibility: ["Ford", "Hyundai", "Toyota"],
  },
  {
    name: "Valeo Radiator",
    description: "High-quality aluminum radiator for effective engine cooling.",
    image:
      "https://images.pexels.com/photos/4483615/pexels-photo-4483615.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Cooling",
    brand: "Valeo",
    retailPrice: 329.99,
    mechanicPrice: 239.99,
    stock: 30,
    compatibility: ["Honda", "Toyota", "Nissan"],
  },
  {
    name: "Philips LED Headlight Bulbs",
    description:
      "Ultra-bright LED headlights for enhanced nighttime visibility.",
    image:
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Lighting",
    brand: "Philips",
    retailPrice: 89.99,
    mechanicPrice: 64.99,
    stock: 95,
    compatibility: ["Universal"],
  },
  {
    name: "Fram Oil Filter",
    description:
      "High-quality oil filter designed for long-lasting engine protection.",
    image:
      "https://images.pexels.com/photos/3806255/pexels-photo-3806255.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Engine",
    brand: "Fram",
    retailPrice: 14.99,
    mechanicPrice: 9.99,
    stock: 200,
    compatibility: ["Toyota", "Honda", "Ford"],
  },
  {
    name: "Goodyear Wiper Blades",
    description:
      "All-weather durable wiper blades for crystal-clear visibility.",
    image:
      "https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Accessories",
    brand: "Goodyear",
    retailPrice: 24.99,
    mechanicPrice: 17.99,
    stock: 130,
    compatibility: ["Universal"],
  },
];

export default products;
