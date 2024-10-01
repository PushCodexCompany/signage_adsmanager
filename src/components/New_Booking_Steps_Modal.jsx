import React from "react";

const ACTIVE_STEP_LABEL_COLOR = "white";
const INACTIVE_STEP_LABEL_COLOR = "gray-500";
const ACTIVE_STEP_BG_COLOR = "[#6425FE]";
const INACTIVE_STEP_BG_COLOR = "gray-300";

const New_Booking_Steps_Modal = (props) => {
  const {
    children,
    options = [],
    currentStep = 1,
    handleNextStep = () => {},
    handleBackStep = () => {},
    setStep = () => {},
  } = props;

  const currentStepItem = options.find((op) => op.stepIndex === currentStep);
  const currentStepIndex = options.indexOf(currentStepItem);

  const HAS_NEXT = currentStepIndex < options.length - 1;

  const HAS_PREV = currentStepIndex > 0;

  const handleStepClicked = (clickedStep) => {
    if (clickedStep < currentStep) setStep(`${clickedStep}`);
  };
  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 md:pl-16 pl-4 flex flex-wrap space-x-3 border-b-1 border-gray-300">
          {options.map((step, index) => {
            const isActiveStep = `${currentStep}` === `${step.stepIndex}`;

            return (
              <div
                key={`step_${index}`}
                className={`flex-1 flex items-center justify-center ${
                  step.stepIndex < currentStep ? "pointer" : "default"
                }`}
                onClick={() => {
                  handleStepClicked(step.stepIndex);
                }}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-${
                    isActiveStep ? ACTIVE_STEP_BG_COLOR : INACTIVE_STEP_BG_COLOR
                  } rounded-full mr-2 md:mr-4`}
                >
                  <p
                    className={`text-${
                      isActiveStep
                        ? ACTIVE_STEP_LABEL_COLOR
                        : INACTIVE_STEP_LABEL_COLOR
                    } font-poppins text-sm md:text-lg`}
                  >
                    {step.stepIndex}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="font-poppins text-xs md:text-sm lg:text-2xl">
                    {step.label}
                  </div>
                </div>
                <div className="hidden md:flex flex-1 items-center justify-center">
                  {index < options.length - 1 ? (
                    <div className="font-poppins text-lg md:text-2xl">{`>`}</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Body */}
        <main className="p-1 flex-grow">{children}</main>

        {/* Footer */}
        <div className="mb-5 flex flex-wrap justify-center items-center space-x-6">
          {HAS_PREV && HAS_NEXT && (
            <div
              onClick={() => handleBackStep(currentStep)}
              className="border-2 border-[#6425FE] w-[8rem] h-[2rem] md:w-[12rem] md:h-[2.5rem] flex rounded-lg items-center justify-center cursor-pointer"
            >
              <button className="text-[#6425FE] font-poppins text-[0.875rem] md:text-[1rem]">
                Back
              </button>
            </div>
          )}
          {HAS_NEXT && (
            <div
              onClick={() => handleNextStep(currentStep)}
              className="border-2 border-[#6425FE] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg w-[8rem] h-[2rem] md:w-[12rem] md:h-[2.5rem] flex items-center justify-center cursor-pointer"
            >
              <button className="text-white font-poppins text-[0.875rem] md:text-[1rem]">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default New_Booking_Steps_Modal;
