///how to save in localStorage using custom hook
import {useState,useEffect} from 'react';
//reading from localStorage: const rowData=localStorage.getItem("key"); data=JSON.parse(rowData);

//to save to localstorage: localStorage.setItem('key',JSON.stringify(data));
///////////////////////
export const useLocalStorage =( key,initialValue)=>{
    
     //read from localStorage when component mount
     const readValue=()=>{
        try{
            const rawData = localStorage.getItem(key);
            const data= rawData ? JSON.parse (rawData) :initialValue;
            return data;

        }catch{
            return initialValue;
        }
    }
    const [value ,setValue]= useState(readValue);
  ///save to localStorage when value change
      useEffect(()=>{
        try{
            localStorage.setItem(key,JSON.stringify(value));
        }catch{
            //ignore quota/serialization errors
        }
    },[key,value])

  return [value,setValue];
}
