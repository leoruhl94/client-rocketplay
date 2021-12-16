import React from "react";
import { useAuth } from "../../../auth/useAuth";
import { WorkspaceItemDelete } from "./WorkspaceItemDelete";
import "./EditWorkspace.scss";

export const LeaveWorkspace: React.FC = () => {
  const auth = useAuth();
  let myWorkSpace = auth?.user?.myWorkspaces && auth?.user?.myWorkspaces[0]?.name

  return (
    <div className="LeaveWorkspace">
      <h2 className="LeaveWorkspace__title"> Leave Workspace:  </h2>
      {auth?.user?.workspaces?.map((w, i) => {
        
        if(!(myWorkSpace === w)){
          return (
          <WorkspaceItemDelete
            
            schemaName={w}
            title={
              auth?.user?.workspacesTitles?.length ? auth?.user?.workspacesTitles[i] : ""
            }
            
          />
          )
        }
      })
      
      }
    </div>
  );
};
