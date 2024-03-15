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
    <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
      <div className="p-4  pl-16 flex space-x-3 border-b-1 border-gray-300">
        {options.map((step, index) => {
          const isActiveStep = `${currentStep}` === `${step.stepIndex}`;

          return (
            <div
              key={`step_${index}`}
              className="flex-1 flex  items-center justify-center"
              onClick={() => {
                handleStepClicked(step.stepIndex);
              }}
              style={{
                cursor: step.stepIndex < currentStep ? "pointer" : "default",
              }}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 bg-${
                  isActiveStep ? ACTIVE_STEP_BG_COLOR : INACTIVE_STEP_BG_COLOR
                } rounded-full mr-4`}
              >
                <p
                  className={`text-${
                    isActiveStep
                      ? ACTIVE_STEP_LABEL_COLOR
                      : INACTIVE_STEP_LABEL_COLOR
                  }  font-poppins text-lg`}
                >
                  {step.stepIndex}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="font-poppins text-2xl ">{step.label}</div>
              </div>
              <div className="flex flex-1 items-center justify-center">
                {index < options.length - 1 ? (
                  <div className="font-poppins text-2xl ">{`>`}</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {children}
      <div className="mt-14 mb-5 flex justify-center items-center space-x-6">
        {HAS_PREV && HAS_NEXT && (
          <div
            onClick={() => handleBackStep(currentStep)}
            className="border-2 border-[#6425FE] w-48 h-10 flex items-center justify-center cursor-pointer"
          >
            <button className="text-[#6425FE] font-poppins ">Back</button>
          </div>
        )}
        {HAS_NEXT && (
          <div
            onClick={() => handleNextStep(currentStep)}
            // onClick={() => console.log("selected_dates", selected_dates)}
            className="border-2 border-[#6425FE] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg w-48 h-10 flex items-center justify-center cursor-pointer"
          >
            <button className="text-white font-poppins">Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default New_Booking_Steps_Modal;
