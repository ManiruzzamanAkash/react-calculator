import React from 'react'

function Button (props) {
    return ( 
        <button className={props.buttonClass} onClick={props.onClick}>
            { props.isIcon ? <React.Fragment><i className={props.isIcon}></i></React.Fragment> : props.textValue }
        </button>
     );
}
 
export default Button;