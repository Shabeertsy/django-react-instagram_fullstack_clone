import React from 'react'

import './home.css'

import StatusBar from '../../components/statusbar/StatusBar'
import Feeds from '../../components/feeds/Feeds'
import Sidebar from '../../components/sidebar/Sidebar'
import Suggestion from '../../components/sugesstions/Suggestion'

export default function Home() {

    return (
        <div>
            {/* main contianer for the home  page */}
            <div className="home-main">
                <div className="">
                    <div className="d-flex">
                        <div className="left-box">
                            <div className="border left-inner-box">
                                <Sidebar />
                            </div>
                        </div>

                        {/* right box */}
                        <div className="right-box">
                            <div className="">
                                <div className="d-flex  justify-content-center">
                                    {/* feed section box in the center */}
                                    <div className='right-inner-box center-components'>
                                        <StatusBar />
                                        <Feeds />
                                    </div>
                                    <div className="right-components">
                                        <Suggestion />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
