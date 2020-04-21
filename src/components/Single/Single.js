import React, { useState, useEffect } from "react";
import renderHTML from 'react-render-html';
import { WORDPRESS_URL, POSTS_ENDPOINT } from "../const";
import Loader from '../Loader';

const Single = ({match}) => {
    useEffect (() => {
        fetchPost();
    }, []);

    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);

    async function fetchPost() {
        let url = WORDPRESS_URL+POSTS_ENDPOINT+match.params.id;
        const fetchPost = await fetch(url);
        const data = await fetchPost.json();
        setPost(data);
        setLoading(false);
        console.log(data);
    }    
    
    return (        
        <div className="single">
            {
                loading || Object.keys(post).length === 0
                ? <Loader/>
                : <div className="wrapper">
                    <h2 className="single__title">{post.title.rendered}</h2>
                    <div className="single__img">
                        <img src={post.featured_image_src} alt="Featured"/>                        
                    </div>
                    <div className="single__ingrs">{renderHTML(post.ingredients)}</div>
                    <div className="single__content">{renderHTML(post.content.rendered)}</div>
                    <div className="single-slider">
                    {
                        post.photos.map((photo) => {
                            return (
                                <div key={photo.id} className="single-slider__item">
                                    <img src={photo.guid} alt="recipe" />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>                 
            }            
        </div>
    )
}

export default Single;