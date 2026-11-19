// Menuja e Shqiponjës. Produktet dhe çmimet mund të ndryshohen në këtë skedar.
// Menuja sipas fotografive të dërguara. Çmimet janë në euro.
const menu = [
  { name: "Mëngjesi", items: [
    ["Omlet përshutë", "3.00 €"],
    ["Omlet suxhuk", "3.00 €"],
    ["Omlet natyral", "3.00 €"],
    ["Omlet shpie", "3.50 €"],
    ["Pomfrit", "2.00 €"],
    ["Llokuma (1 porcion)", "3.00 €"]
  ]},
  { name: "Sandwich", items: [
    ["Sandwich pule", "2.00 €"],
    ["Sandwich përshutë", "2.00 €"],
    ["Sandwich tuna", "2.00 €"]
  ]},
  { name: "Pasta", items: [
    ["Makarona karbonare", "3.00 €"],
    ["Makarona boloneze", "3.00 €"],
    ["Makarona arabiati", "3.00 €"]
  ]},
  { name: "Pizza", groups: [
    { subtitle: "Pica – e vogël / e mesme / e madhe", items: [
      ["Pizza Margarita", "2.50 € / 3.00 € / 4.00 €"],
      ["Pizza Tuna", "3.00 € / 4.00 € / 5.00 €"],
      ["Pizza Fungi", "3.00 € / 3.50 € / 4.50 €"],
      ["Pizza Suxhuk", "3.00 € / 3.50 € / 4.50 €"],
      ["Pizza Shqiponja", "3.50 € / 4.50 € / 5.00 €"],
      ["Pizza Përshutë", "3.00 € / 3.50 € / 4.50 €"],
      ["Pizza Shpie", "3.00 € / 4.00 € / 4.50 €"],
      ["Pizza Vegjetariane", "3.00 € / 3.50 € / 4.50 €"]
    ]},
    { subtitle: "Pizza familjare", items: [
      ["Pizza familjare Shtepie", "15.00 €", "+ Cola 1.25 €"],
      ["Pizza familjare Tuna", "16.00 €"],
      ["Pizza familjare Margarita", "14.00 €"]
    ]}
  ]},
  { name: "Specialitete nga skara", items: [
    ["Mish viqi", "10.00 €"],
    ["Biftek", "12.00 €"],
    ["Ramstek", "8.00 €"],
    ["Shtizë pule", "4.50 €"],
    ["Skenderbeg", "8.00 €"],
    ["Bërxollë pule", "4.00 €"],
    ["Rolladë pule", "4.00 €"]
  ]},
  { name: "Sallatat", items: [
    ["Sallatë Shope", "2.50 €"],
    ["Sallatë Greke", "3.00 €"],
    ["Sallatë Gjelbërt", "3.00 €"],
    ["Sallatë Pule", "3.50 €"],
    ["Sallatë Tuna", "3.50 €"]
  ]},
  { name: "Skara", items: [
    ["Hamburger i vogël", "2.00 €"],
    ["Hamburger pule", "2.00 €"],
    ["Pleskavicë", "3.50 €"],
    ["Pleskavicë me sos", "3.50 €"],
    ["Pleskavicë me kajmak", "4.00 €"],
    ["Pleskavicë e mbushur", "4.00 €"],
    ["Pleskavicë e shpisë", "4.00 €"],
    ["Qebapa (1 porcion, 7 copa)", "3.50 €"],
    ["Qebapa (10 copa)", "4.50 €"],
    ["Qofte shtëpiake", "4.00 €"],
    ["File pule – pa sos", "3.50 €"],
    ["File pule – me sos", "3.50 €"],
    ["Kombinim – pa sos", "3.50 €"],
    ["Kombinim – me sos", "3.50 €"],
    ["Kombinim – Shqiponja", "5.00 €"],
    ["Suxhuk shpie", "3.50 €"],
    ["Virshlle shpie", "3.50 €"]
  ]}
];

const welcomeView = document.getElementById("welcome-view");
const categoryView = document.getElementById("category-view");
const categoryGrid = document.getElementById("category-grid");
const categoryTitle = document.getElementById("active-category-title");
const categoryItems = document.getElementById("category-items");
const categoryHours = document.getElementById("category-hours");

function createMenuItem(item) {
  const row = document.createElement("article");
  row.className = "menu-item";
  const left = document.createElement("div");
  const name = document.createElement("div");
  name.className = "item-name";
  name.textContent = item[0];
  left.appendChild(name);
  if (item[2]) {
    const note = document.createElement("div");
    note.className = "item-note";
    note.textContent = item[2];
    left.appendChild(note);
  }
  const price = document.createElement("div");
  price.className = "item-price";
  price.textContent = item[1];
  row.append(left, price);
  return row;
}

function openCategory(index) {
  const category = menu[index];
  categoryTitle.textContent = category.name;
  categoryItems.replaceChildren();
  const limitedHours = ["Mëngjesi", "Gjellat"].includes(category.name);
  categoryHours.hidden = !limitedHours;
  categoryHours.replaceChildren();
  if (limitedHours) {
    const strong = document.createElement("strong");
    strong.textContent = "⏰ Kjo kategori shërbehet deri në ora 14:00.";
    categoryHours.appendChild(strong);
  }

  const groups = category.groups || [{ subtitle: "", items: category.items }];
  groups.forEach(group => {
    const section = document.createElement("section");
    section.className = "menu-group";
    if (group.subtitle) {
      const heading = document.createElement("h2");
      heading.className = "group-title";
      heading.textContent = group.subtitle;
      section.appendChild(heading);
    }
    const list = document.createElement("div");
    list.className = "menu-list";
    group.items.forEach(item => list.appendChild(createMenuItem(item)));
    section.appendChild(list);
    categoryItems.appendChild(section);
  });

  welcomeView.hidden = true;
  categoryView.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showWelcome() {
  categoryView.hidden = true;
  welcomeView.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

menu.forEach((category, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "category-card";
  button.setAttribute("aria-label", `Hap kategorinë ${category.name}`);
  const text = document.createElement("span");
  const name = document.createElement("span");
  name.className = "category-name";
  name.textContent = category.name;
  text.append(name);
  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  button.append(text, arrow);
  button.addEventListener("click", () => openCategory(index));
  categoryGrid.appendChild(button);
});

document.getElementById("back-button").addEventListener("click", showWelcome);
document.getElementById("home-link").addEventListener("click", event => {
  event.preventDefault();
  showWelcome();
});

// Navigimi me rrëshqitje në telefon, pa ndikuar në lëvizjen vertikale të faqes.
let touchStartX = 0;
let touchStartY = 0;
let touchStartedInMain = false;
document.addEventListener("touchstart", event => {
  if (!event.changedTouches.length) return;
  const target = event.target;
  touchStartedInMain = !!(target && target.closest && target.closest(".shell"));
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", event => {
  if (!touchStartedInMain || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < 90 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  if (!categoryView.hidden && dx > 0) {
    showWelcome();
  } else if (!welcomeView.hidden && dx < 0) {
    openCategory(0);
  }
  touchStartedInMain = false;
}, { passive: true });
