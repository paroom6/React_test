import React, { useState } from 'react';
import Component1 from './components/component1/Component1';
import { useRecoilState } from 'recoil';
import {inputState} from './atoms/inputState';
import Component4 from './components/component4/component4';

function GlobalState(props) {
    
    const [value] = useRecoilState(inputState);
    return (
        <div>
            <h1>{value}</h1>
            <Component4/>
        </div>
    );
}

export default GlobalState;
