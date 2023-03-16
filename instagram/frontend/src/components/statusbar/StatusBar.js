import React, { useState, useEffect, useContext } from 'react'
import axios from '../../Axios'
import ImageUploader from '../postUpload/Image'
import ViewStory from '../viewAllstory/ViewStory'

import './statusbar.css'
import AuthContext from '../../context/ContextAuth'


export default function StatusBar() {
    let [isOpen, setIsOpen] = useState(false)
    let { authToken,updated } = useContext(AuthContext)
    let [storyData, setStoryData] = useState()
    let [reload, setReload] = useState(false)
    let [isStoryOpen, setIsStoryOpen] = useState(false)
    let [singleUserStory, setSingleUserStory] = useState()

    // add story window
    let windowOpenHandlers = () => {
        setIsOpen(true)
    }
    let windowCloseHandlers = () => {
        setIsOpen(false)

    }


    // get story data
    let getStories = () => {
        axios.get('api/getstory', {
            headers: {
                'Authorization': `Bearer ${authToken.access}`
            }
        }).then((response) => {
            let followerIds = []
            let filteredData = []
            response.data.data.forEach((story) => {
                if (!followerIds.includes(story.user)) {
                    followerIds.push(story.user)
                    filteredData.push(story)
                }
            })
            setStoryData(filteredData)
        })
    }



    // set status for view
    let viewedStory = (story_id, user_id) => {
        axios.get(`api/viewedstory/${story_id}`).then((response) => {
            setReload(true)
            openStoryHandler()
            singleStory(user_id)
        })
    }



    let openStoryHandler = () => {
        setIsStoryOpen(true)
    }

    // get single user story data

    let singleStory = (user_id) => {
        axios.get(`api/singlestory/${user_id}`).then((response) => {
            setSingleUserStory(response.data)
        })
    }



    useEffect(() => {
        getStories()
    }, [reload,updated])



    return (
        <div>
            <div className="status-main">
                {isOpen ? <ImageUploader url={'api/storyupload'} scope={'Upload story'} /> : ''}
                {isOpen ? <p onClick={windowCloseHandlers} className="close-icon-story"><i className="ri-close-line"></i></p> : ''}

                {isStoryOpen ? <ViewStory setIsStoryOpen={setIsStoryOpen} singleUserStory={singleUserStory} /> : ''}
                <div className="status-area">
                    <div className="story">
                        <div className="each-story">
                            <div onClick={windowOpenHandlers} className='p-1 story-image border'><h4 className='story-add-icon'><i className="ri-add-line"></i></h4></div>
                        </div>

                        {
                            storyData ? storyData.map((obj) =>
                                <div onClick={() => viewedStory(obj.id, obj.user)} className="each-story">
                                    <img className={`p-1 story-image ${obj.status == false ? 'story-border' : 'story-border'}`} src={obj.image_url} alt="" />
                                </div>) : ''
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
