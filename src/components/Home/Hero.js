import React from "react";
import {Link} from "react-router-dom";
import LikeBtn from "../LikeBtn";

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
                <LikeBtn />
            </div>
        </section>
    )
}

export default Hero;