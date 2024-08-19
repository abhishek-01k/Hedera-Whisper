import { Box, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import FeatureCard from "./FeatureCard";

import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'


// const steps = [
//     { title: 'First', description: 'Contact Info' },
//     { title: 'Second', description: 'Date & Time' },
//     { title: 'Third', description: 'Select Rooms' },
//     { title: 'Fourth', description: 'Select Rooms' },
//     { title: 'Fifth', description: 'Select Rooms' },
// ]


const steps = [
    { title: 'First', description: 'Contact Info', component: <FeatureCard step="01" title="Select a Token" description="Select from a list of verified tokens from the drop down to send to your friends and family." /> },
    { title: 'Second', description: 'Date & Time', component: <FeatureCard step="02" title="Who to Send To" description="Enter the wallet address of the person you want to send the token to. This is non-reversible so make sure you have the right address." /> },
    { title: 'Third', description: 'Select Rooms', component: <FeatureCard step="03" title="Select the method" description="Simple , Timelock or Recurring" /> },
    // Add more steps as needed
];


// const slides = [
// <FeatureCard
//     key="1"
//     step={"01"}
//     title={"Select a Token"}
//     description={
//         "Select from a list of verified tokens from the drop down to send to your friends and family."
//     }
// />,
//     <FeatureCard
//         key="2"
//         step={"02"}
//         title={"Who to Send To"}
//         description={
//             "Enter the wallet address of the person you want to send the token to. This is non-reversible so make sure you have the right address."
//         }
//     />,
//     <FeatureCard
//         key="3"
//         step={"03"}
//         title={"Select the method"}
//         description={"Simple , Timelock or Recurring"}
//     />,
// ];

const CarouselHomePage = () => {

    // const { activeStep } = useSteps({
    //     index: 1,
    //     count: steps.length,
    // })

    const { activeStep, setActiveStep } = useSteps({
        index: 0,  // Start from the first step
        count: steps.length,
    });

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePrev = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };


    return (
        <Stepper index={activeStep} orientation='vertical'>
            {steps.map((step, index) => (
                <Step key={index} >
                    {/* <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator /> */}
                    <Flex alignItems="center">
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0' ml="4">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>
                    </Flex>
                    {activeStep === index && (
                        <Box mt="4">
                            {step.component}
                            <Flex mt="4">
                                <Button onClick={handlePrev} isDisabled={activeStep === 0}>
                                    Previous
                                </Button>
                                <Button ml="4" onClick={handleNext} isDisabled={activeStep === steps.length - 1}>
                                    Next
                                </Button>
                            </Flex>
                        </Box>
                    )}
                </Step>
            ))}
        </Stepper>

    )
};

export default CarouselHomePage;
