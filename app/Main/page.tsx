import { ApplicationRouter } from "../application_components/Main/ApplicationRouter";
import AuthGuard from "../client/Guards/AuthGuard";

export default function Main() {
  return (
    <AuthGuard>
      <ApplicationRouter />
    </AuthGuard>
  );
}
