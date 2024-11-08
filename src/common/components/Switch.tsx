import React, { FC, ReactElement, PropsWithChildren } from "react";

interface CaseProps extends PropsWithChildren {
  condition: boolean;
}

const Case: FC<CaseProps> = ({ children }) => <>{children}</>;

const Default: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

const Switch: FC<PropsWithChildren> & { Case: typeof Case; Default: typeof Default } = ({
  children,
}) => {
  let matchChild: ReactElement | null = null;
  let defaultCase: ReactElement | null = null;

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      if (!matchChild && child.type === Case) {
        const { condition } = child.props as CaseProps;

        const conditionResult = Boolean(condition);

        if (conditionResult) {
          matchChild = child;
        }
      } else if (!defaultCase && child.type === Default) {
        defaultCase = child;
      }
    }
  });

  return matchChild ?? defaultCase ?? null;
};

Switch.Case = Case;
Switch.Default = Default;

export { Switch };
