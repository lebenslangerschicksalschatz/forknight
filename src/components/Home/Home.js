import React, { useState, useEffect } from "react";
import renderHTML from 'react-render-html';
import { WORDPRESS_URL, POSTS_ENDPOINT } from "../../const"

const Home = (props) => {
    useEffect (() => {
        fetchPosts();
    }, []);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchPosts() {
        let url = WORDPRESS_URL+POSTS_ENDPOINT;
        setLoading(true);
        const fetchPosts = await fetch(`${url}`);
        const data = await fetchPosts.json();
        setPosts(data);
        setLoading(false);
        console.log(data);
    }

    if (loading){
        return (
            <h2>Loading..</h2>
        )
    }
    return (
        <section id="home" className="home">
            <div className="wrapper">
                <h2 className="home__title">Latest Posts</h2>        
                <div className="posts">
                {
                    posts.map((post) => {                     
                        return (
                            <div key={post.id} className="post">
                                <h3 className="post__title">{post.title.rendered}</h3>
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
    )   
}


export default Home;