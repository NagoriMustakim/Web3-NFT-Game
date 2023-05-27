import React, { useContext } from 'react'
import { GlobalContextProvider } from '../context'

const About = () => {
    const a = useContext(GlobalContextProvider)
    return (
        <div>helo</div>
    )
}

export default About