import React from "react";
import { useAuth } from "../../../auth/useAuth";
import { WorkspaceItemDelete } from "./WorkspaceItemDelete";
import "./EditWorkspace.scss";

export const LeaveWorkspace: React.FC = () => {
  const auth = useAuth();


  return (
    <div className="LeaveWorkspace">
      <h2 className="LeaveWorkspace__title"> Workspaces </h2>
      {auth?.user?.workspaces?.map((w, i) => (
        <WorkspaceItemDelete
           
          schemaName={w}
          title={
            auth?.user?.workspaces?.length ? auth?.user?.workspaces[i] : ""
          }
          
        />
      ))
      
      }
    </div>
  );
};
