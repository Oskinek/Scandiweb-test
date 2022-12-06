import React from 'react';
import {Link} from 'react-router-dom'
import { useQuery,gql } from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux'
import {changeCategory} from '../../features/categoryselector/categorySelectorSlice'
const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
  `
;
function DisplayCategories() {
  const category = useSelector((state) => state.categorySelector.name)
  const {loading,error,data} = useQuery(GET_CATEGORIES);
  const dispatch = useDispatch()
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const currentCategory = event => {
    dispatch(changeCategory(event.currentTarget.id));
  }

  return data.categories.map(({name}) => (
    <Link to={'/'} key={name} className={category === name ? 'category active' : 'category'} id={name} onClick={currentCategory}>{name}</Link>
  ));
}

export default DisplayCategories;