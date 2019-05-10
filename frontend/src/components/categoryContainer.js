import React from 'react';

const CategoryContainer = ({ activeCategoryIndex, products, filterHandler }) => {
    const categories = [...new Set(products.map(prod => prod.catName))];

    return (
        <ul className="filterList">
            {categories.map((category, index) =>
                <Category
                    key={index}
                    category={category}
                    active={index === activeCategoryIndex}
                    handleClick={() => filterHandler(category, index)}
                />
            )}
        </ul>
    )
}

const Category = ({ active, handleClick, category }) =>  (
    <li
        className={active ? 'category active' : 'category categoryActive'}
        onClick={handleClick}
    >
        <button className="btn">
            {category}
        </button>
    </li>
)

export default CategoryContainer;
