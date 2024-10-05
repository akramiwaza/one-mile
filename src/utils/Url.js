const UrlApi = {
  // live
  baseUrl: "https://api.seenaryoplaykit.org/admin/",
  baseUrlImage: "https://api.seenaryoplaykit.org/uploads/",
  // local
  // baseUrl: "http://localhost:8000/admin/",
  // baseUrlImage: "http://localhost:8000/uploads/",
  // auth
  auth: {
    login: "auth/login",
    autologin: "auth/autologin",
    signup: "auth/signup",
    logout: "auth/logout",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
  },
  admins: {
    get: "admins/get",
    add: "admins/add",
    edit: "admins/edit",
    delete: "admins/delete",
    getUserType: "admins/get_user_type",
    getUserPrivilegs: "admins/privileg",
    addUserPrivilegs: "admins/addprivileg",
    editUserPrivilegs: "admins/editprivileg",
    deleteprivileg: "admins/deleteprivileg",
  },
  flashcard: {
    category: {
      get: "flash_cards/category/get",
      add: "flash_cards/category/add",
      edit: "flash_cards/category/edit",
      delete: "flash_cards/category/delete",
    },
    flashcard: {
      get: "flash_cards/flash_cards/get",
      getByCategory: "flash_cards/flash_cards/getByCategory",
      add: "flash_cards/flash_cards/add",
      edit: "flash_cards/flash_cards/edit",
      delete: "flash_cards/flash_cards/delete",
    },
    flashcardDetails: {
      get: "flash_cards/flash_card_details/get",
      add: "flash_cards/flash_card_details/add",
      edit: "flash_cards/flash_card_details/edit",
      delete: "flash_cards/flash_card_details/delete",
    },
    level_of_difficulty: {
      get: "flash_cards/level_of_difficulty/get",
      add: "flash_cards/level_of_difficulty/add",
      edit: "flash_cards/level_of_difficulty/edit",
      delete: "flash_cards/level_of_difficulty/delete",
    },
    age_range: {
      get: "flash_cards/age_range/get",
      add: "flash_cards/age_range/add",
      edit: "flash_cards/age_range/edit",
      delete: "flash_cards/age_range/delete",
    },
  },
  landingPage: {
    sliderShow: {
      get: "landing_page/slider_show/get",
      add: "landing_page/slider_show/add",
      edit: "landing_page/slider_show/edit",
      delete: "landing_page/slider_show/delete",
    },
    maps: {
      get: "landing_page/maps/get",
      add: "landing_page/maps/add",
      edit: "landing_page/maps/edit",
      delete: "landing_page/maps/delete",
    },
    languages: {
      get: "landing_page/languages/get",
      add: "landing_page/languages/add",
      edit: "landing_page/languages/edit",
      delete: "landing_page/languages/delete",
    },
    our_client: {
      get: "landing_page/our_client/get",
      add: "landing_page/our_client/add",
      edit: "landing_page/our_client/edit",
      delete: "landing_page/our_client/delete",
    },
    testimonials: {
      get: "landing_page/testimonials/get",
      add: "landing_page/testimonials/add",
      edit: "landing_page/testimonials/edit",
      delete: "landing_page/testimonials/delete",
    },
    app_benefits: {
      get: "landing_page/app_benefits/get",
      add: "landing_page/app_benefits/add",
      edit: "landing_page/app_benefits/edit",
      delete: "landing_page/app_benefits/delete",
    },
    impacts: {
      get: "landing_page/impacts/get",
      add: "landing_page/impacts/add",
      edit: "landing_page/impacts/edit",
      delete: "landing_page/impacts/delete",
    },
    stats: {
      get: "landing_page/stats/get",
      add: "landing_page/stats/add",
      edit: "landing_page/stats/edit",
      delete: "landing_page/stats/delete",
    },
    press_blog_news: {
      get: "landing_page/press_blog_news/get",
      add: "landing_page/press_blog_news/add",
      edit: "landing_page/press_blog_news/edit",
      delete: "landing_page/press_blog_news/delete",
    },
    ourteam: {
      get: "landing_page/ourteam/get",
      add: "landing_page/ourteam/add",
      edit: "landing_page/ourteam/edit",
      delete: "landing_page/ourteam/delete",
    },
  },
  settings: {
    get: "settings/get",
    edit: "settings/edit",
  },
  tips: {
    get: "tips/get",
    add: "tips/add",
    edit: "tips/edit",
    delete: "tips/delete",
  },
  how_it_work: {
    get: "how_it_work/get",
    add: "how_it_work/add",
    edit: "how_it_work/edit",
    delete: "how_it_work/delete",
  },
  activities: {
    category: {
      get: "activities/category/get",
      add: "activities/category/add",
      edit: "activities/category/edit",
      delete: "activities/category/delete",
    },
    activities: {
      get: "activities/activities/get",
      add: "activities/activities/add",
      edit: "activities/activities/edit",
      delete: "activities/activities/delete",
    },
    activities_media: {
      get: "activities/activities_media/get",
      add: "activities/activities_media/add",
      edit: "activities/activities_media/edit",
      delete: "activities/activities_media/delete",
    },
    activities_flashcard: {
      get: "activities/activities_flashcard/get",
      add: "activities/activities_flashcard/add",
      edit: "activities/activities_flashcard/edit",
      delete: "activities/activities_flashcard/delete",
    },
  },
  topics: {
    get: "topics/get",
    add: "topics/add",
    edit: "topics/edit",
    delete: "topics/delete",
  },
  contact_as: {
    get: "contact_as/get",
    add: "contact_as/add",
    edit: "contact_as/edit",
    delete: "contact_as/delete",
  },
  faqs: {
    get: "faqs/get",
    add: "faqs/add",
    edit: "faqs/edit",
    delete: "faqs/delete",
  },
  users: {
    get: "users/get",
    add: "users/add",
    edit: "users/edit",
    delete: "users/delete",
    get_countries: "users/get_countries",
  },
  admin_logs: {
    get: "admin_logs/get",
    edit: "admin_logs/edit",
  },
  dashboard: {
    topic: "dashboard/topic",
    cateogry: "dashboard/cateogry",
    activity: "dashboard/activity",
    flash_card_used: "dashboard/flash_card_used",
    flash_card_viewed: "dashboard/flash_card_viewed",
    active_users: "dashboard/active_users",
  },
  notification: {
    sendbroadcastnotifcation: "notification/sendbroadcastnotifcation",
  },
  reOrder: "re-order",
};

export default UrlApi;
