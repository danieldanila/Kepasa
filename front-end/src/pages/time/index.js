import TimeNavigation from "@/components/Time/TimeNavigation";
import MyActivityReports from "@/components/Time/MyActivityReports";
import { useState } from "react";
import ActivityReportsToApprove from "@/components/Time/ActivityReportsToApprove";
import ActivityReports from "@/components/Time/ActivityReports";

export default function Time() {
  const [componentToShow, setComponentToShow] = useState("My Activity Reports");

  const renderComponent = () => {
    if (componentToShow === "My Activity Reports") {
      return <MyActivityReports />;
    } else if (componentToShow === "Activity Reports To Approve") {
      return <ActivityReportsToApprove />;
    } else if (componentToShow === "Activity Reports") {
      return <ActivityReports />;
    }
  };

  return (
    <main>
      <TimeNavigation setComponentToShow={setComponentToShow} />

      {renderComponent()}
    </main>
  );
}
