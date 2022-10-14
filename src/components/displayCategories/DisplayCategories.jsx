import React, {useState, useEffect} from 'react';
import { useQuery,gql } from '@apollo/client';
const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
  `
;
function DisplayCategories() {
  const {loading,error,data} = useQuery(GET_CATEGORIES);
  const [category,setCategory] = useState(null);
  useEffect(() => {
    if(data && data.categories) {
      setCategory(data.categories[0].name)
    }
  },[data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const currentCategory = event => {
    setCategory(event.currentTarget.id);
    console.log(category);
  }

  return data.categories.map(({name}) => (
    <div key={name} className={category === name ? 'category active' : 'category'} id={name} onClick={currentCategory}>{name}</div>
  ));
}

export default DisplayCategories;