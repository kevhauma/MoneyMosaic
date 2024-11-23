import React, { ReactElement, useState } from 'react';
import { PropsWithChildren } from 'react';
import { Flex } from './Flex';
import { Button } from '..';
import { CheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';

type StepperProps = {
  children: ReactElement<StepProps>[]; // Expect children to be Step components
  defaultStep?: string;
  onSubmit?: () => void;
};

export const Stepper = ({ children, defaultStep, onSubmit }: StepperProps) => {
  const [currentStepId, setCurrentStepId] = useState(defaultStep);

  // Map through the children to access their props
  const steps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return { ...child.props };
    }
    return null;
  }).filter(Boolean);

  const currentStep = steps.find((step) => step.id === currentStepId);

  const getCurrentStepIndex = (id?: string) =>
    steps.findIndex((step) => step.id === (id ?? currentStepId));

  const isStepAvailable = (id: string) => {
    const currentIndex = getCurrentStepIndex(id);

    const previousStep = steps[currentIndex - 1];
    if (!previousStep) return true;
    return previousStep.isValid;
  };

  const goToNextStep = () => {
    const currentIndex = getCurrentStepIndex();

    if (currentIndex + 1 > steps.length - 1) return;

    const nextStep = steps[currentIndex + 1];
    setCurrentStepId(nextStep.id);
  };

  const goToPreviousStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex - 1 < 0) return;

    const previousStep = steps[currentIndex - 1];
    setCurrentStepId(previousStep.id);
  };

  return (
    <div>
      <Flex>
        {steps?.map((step) => {
          const available = isStepAvailable(step.id);
          return (
            <Flex
              key={step.id}
              onClick={() => available && setCurrentStepId(step.id)}
              className={`px-4 py-2 cursor-pointer
                    ${
                      available || step.isValid
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
              {step.isValid ? (
                <CheckIcon className="w-5 h-5 text-green-400" />
              ) : (
                !available && (
                  <LockClosedIcon className="w-5 h-5 text-gray-400" />
                )
              )}
              {step?.label}
            </Flex>
          );
        })}
      </Flex>
      <div>{currentStep?.children}</div>
      <Flex className="justify-between">
        <Button
          onClick={goToPreviousStep}
          disabled={getCurrentStepIndex() === 0}
        >
          Back
        </Button>
        {getCurrentStepIndex() !== steps.length - 1 && (
          <Button
            onClick={goToNextStep}
            disabled={currentStep?.isValid === false}
          >
            Next
          </Button>
        )}
        {getCurrentStepIndex() === steps.length - 1 && (
          <Button onClick={onSubmit} disabled={currentStep?.isValid === false}>
            Complete
          </Button>
        )}
      </Flex>
    </div>
  );
};

type StepProps = PropsWithChildren & {
  id: string;
  label: string;
  isValid?: boolean;
};
export const Step = ({ label, children, isValid }: StepProps) => {
  return children;
};
