import { ProgressProvider } from "../context/ProgressContext";
import SummaryPanel from "../SurveyLayout/SummaryPanel";
import SurveyLayout from "../SurveyLayout/SurveyLayout";

export default function SurveyMain() {
    return (
        <ProgressProvider>
            <SurveyLayout />
            <SummaryPanel />
        </ProgressProvider>
    );
}