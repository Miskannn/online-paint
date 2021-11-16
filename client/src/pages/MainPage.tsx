import Canvas from '../components/Canvas';
import SettingBar from '../components/SettingsBar';
import ToolBar from '../components/ToolBar';
import '../styles/App.scss'


export interface PostParams{
  id: string;
}

const Main: React.FC<PostParams> = () => {
  return (
    <div className = "main">
      <ToolBar />
      <SettingBar />
      <Canvas />
    </div>
  )
}

export default Main;