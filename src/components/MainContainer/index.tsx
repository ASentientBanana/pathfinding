import { ReactNode } from 'react';
import './MainContainer.css';



const MainContainer = ({ children }: { children: ReactNode }) => {

    return (
        <div className='MainContainer'>
            {children}
        </div>
    );
}

export default MainContainer;