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

  function selectPageHandler(selectedPage) {
    console.log(selectedPage);
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    ) {
      setPage(selectedPage);
    }
  }

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
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page - 1 >= 1 ? "" : "disable_pagination"}
            >
              Prev
            </span>
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <span
                  onClick={() => selectPageHandler(i + 1)}
                  className={i + 1 === page ? "active" : ""}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page + 1 <= products.length / 10 ? "" : "disable_pagination"
              }
            >
              Next
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
