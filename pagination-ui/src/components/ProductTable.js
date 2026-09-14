import React from "react";

function ProductTable({ products }) {
    return (
        <table className="product-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Supplier</th>
                </tr>
            </thead>

            <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>
                                {product.supplier ? product.supplier.name : "No supplier"}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">
                            No products found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ProductTable;