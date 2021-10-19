import React, {useState} from 'react'
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtwnWrapper, ArrowForward, ArrowRight} from './HeroElements'
import Video from '../../videos/video.mp4';
import { Button } from '../ButtonElements';

const HeroSection = () => {
    const [hover, setHover] = useState(false);

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
                <HeroP>TEKSTAS TEKSTAS TEKSTAS TEKSTAS UZSIREGINK IR BUS GERAI TEKSTAS</HeroP>
                <HeroBtwnWrapper>
                    <Button to='signup' onMouseEnter={onHover} onMouseLeave={onHover}
                    primary='true' dark='true'>
                        Get Started {hover ? <ArrowForward/> : <ArrowRight/>}
                    </Button>
            </HeroBtwnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
