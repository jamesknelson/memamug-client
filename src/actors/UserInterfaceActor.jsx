import Rx from "rx";
import React from "react";
import FastClick from "fastclick";
import Application from "../components/Application";
import {combineObject} from "../utils/functions";


React.initializeTouchEvents(true);
FastClick.attach(document.body);


export default function UserInterfaceActor(Actions, Replayables) {
  combineObject({
    route: Replayables.Navigation,
    identity: Replayables.Identity,
    contact: Replayables.Contact,
    contacts: Replayables.Contacts,
    subscriptions: Replayables.Subscriptions
  })
    .subscribe(state => {
      React.render(
        <Application Actions={Actions} {...state} />,
        document.getElementById('react-app')
      )
    });
}
