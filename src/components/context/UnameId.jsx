import { createContext, useState } from "react"

export const UnameIdContext = createContext();

const UnameId = (props) => {

    const [userD, setUserD] = useState();

    return(
        <UnameIdContext.Provider value={[userD, setUserD]}>
            {props.children}
        </UnameIdContext.Provider>
    )
}

export default UnameId;