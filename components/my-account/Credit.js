import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { getStoragePath, tostify } from "../../utils/helpers";
import ProductCard from "../common/ProductCard";
import { CreditService } from "../../services/CreditService";
import Col from "react-bootstrap/Col";

const WishlistTab = () => {
  const [myWishlist, setMyWishList] = useState([]);

  const fetchcreditData = async () => {
    CreditService().then((response) => {
      if (response?.data?.data) {
        setMyWishList(response.data.data);
      }
    });
  };

  useEffect(() => {
    fetchcreditData();
  }, []);

  return (
    <Row>
      <h1 className="text-capitalize font-32 fw-bolder prosto_one_regular pb-4 t">
        Wish list
      </h1>
      {myWishlist.map((item, key) => (
        <Col lg={4} key={key} className="mb-3">
          <div className="text-end">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={(event) => handleRemove(event, item?.id)}
            >
              Remove
            </button>
          </div>
          <ProductCard
            id={item?.inventory?.id}
            title={item?.inventory?.title}
            salePrice={item?.inventory?.sale_price}
            offerPrice={item?.inventory?.offer_price}
            offerStart={item?.inventory?.offer_start}
            offerEnd={item?.inventory?.offer_end}
            variants={item?.inventory?.inventory_variants}
            imagePath={
              item?.inventory?.image
                ? getStoragePath(`inventory-image/${item?.inventory?.image}`)
                : getStoragePath(
                    `product-image/${item?.inventory?.product?.image}`
                  )
            }
            viewLink={`/product/${item?.inventory?.id}`}
            cssClasses="category-product"
          />
        </Col>
      ))}

      <div className="order-table table-responsive">
        <table className="table mb-5 ">
          <thead>
            <tr>
              <th scope="col" className="text-capitalize">
                ID
              </th>
              <th scope="col" className="text-capitalize">
                name/Business
              </th>
              <th scope="col" className="text-capitalize">
                date
              </th>
              <th scope="col" className="text-capitalize">
                invoice id
              </th>
              <th scope="col" className="text-capitalize">
                amount
              </th>
              <th scope="col" className="text-capitalize">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {myWishlist.map((item, key) => {
              return (
                <>
                  <tr className="align-items-center">
                    <td scope="row" className="fw-bold">
                      1
                    </td>
                    <td>
                      <p className="">Md Azad</p>
                    </td>
                    <td>
                      <p className="">20-sept-2023</p>
                    </td>
                    <td className="">0123456789</td>
                    <td className="">$250 USD</td>
                    <td className="text-capitalize text-primary fw-bold">
                      withdraw
                    </td>
                  </tr>
                </>
              );
            })}
            {/* // <tr className="align-items-center">
            //   <td scope="row" className="fw-bold">
            //     1
            //   </td>
            //   <td>
            //     <p className="">Md Azad</p>
            //   </td>
            //   <td>
            //     <p className="">20-sept-2023</p>
            //   </td>
            //   <td className="">0123456789</td>
            //   <td className="">$250 USD</td>
            //   <td className="text-capitalize text-primary fw-bold">withdraw</td>
            // </tr> */}
          </tbody>
        </table>
      </div>
    </Row>
  );
};

export default WishlistTab;
