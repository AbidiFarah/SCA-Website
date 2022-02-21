import React from 'react';
import '../styles/Articles.css';
import { ArticleList } from '../helpers/ArticleList';
import ArticleItem from '../components/ArticlesItem';


function Articles(props) {
    

    return (
        <div className='article'>
            <h1 className='articleTitle'>Our Articles</h1>
            <div className='ArticleList'>
                {ArticleList.map((MenuItem,key)=>{
                    return <ArticleItem key={key} name={MenuItem.name} image={MenuItem.image} url={MenuItem.url} />
                })}

            </div>

        </div>
    )
}

export default Articles;
