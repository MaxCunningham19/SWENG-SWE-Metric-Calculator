import * as React from 'react';
import { useEffect} from 'react'


function Loading({ repo,token,retrieveData,setData }) {
  useEffect(() => {
    setData(retrieveData(repo,token))
  });
  
  return (<>Loading...</>)
}
export default Loading;