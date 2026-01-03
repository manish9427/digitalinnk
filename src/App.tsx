import { ProductList } from "./components/ProductList";
import { Basket } from "./components/Basket";
import { Summary } from "./components/Summary";
import "./App.css";

export default function App() {
  return (
    <main className="container">
      <div className="product">
        <ProductList />
      </div>
      <div className="basket">
        <Basket />
        <hr style={{ margin: "16px 0" }} />
        <Summary />
      </div>
    </main>
  );
}
