import React, { PureComponent } from 'react';

import Menu from '../components/Menu';
import Footer from '../components/Footer';
import CategoryContainer from '../components/CategoryContainer';
import Product from "../components/Product";

class Archive extends PureComponent {
    state = {
        products: [],
        places: [],
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
        fetch('http://magda.se.test:8228/wp-json/wp/v2/posts')
            .then(res => res.json())
            .then(data => this.setState({
                products: data,
                isLoaded: true
            })).catch(err => console.log(err.message));

        fetch('http://magda.se.test:8228/wp-json/wp/v2/places')
            .then(res => res.json())
            .then(data => this.setState({
                places: data,
                isLoaded: true
            })).catch(err => console.log(err.message));
    }

    render() {
        const { category, activeCategoryIndex, products, isLoaded } = this.state;

        console.log(this.state);

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
                        {isLoaded &&
                            <ProductContainer
                                products={category.length
                                    ? products.filter(product => product.catName === category)
                                    : products.filter(product => product.catName === 'Places')
                                }
                            />
                        }
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
