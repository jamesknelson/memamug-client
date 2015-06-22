import environment from "environment";
import Rx from "rx";


export default function UserInterfaceActor(Actions, Replayables) {
  Replayables.Identity
    .subscribe(identity => {
      // Save latest identity to localStorage
      localStorage.setItem(
        environment.identityProperty,
        JSON.stringify(identity.toJS())
      );

      // Todo: set timer to expire token without killing the rest of the user's info
    });
}
