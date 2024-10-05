import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import { RouterName } from "./RouterName";
import { dataLocalStorage, getLocalStorage } from "src/helper/publicFunction";
import NotificationController from "src/pages/notificaiton/view";
import CarsList from "src/pages/cars/CarsList";
import AddCar from "src/pages/cars/AddCar";
import DriverLists from "src/pages/drivers/DriverLists";
import AddDrivers from "src/pages/drivers/AddDrivers";
import AddCarTypes from "src/pages/carTypes/AddCarTypes";
import CarTypesList from "src/pages/carTypes/CarTypesList";
import AddCharity from "src/pages/charity/AddCharity";
import CharityList from "src/pages/charity/CharityList";
import AddPreferenceTypes from "src/pages/preferenceType/AddPreferenceTypes";
import PreferenceTypes from "src/pages/preferenceType/PreferenceTypes";
import ClientLoyalty from "src/pages/client-loyalty/ClientLoyalty";
import AddClientLoyalty from "src/pages/client-loyalty/AddClientLoyalty";
import AddAdditionalCharges from "src/pages/additional-charges/AddAdditionalCharges";
import ListAdditionalCharges from "src/pages/additional-charges/ListAdditionalCharges";
import ClientLists from "src/pages/client/ClientLists";
import AddClient from "src/pages/client/AddClient";
import ClientAddressLists from "src/pages/client-address/ClientAddressLists";
import AddClientAddress from "src/pages/client-address/AddClientAddress";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Tips = Loadable(lazy(() => import("src/pages/tips/view")));
const AdminLogs = Loadable(lazy(() => import("src/pages/admins_logs/view")));

const Users = Loadable(lazy(() => import("src/pages/users/view")));

const GeneralHomePage = Loadable(
  lazy(() => import("src/pages/landingPage/generalHomePage/view"))
);
const OurStory = Loadable(
  lazy(() => import("src/pages/landingPage/ourStory/view"))
);

const OurTeam = Loadable(
  lazy(() => import("src/pages/landingPage/ourTeam/view"))
);
const FlashcardDetailsPage = Loadable(
  lazy(() => import("src/pages/flashCard/Details/view"))
);
const FlashCardCategory = Loadable(
  lazy(() => import("src/pages/flashCard/category/view"))
);
const FlashCard = Loadable(
  lazy(() => import("src/pages/flashCard/flashCard/view"))
);
const LevelOfDifficulty = Loadable(
  lazy(() => import("src/pages/flashCard/levelOfDifficulty/view"))
);
const AgeRange = Loadable(
  lazy(() => import("src/pages/flashCard/ageRange/view"))
);
const HomePage = Loadable(lazy(() => import("src/pages/home/view")));
const Faqs = Loadable(lazy(() => import("src/pages/faqs/view")));
const PressBlogNews = Loadable(
  lazy(() => import("src/pages/landingPage/press_blog_news/view"))
);

const CategoryActivities = Loadable(
  lazy(() => import("src/pages/activities/category/view"))
);
const Activities = Loadable(
  lazy(() => import("src/pages/activities/activities/view"))
);
const ActivitiesMedia = Loadable(
  lazy(() => import("src/pages/activities/activities_media/view"))
);
const ActivitiesFlashcard = Loadable(
  lazy(() => import("src/pages/activities/activites_flashcard/view"))
);
const Settings = Loadable(lazy(() => import("src/pages/settings/view")));
const LegalInformation = Loadable(
  lazy(() => import("src/pages/settings/legal_information"))
);
const ContactAs = Loadable(lazy(() => import("src/pages/contact_as/view")));

const HowItWork = Loadable(lazy(() => import("src/pages/how_it_work/view")));
const HowItWorkDetails = Loadable(
  lazy(() => import("src/pages/how_it_work/details"))
);

const OurClient = Loadable(
  lazy(() => import("src/pages/landingPage/ourClient/view"))
);
const Testimonials = Loadable(
  lazy(() => import("src/pages/landingPage/testimonials/view"))
);
const AppBenefits = Loadable(
  lazy(() => import("src/pages/landingPage/app_benefits/view"))
);
const Impacts = Loadable(
  lazy(() => import("src/pages/landingPage/impacts/view"))
);
const Stats = Loadable(lazy(() => import("src/pages/landingPage/stats/view")));

const Topics = Loadable(lazy(() => import("src/pages/topics/view")));
const SubTopics = Loadable(lazy(() => import("src/pages/topics/subtopic")));

const EcommerceDash = Loadable(
  lazy(() => import("../views/dashboard/Ecommerce"))
);

const AdminsPage = Loadable(lazy(() => import("../pages/admins/admins/view")));
const PrivilegesPage = Loadable(
  lazy(() => import("../pages/admins/privileges/view"))
);

const SliderShowPage = Loadable(
  lazy(() => import("../pages/landingPage/slidershow/view"))
);
const MapsPage = Loadable(lazy(() => import("../pages/landingPage/maps/view")));
const LanguagesPage = Loadable(
  lazy(() => import("../pages/landingPage/languages/view"))
);
/* ****Apps***** */
const Chats = Loadable(lazy(() => import("../views/apps/chat/Chat")));
const Notes = Loadable(lazy(() => import("../views/apps/notes/Notes")));
const Calendar = Loadable(
  lazy(() => import("../views/apps/calendar/BigCalendar"))
);
const Email = Loadable(lazy(() => import("../views/apps/email/Email")));
const Blog = Loadable(lazy(() => import("../views/apps/blog/Blog")));
const BlogDetail = Loadable(lazy(() => import("../views/apps/blog/BlogPost")));
const Tickets = Loadable(lazy(() => import("../views/apps/tickets/Tickets")));
const Contacts = Loadable(
  lazy(() => import("../views/apps/contacts/Contacts"))
);
const Ecommerce = Loadable(
  lazy(() => import("../views/apps/eCommerce/Ecommerce"))
);
const EcommerceDetail = Loadable(
  lazy(() => import("../views/apps/eCommerce/EcommerceDetail"))
);
const EcomProductList = Loadable(
  lazy(() => import("../views/apps/eCommerce/EcomProductList"))
);
const EcomProductCheckout = Loadable(
  lazy(() => import("../views/apps/eCommerce/EcommerceCheckout"))
);
const UserProfile = Loadable(
  lazy(() => import("../views/apps/user-profile/UserProfile"))
);
const Followers = Loadable(
  lazy(() => import("../views/apps/user-profile/Followers"))
);
const Friends = Loadable(
  lazy(() => import("../views/apps/user-profile/Friends"))
);
const Gallery = Loadable(
  lazy(() => import("../views/apps/user-profile/Gallery"))
);

// Pages
const RollbaseCASL = Loadable(
  lazy(() => import("../views/pages/rollbaseCASL/RollbaseCASL"))
);
const Treeview = Loadable(
  lazy(() => import("../views/pages/treeview/Treeview"))
);
const Pricing = Loadable(lazy(() => import("../views/pages/pricing/Pricing")));
const AccountSetting = Loadable(
  lazy(() => import("../views/pages/account-setting/AccountSetting"))
);
const Faq = Loadable(lazy(() => import("../views/pages/faq/Faq")));

// widget
const WidgetCards = Loadable(
  lazy(() => import("../views/widgets/cards/WidgetCards"))
);
const WidgetBanners = Loadable(
  lazy(() => import("../views/widgets/banners/WidgetBanners"))
);
const WidgetCharts = Loadable(
  lazy(() => import("../views/widgets/charts/WidgetCharts"))
);

// form elements
const MuiAutoComplete = Loadable(
  lazy(() => import("../views/forms/form-elements/MuiAutoComplete"))
);
const MuiButton = Loadable(
  lazy(() => import("../views/forms/form-elements/MuiButton"))
);
const MuiCheckbox = Loadable(
  lazy(() => import("../views/forms/form-elements/MuiCheckbox"))
);
const MuiRadio = Loadable(
  lazy(() => import("../views/forms/form-elements/MuiRadio"))
);
const MuiSlider = Loadable(
  lazy(() => import("../views/forms/form-elements/MuiSlider"))
);
const MuiDateTime = Loadable(
  lazy(() => import("../views/forms/form-elements/MuiDateTime"))
);
const MuiSwitch = Loadable(
  lazy(() => import("../views/forms/form-elements/MuiSwitch"))
);

// form layout
const FormLayouts = Loadable(lazy(() => import("../views/forms/FormLayouts")));
const FormCustom = Loadable(lazy(() => import("../views/forms/FormCustom")));
const FormWizard = Loadable(lazy(() => import("../views/forms/FormWizard")));
const FormValidation = Loadable(
  lazy(() => import("../views/forms/FormValidation"))
);
const QuillEditor = Loadable(
  lazy(() => import("../views/forms/quill-editor/QuillEditor"))
);
const FormHorizontal = Loadable(
  lazy(() => import("../views/forms/FormHorizontal"))
);
const FormVertical = Loadable(
  lazy(() => import("../views/forms/FormVertical"))
);

// tables
const BasicTable = Loadable(lazy(() => import("../views/tables/BasicTable")));
const CollapsibleTable = Loadable(
  lazy(() => import("../views/tables/CollapsibleTable"))
);
const EnhancedTable = Loadable(
  lazy(() => import("../views/tables/EnhancedTable"))
);
const FixedHeaderTable = Loadable(
  lazy(() => import("../views/tables/FixedHeaderTable"))
);
const PaginationTable = Loadable(
  lazy(() => import("../views/tables/PaginationTable"))
);
const SearchTable = Loadable(lazy(() => import("../views/tables/SearchTable")));

// chart
const LineChart = Loadable(lazy(() => import("../views/charts/LineChart")));
const GredientChart = Loadable(
  lazy(() => import("../views/charts/GredientChart"))
);
const DoughnutChart = Loadable(
  lazy(() => import("../views/charts/DoughnutChart"))
);
const AreaChart = Loadable(lazy(() => import("../views/charts/AreaChart")));
const ColumnChart = Loadable(lazy(() => import("../views/charts/ColumnChart")));
const CandlestickChart = Loadable(
  lazy(() => import("../views/charts/CandlestickChart"))
);
const RadialbarChart = Loadable(
  lazy(() => import("../views/charts/RadialbarChart"))
);

// ui
const MuiAlert = Loadable(
  lazy(() => import("../views/ui-components/MuiAlert"))
);
const MuiAccordion = Loadable(
  lazy(() => import("../views/ui-components/MuiAccordion"))
);
const MuiAvatar = Loadable(
  lazy(() => import("../views/ui-components/MuiAvatar"))
);
const MuiChip = Loadable(lazy(() => import("../views/ui-components/MuiChip")));
const MuiDialog = Loadable(
  lazy(() => import("../views/ui-components/MuiDialog"))
);
const MuiList = Loadable(lazy(() => import("../views/ui-components/MuiList")));
const MuiPopover = Loadable(
  lazy(() => import("../views/ui-components/MuiPopover"))
);
const MuiRating = Loadable(
  lazy(() => import("../views/ui-components/MuiRating"))
);
const MuiTabs = Loadable(lazy(() => import("../views/ui-components/MuiTabs")));
const MuiTooltip = Loadable(
  lazy(() => import("../views/ui-components/MuiTooltip"))
);
const MuiTransferList = Loadable(
  lazy(() => import("../views/ui-components/MuiTransferList"))
);
const MuiTypography = Loadable(
  lazy(() => import("../views/ui-components/MuiTypography"))
);

// authentication
const Login = Loadable(
  lazy(() => import("../views/authentication/auth/Login"))
);

const ForgotPassword = Loadable(
  lazy(() => import("../views/authentication/auth/ForgotPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("src/views/authentication/auth/ResetPassword"))
);

const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Maintenance = Loadable(
  lazy(() => import("../views/authentication/Maintenance"))
);
let data = getLocalStorage(dataLocalStorage.privileges);

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      {
        path: "/",
        exact: true,
        element: (
          <Navigate
            to={
              data["13"]?.access_read == 1
                ? RouterName.home.home
                : data["2"]?.access_read == 1
                ? RouterName.users.users
                : data["1"]?.access_read == 1
                ? RouterName.admins.admins
                : data["3"]?.access_read == 1
                ? RouterName.flashcard.flashcard
                : data["4"]?.access_read == 1
                ? RouterName.landing_page.slidershow
                : data["5"]?.access_read == 1
                ? RouterName.settings.settings
                : data["6"]?.access_read == 1
                ? RouterName.how_it_work.how_it_work
                : data["7"]?.access_read == 1
                ? RouterName.activities.category
                : data["8"]?.access_read == 1
                ? RouterName.topics.topics
                : data["9"]?.access_read == 1
                ? RouterName.ContactAs.ContactAs
                : data["10"]?.access_read == 1
                ? RouterName.faqs.faqs
                : data["11"]?.access_read == 1
                ? RouterName.tips.tips
                : data["12"]?.access_read == 1
                ? RouterName.admins_logs.admins_logs
                : null
            }
          />
        ),
      },
      data["13"]?.access_read == 1 && {
        path: RouterName.home.home,
        exact: true,
        element: <HomePage />,
      },
      data["1"]?.access_read == 1 && {
        path: RouterName.admins.admins,
        exact: true,
        element: <AdminsPage />,
      },
      data["2"]?.access_read == 1 && {
        path: RouterName.users.users,
        exact: true,
        element: <Users />,
      },
      data["1"]?.access_read == 1 && {
        path: RouterName.admins.privileges,
        exact: true,
        element: <PrivilegesPage />,
      },
      data["3"]?.access_read == 1 && {
        path: RouterName.flashcard.flashcard,
        exact: true,
        element: <FlashCard />,
      },
      data["3"]?.access_read == 1 && {
        path: RouterName.flashcard.flashcardDetails,
        exact: true,
        element: <FlashcardDetailsPage />,
      },
      data["3"]?.access_read == 1 && {
        path: RouterName.flashcard.age_range,
        exact: true,
        element: <AgeRange />,
      },
      data["3"]?.access_read == 1 && {
        path: RouterName.flashcard.level_of_difficulty,
        exact: true,
        element: <LevelOfDifficulty />,
      },
      // data["3"]?.access_read == 1 && {
      //   path: RouterName.flashcard.flashcardcategory,
      //   exact: true,
      //   element: <FlashCardCategory />,
      // },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.slidershow,
        exact: true,
        element: <SliderShowPage />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.maps,
        exact: true,
        element: <MapsPage />,
      },

      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.our_client,
        exact: true,
        element: <OurClient />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.GeneralHomePage,
        exact: true,
        element: <GeneralHomePage />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.ourStory,
        exact: true,
        element: <OurStory />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.languages,
        exact: true,
        element: <LanguagesPage />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.testimonials,
        exact: true,
        element: <Testimonials />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.app_benefits,
        exact: true,
        element: <AppBenefits />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.impacts,
        exact: true,
        element: <Impacts />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.stats,
        exact: true,
        element: <Stats />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.press_blog_news,
        exact: true,
        element: <PressBlogNews />,
      },
      data["4"]?.access_read == 1 && {
        path: RouterName.landing_page.our_team,
        exact: true,
        element: <OurTeam />,
      },
      data["5"]?.access_read == 1 && {
        path: RouterName.settings.settings,
        exact: true,
        element: <Settings />,
      },
      data["5"]?.access_read == 1 && {
        path: RouterName.settings.legal_information,
        exact: true,
        element: <LegalInformation />,
      },
      data["6"]?.access_read == 1 && {
        path: RouterName.how_it_work.how_it_work,
        exact: true,
        element: <HowItWork />,
      },
      data["6"]?.access_read == 1 && {
        path: RouterName.how_it_work.how_it_work_details,
        exact: true,
        element: <HowItWorkDetails />,
      },

      data["7"]?.access_read == 1 && {
        path: RouterName.activities.category,
        exact: true,
        element: <CategoryActivities />,
      },
      data["7"]?.access_read == 1 && {
        path: RouterName.activities.activities,
        exact: true,
        element: <Activities />,
      },
      data["7"]?.access_read == 1 && {
        path: RouterName.activities.activities_media,
        exact: true,
        element: <ActivitiesMedia />,
      },
      data["7"]?.access_read == 1 && {
        path: RouterName.activities.activities_flashcard,
        exact: true,
        element: <ActivitiesFlashcard />,
      },
      data["8"]?.access_read == 1 && {
        path: RouterName.topics.topics,
        exact: true,
        element: <Topics />,
      },
      data["8"]?.access_read == 1 && {
        path: RouterName.topics.SubTopics,
        exact: true,
        element: <SubTopics />,
      },
      data["9"]?.access_read == 1 && {
        path: RouterName.ContactAs.ContactAs,
        exact: true,
        element: <ContactAs />,
      },
      data["10"]?.access_read == 1 && {
        path: RouterName.faqs.faqs,
        exact: true,
        element: <Faqs />,
      },
      data["11"]?.access_read == 1 && {
        path: RouterName.tips.tips,
        exact: true,
        element: <Tips />,
      },
      data["12"]?.access_read == 1 && {
        path: RouterName.admins_logs.admins_logs,
        exact: true,
        element: <AdminLogs />,
      },
      data["14"]?.access_read == 1 && {
        path: RouterName.notification.notification,
        exact: true,
        element: <NotificationController />,
      },

      // -----------------------------------------------------------------------------
      {
        path: "/dashboards/ecommerce",
        exact: true,
        element: <EcommerceDash />,
      },
      {
        path: "/car-types",
        exact: true,
        element: <CarTypesList />,
      },
      {
        path: "/car-types/create",
        exact: true,
        element: <AddCarTypes />,
      },
      {
        path: "/cars",
        exact: true,
        element: <CarsList />,
      },
      {
        path: "/cars/create",
        exact: true,
        element: <AddCar />,
      },
      {
        path: "/drivers",
        exact: true,
        element: <DriverLists />,
      },
      {
        path: "/drivers/create",
        exact: true,
        element: <AddDrivers />,
      },
      {
        path: "/charity",
        exact: true,
        element: <CharityList />,
      },
      {
        path: "/charity/create",
        exact: true,
        element: <AddCharity />,
      },
      {
        path: "/preference",
        exact: true,
        element: <PreferenceTypes />,
      },
      {
        path: "/preference/create",
        exact: true,
        element: <AddPreferenceTypes />,
      },
      {
        path: "/client-loyalty",
        exact: true,
        element: <ClientLoyalty />,
      },
      {
        path: "/client-loyalty/create",
        exact: true,
        element: <AddClientLoyalty />,
      },
      {
        path: "/additional-charge",
        exact: true,
        element: <ListAdditionalCharges />,
      },
      {
        path: "/additional-charge/create",
        exact: true,
        element: <AddAdditionalCharges />,
      },
      {
        path: "/client",
        exact: true,
        element: <ClientLists />,
      },
      {
        path: "/client/create",
        exact: true,
        element: <AddClient />,
      },
      {
        path: "/client-address",
        exact: true,
        element: <ClientAddressLists />,
      },
      {
        path: "/client-address/create",
        exact: true,
        element: <AddClientAddress />,
      },
      { path: "/apps/chats", element: <Chats /> },
      { path: "/apps/notes", element: <Notes /> },
      { path: "/apps/calendar", element: <Calendar /> },
      { path: "/apps/email", element: <Email /> },
      { path: "/apps/tickets", element: <Tickets /> },
      { path: "/apps/contacts", element: <Contacts /> },
      { path: "/apps/ecommerce/shop", element: <Ecommerce /> },
      { path: "/apps/blog/posts", element: <Blog /> },
      { path: "/apps/blog/detail/:id", element: <BlogDetail /> },
      {
        path: "/apps/ecommerce/eco-product-list",
        element: <EcomProductList />,
      },
      {
        path: "/apps/ecommerce/eco-checkout",
        element: <EcomProductCheckout />,
      },
      { path: "/apps/ecommerce/detail/:id", element: <EcommerceDetail /> },
      { path: "/apps/followers", element: <Followers /> },
      { path: "/apps/friends", element: <Friends /> },
      { path: "/apps/gallery", element: <Gallery /> },
      { path: "/user-profile", element: <UserProfile /> },
      { path: "/pages/casl", element: <RollbaseCASL /> },
      { path: "/pages/treeview", element: <Treeview /> },
      { path: "/pages/pricing", element: <Pricing /> },
      { path: "/pages/account-settings", element: <AccountSetting /> },
      { path: "/pages/faq", element: <Faq /> },
      {
        path: "/forms/form-elements/autocomplete",
        element: <MuiAutoComplete />,
      },
      { path: "/forms/form-elements/button", element: <MuiButton /> },
      { path: "/forms/form-elements/checkbox", element: <MuiCheckbox /> },
      { path: "/forms/form-elements/radio", element: <MuiRadio /> },
      { path: "/forms/form-elements/slider", element: <MuiSlider /> },
      { path: "/forms/form-elements/date-time", element: <MuiDateTime /> },
      { path: "/forms/form-elements/switch", element: <MuiSwitch /> },
      { path: "/forms/form-elements/switch", element: <MuiSwitch /> },
      { path: "/forms/quill-editor", element: <QuillEditor /> },
      { path: "/forms/form-layouts", element: <FormLayouts /> },
      { path: "/forms/form-horizontal", element: <FormHorizontal /> },
      { path: "/forms/form-vertical", element: <FormVertical /> },
      { path: "/forms/form-custom", element: <FormCustom /> },
      { path: "/forms/form-wizard", element: <FormWizard /> },
      { path: "/forms/form-validation", element: <FormValidation /> },
      { path: "/tables/basic", element: <BasicTable /> },
      { path: "/tables/collapsible", element: <CollapsibleTable /> },
      { path: "/tables/enhanced", element: <EnhancedTable /> },
      { path: "/tables/fixed-header", element: <FixedHeaderTable /> },
      { path: "/tables/pagination", element: <PaginationTable /> },
      { path: "/tables/search", element: <SearchTable /> },
      { path: "/charts/line-chart", element: <LineChart /> },
      { path: "/charts/gredient-chart", element: <GredientChart /> },
      { path: "/charts/doughnut-pie-chart", element: <DoughnutChart /> },
      { path: "/charts/area-chart", element: <AreaChart /> },
      { path: "/charts/column-chart", element: <ColumnChart /> },
      { path: "/charts/candlestick-chart", element: <CandlestickChart /> },
      { path: "/charts/radialbar-chart", element: <RadialbarChart /> },
      { path: "/ui-components/alert", element: <MuiAlert /> },
      { path: "/ui-components/accordion", element: <MuiAccordion /> },
      { path: "/ui-components/avatar", element: <MuiAvatar /> },
      { path: "/ui-components/chip", element: <MuiChip /> },
      { path: "/ui-components/dialog", element: <MuiDialog /> },
      { path: "/ui-components/list", element: <MuiList /> },
      { path: "/ui-components/popover", element: <MuiPopover /> },
      { path: "/ui-components/rating", element: <MuiRating /> },
      { path: "/ui-components/tabs", element: <MuiTabs /> },
      { path: "/ui-components/tooltip", element: <MuiTooltip /> },
      { path: "/ui-components/transfer-list", element: <MuiTransferList /> },
      { path: "/ui-components/typography", element: <MuiTypography /> },
      { path: "/widgets/cards", element: <WidgetCards /> },
      { path: "/widgets/banners", element: <WidgetBanners /> },
      { path: "/widgets/charts", element: <WidgetCharts /> },
      { path: "/404", element: <Error /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "/auth/404", element: <Error /> },
      { path: RouterName.auth.login, element: <Login /> },
      { path: RouterName.auth.forgotPassword, element: <ForgotPassword /> },
      { path: RouterName.auth.resetPassword, element: <ResetPassword /> },
      { path: RouterName.auth.maintenance, element: <Maintenance /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
