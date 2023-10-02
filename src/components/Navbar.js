import { Link, Outlet } from 'react-router-dom';
import style from './navbar.module.css';
import { useState } from 'react';

export function Navbar({ name }) {

    const [displayNav , setDisplayNav] = useState(false);

    
    

    // rendring of elements
    return (
        <>
            <div className={`${style.displayFlex} ${style.alignContent} ${style.nav}`}>
                <div className={style.name}><h1>Buy Busy</h1></div>
                 < img onClick={() => {setDisplayNav(!displayNav)}} className= {`${style.icon} ${style.display}`} src='https://cdn-icons-png.flaticon.com/128/5135/5135168.png' alt='hamburer'/>
                
                {/* mobile */}

                <div className={displayNav ? `${style.mobile} ${style.display}` : `${style.mobile}` }>
                    <div className={`${style.displayFlexColumn} ${style.mobileLeftNav} ${style.alignContent}`}>

                        <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>

                            <Link to='/'>
                                <h3>Home</h3>
                            </Link>
                        </div>


                        <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>

                            <Link to='orders'>
                                <h3>Orders</h3>
                            </Link>
                        </div>


                        <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>

                            <Link to='cart'>
                                <h3>Cart</h3>
                            </Link>
                        </div>


                        <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>

                            <Link to='account'>
                                {name ? <h3>{name}</h3> :
                                    <h3>Log In</h3>}
                            </Link>
                        </div>

                    </div>
                </div>

                {/* full screen */}
                <div className={`${style.displayFlex} ${style.leftNav} ${style.alignContent}`}>

                    <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>
                        <Link to='/'>
                            <img className={`${style.icon}`} src='https://cdn-icons-png.flaticon.com/128/9385/9385212.png' alt='home icon' />
                        </Link>
                        <Link to='/'>
                            <h3>Home</h3>
                        </Link>
                    </div>


                    <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>
                        <Link to='orders'>
                            <img className={`${style.icon}`} src='https://cdn-icons-png.flaticon.com/128/1007/1007963.png' alt='home icon' />
                        </Link>
                        <Link to='orders'>
                            <h3>Orders</h3>
                        </Link>
                    </div>


                    <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>
                        <Link to='cart'>
                            <img className={`${style.icon}`} src='https://cdn-icons-png.flaticon.com/128/7887/7887573.png' alt='home icon' />
                        </Link>
                        <Link to='cart'>
                            <h3>Cart</h3>
                        </Link>
                    </div>


                    <div className={`${style.link} ${style.displayFlex} ${style.alignContent}`}>
                        <Link to='account'>
                            <img className={`${style.icon}`} src='https://cdn-icons-png.flaticon.com/128/64/64572.png' alt='home icon' />
                        </Link>
                        <Link to='account'>
                            {name ? <h3>{name}</h3> :
                                <h3>Log In</h3>}
                        </Link>
                    </div>

                </div>
            </div>

            <Outlet />
        </>
    )
}