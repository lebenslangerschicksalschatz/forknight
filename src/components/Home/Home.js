import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import renderHTML from 'react-render-html';
import { WORDPRESS_URL, POSTS_ENDPOINT, POST_ANY } from "../const";
import Loader from '../Loader';
import Hero from "./Hero";

const Home = () => {
    useEffect (() => {
        fetchRandom();
        fetchPosts();
    }, []);

    const [posts, setPosts] = useState([]);
    const [randomPost, setRandomPost] = useState({});
    const [loading, setLoading] = useState(false);
    
    async function fetchRandom() {
        let url = WORDPRESS_URL+POST_ANY;
        setLoading(true);
        const fetchPosts = await fetch(url);
        const data = await fetchPosts.json();
        setRandomPost(data[0]);        
        setLoading(false);
        console.log(data[0]);
    }

    async function fetchPosts() {
        let url = WORDPRESS_URL+POSTS_ENDPOINT;
        setLoading(true);
        const fetchPosts = await fetch(url);
        const data = await fetchPosts.json();
        setPosts(data);
        setLoading(false);         
    }

    if (loading || Object.keys(randomPost).length === 0){
        return (
            <Loader />
        )
    }
    return (
        <>
        <Hero post={randomPost}/> 
        <section id="home" className="home">
            <div className="wrapper">
                <h2 className="home__title">Останні Пости</h2>        
                <div className="posts">
                {
                posts.map((post) => {                     
                    return (
                        <div key={post.id} className="post">
                            <Link key={post.id} to={`/post/${post.id}`} className="post__title">
                                {post.title.rendered}
                            </Link>
                            <div className="post__img">                                    
                                <img src={post.featured_image_src} alt="Featured" />
                            </div>
                            <div className="post__content">
                                {renderHTML(post.excerpt.rendered)}
                            </div>
                        </div>                     
                    )                  
                })
                }
                </div>
            </div>  
        </section>
        </>
    )   
}

export default Home;