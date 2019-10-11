import { Routes} from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { RatingSystemComponent } from './rating-system/rating-system.component';
import { PaypalPaymentComponent } from 'app/Modules/paypal-payment/paypal-payment.component';
import { MyChatsComponent } from './my-chats/my-chats.component';
export const SharedComponentsRoutes:Routes=[
    {path:'settings',component:SettingsComponent},
   
]