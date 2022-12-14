import {Link} from "react-router-dom"
import {Container} from "../Container"

type Props = {
    headingText?: string,
    paragraph?: string,
    link?: string,
    linkText?: string
}

export const Text = ({headingText, paragraph, link, linkText}: Props) => {
    return (
        <div className="intro-text">
            <Container align="left">
                <div className="intro-text__content">
                    {headingText && <h2>{headingText}</h2>}
                    {paragraph && <p className="h4">{paragraph}</p>}
                    {link && <Link to={link}>{linkText}</Link>}
                </div>
            </Container>
        </div>
    )
}