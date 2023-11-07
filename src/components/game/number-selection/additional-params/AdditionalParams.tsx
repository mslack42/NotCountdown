import { useGameDispatch } from '../../GameContext';
import './AdditionalParams.css'

function AdditionalParams() {
    const dispatch = useGameDispatch()
    const handleUpdate = (event: any) => {
        const paramChange = {
            [event.target.name]: event.target.checked
        }
        dispatch!({
            type: 'patchConfig',
            patch: paramChange
        })
    }

  return (
    <>
      <div className="additionalParams">
        <label htmlFor="useExpertNumbers">Use Expert Numbers? </label>
        <input id="useExpertNumbers" name="useExpertNumbers" type="checkbox" onChange={handleUpdate}/>
        <br></br>
        <label htmlFor="useCustomNonsense">Use Custom Nonsense? </label>
        <input id="useCustomNonsense" name="useCustomNonsense" type="checkbox" onChange={handleUpdate}/>
      </div>
    </>
  );
}

export default AdditionalParams;
