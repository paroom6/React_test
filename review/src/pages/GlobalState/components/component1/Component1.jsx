import React from 'react';
import Component2 from '../component2/Component2';
function Component1({value, setValue}) {
    return (
        <div>
            <Component2 value = {value} setValue={setValue}/> 
        </div>
    );
}

export default Component1;