import React, { useEffect,useRef } from 'react';
import {MdKeyboardArrowUp} from 'react-icons/md';
import './currency_styles.css';
import { useQuery,gql } from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux';
import {changeCurrency} from '../../features/currencyselector/currencySelectorSlice';
import {toggleState} from '../../features/currencytoggle/currencyToggleSlice';
import {toggleFalse} from '../../features/currencytoggle/currencyToggleSlice';

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
  const currency = useSelector((state) => state.currencySelector.symbol)
  const toggle = useSelector((state) => state.currencyToggle.on)
  const dispatch = useDispatch()
  const wrapperRef = useRef(null)
  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if(ref.current && !ref.current.contains(event.target)) {
          toggleDropdownFalse()
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      };
    },[ref])
  }
  useOutside(wrapperRef)
  const {loading,error,data} = useQuery(GET_CURRENCIES)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  const currentCurrency = event => {
    dispatch(changeCurrency(event.currentTarget.id));
    toggleDropdownFalse();
  }
  function toggleCurrencyDropdown() {
    dispatch(toggleState())
  }
  function toggleDropdownFalse() {
    dispatch(toggleFalse())
  }
  return <div className="currency" ref={wrapperRef}>

    <div className="currency-dropdown-toggle" onClick={toggleCurrencyDropdown}>
      <div className="current-currency">{currency}</div>
      <div className={toggle===true ? 'arrow active' : 'arrow'}><MdKeyboardArrowUp/></div>
    </div>
    <div className={toggle===true ? 'dropdown active' : 'dropdown'}>
      {data.currencies.map(({label,symbol}) => (
      <div className="label" id={symbol} key={label} onClick={currentCurrency}>{symbol} {label}</div>
      ))}
    </div>
    </div> 
}

export default Currency;