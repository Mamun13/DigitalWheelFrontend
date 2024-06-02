import React, { useEffect, useState } from "react";
import { getStoragePath } from "../../utils/helpers";
import VendorProduct from "../../components/vendorProduct/VendorProduct";
import { fetchAllProducts } from "../../services/BulkInStock";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import jsPDF from "jspdf";
import "jspdf-autotable";

const index = ({ title, categoryId }) => {
  const [products, setProducts] = useState([]);
  const [orderQuantities, setOrderQuantities] = useState({});
  // fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Logging products to see if data is fetched correctly
  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleQuantityChange = (productId, value, maxQuantity) => {
    if (value > maxQuantity) {
      value = maxQuantity;
    }
    setOrderQuantities({
      ...orderQuantities,
      [productId]: value,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Generate current date and time string
    const currentDateTime = new Date().toLocaleString();
    const formattedDateTime = new Date().toISOString().replace(/[:.]/g, "-");

    // Add header with centered text
    doc.setFontSize(18);
    doc.text("Bulk Order Download", doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(
      `Date: ${currentDateTime}`,
      doc.internal.pageSize.getWidth() / 2,
      25,
      { align: "center" }
    );

    // Move down to allow for the header
    doc.autoTable({
      head: [["Product Name", "Stock Quantity", "Order Quantity"]],
      body: products
        .filter((product) => orderQuantities[product.id] > 0)
        .map((product) => [
          product.product.name,
          product.stock_quantity,
          orderQuantities[product.id],
        ]),
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [40, 40, 40] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      startY: 35,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    // Save the PDF with a dynamic name
    doc.save(`order_summary_${formattedDateTime}.pdf`);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-end align-items-center bg-light shadow rounded-1 p-3 main w-100">
        <div
          className="table-container"
          style={{ maxHeight: "400px", overflowY: "auto", width: "100%" }}
        >
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Stock Quantity</th>
                <th scope="col">Order Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.product.name}</td>
                  <td>{product.stock_quantity}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={orderQuantities[product.id] || ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          Number(e.target.value),
                          product.stock_quantity
                        )
                      }
                      max={product.stock_quantity}
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <button className="btn btn-primary" onClick={generatePDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default index;
