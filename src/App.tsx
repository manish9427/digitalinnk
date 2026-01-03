import { ProductList } from "./components/ProductList";
import { Basket } from "./components/Basket";
import { Summary } from "./components/Summary";
import "./App.css";
import { SpecialOffers } from "./components/SpecialOffers";

export default function App() {
  return (
    <main className="container">
      <div className="product">
        <ProductList />
        <hr style={{ margin: "16px 0" }} />
        <SpecialOffers />
      </div>
      <div className="basket">
        <Basket />
        <hr style={{ margin: "16px 0" }} />
        <Summary />
      </div>
    </main>
  );
}
