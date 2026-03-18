export type DietTag = "veg" | "non-veg" | "vegan" | "gluten-free";

export interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: string;
  tags: DietTag[];
  category: string;
  subcategory: string;
  img: string;
  spice?: 1|2|3;
  chef?: boolean;
}

export const menuCategories = [
  { id: "appetizer-veg",   label: "Appetizers",    sub: "Vegetarian",     icon: "🥗" },
  { id: "appetizer-nv",    label: "Appetizers",    sub: "Non-Vegetarian", icon: "🍗" },
  { id: "main-veg",        label: "Main Course",   sub: "Vegetarian",     icon: "🍛" },
  { id: "main-nv",         label: "Main Course",   sub: "Non-Vegetarian", icon: "🥩" },
  { id: "breads",          label: "Breads",        sub: "From the Tandoor",icon: "🫓" },
  { id: "rice",            label: "Rice & Biryani",sub: "Royal Grains",   icon: "🍚" },
  { id: "desserts",        label: "Desserts",      sub: "Royal Sweets",   icon: "🍮" },
];

export const menuItems: MenuItem[] = [
  // Appetizer Veg
  { id:1,  name:"Paneer Tikka",         desc:"Cottage cheese marinated in saffron yoghurt, chargrilled in the tandoor",           price:"$14", tags:["veg","gluten-free"],           category:"Appetizers", subcategory:"appetizer-veg", img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop", spice:1, chef:true },
  { id:2,  name:"Samosa Chaat",         desc:"Crispy samosas, chickpea curry, tamarind chutney, mint foam",                       price:"$12", tags:["veg"],                         category:"Appetizers", subcategory:"appetizer-veg", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", spice:2 },
  { id:3,  name:"Hara Bhara Kebab",     desc:"Spinach and pea patties, cashew filling, mint chutney",                             price:"$13", tags:["veg","vegan","gluten-free"],   category:"Appetizers", subcategory:"appetizer-veg", img:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop", spice:1 },
  { id:4,  name:"Dahi Puri",            desc:"Crisp semolina shells, spiced yoghurt, sweet tamarind, pomegranate",                price:"$11", tags:["veg"],                         category:"Appetizers", subcategory:"appetizer-veg", img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop", spice:2 },
  // Appetizer Non-Veg
  { id:5,  name:"Chicken Seekh Kebab",  desc:"Minced chicken, ginger, coriander, char marks from the royal tandoor",              price:"$16", tags:["non-veg","gluten-free"],       category:"Appetizers", subcategory:"appetizer-nv",  img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop", spice:2, chef:true },
  { id:6,  name:"Amritsari Fish",       desc:"Battered sole fillet, ajwain, chilli, lime, coriander chutney",                     price:"$18", tags:["non-veg"],                     category:"Appetizers", subcategory:"appetizer-nv",  img:"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop", spice:2 },
  { id:7,  name:"Lamb Sheekh",          desc:"Saffron lamb mince, cardamom, rose water, served with raita",                       price:"$19", tags:["non-veg","gluten-free"],       category:"Appetizers", subcategory:"appetizer-nv",  img:"https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop", spice:1 },
  { id:8,  name:"Prawn Koliwada",       desc:"Coastal spiced prawns, kokum sauce, curry leaf oil",                                price:"$21", tags:["non-veg","gluten-free"],       category:"Appetizers", subcategory:"appetizer-nv",  img:"https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&h=300&fit=crop", spice:3 },
  // Main Veg
  { id:9,  name:"Dal Makhani",          desc:"Black lentils slow-cooked 24 hours, smoked butter, cream",                          price:"$18", tags:["veg","gluten-free"],           category:"Main Course", subcategory:"main-veg",      img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", spice:1, chef:true },
  { id:10, name:"Shahi Paneer",         desc:"Cottage cheese in a regal cashew-tomato-cream sauce, rose petals",                  price:"$20", tags:["veg","gluten-free"],           category:"Main Course", subcategory:"main-veg",      img:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop", spice:2 },
  { id:11, name:"Palak Tofu",           desc:"Organic tofu, spinach purée, ginger, cumin — our vegan showpiece",                  price:"$19", tags:["veg","vegan","gluten-free"],   category:"Main Course", subcategory:"main-veg",      img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop", spice:2 },
  { id:12, name:"Rajasthani Gatte",     desc:"Chickpea flour dumplings, yoghurt curry, Jodhpuri spices",                          price:"$17", tags:["veg"],                         category:"Main Course", subcategory:"main-veg",      img:"https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=400&h=300&fit=crop", spice:2 },
  // Main Non-Veg
  { id:13, name:"Lamb Rogan Josh",      desc:"Slow-braised Kashmiri lamb, dried flowers, mace, cardamom",                         price:"$28", tags:["non-veg","gluten-free"],       category:"Main Course", subcategory:"main-nv",       img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", spice:2, chef:true },
  { id:14, name:"Butter Chicken",       desc:"Tandoor-roasted chicken, tomato-butter-cream sauce, fenugreek",                     price:"$24", tags:["non-veg","gluten-free"],       category:"Main Course", subcategory:"main-nv",       img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop", spice:1 },
  { id:15, name:"Goan Fish Curry",      desc:"Coconut milk, Kashmiri chilli, tamarind, fresh catch of the day",                   price:"$26", tags:["non-veg","gluten-free"],       category:"Main Course", subcategory:"main-nv",       img:"https://images.unsplash.com/photo-1631452180775-b5eaef9b84e4?w=400&h=300&fit=crop", spice:3 },
  { id:16, name:"Chicken Chettinad",    desc:"South Indian pepper-heavy curry, kalpasi, marathi mokku",                           price:"$25", tags:["non-veg","gluten-free"],       category:"Main Course", subcategory:"main-nv",       img:"https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop", spice:3 },
  // Breads
  { id:17, name:"Garlic Naan",          desc:"Hand-stretched leavened bread, roasted garlic, cultured butter",                    price:"$5",  tags:["veg"],                         category:"Breads", subcategory:"breads",         img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
  { id:18, name:"Laccha Paratha",       desc:"Flaky layered whole wheat bread, slow-cooked in the tandoor",                       price:"$5",  tags:["veg","vegan"],                 category:"Breads", subcategory:"breads",         img:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
  { id:19, name:"Peshwari Naan",        desc:"Stuffed with almonds, coconut, raisins — a Mughal classic",                         price:"$7",  tags:["veg"],                         category:"Breads", subcategory:"breads",         img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop", chef:true },
  // Rice
  { id:20, name:"Dum Gosht Biryani",    desc:"Royal Hyderabadi lamb biryani, saffron, caramelised onions, raita",                 price:"$29", tags:["non-veg","gluten-free"],       category:"Rice & Biryani", subcategory:"rice",     img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop", spice:2, chef:true },
  { id:21, name:"Vegetable Biryani",    desc:"Fragrant basmati, seasonal vegetables, whole spices, rose water",                   price:"$22", tags:["veg","vegan","gluten-free"],   category:"Rice & Biryani", subcategory:"rice",     img:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop", spice:2 },
  { id:22, name:"Malabar Prawn Pulao",  desc:"Kerala fragrant rice, coconut milk, curry leaf, tiger prawns",                      price:"$27", tags:["non-veg","gluten-free"],       category:"Rice & Biryani", subcategory:"rice",     img:"https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&h=300&fit=crop", spice:2 },
  // Desserts
  { id:23, name:"Gulab Jamun",          desc:"Milk solids in rose-cardamom syrup, pistachio dust, saffron ice cream",              price:"$9",  tags:["veg","gluten-free"],           category:"Desserts", subcategory:"desserts",       img:"https://images.unsplash.com/photo-1666358788048-ded80a3e5eff?w=400&h=300&fit=crop" },
  { id:24, name:"Rasmalai",             desc:"Chenna patties in thickened saffron milk, rose petals",                              price:"$10", tags:["veg","gluten-free"],           category:"Desserts", subcategory:"desserts",       img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", chef:true },
  { id:25, name:"Kulfi Falooda",        desc:"Traditional Indian ice cream, basil seeds, rose syrup, vermicelli",                  price:"$11", tags:["veg","gluten-free"],           category:"Desserts", subcategory:"desserts",       img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop" },
];
