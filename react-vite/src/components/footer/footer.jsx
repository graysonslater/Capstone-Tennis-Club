import "./footer.css";
import { NavLink} from "react-router-dom";

function FooterComp(){
    return(
        <div className="page-container">
            <div className="foot">
                <p>Contact: graysonslater@gmail.com</p>
                <NavLink to="https://www.linkedin.com/in/grayson-slater-ab63a9233">LinkedIn</NavLink>
                <NavLink to="https://github.com/graysonslater">GitHub</NavLink>
            </div>
        </div>
    )
}

export default FooterComp;