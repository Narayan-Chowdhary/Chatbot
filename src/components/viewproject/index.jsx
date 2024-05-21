import { useState } from "react";
import { useLocation } from "react-router-dom";

const ViewProject = () => {
  const location = useLocation()
  const dataImportedFromSettingOfChatbot = JSON.parse(location?.state);
  //const [projectUrl] = useState(dataImportedFromSettingOfChatbot.dataExportingToSettingOfChatbot.url);

    return (
      <>
        <iframe
          title="Embedded Content"
          src={dataImportedFromSettingOfChatbot &&
            dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot?.url
          }
          style={{
            position: "absolute",
            left: 0,
            top: 70,
            border: "none",
          }}
          width="99.8%"
          height="92%"
        />
      </>
    );

}

export default ViewProject;