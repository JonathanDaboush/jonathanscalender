import { LogInMainShell } from "./LogIn/MainShell";
import { useEffect, useState } from "react";
import { LoggedInMainShell } from "./LoggedIn/mainShell";
export function MainShell(props){
    const [id, setId] = useState(localStorage.getItem("id") || -1);

    const handleIdChange = (newId) => {
        localStorage.setItem("id", newId);
        setId(newId);
    }

    if (id == -1) {
        return <LogInMainShell getId={handleIdChange} />;
    } else {
        return <LoggedInMainShell id={id} />;
    }
}
