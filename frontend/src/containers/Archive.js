import React, { PureComponent } from 'react';

import Menu from '../components/Menu';
import Footer from '../components/Footer';
import CategoryContainer from '../components/CategoryContainer';
import Product from "../components/Product";

class Archive extends PureComponent {
    state = {
        products: [],
        category: "",
        activeCategoryIndex: 3
    }

    filterHandler = (category, index) => {
        this.setState({
            category,
            activeCategoryIndex: index
        })
    }

    componentDidMount(){
        const myInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        };

        // fetch("./php/products.php", myInit)
        fetch("/getProducts", myInit)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ products: data });
            }).catch(function(err) {
                console.log('Error fetching products: ' + err.message);
            });
    }

    render() {
        const { category, activeCategoryIndex, products } = this.state;

        return (
            <div>
                <Menu/>
                <div className="archive-container" id="archive">
                    <div className="archive-wrapper">
                        <CategoryContainer
                            filterHandler={this.filterHandler}
                            products={products}
                            activeCategoryIndex={activeCategoryIndex}
                        />
                        <br/><br/>
                        <ProductContainer
                            products={category.length
                                ? products.filter(product => product.catName === category)
                                : products.filter(product => product.catName === 'Places')
                            }
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const ProductContainer = ({ products }) => (
    <div className="prodContainer">
        {products.map(product =>
            <Product
                key={product.itemId}
                {...product}
                catName={product.catName}
                thumbnail={product.thumbnail}
                previewImg={product.previewImg}
            />
        )}
    </div>
)

export default Archive;
