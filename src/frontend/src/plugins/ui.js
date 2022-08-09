import Vue from "vue";
import { AppLayout, AppLayoutHeader } from "@/layouts";
import {
  AppButton,
  AppTitle,
  AppInput,
  AppDrag,
  AppDrop,
} from "@/common/components";

Vue.component("AppButton", AppButton);
Vue.component("AppTitle", AppTitle);
Vue.component("AppInput", AppInput);
Vue.component("AppLayout", AppLayout);
Vue.component("AppLayoutHeader", AppLayoutHeader);
Vue.component("AppDrag", AppDrag);
Vue.component("AppDrop", AppDrop);
