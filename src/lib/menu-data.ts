import espresso from "@/assets/espresso.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import matcha from "@/assets/matcha.jpg";
import icedCoffee from "@/assets/iced-coffee.jpg";
import chai from "@/assets/chai.jpg";
import cookie from "@/assets/cookie.jpg";
import scone from "@/assets/scone.jpg";
import croissant from "@/assets/croissant.jpg";
import toast from "@/assets/toast.jpg";

export type Size = { id: string; label: string; priceDelta: number };
export type Option = { id: string; label: string; priceDelta: number };
export type OptionGroup = {
  id: string;
  label: string;
  type: "single" | "multi";
  required?: boolean;
  options: Option[];
};

export type MenuItem = {
  id: string;
  name: string;
  category: "espresso" | "brew" | "tea" | "cold" | "bakery" | "food";
  description: string;
  basePrice: number;
  image: string;
  sizes?: Size[];
  optionGroups?: OptionGroup[];
  tags?: string[];
  featured?: boolean;
};

const milk: OptionGroup = {
  id: "milk",
  label: "Milk",
  type: "single",
  required: true,
  options: [
    { id: "whole", label: "Whole milk", priceDelta: 0 },
    { id: "skim", label: "2%", priceDelta: 0 },
    { id: "oat", label: "Oat", priceDelta: 0.8 },
    { id: "almond", label: "Almond", priceDelta: 0.8 },
    { id: "coconut", label: "Coconut", priceDelta: 0.8 },
  ],
};

const extras: OptionGroup = {
  id: "extras",
  label: "Extras",
  type: "multi",
  options: [
    { id: "shot", label: "Extra espresso shot", priceDelta: 1.25 },
    { id: "vanilla", label: "Vanilla syrup", priceDelta: 0.75 },
    { id: "caramel", label: "Caramel syrup", priceDelta: 0.75 },
    { id: "hazelnut", label: "Hazelnut syrup", priceDelta: 0.75 },
    { id: "honey", label: "Local honey", priceDelta: 0.5 },
  ],
};

const drinkSizes: Size[] = [
  { id: "sm", label: "Small (8oz)", priceDelta: 0 },
  { id: "md", label: "Medium (12oz)", priceDelta: 0.75 },
  { id: "lg", label: "Large (16oz)", priceDelta: 1.5 },
];

export const menu: MenuItem[] = [
  {
    id: "espresso",
    name: "Espresso",
    category: "espresso",
    description: "Double shot of our house blend. Rich, chocolatey, ethically sourced.",
    basePrice: 3.25,
    image: espresso,
    tags: ["classic"],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "espresso",
    description: "Espresso with velvety steamed milk and a delicate foam crown.",
    basePrice: 4.5,
    image: cappuccino,
    sizes: drinkSizes,
    optionGroups: [milk, extras],
    featured: true,
  },
  {
    id: "latte",
    name: "Café Latte",
    category: "espresso",
    description: "Smooth espresso, silky micro-foamed milk, hand-poured latte art.",
    basePrice: 4.95,
    image: cappuccino,
    sizes: drinkSizes,
    optionGroups: [milk, extras],
    featured: true,
  },
  {
    id: "matcha",
    name: "Matcha Latte",
    category: "tea",
    description: "Ceremonial-grade matcha whisked with steamed milk of your choice.",
    basePrice: 5.25,
    image: matcha,
    sizes: drinkSizes,
    optionGroups: [milk, extras],
    featured: true,
    tags: ["popular"],
  },
  {
    id: "chai",
    name: "House Chai Latte",
    category: "tea",
    description: "Slow-steeped black tea with cardamom, ginger, and cinnamon.",
    basePrice: 5.0,
    image: chai,
    sizes: drinkSizes,
    optionGroups: [milk, extras],
  },
  {
    id: "drip",
    name: "Drip Coffee",
    category: "brew",
    description: "Rotating single-origin, brewed fresh every 30 minutes.",
    basePrice: 3.25,
    image: espresso,
    sizes: drinkSizes,
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    category: "cold",
    description: "16-hour steeped, naturally sweet and low acid. Served over ice.",
    basePrice: 4.75,
    image: icedCoffee,
    sizes: drinkSizes,
    optionGroups: [milk, extras],
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    category: "cold",
    description: "Chilled espresso, cold milk, plenty of ice.",
    basePrice: 4.95,
    image: icedCoffee,
    sizes: drinkSizes,
    optionGroups: [milk, extras],
  },
  {
    id: "cookie",
    name: "Chocolate Chip Cookie",
    category: "bakery",
    description: "Baked in-house every morning. Crisp edges, gooey middle.",
    basePrice: 3.5,
    image: cookie,
    featured: true,
    tags: ["baked today"],
  },
  {
    id: "scone",
    name: "Blueberry Scone",
    category: "bakery",
    description: "Wild Ontario blueberries folded into a buttery, flaky scone.",
    basePrice: 4.25,
    image: scone,
    tags: ["baked today"],
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    category: "bakery",
    description: "72-hour laminated dough. Golden, shatteringly flaky.",
    basePrice: 4.5,
    image: croissant,
  },
  {
    id: "toast",
    name: "Avocado Toast",
    category: "food",
    description: "Sourdough, smashed avocado, chili crisp, microgreens, lemon.",
    basePrice: 9.5,
    image: toast,
    tags: ["vegan"],
  },
];

export const categories = [
  { id: "espresso", label: "Espresso" },
  { id: "brew", label: "Brewed Coffee" },
  { id: "tea", label: "Tea & Matcha" },
  { id: "cold", label: "Cold Drinks" },
  { id: "bakery", label: "Bakery" },
  { id: "food", label: "Food" },
] as const;

export function priceForItem(item: MenuItem, sizeId?: string, extraIds: string[] = []) {
  let p = item.basePrice;
  const size = item.sizes?.find((s) => s.id === sizeId);
  if (size) p += size.priceDelta;
  const extrasGroup = item.optionGroups?.find((g) => g.id === "extras");
  if (extrasGroup) {
    for (const id of extraIds) {
      const o = extrasGroup.options.find((o) => o.id === id);
      if (o) p += o.priceDelta;
    }
  }
  return p;
}

export function findMenuItem(id: string) {
  return menu.find((m) => m.id === id);
}
