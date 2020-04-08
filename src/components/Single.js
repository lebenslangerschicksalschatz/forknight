import React, { useState, useEffect } from "react";
import renderHTML from 'react-render-html';
import { WORDPRESS_URL, POSTS_ENDPOINT } from "../const";
import Loader from './Loader';

const Single = ({match}) => {
    useEffect (() => {
        fetchSingle();
    }, []);

    const [single, setSingle] = useState({});
    const [loading, setLoading] = useState(false);

    async function fetchSingle() {
        let url = WORDPRESS_URL+POSTS_ENDPOINT+match.params.id;
        const fetchSingle = await fetch(url);
        const data = await fetchSingle.json();
        setSingle(data);
        setLoading(false);        
    }

    console.log(single);
    
    
    return (        
        <div className="single">
            {
                loading || Object.keys(single).length === 0
                ? <Loader/>
                : <div className="wrapper">
                    <h2 className="single__title">{single.title.rendered}</h2>
                </div>                 
            }            
        </div>
    )
    
}

export default Single;