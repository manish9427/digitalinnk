import { ProductList } from "./components/ProductList";
import { Basket } from "./components/Basket";
import { Summary } from "./components/Summary";
import "./App.css";
import { SpecialOffers } from "./components/SpecialOffers";

export default function App() {
  return (
    <main className="container">
      <div>
        <ProductList />
        <hr />
        <SpecialOffers/>

      </div>
      <div>
        <Basket />
        <hr />
        <Summary />
      </div>
    </main>
  );
}
