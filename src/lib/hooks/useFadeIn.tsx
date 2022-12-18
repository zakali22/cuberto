import {useEffect} from "react"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

export const useFadeIn= () => {
    useEffect(() => {
        const slideInEls = document.querySelectorAll('.fade-in')
        slideInEls.forEach((slideInEl) => {
            gsap.fromTo(slideInEl, { autoAlpha: 0 }, {autoAlpha: 1, duration: 1.6, scrollTrigger: {
                trigger: slideInEl, 
                start: "top center+=100",
                // end: "bottom "
                markers: true
            }})
        })
    }, [])

}