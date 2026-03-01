// src/products.js

export const products = [
  {
    id: 1,
    name: "Enriched Vermicompost",
    image: "./public/vermi.png", 
    description: "Premium organic fertilizer rich in NPK and micronutrients.",
    wholesaleOptions: [10, 25, 50],
    // NEW: Detailed Info
    fullDetails: {
      headline: "ENRICH VERMI COMPOST",
      sections: [
        {
          title: "BENEFITS",
          items: [
            "Enhances soil fertility and structure",
            "Enhances plant growth and root health",
            "Promotes beneficial microbial activity",
            "Increases water retention",
            "Eco-Friendly: Reduces the Need for Chemical Fertilizers"
          ]
        },
        {
          title: "IDEAL FOR",
          items: [
            "Gardening: Perfect for home gardens",
            "Seed Starters: Ideal for germinating seeds",
            "Farming: Suitable for all crops and soils",
            "Nurseries: Excellent for potted plants & seedlings"
          ]
        }
      ],
      footer: {
        manufacturer: "Manufactured & Marketed by COCO COIR CREATIONS",
        address: "18/1, Hosahalli, Jala 2, Billamaranahalli, near Assetz Earth & Essense, Yelahanka Taluk, Banglore North, Bengaluru - 562157",
        disclaimer: "PRODUCT MAY LOSE WEIGHT DUE TO LOSS OF MOISTURE"
      }
    }
  },
  {
    id: 2,
    name: "Enriched Cocopeat",
    image: "./public/cocopeat.jpg",
    description: "High water retention medium for optimal root growth.",
    wholesaleOptions: [5, 10, 25],
    fullDetails: {
      headline: "ENRICH COCOPEAT",
      subHeadline: "Eco-Friendly and Sustainable",
      sections: [
        {
          title: "BENEFITS",
          items: [
            "Superior Water Retention",
            "pH Neutral",
            "Lightweight & Easy to handle",
            "Enhances soil aeration & root health for stronger plants"
          ]
        },
        {
          title: "ADVANTAGES",
          items: [
            "Gardening: Perfect for home gardens",
            "Seed Starters: Ideal for germinating seeds",
            "Hydroponics: Excellent for soilless growing"
          ]
        },
        {
          title: "TECHNICAL SPECIFICATIONS",
          items: [
            "EC level < 0.5 mS/cm",
            "pH range 6 - 6.9",
            "Optimal NPK levels achieved"
          ]
        }
      ],
      footer: {
        manufacturer: "Manufactured & Marketed by COCO COIR CREATIONS",
        address: "18/1, Hosahalli, Jala 2, Billamaranahalli, near Assetz Earth & Essense, Yelahanka Taluk, Banglore North, Bengaluru - 562157",
        disclaimer: "PRODUCT MAY LOSE WEIGHT DUE TO LOSS OF MOISTURE"
      }
    }
  },
  {
    id: 3,
    name: "Enriched Potting Mix",
    image: "./public/pot.png",
    description: "Ready-to-use blend for flowers and vegetables.",
    wholesaleOptions: [10, 20],
    fullDetails: {
      headline: "ENRICH POTTING MIX",
      subHeadline: "ONE BAG SOLUTION FOR ALL GARDENING NEEDS.",
      sections: [
        {
          title: "COMPOSITION",
          items: [
            "Red Soil: Provides minerals & firm root support.",
            "Enrich Cocopeat: Improves aeration, water retention & root development.",
            "Enrich Vermicompost: Packed with humus, beneficial microbes & nutrients.",
            "Fortified with: Perlite, Trichoderma, Neem Powder, Pseudomonas, Gypsum Salt."
          ]
        },
        {
          title: "ADVANTAGES",
          items: [
            "Perfect balance of nutrition + aeration.",
            "Moisture control-retains water yet prevents root rot.",
            "Enriched with bio-fertilizers & pest repellents.",
            "Enhances soil structure & long-term fertility.",
            "Eco-friendly & sustainable, safe for edible crops.",
            "Ready-to-use mix for all kinds of pots, beds & grow bags."
          ]
        },
        {
          title: "BEST SUITED FOR",
          items: [
            "Home gardens & terrace gardens",
            "Vegetable & flower growers",
            "Seed starting & nursery raising",
            "Hydroponics & soilless systems"
          ]
        }
      ],
      footer: {
        manufacturer: "Manufactured & Marketed by COCO COIR CREATIONS",
        address: "18/1, Hosahalli, Jala 2, Billamaranahalli, near Assetz Earth & Essense, Yelahanka Taluk, Banglore North, Bengaluru - 562157",
        disclaimer: "PRODUCT MAY LOSE WEIGHT DUE TO LOSS OF MOISTURE"
      }
    }
  },
  {
    id: 4,
    name: "Coconut Fiber",
    image: "./public/fiber.png",
    description: "Raw fiber extracted from tender coconuts.",
    wholesaleOptions: [50, 100],
    // Generic fallback for products without specific text
    fullDetails: {
      headline: "PREMIUM COCONUT FIBER",
      sections: [
        {
          title: "DETAILS",
          items: ["Natural extraction", "Biodegradable", "High durability"]
        }
      ],
footer: {
        manufacturer: "Manufactured & Marketed by COCO COIR CREATIONS",
        address: "18/1, Hosahalli, Jala 2, Billamaranahalli, near Assetz Earth & Essense, Yelahanka Taluk, Banglore North, Bengaluru - 562157",
        
      }
        }
  },
  {
    id: 5,
    name: "Coir Rope",
    image: "./public/rope.webp",
    description: "Strong, eco-friendly rope made from coconut fiber.",
    wholesaleOptions: [100, 200],
    fullDetails: {
      headline: "HIGH TENSILE COIR ROPE",
      sections: [
        {
          title: "DETAILS",
          items: ["Saltwater resistant", "100% Organic", "High strength"]
        }
      ],
footer: {
        manufacturer: "Manufactured & Marketed by COCO COIR CREATIONS",
        address: "18/1, Hosahalli, Jala 2, Billamaranahalli, near Assetz Earth & Essense, Yelahanka Taluk, Banglore North, Bengaluru - 562157",
       
      }
        }
  },
  {
    id: 6,
    name: "Coco Chips",
    image: "./public/8.png",
    description: "Coconut chips used for making charcoal and industrial applications.",
    wholesaleOptions: [10, 25, 50],
    fullDetails: {
      headline: "COCO CHIPS",
      subHeadline: "Premium Quality Coconut Chips for Charcoal & Industrial Use",
      sections: [
        {
          title: "BENEFITS",
          items: [
            "High carbon content ideal for charcoal production",
            "Excellent heat retention properties",
            "Eco-friendly alternative to traditional charcoal",
            "Long-lasting burn time",
            "Low ash content compared to regular charcoal",
            "Sustainable and renewable resource"
          ]
        },
        {
          title: "APPLICATIONS",
          items: [
            "Charcoal manufacturing",
            "Industrial heating",
            "Barbecue and grilling",
            "Water filtration",
            "Horticulture and gardening"
          ]
        },
        {
          title: "TECHNICAL SPECIFICATIONS",
          items: [
            "Fixed Carbon: 75-85%",
            "Volatile Matter: 15-20%",
            "Ash Content: <5%",
            "Moisture: <10%",
            "Size: 10-30mm chips"
          ]
        }
      ],
      footer: {
        manufacturer: "Manufactured & Marketed by COCO COIR CREATIONS",
        address: "18/1, Hosahalli, Jala 2, Billamaranahalli, near Assetz Earth & Essense, Yelahanka Taluk, Banglore North, Bengaluru - 562157",
        disclaimer: "PRODUCT MAY LOSE WEIGHT DUE TO LOSS OF MOISTURE"
      }
    }
  }
];
