import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NewPlanForm from "./../TripPlaning/newPlanForm";
import { UilCheckCircle } from "@iconscout/react-unicons";
import color from "../common/color";

const steps = [
  "Create Package",
  "Select a place",
  "Select Accommodation",
  "Select Transpotation",
  "Finish",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleFinish = (answer) => {
    setIsSubmitted(answer);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps} style={{ marginBottom: "2rem" }}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* Finish the stepper */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                border: `5px solid ${color.primary}`,
                height: "25rem",
                padding: "4rem",
              }}
            >
              <center
                style={{
                  color: "black",
                  fontWaight: "900",
                  fontSize: "35px",
                }}
              >
                All Done
              </center>
              <br />
              <center>
                <UilCheckCircle color={color.primary} size="100" />
              </center>
              <br />
              <center
                style={{
                  color: "black",
                  fontWaight: "900",
                  fontSize: "35px",
                }}
              >
                Your Trip Plane is Saved
              </center>
              <br />
            </div>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              margin: "-4rem 1rem 0rem 1rem",
            }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset} color="error" variant="contained">
              Reset
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem("TPcurrent", "Current Plannings");
                window.location = "/plannings";
              }}
              variant="contained"
              sx={{ marginLeft: "1rem" }}
            >
              Continue
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NewPlanForm step={activeStep + 1} isSubmited={handleFinish} />
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,

              margin: "-2rem 1rem 0rem 1rem",
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={handleNext}
              variant="contained"
               disabled={activeStep === steps.length - 1 && !isSubmitted}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
