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
function DisplayCategories(props) {
  const {loading,error,data} = useQuery(GET_CATEGORIES);
  const [category,setCategory] = useState(null);
  useEffect(() => {
    if(data && data.categories && category === null) {
      setCategory(data.categories[0].name)
      props.liftStateUp(data.categories[0].name)
    }
  },[data,props,category])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const currentCategory = event => {
    setCategory(event.currentTarget.id);
    props.liftStateUp(event.currentTarget.id);
  }

  return data.categories.map(({name}) => (
    <div key={name} className={category === name ? 'category active' : 'category'} id={name} onClick={currentCategory}>{name}</div>
  ));
}

export default DisplayCategories;