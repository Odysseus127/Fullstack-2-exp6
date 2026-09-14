import './App.css';
import React,{useEffect,useState} from 'react';
import ProductTable from './components/ProductTable';
import Pagination from './components/Pagination';
function App() {
   const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");

    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [currentPage, pageSize, sortBy, direction]);

    const fetchProducts = async () => {

        setLoading(true);
        setError("");

        try {

            const response = await fetch(
                `http://localhost:8080/api/products?page=${currentPage}&size=${pageSize}&sortBy=${sortBy}&direction=${direction}`
            );

            if (!response.ok) {

                const errorData = await response.json();

                throw new Error(
                    errorData.message || "Something went wrong"
                );
            }

            const result = await response.json();

            setProducts(result.data);
            setCurrentPage(result.currentPage);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);
            setFirst(result.first);
            setLast(result.last);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setCurrentPage(0);
    };

    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
        setCurrentPage(0);
    };

    return (
        <div className="App">

            <h1>Product Pagination/optimized backend reads</h1>

            <h3>Created by Anye Odysseus: 24BAI70992</h3>

            {/* Controls */}

            <div className="controls">

                <div>
                    <label>
                        Products per page:
                    </label>

                    <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <div>
                    <label>
                        Sort by:
                    </label>

                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                        <option value="price">Price</option>
                    </select>
                </div>

                <div>
                    <label>
                        Direction:
                    </label>

                    <select
                        value={direction}
                        onChange={handleDirectionChange}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

            </div>

            {/* Error */}

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            {/* Loading */}

            {loading && (
                <p>Loading products...</p>
            )}

            {/* Products */}

            {!loading && !error && (
                <>
                    <ProductTable products={products} />

                    <div className="total">
                        Total Products: {totalElements}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        first={first}
                        last={last}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

        </div>
    ); 
        
}

export default App;
