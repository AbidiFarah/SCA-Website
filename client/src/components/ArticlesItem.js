import React from 'react';
import { useNavigate } from 'react-router-dom';

function ArticleItem({image,name,url}) {

    const navigate = useNavigate();
    

    return (
        <div className='articleItem' >
            <div style={{ backgroundImage: `url(${image})` }}></div>
            <h1>{name}</h1>
            <button onClick={()=> navigate.push("/{url}")}>Click</button>

        </div>

    )
}
export default ArticleItem;
