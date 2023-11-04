import React, { useState } from 'react';
import { intro1, intro2, intro3 } from '../assets/image';
import { introStyles } from '../styles';
import IntroComp from '../components/Intro'

const steps = [
    {
        image: intro1,
        title: 'Schedule job steps Easier and More Effective',
        description: 'Streamline and enhance job scheduling with improved, user-friendly steps for greater efficiency and effectiveness.',
        buttonText: 'Next',
    },
    {
        image: intro2,
        title: 'Track your Jobs status anywhere & anytime',
        description: 'Monitor job status effortlessly, anytime, and anywhere for seamless task tracking and management.',
        buttonText: 'Next',
    },
    {
        image: intro3,
        title: 'Help Find the Trending Roles and Companies',
        description: 'Discover trending job roles and companies with ease, aiding your career exploration and decision-making.',
        buttonText: 'Next',
    },
];

const Intro = () => {
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    return (
        <section className="page">
            <IntroComp
                step={step}
                steps={steps}
                handleNextStep={handleNextStep}
            />
        </section>
    );
};

export default Intro;
