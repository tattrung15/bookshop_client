import { useEffect, useState } from "react";
import clsx from "clsx";
import { Step, Stepper, StepLabel } from "@material-ui/core";
import {
  Check as CheckIcon,
  Cached as CachedIcon,
  LocalShipping as LocalShippingIcon,
} from "@material-ui/icons";
import {
  ColorlibConnector,
  useColorlibStepIconStyles,
  useStyles,
} from "./make-style";

const getSteps = () => {
  return ["Chờ xác nhận", "Đang giao hàng", "Đã giao hàng"];
};

const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CachedIcon />,
    2: <LocalShippingIcon />,
    3: <CheckIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};

type PropTypes = {
  indexActiveStep: number;
};

function CustomizedSteppers(props: PropTypes) {
  const { indexActiveStep } = props;

  const classes = useStyles();

  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(indexActiveStep);

  useEffect(() => {
    setActiveStep(indexActiveStep);
  }, [indexActiveStep]);

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep ?? -1}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default CustomizedSteppers;
