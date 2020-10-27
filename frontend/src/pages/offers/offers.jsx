import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

import {
  getAllItems,
  saveBillingInfo,
  saveProducts,
  generatePdf,
  fetchPdf,
} from "../../calls/calls";
import "./offers.scss";

import products from "../../calls/items.json";

import CustomerInfo from "../../components/customer_info/customer-info";
import ProductList from "../../components/product_list/product-list";
import Axios from "axios";

export default class Offers extends Component {
  defaultState = {
    billingInfo: {
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      phoneNr: "",
      email: "",
    },
    products: [],
  };
  state = {
    ...this.defaultState,
  };

  componentDidMount = () => {
    this.setState({ products }, () =>
      getAllItems(localStorage.getItem("userId"), localStorage.getItem("token"))
        .then((response) => {
          if (
            typeof response.data[0].billingInfo === "object" &&
            response.data[0].billingInfo !== undefined
          ) {
            this.setState({
              ...this.state,
              billingInfo: response.data[0].billingInfo,
            });
          }
          if (
            typeof response.data[0].products === "object" &&
            response.data[0].products !== undefined
          ) {
            const receivedProducts = products.map((item) => {
              response.data[0].products.forEach((element) =>
                item.title === element.title
                  ? (item.quantity = element.quantity)
                  : undefined
              );
              return item;
            });

            this.setState({
              ...this.state,
              products: receivedProducts,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        })
    );
  };

  componentWillUnmount = () => {
    const reset = this.state.products.map((item) => {
      item.quantity = 0;
      return item;
    });
    this.setState({ products: reset });
  };

  onProductAmountChange = (title, value) => {
    const newItems = this.state.products.map((item) => {
      if (item.title === title) {
        item.quantity = value;
      }
      return item;
    });

    this.setState({
      ...this.state,
      products: newItems,
    });
  };

  onTextChange = (field, event) => {
    this.setState({
      ...this.state,
      billingInfo: {
        ...this.state.billingInfo,
        [field]: event.target.value,
      },
    });
  };

  saveProducts = () => {
    const relevantItems = this.state.products
      .filter((item) => {
        if (item.quantity > 0) {
          return item;
        }
      })
      .map((item) => {
        return { quantity: item.quantity, title: item.title };
      });

    saveProducts(
      localStorage.getItem("userId"),
      { products: relevantItems },
      localStorage.getItem("token")
    )
      .then((response) => {
        toast.success("Products information saved");
      })
      .catch((error) => {
        toast.error("There was an error. Please try again");
      });
  };

  saveBillingInfo = () => {
    saveBillingInfo(
      localStorage.getItem("userId"),
      { billingInfo: this.state.billingInfo },
      localStorage.getItem("token")
    )
      .then((response) => {
        toast.success("Billing information saved");
      })
      .catch((error) => {
        toast.error("There was an error. Please try again");
      });
  };

  generateOffer = () => {
    //Hint: Use the generatePdf(userId, html) function here from frontend/src/calls/calls.js

    generatePdf(localStorage.getItem("userId"), {
      billingInfo: this.state.billingInfo,
      products: this.state.products,
    })
      .then(() => fetchPdf())
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "offers.pdf");
        toast.success("Download successful..!");
      })
      .catch((error) => {
        toast.error("There was an error. Please try again");
      });
  };

  render() {
    const { billingInfo, products } = this.state;
    const { isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Fragment>
        <div className="container" id="offers">
          <h2>Create New Offer</h2>
          <ProductList
            products={products}
            onProductAmountChange={this.onProductAmountChange}
            saveProducts={this.saveProducts}
          />
          <CustomerInfo
            billingInfo={billingInfo}
            onTextChange={this.onTextChange}
            saveBillingInfo={this.saveBillingInfo}
          />
          <section id="generateOffer">
            <div className="header-wrapper">
              <h3 className="text-white">Step 3: Generate Offer</h3>
              <div className="btnv-1" onClick={this.generateOffer}>
                <span>Download PDF</span>
              </div>
            </div>
          </section>
        </div>
        <br></br>
      </Fragment>
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
