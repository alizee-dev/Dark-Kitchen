const meals = [
  {
    title: "Houmous",
    description:
      "Pois chiches moulus avec crème de sésame (ou huile de sésame) et citron",
    price: "7.00          ",
    picture: "pic/starters/houmous.png",
    gluten: "no",
    lactose: "no",
    vegan: "yes",
  },
  {
    title: "Moutabal",
    description: "Caviar d'aubergines grillées à la crème de sésame",
    price: "8.00          ",
    picture: "pic/starters/moutabal.png",
    gluten: "no",
    lactose: "no",
    vegan: "yes",
  },
  {
    title: "Tabouleh",
    description: "Salade typique libanaise à base de persil",
    price: "8.00          ",
    picture: "pic/starters/tabouleh.png",
    gluten: "yes",
    lactose: "no",
    vegan: "yes",
  },
  {
    title: "Aish El Saraya",
    description:
      "À base de biscotte non salé, du lait concentré et sirop de caramel du chef",
    price: "4.50          ",
    picture: "pic/dessert/aishelsaraya.png",
    gluten: "yes",
    lactose: "yes",
    vegan: "no",
  },
  {
    title: "Baklawa",
    description: "À base de pistaches. Servi par pièce",
    price: "2.50          ",
    picture: "pic/dessert/baklawa.png",
    gluten: "yes",
    lactose: "no",
    vegan: "no",
  },
  {
    title: "Namoura",
    description: "À base de semoule, de noix de coco et amandes",
    price: "2.50          ",
    picture: "pic/dessert/namoura.png",
    gluten: "yes",
    lactose: "no",
    vegan: "no",
  },
];

// Create cards
let createCard = (food) => {
  const container = document.getElementById("mealsContainer");
  const oneMealCard = document.createElement("button");
  const textCard = document.createElement("div");
  const mealTitle = document.createElement("h3");

  const mealDescription = document.createElement("p");

  const buy = document.createElement("div");
  const price = document.createElement("p");
  const basket = document.createElement("button");
  const illuBox = document.createElement("div");
  const illu = document.createElement("img");

  mealTitle.innerText = food.title;
  textCard.append(mealTitle);
  mealDescription.innerText = food.description;
  textCard.append(mealDescription);
  price.innerText = food.price;
  basket.setAttribute("class", "fas fa-basket-shopping");
  basket.setAttribute("id", "basket");
  buy.setAttribute("id", "buy");
  buy.append(price);
  buy.append(basket);
  textCard.append(buy);
  textCard.setAttribute("id", "text");
  oneMealCard.append(textCard);
  // illu.style.backgroundImage = `url(${food.picture})`;
  // illu.style.backgroundSize = "cover";
  illu.src = food.picture;
  illuBox.append(illu);
  illuBox.setAttribute("id", "images");
  oneMealCard.append(illuBox);
  oneMealCard.setAttribute("id", "container_flex");

  const index = Array.from(container.children).length;
  if (index < 3) {
    oneMealCard.classList.add("starter");
  } else if (index >= 3) {
    oneMealCard.classList.add("dessert");
  }

  container.append(oneMealCard);
};

meals.forEach((food) => {
  createCard(food);
});

//Buttons of categories ("all", "starters", "desserts", filter)
//callBack de l'eventListener
let hideDesserts = false;
let hideStarters = false;

const hide = (e) => {
  if (e.target.innerText === "Starters") {
    hideDesserts = true;
    const dessert = document.getElementsByClassName("dessert");
    for (let i = 0; i < dessert.length; i++) {
      dessert[i].style.display = "none";
    }
    if (hideStarters) {
      const starter = document.getElementsByClassName("starter");
      for (let i = 0; i < starter.length; i++) {
        starter[i].style.display = "";
      }
      hideStarters = false;
    }
  } else if (e.target.innerText === "Desserts") {
    hideStarters = true;
    let starter = document.getElementsByClassName("starter");
    for (let i = 0; i < starter.length; i++) {
      starter[i].style.display = "none";
    }
    if (hideDesserts) {
      const dessert = document.getElementsByClassName("dessert");
      for (let i = 0; i < dessert.length; i++) {
        dessert[i].style.display = "";
      }
      hideDesserts = false;
    }
  } else if (e.target.innerText === "All") {
    if (hideDesserts || hideStarters) {
      const dessert = document.getElementsByClassName("dessert");
      for (let i = 0; i < dessert.length; i++) {
        dessert[i].style.display = "";
      }
      hideDesserts = false;

      const starter = document.getElementsByClassName("starter");
      for (let i = 0; i < starter.length; i++) {
        starter[i].style.display = "";
      }
      hideStarters = false;
    }
  }
};

//eventListener for "show/hide categories"
const myCategories = document.querySelectorAll(".categories");
myCategories.forEach((categorie) => {
  categorie.addEventListener("click", hide);
});

//switch to darkmode

const darkmode = () => {
  const body = document.body;
  body.classList.toggle("darkmode");
  const container = document.querySelectorAll("#container_flex");
  for (let i = 0; i < container.length; i++) {
    container[i].classList.toggle("darkmode");
  }
};

//Calcul du total
let pricesOfMeal = [];
let sum = 0;

const registerOrder = (basket) => {
  const recap = document.getElementById("recap");
  const container = basket.target.closest("#container_flex");
  const buy = container.querySelector("#buy");

  const title = container.querySelector("h3");
  const price = buy.querySelector("p");
  recap.innerText += `${title.innerText} - ${price.innerText}\n`;

  pricesOfMeal.push(parseFloat(price.innerText));
  let total = document.getElementById("total");
  for (let i = 0; i < pricesOfMeal.length; i++) {
    sum += pricesOfMeal[i];
    total.innerText = sum.toFixed(2);
  }
};

const baskets = document.querySelectorAll("#basket");
baskets.forEach((basket) => {
  basket.addEventListener("click", registerOrder);
});


// === Filtrage par régime alimentaire ===
const dietSelect = document.getElementById('diets');

dietSelect.addEventListener('change', (e) => {
  const value = e.target.value; // glutenFree, lactoseFree, vegan, ou 'diets'
  const allMeals = document.querySelectorAll('#container_flex');

  allMeals.forEach((mealCard, index) => {
    const mealData = meals[index]; // correspond au plat
    let show = true;

    if (value === 'glutenFree' && mealData.gluten === 'yes') show = false;
    if (value === 'lactoseFree' && mealData.lactose === 'yes') show = false;
    if (value === 'vegan' && mealData.vegan === 'no') show = false;

    mealCard.style.display = show ? '' : 'none';
  });
});



////////////////////////////// difficultés rencontrées //////////////////////////
/* 
1.  illu.style.backgroundImage = `url(${food.picture})`;
2.  redimensionner mes images via css alors qu'elles font partie d'une div a laquelle j'avais déja attribué des valeurs via js
3. Attribuer une classe a mes premières cardes :
        const index = Array.from(container.children).length;
        if (index < 3) {
4. Bordel complet pour afficher les plats selon le bouton sur lequel on clique.
Logique a retenir : 
- 2 flags et pas 1
- si je clique sur starters, je cache mes desserts. Mais si mes starters sont cachés, je les affiche. Idem pour les desserts. Pour All : si l'un ou l'autre est caché, je l'affiche.
- 5. ne pas avoir anticipé la nécessité de générer mes mealsCards (<div>) en <buttons> 
*/
