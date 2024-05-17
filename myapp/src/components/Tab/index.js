
import './index.css'

const Tab = (props) => {
  const { tabDetails ,activeTab,changeTab } = props;
  const {tabId, displayText } = tabDetails;
  
  const btnStyle = activeTab.toUpperCase() === tabId ? "tab-btn active-tab" : "tab-btn inactive-tab"

  return (
    <li className="tab">
      <button onClick={() => changeTab(tabId)} className={btnStyle}>{displayText}</button>
    </li>
  );
};

export default Tab;
