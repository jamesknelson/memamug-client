import {initialize} from "maxim";
import environment from "environment";

import NavigationControl from './controls/NavigationControl';
import IdentityControl from './controls/IdentityControl';
import ContactControl from './controls/ContactControl';
import ContactsControl from './controls/ContactsControl';
import SubscriptionsControl from './controls/SubscriptionsControl';

import NavigationModel from './models/NavigationModel';
import IdentityModel from './models/IdentityModel';
import ContactModel from './models/ContactModel';
import ContactsModel from './models/ContactsModel';
import SubscriptionsModel from './models/SubscriptionsModel';

import FetchActor from './actors/FetchActor';
import IdentityActor from './actors/IdentityActor';
import UserInterfaceActor from './actors/UserInterfaceActor';

window.startMemamug = function() {
  FB.init({
    appId: environment.facebook.appId,
    version: 'v2.1'
  });

  const app = initialize({
    controls: {
      Navigation: NavigationControl,
      Identity: IdentityControl,
      Contact: ContactControl,
      Contacts: ContactsControl,
      Subscriptions: SubscriptionsControl,
    },
    models: {
      Navigation: NavigationModel,
      Identity: IdentityModel,
      Contact: ContactModel,
      Contacts: ContactsModel,
      Subscriptions: SubscriptionsModel,
    },
    actors: [
      FetchActor,
      IdentityActor,
      UserInterfaceActor
    ],
  });
};
