import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="App">
        {products.length > 0 && (
          <div className="products">
            {products.slice(page * 10 - 10, page * 10).map((prod) => {
              return (
                <span className="products__single" key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                </span>
              );
            })}
          </div>
        )}
        {products.length > 0 && (
          <div className="pagination">
            <span>Prev</span>
            {[...Array(products.length / 10)].map((_, i) => {
              return <span key={i}>{i + 1}</span>;
            })}
            <span>Next</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
