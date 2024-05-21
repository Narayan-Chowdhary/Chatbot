import { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UserTestimonials({ userData }) {

    const sliderRef = useRef(null);
    const settings = {
        dots: true,
        // speed: 10500,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        autoplay: true,
        // autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 0.96,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1.96,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    }

    const next = () => {
        sliderRef.current?.slickNext();
    };
    const prev = () => {
        sliderRef.current?.slickPrev();
    };

    return (
        <>
            <div className="pt-6 md:pt-10 mt-3 bg-[#E3F3FF] h-[100vh] flex-col">
                <div className=" textanimation text-[#34d399] text-[26px] lg:text-5xl font-semibold flex justify-center">
                    <p className=''>
                        What our clients say
                    </p>
                </div>
                <div className='flex justify-center pt-4 lg:pt-6 mb-4'>
                    <div className='w-[100px] bg-[#34d399] h-1 '></div>
                </div>
                <div className='my-auto'>
                    <Slider ref={sliderRef} {...settings}>
                        {userData &&
                            userData.map((testimonial, index) => {
                                return (
                                    <div className='mt-20 '>
                                        <div key={index} className='card-flip bg-white hover:bg-[#34d399] hover:text-white rounded-xl w-[70%] lg:w-[75%] xl:w-[60%] h-[240px] sm:h-[200px] md:h-[260px] xl:h-[280px] mx-auto relative mb-4 md:mb-8 '>
                                            <div className='w-[80%] y-auto px-2 2xl:px-4 py-8 sm:py-6 md:py-8 xl:py-12 mx-auto '>
                                                <p className='text-[11px] lg:text-[13px] 2xl:text-[14px]'>
                                                    {testimonial?.description}
                                                </p>
                                                <p className='text-[16px] font-semibold text-end mb-4'>
                                                    - {testimonial?.name}
                                                </p>
                                                <div className="flipper absolute top-[-16%] left-[-20%] md:left-[-14%] lg:top-[-20%] lg:left-[-14%] ">
                                                    <img src={testimonial?.client_img} alt="client-image" className='rounded-[100%] w-20 sm:w-[75px] lg:w-[85px] xl:w-24 2xl:w-24 h-20 sm:h-[75px] lg:h-[85px] xl:h-24 2xl:h-24' />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                );
                            })}

                    </Slider>
                    <div className="flex justify-end mt-4 lg:mb-8  mr-4 md:mr-10">
                        <ArrowBackIcon sx={{ color: '#34d399', cursor: 'pointer' }} onClick={prev} fontSize='large' />
                        <ArrowBackIcon fontSize='large' onClick={next} sx={{ color: '#34d399', cursor: 'pointer' }} className='rotate-180 ml-2 ' />
                    </div>
                </div>

            </div >
        </>
    )
}