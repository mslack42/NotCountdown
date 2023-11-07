import { UserOperation } from "../../../../../data/Operation";
import "./Operations.css";

interface OpProps {
  actionValue: string;
  enabled: boolean;
  onclick: () => void
}

function OperationButton({ actionValue, enabled, onclick }: OpProps) {
  const className = enabled ? "operation" : "operation disabled";
  return <div className={className} onClick={enabled ? onclick : undefined}>{actionValue}</div>;
}

interface Props {
opArgs: number[]
  onOperation?: (payload : OperationsPayload) => void;
}

export interface OperationsPayload {
    action: UserOperation
}

function Operations({ opArgs, onOperation }: Props) {
  const orderedArgs = [...opArgs].sort((a,b) => b-a)
  const arg2 = orderedArgs.length > 1 ? orderedArgs[1] : undefined
  const arg1 = orderedArgs.length > 0 ? orderedArgs[0] : undefined
  const enableAdd = !!(arg1 && arg2 && arg1 + arg2 < 1000);
  const enableSub = !!(arg1 && arg2 && arg1 - arg2 > 0);
  const enableDiv = !!(arg1 && arg2 && arg1 % arg2 === 0);
  const enableMult = !!(arg1 && arg2 && arg1 * arg2 < 1000);

  function onclick(actionValue: UserOperation) { return () => 
    onOperation!({
      action: actionValue,
    });
  }

  return (
    <div className="operations-bar">
      <OperationButton actionValue="+" enabled={enableAdd} onclick={onclick('+')}></OperationButton>
      <OperationButton actionValue="-" enabled={enableSub} onclick={onclick('-')}></OperationButton>
      <OperationButton actionValue="/" enabled={enableDiv} onclick={onclick('/')}></OperationButton>
      <OperationButton actionValue="*" enabled={enableMult} onclick={onclick('*')}></OperationButton>
      <OperationButton actionValue="C" enabled={true} onclick={onclick('C')}></OperationButton>
    </div>
  );
}

export default Operations;
