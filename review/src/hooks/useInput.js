import { useState } from "react";

export function useInput() {
    const [ value, setValue ] = useState("");

    const handleOnChange = (e) => {
        setValue(() => e.target.value);
    }

    return [ value, handleOnChange, setValue ];
}