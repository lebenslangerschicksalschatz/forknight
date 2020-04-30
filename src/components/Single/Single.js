import React, { useState, useEffect } from "react";
import renderHTML from 'react-render-html';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WORDPRESS_URL, POSTS_ENDPOINT } from "../const";
import Loader from '../Loader';

const Single = ({match}) => {
    useEffect (() => {
        fetchPost();
        setSliders({mainSlider: "mainSlider", navSlider: "navSlider"})
    }, []);

    const [post, setPost] = useState({});
    const [numberOfPhotos, setNumberOfPhotos] = useState(0);
    const [loading, setLoading] = useState(false);

    const [sliders, setSliders] = useState({mainSlider: null, navSlider: null});

    async function fetchPost() {
        let url = WORDPRESS_URL+POSTS_ENDPOINT+match.params.id;
        const fetchPost = await fetch(url);
        const data = await fetchPost.json();
        setPost(data);
        setLoading(false);
        setNumberOfPhotos(data.photos.length);
    }

    const settingsFor = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        infinite: true,
        asNavFor: sliders.navSlider
    };

    const settingsNav = {
        slidesToShow: numberOfPhotos,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: true,
        infinite: true,
        asNavFor: sliders.mainSlider
    };
    
    return (        
        <div className="single">
            {
                loading || Object.keys(post).length === 0
                ? <Loader/>                    
                : <>
                <div className="single__img">
                    <img src={post.featured_image_src} alt="Featured"/>  
                    <div className="single__title">
                        <h2>{post.title.rendered}</h2>
                    </div>                      
                </div>
                <div className="wrapper">
                    <div className="single__ingrs">
                        <span>Інгредієнти:</span>
                        {renderHTML(post.ingredients)}
                        </div>
                    <div className="single__content">{renderHTML(post.content.rendered)}</div>
                    <Slider 
                    className="sl" 
                    {...settingsFor}
                    ref={slider => (sliders.mainSlider = slider)}>
                    {
                        post.photos.map((photo) => {
                            return (
                                <div key={photo.id} className="sl__item">
                                    <img src={photo.guid} alt="recipe" />
                                </div>
                            )
                        })
                    }
                    </Slider>
                    <Slider 
                    className="sl-nav" 
                    {...settingsNav}
                    ref={slider => (sliders.navSlider = slider)}>
                    {
                        post.photos.map((photo) => {
                            return (
                                <div key={photo.id} className="sl-nav__item">
                                    <img src={photo.guid} alt="recipe" />
                                </div>
                            )
                        })
                    }
                    </Slider>
                </div> 
                </>                
            }            
        </div>
    )
}

export default Single;