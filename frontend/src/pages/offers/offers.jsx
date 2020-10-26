import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllItems, saveBillingInfo, saveProducts, generatePdf } from '../../calls/calls';
import './offers.scss';

import products from '../../calls/items.json';

import CustomerInfo from '../../components/customer_info/customer-info';
import ProductList from '../../components/product_list/product-list';

export default class Offers extends Component {
    defaultState = {
        billingInfo: {
            firstName: '',
            lastName: '',
            address: '',
            postalCode: '',
            phoneNr: '',
            email: ''
        },
        products: []
    };
    state = {
        ...this.defaultState
    };

    componentDidMount = () => {
        this.setState({ products }, () =>
            getAllItems(localStorage.getItem('userId'), localStorage.getItem('token'))
                .then(response => {
                    if (typeof response.data[0].billingInfo === 'object' && response.data[0].billingInfo !== undefined) {
                        this.setState({
                            ...this.state,
                            billingInfo: response.data[0].billingInfo
                        });
                    }
                    if (typeof response.data[0].products === 'object' && response.data[0].products !== undefined) {
                        const receivedProducts = products.map(item => {
                            response.data[0].products.forEach(element =>
                                item.title === element.title ? (item.quantity = element.quantity) : undefined
                            );
                            return item;
                        });

                        this.setState({
                            ...this.state,
                            products: receivedProducts
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        );
    };

    componentWillUnmount = () => {
        const reset = this.state.products.map(item => {
            item.quantity = 0;
            return item;
        });
        this.setState({ products: reset });
    };

    onProductAmountChange = (title, value) => {
        const newItems = this.state.products.map(item => {
            if (item.title === title) {
                item.quantity = value;
            }
            return item;
        });

        this.setState({
            ...this.state,
            products: newItems
        });
    };

    onTextChange = (field, event) => {
        this.setState({
            ...this.state,
            billingInfo: {
                ...this.state.billingInfo,
                [field]: event.target.value
            }
        });
    };

    saveProducts = () => {
        const relevantItems = this.state.products
            .filter(item => {
                if (item.quantity > 0) {
                    return item;
                }
            })
            .map(item => {
                return { quantity: item.quantity, title: item.title };
            });

        saveProducts(localStorage.getItem('userId'), { products: relevantItems }, localStorage.getItem('token'))
            .then(response => {
                toast.success('Products information saved');
            })
            .catch(error => {
                toast.error('There was an error. Please try again');
            });
    };

    saveBillingInfo = () => {
        saveBillingInfo(localStorage.getItem('userId'), { billingInfo: this.state.billingInfo }, localStorage.getItem('token'))
            .then(response => {
                toast.success('Billing information saved');
            })
            .catch(error => {
                toast.error('There was an error. Please try again');
            });
    };

    generateOffer = () => {
        const html = `<html>
        <head></head>
        
        <body>
            <div>
                <h1>Billing Information</h1>
            </div>
            <div >
                <div >
                    <h3>First Name  Last name</h3>
                    <p>Ashwini Metgudmath</p>
                    <h3>Billing Adress</h3>
                    <p>Thorupgard alle 8</p>
                    <h3>Postal Code</h3>
                    <p>2720</p>
                </div>
                <div >
                    <h3>Email</h3>
                    <p>ashwini@gmail.com</p>
                    <h3>Telephone number</h3>
                    <p>12345678</p>
                </div>
            </div>
            <div>
                <h1>Products</h1>
            </div>
            <div >
                
                    <!-- <ProductList products={products} onProductAmountChange={this.onProductAmountChange} saveProducts={this.saveProducts} /> -->
                
            </div>
            <div >
                <div><h1>Total</h1></div>
                <div ><h1>$99</h1></div>
            </div>
            <footer>
                <div >
                    <div><h4>09/08/2020</h4></div>
                    <div ><h4>page 1</h4></div>
                </div>
            </footer>
        </body>
        </html>`;
        

    //     const html = `<html>
    //     <body>
    //         <div class="heading">
    //             <h1>Billing Information</h1>
    //         </div>
    //         <div class="user-info">
    //             <div class="info">
    //                 <h3>First Name  Last name</h3>
    //                 <p>${this.state.billingInfo.firstName} ${this.state.billingInfo.lastName}</p>
    //                 <h3>Billing Adress</h3>
    //                 <p>${this.state.billingInfo.address}</p>
    //                 <h3>Postal Code</h3>
    //                 <p>${this.state.billingInfo.postalCode}</p>
    //             </div>
    //             <div class="info">
    //                 <h3>Email</h3>
    //                 <p>${this.state.billingInfo.email}</p>
    //                 <h3>Telephone number</h3>
    //                 <p>${this.state.billingInfo.phoneNr}</p>
    //             </div>
    //         </div>
    //         <div class="heading">
    //             <h1>Products</h1>
    //         </div>
    //         <div class="products">
                
    //                 ${<ProductList products={products} onProductAmountChange={this.onProductAmountChange} saveProducts={this.saveProducts} />}
                
    //         </div>
    //         <div class="heading bill">
    //             <div><h1>Total</h1></div>
    //             <div class="push"><h1>${99}</h1></div>
    //         </div>
    //         <footer>
    
    //         </footer>
    //     </body>
    // </html>`;
    //console.log(html);
        
        //Hint: Use the generatePdf(userId, html) function here from frontend/src/calls/calls.js
        generatePdf(localStorage.getItem('userId'), {"html":html})
        .then(response =>{
            console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data], {type:'application/pdf'}));
            window.open(url);
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'offers.pdf');
            // document.body.appendChild(link);
            // link.click();
            toast.success('Download pdf completed');
        })
        .catch(error => {
            toast.error('There was an error. Please try again');
        });
    };

    render() {
        const { billingInfo, products } = this.state;
        const { isLoggedIn } = this.props;
        return isLoggedIn ? (
            <Fragment>
                <div className="container" id="offers">
                    <h2>Create New Offer</h2>
                    <ProductList products={products} onProductAmountChange={this.onProductAmountChange} saveProducts={this.saveProducts} />
                    <CustomerInfo billingInfo={billingInfo} onTextChange={this.onTextChange} saveBillingInfo={this.saveBillingInfo} />
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
            <Redirect to={{ pathname: '/' }} />
        );
    }
}
