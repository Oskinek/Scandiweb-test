import React from 'react';
import './category_styles.css';
import { useQuery,gql } from '@apollo/client';
import ProductCard from '../productCard/ProductCard';

function Category(props) {
  const GET_PRODUCTS = gql`
    query GetProducts($title: String!) {
      category(input: {title: $title}) {
        products {
          name
          gallery
          inStock
          brand
          prices {
            amount
            currency {
              symbol
            }
          }
        }
      }
    }
    `
  ;
  const {loading,error,data} = useQuery(GET_PRODUCTS, {variables : {title: props.Currentcategory}});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return <div>
    <div className="category-name">{props.Currentcategory}</div>
    <div className="products-container">
      {data.category.products.map(({name},index) => (
        <ProductCard key={name} product={data.category.products[index]} currentCurrency={props.currentCurrency}/>
      ))}
    </div>

  </div>
}
export default Category;