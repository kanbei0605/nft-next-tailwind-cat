import React, { useState } from 'react';
import Image from 'next/image';

import Typing from 'react-typing-animation';

import { APP_NAME } from '../config';

const myLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const str_arr = [
    { msg: `Hello, welcome to ${APP_NAME}!`, btn: ''},
    { msg: '--------------------------', btn: ''},
    { msg: `Hello, welcome to ${APP_NAME}10K!`, btn: 'connect'},
    { msg: '--------------------------', btn: ''},
]

export default function Banner() {
    const [step, setStep] = useState(0);
    return (
        <div className="relative rounded relative overflow-hidden shadow-xl z-auto" style={{
            height: '100vh'
        }}>
            <div className="absolute w-screen h-full">
                <Image
                    src="/banner/back-01.jpg"
                    alt="Picture of the author"
                    layout="fill"
                />
            </div>
            <div className="absolute -ml-48 mt-48 w-96 h-36 cursor-pointer" style={{top: "50vh", left: "50vw"}} onClick={() => step < (str_arr.length - 1) ? setStep(step + 1) : setStep(0)}>
                <>
                    {str_arr.map((obj, id) => {
                        if (id === step) {
                            return (
                                <React.Fragment key={id}>
                                <Typing loop={true}>
                                    <Typing.Speed ms={50} />
                                        <h5 className="font-pressstart">{obj.msg}</h5>
                                    <Typing.Delay ms={5000} />
                                    <Typing.Reset count={1} delay={500} />
                                </Typing>
                                { obj.btn === 'connect' ? (
                                    ""
                                ) : (
                                    ''
                                ) }
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment key={id}>
                                </React.Fragment>
                            )
                        }
                    })}
                </>
            </div>

        </div>
    )
}