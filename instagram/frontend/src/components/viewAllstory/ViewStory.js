import React,{useState} from 'react'

import './viewStory.css'

export default function ViewStory({ setIsStoryOpen,singleUserStory }) {
    let [index,setIndex]=useState(0)

    let storyCloseHandler = () => {
        setIsStoryOpen(false)
    }




    return (
        <div>
            <div className="story-main">
                <div className="story-box">
                    <div className="inner-story-view">
                        <p onClick={storyCloseHandler}><i class="ri-close-line"></i></p>

                        <div className="story-view-image">
                            <img className='story-image-full' src={singleUserStory ? singleUserStory[index].image_url : ''} alt="" />

                        </div>
                        <div className="story-actions">
                           {singleUserStory ? singleUserStory.map((obj,index)=>{
                            return(
                            <div onClick={()=>setIndex(index)} className="story-slider mt-3 mx-1"></div>
                            )
                           }) : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
