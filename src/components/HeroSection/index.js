import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtwnWrapper, ArrowForward, ArrowRight} from './HeroElements'
import Video from '../../videos/video.mp4';
import { Button } from '../ButtonElements';

const HeroSection = () => {
    const [hover, setHover] = useState(false);

    const history = useHistory();
    const onHover = () => {
        setHover(!hover)
    };

    return (
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>Elektroniniai Mainai</HeroH1>
                <HeroP>Mokomoji vertybinių popierių ir virtualių valiutų mainų sistema</HeroP>
                <HeroBtwnWrapper>
                    <Button to='signup' onMouseEnter={onHover} onMouseLeave={onHover} onClick={(e) => history.push('/signin')}
                    primary='true' dark='true'>
                        Prisijungti {hover ? <ArrowForward/> : <ArrowRight/>}
                    </Button>
            </HeroBtwnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
