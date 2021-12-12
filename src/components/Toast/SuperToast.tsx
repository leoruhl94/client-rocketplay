import React, { useEffect } from "react";

interface Props {
    value : string
}

// Component
export const SuperToast : React.FC<Props> = ({value}) => {
    //***************************************** */
    return(<div>
            <div id="snackbar">{value}</div>
    </div>)
}