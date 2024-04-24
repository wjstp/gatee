import React, {useState} from 'react';
import FirstExam from "./component/FirstExam";
import SecondDict from "./component/SecondDict";
import ThirdAll from "./component/ThirdAll";
import Slider from "react-slick";
import KaKaoLogin from "./component/KaKaoLogin";
// 공식 문서 : https://react-slick.neostack.com/docs/api
const OnboardingIndex = () => {
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);

    // 슬라이더 세팅
    var settings
        : {
        dots: boolean,
        infinite: boolean,
        autoplay: boolean,
        autoplaySpeed: number,
        speed: number,
        slidesToShow: number,
        slidesToScroll: number,
        beforeChange: (current: number, next: number) => void,
        afterChange: (current: number) => void
    }
        = {
        dots: false,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        // 빠르게 바뀌는데 적용되는 부분
        beforeChange:(current:number, next:number)=> {
            // 옛날 슬라이드
            setOldSlide(current);
            // 활성화된 슬라이드
            setActiveSlide(next);
        },
        // 바뀌고 좀 나중에 적용되는 함수
        afterChange:(current:number)=> {
            setActiveSlide2(current)
        }
    };
    // 상단 인덱스 표시 도트
    const Indicator = () =>{
        // 현재 슬라이드보다 큰것들만 주황색
        const index:number[] = [0,1,2,3]
        return(
            <div className="dotContainer">
                {index.map((item:number) =>{
                    if (activeSlide >= item)
                        return <div className="activeDot"></div>
                    else
                        return <div className="disableDot"></div>
                })}
            </div>
        )
    }
    return (
        <div className="containerCenter">
            <Indicator/>
            <Slider {...settings}>
                <FirstExam/>
                <SecondDict/>
                <ThirdAll/>
                <KaKaoLogin/>
            </Slider>
        </div>
    );
}


export default OnboardingIndex;