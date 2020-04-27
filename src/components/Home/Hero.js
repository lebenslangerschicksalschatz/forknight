import React from "react";
import {Link} from "react-router-dom";

const Hero = ({post}) => { 
    return (
        <section className="hero">
            <Link to={`/post/${post.id}`} className="hero__img">
                <img src={post.featured_image_src} alt="Featured" />
            </Link>
            <div className="hero__content">
                <Link to={`/post/${post.id}`} className="hero__title">
                    {post.title.rendered}
                </Link>
                <span className="hero__author">{post.author_name}</span>
                <div className="like-btn">
                    <svg className="like-btn__img" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                    </svg>
                    <span className="like-btn__count">126</span>
                </div>
            </div>
        </section>
    )
}

export default Hero;