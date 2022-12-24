import Container from "react-bootstrap/Container";
import {Row, Col} from "react-bootstrap";
import {ArrowRightCircle} from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import {useEffect, useState} from "react";
import'animate.css';
import TrackVisibility from "react-on-screen";
import {isVisible} from "@testing-library/user-event/dist/utils";

export const Banner = () =>{


    const [loopNumber, setLoopNumber] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
    const [text,setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        },delta)

        return () => clearInterval(ticker)
    },[text])

    const tick = () => {
        let i = loopNumber % toRotate.length;
        let fullText = toRotate[i];

        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)
        setText(updatedText);

        if(isDeleting){
            setDelta(prevDelta => prevDelta / 2)
        }

        if(!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(period);
        }else if(isDeleting && updatedText === ''){
            setIsDeleting(false);
            setLoopNumber(loopNumber + 1)
            setDelta(500);
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={isVisible ? "animated_animated animate__fadeIn" : ""}>
                                    <span className="tagline">Welcome to my portfolio</span>
                                    <h1>{`Hi I'm webcoded `}<span className="wrap">{text}</span></h1>
                                    <p>Check out my page !</p>
                                    <button onClick={() => console.log("clicked")}>Lets connect <ArrowRightCircle
                                        size={25}/></button>
                                </div>
                            }
                        </TrackVisibility>
                    </Col>

                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="header-img"/>
                    </Col>

                </Row>
            </Container>


        </section>
    )
}