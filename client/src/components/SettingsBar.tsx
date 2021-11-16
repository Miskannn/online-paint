
import toolState from "../store/toolState";

const SettingBar = () => {

    const copyLink = () => {
        const btn = document.querySelector('#btn')
        const link = window.location.href.toString();
     
        
    }
    return (
        <div className="settingsbar">
            <label style = {{marginLeft: 5}} htmlFor="line-width">Line width <span>={'>'}</span></label>
            <input
                onChange={(e: any) => toolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id="line-width"
                type="number" defaultValue={1} min={1} max={50}/>
            <label htmlFor="stroke-color">Stroke color <span>={'>'}</span></label>
            <input onChange={e => toolState.setStrokeColor(e.target.value)} id="stroke-color" type="color" style = {{margin: '0 10px'}}/>
            
        </div>
    );
};

export default SettingBar;