import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import {Navbar} from "../Nav"
import {Cursor} from "../Cursor"
import Scrollbar from 'smooth-scrollbar';
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import CursorProvider from "../../lib/context/cursorContext"
import {Footer} from "../../sections/Footer"

interface Props {
    children: React.ReactElement
}

gsap.registerPlugin(ScrollTrigger);

export const Layout: React.FC<Props> = ({children}) => {
    const viewportRef = useRef<HTMLElement|any>()
    const [offset, setOffset] = useState<number>()
    let bodyScrollBar = useRef<Scrollbar>()

    useLayoutEffect(() => { /** DEBUG: Smoothscroll + custom cursor */
        ScrollTrigger.refresh()
        bodyScrollBar.current = Scrollbar.init(viewportRef.current, {damping: 0.06});
        bodyScrollBar.current.track.xAxis.element.remove();

        ScrollTrigger.scrollerProxy(viewportRef.current, {
            scrollTop(value) {
              if (arguments.length) {
                bodyScrollBar!.current!.scrollTop = value!;
              }
              return bodyScrollBar!.current!.scrollTop;
            }
        });
        
        bodyScrollBar.current.addListener(ScrollTrigger.update);

        ScrollTrigger.defaults({
          scroller: viewportRef.current
        });
        
    }, [])

    useLayoutEffect(() => {
        bodyScrollBar?.current?.addListener(({offset}: any) => {
            setOffset(offset.y)
        })
        console.log(offset)
    }, [])

    return (
        <CursorProvider>
            <>
                <div id="viewport" ref={viewportRef}> {/** Only the scrollable area should be smooth scrolled - move cursor outside */}
                    <Navbar />
                    {children}
                    <Footer />
                </div>
                <Cursor  />  
            </>
        </CursorProvider>
    )
}