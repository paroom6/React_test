import React from 'react';
import { useRecoilState } from 'recoil';
import { inputState } from '../../atoms/inputState';

function Component4() {
    const [value, setValue] = useRecoilState(inputState);
    return (
        <div>
            <input type="text" value={value} onChange={(e) =>setValue(e.target.value)}/>
        </div>
    );
}

export default Component4;