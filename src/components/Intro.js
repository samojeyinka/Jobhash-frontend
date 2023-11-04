import React from 'react';
import { BsDot } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const IntroComp = ({ step, steps, handleNextStep }) => {
    return (
        <>
            <div className="intro">
                <div className="intro__steps">
                    {steps.map((stepData, index) => (
                        <>
                            {step === index + 1 && (
                                <div className="intro__container" key={index}>
                                    <div className="intro__imagebox">
                                        <img
                                            src={stepData.image}
                                            className="intro__image"
                                            alt={`Step ${index + 1}`}
                                        />
                                    </div>

                                    <div className="intro__content">
                                        <h1>{stepData.title}</h1>
                                        <p>{stepData.description}</p>
                                        <div className="intro__nav_bullets">
                                            {[1, 2, 3].map((dot) => (
                                                <i
                                                    key={dot}
                                                    className={`intro__step_dots ${dot === step ? 'intro__active_step' : ''
                                                        }`}
                                                >
                                                    <BsDot />
                                                </i>
                                            ))}
                                        </div>
                                        {step < steps.length ? (
                                            <button onClick={handleNextStep} className="intro__next_btn">
                                                {stepData.buttonText}
                                            </button>
                                        ) : (
                                            <Link to="/login">
                                                <button className="intro__next_btn">
                                                    {stepData.buttonText}
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default IntroComp