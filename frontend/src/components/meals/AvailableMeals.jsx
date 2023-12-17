// import classes from "./AvailableMeals.module.css";

// import Card from "../UI/Card";
// import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Os melhores peixes e legumes",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "Uma especialidade alemã!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "Americano, cru, carnudo",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Saudável... e verde...",
//     price: 18.99,
//   },
//   {
//     id: "m4",
//     name: "Caipirinha",
//     description: "Drink... e cachaça nordestina...",
//     price: 18.99,
//   },
// ];

// const AvailableMeals = () => {
//   return (
//     <section className={classes.meals}>
//       <Card>
//         <ul>
//           {DUMMY_MEALS.map((meal) => (
//             <MealItem
//               id={meal.id}
//               key={meal.id}
//               name={meal.name}
//               description={meal.description}
//               price={meal.price}
//             />
//           ))}
//         </ul>
//       </Card>
//     </section>
//   );
// };

// export default AvailableMeals;
import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Os melhores peixes e legumes",
    price: 22.99,
    image: "/src/assets/sushi.jpg", // Adicione o caminho da imagem aqui
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "Uma especialidade alemã!",
    price: 16.5,
    image: "", // Adicione o caminho da imagem aqui
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "Americano, cru, carnudo",
    price: 12.99,
    image: "path/to/burger-image.jpg", // Adicione o caminho da imagem aqui
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Saudável... e verde...",
    price: 18.99,
    image: "path/to/bowl-image.jpg", // Adicione o caminho da imagem aqui
  },
  {
    id: "m5",
    name: "Caipirinha",
    description: "Drink... e cachaça nordestina...",
    price: 18.99,
    image: "path/to/caipirinha-image.jpg", // Adicione o caminho da imagem aqui
  },
];

const AvailableMeals = () => {
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
              image={meal.image} // Passe a propriedade de imagem para o componente MealItem
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
