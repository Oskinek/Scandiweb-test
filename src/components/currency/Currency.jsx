import React, {useState, useEffect} from 'react';
import {MdKeyboardArrowUp} from 'react-icons/md';
import './currency_styles.css';
import { useQuery,gql } from '@apollo/client';

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
  `
;
function Currency() {
  const {loading,error,data} = useQuery(GET_CURRENCIES)
  const [currency, setCurrency] = useState(null);
  useEffect(() => {
    
    if (data && data.currencies) {
      setCurrency(data.currencies[0].symbol);
    }
    
  },[data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const currentCurrency = event => {
    setCurrency(event.currentTarget.id);
  }
  return <div className="currency">
    <div className="currency-dropdown-toggle">
      <div className="current-currency">{currency}</div>
      <div className="arrow"><MdKeyboardArrowUp/></div>
    </div>
    <div className="dropdown">
      {data.currencies.map(({label,symbol}) => (
      <div className="label" id={symbol} key={label} onClick={currentCurrency}>{symbol} {label}</div>
      ))}
    </div>
    </div> 
}

export default Currency;