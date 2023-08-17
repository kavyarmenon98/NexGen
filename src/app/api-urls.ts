//  Common Api URLs
export const apiUrls = {
  login: 'connect/token',
  userInfo: 'connect/userinfo',
  scribblingNote: 'ScribblingNote',
  changePassword: 'Accounts/changepassword',
  lock: 'Accounts/lock',
  unlock: 'Accounts/unlock',
  lockInfo: 'Accounts/lockinfo',
  lockTypes: 'LockTypes',
  userInfoById: 'Users/',
  forgotPasswordRequest: 'Accounts/passwordreset/request',
  forgotPasswordOTPVerification: 'Accounts/otp/verification',
  forgotPasswordReset: 'Accounts/passwordreset',
  duties: 'DutiesAndResponsibilities',
  commonCustomisableTask: 'JobCustomizations',
  frequencies: 'Frequencies',
  invoiceNumbers: 'InvoiceNumbers',
  firstLogin: 'Accounts/firstlogin',

  // Duties
  acknowledgeDuty: 'DutiesAndResponsibilities/acknowledge',

  // Task Customisation
  customisedTask: 'TaskCustomizations',
  customisableTaskType: 'TaskCustomizations/taskcategory/tasktypes',
  customisableTaskGroup: 'TaskCategories',
  taskTypeRequest: 'TaskCustomizations/tasktype/request',
  taskTypeRequestById: 'TaskCustomizations/tasktype/response',
  getCustomisedTask: 'TaskCustomizations/mycustomizedtasks',
  getCustomisedTaskById: 'TaskCustomizations',
  deleteCustomisedTask: 'TaskCustomizations',
  pendingTaskRequest: 'TaskCustomizations/all/tasktype/request',
  approveOrRejectTaskRequest: 'TaskCustomizations/tasktype/response',
  getAllApprovedOrRejectedRequests:
    'TaskCustomizations/all/tasktypeandcutomizations/approveorreject',
  getDetailsOfApprovedOrRejectedRequestById:
    'TaskCustomizations/tasktypedetail',
  getDetailsOfRoutineTaskRequestById:
    'TaskCustomizations/taskcustomizationdetail',
  approveOrRejectRoutineTaskRequest: 'TaskCustomizations',
  approvedOrRejectedRequestDetailsById:
    '/TaskCustomizations/taskcustomizationdetail',

  // Monthly Plan
  monthlyPlanTaskGroup: 'MonthlyPlanTaskGroups/TaskGroup',
  monthlyPlanTasks: 'MonthlyPlans/Task',
  tasksByTaskGroupId: 'MonthlyPlanTaskGroups/taskgroup/task',
  monthlyPlanTask: 'MonthlyPlans/Task',
  monthlyPlannedTasks: 'MonthlyPlans/task/planned',
  weekNumbers: 'MonthlyPlans/weeklist',
  carryForwardMonthlyTask: 'CFMonthlyPlans/task/cf',
  monthlyCarryForwardTasks: 'CFMonthlyPlans/task/cf',
  monthlyCarryForwardTaskRevert: 'CFMonthlyPlans/revert',
  carryForwardMonthlyTaskGroup: 'CFMonthlyPlans/taskgroup/cf',
  monthlyPlanCloseDetails: 'MonthlyPlans/closedstatus',
  monthlyPlanClose: 'MonthlyPlans/task/close',

  // Admin
  userManagement: 'Users',
  resetUser: 'DailyLogs/resetdailylog',
  companies: 'Companies',
  divisions: 'divisions',
  subDivisions: 'SubDivisions',
  companyGroups: 'CompanyGroups',
  locations: 'Locations',
  roles: 'Roles',
  userType: 'UserTypes',
  activateUser: 'Users/activation',
  designations: 'Designations',
  territories: 'Territories',
  // Time In
  defaultTimeIn: 'DailyDefaultSettings',
  timeInDetails: 'DashBoards/daily/login',
  timeIn: 'DailyLogs/timein',
  timeInAndNext: 'DailyLogs/nexttimein',

  // Time Out
  timeOut: 'DailyLogs/timeout',

  timeInInfo: 'DailyLogs/timeininfo',

  // Weekly Task
  weeklyTasks: 'MonthlyPlans/task/week',

  // Daily Task
  dailyTasks: 'DailyTaskPlan',
  dailyTasksUnplanned: 'DailyTaskPlan/unplanned',

  allDailyTasks: 'DailyTaskPlan/alltasks',
  carryForwardTask: 'DailyTaskPlan/carryforward',
  dailyTaskTimings: 'DailyTaskPlan/totalestimation',
  changeState: 'DailyTaskPlan/State',
  dailyTaskById: 'DailyTaskPlan/Id',
  editCarriedForwardTask: 'DailyTaskPlan/carryforwardtask/edit',
  getCarryForwardTaskById: 'DailyTaskPlan/carryforwardtask/Id',
  rejectRoutineTask: 'DailyLogReviews/users/rejectroutinetask',
  delegationList: 'DailyTaskPlan/delegationlist',
  // Widgets
  effismAnnouncements: 'DashBoards/announcements',
  effismRecognitions: 'DashBoards/news',
  overallProgress: 'DashBoards/overallprogress',

  // For Gettign the daily log edit status
  dailyLogEditMode: 'DailyLogs/editdailyloginfo',
  setDailyLogEditMode: 'DailyLogs/addoreditdailylog',

  // Delegation
  delegation: 'Delegation',
  delegationById: 'Delegation/id',

  delegationDetailsById: 'Delegation/DelegationDetail/id',
  delegationReopen: 'Delegation/reopen',
  delegationClose: 'Delegation/close',
  delegatedTaskHistory: 'Delegation/DelegationHistory',

  // Notification
  notificationCount: 'Notifications/count',
  allNotifications: 'Notifications/all',
  deleteNotification: 'Notifications/id',
  putNotification: 'Notifications',
  dailyLogReviewNotificationResponse: 'DailyLogReviews/notificationresponse',
  monthlyPlanReviewNotificationResponse:
    'MonthlyPlanReviews/notificationresponse',

  acknowledgeNotification: 'DutiesAndResponsibilities/acknowledge',

  // Daily Reviews
  dailyReview: 'DailyLogReviews/users/remarks',
  dailyReviewComment: 'DailyLogReviews/users/comments',
  dailyReviewedBy: 'DailyLogReviews/users/reviewedby',
  dailyReviewedTo: 'DailyLogReviews/users/reviewedto',

  dailyReviewFindings: 'DailyLogReviews/users/remarks',

  // Reportees
  dailyLogDirectReportees: 'DailyLogs/directreporting',
  dailyLogIndirectReportees: 'DailyLogs/indirectreporting',
  dailyLogUnavailableReportees: 'DailyLogs/unavailable',

  // monthly review
  monthlyReviewReporteesList: 'MonthlyPlanReviews/reportees',
  monthlyReviewUnplannedTask: 'MonthlyPlans/task/unplanned',
  monthlyReviewReviewedBy: 'MonthlyPlanReviews/reviewedby',
  monthlyReviewedTo: 'MonthlyPlanReviews/reviewedto',

  monthlyReviewRemarksGivenBy: 'MonthlyPlanReviews/remarks',
  monthlyReviewFindings: 'MonthlyPlanReviews/remarks',
  monthlyReviewTaskComment: 'MonthlyPlanReviews/comments',
  monthlyReviewSummaryCount: 'MonthlyPlanReviews/summarycount',

  // Clients
  clients: 'Clients',

  // Feedback
  feedback: 'Feedbacks',

  // Users
  userDetail: 'Users/details',
  directReportees: 'Users/directReportees',
  indirectReportees: 'Users/indirectReportees',
  resendWelcomeEmail: 'Users/resendlogincredential',

  // Current User nextLoginDate
  nextLoginDate: 'DailyLogs/nexttimeindetails',

  efficiencyTime: 'DailyLogs/efficiencytime',

  // Hartoise
  hartoiseLoginValidation:
    'https://www.hartoise.com/webservices/jwt/api/validate-token-user.php',

  hartoiseCreateUser: 'HartoiseUsers',
  hartoiseStatus: 'DashBoards/hartoiseexams',

  // BulkLog
  bulkLog: 'BulkLog',

  // TimeZones
  timeZones: 'TimeZones',

  // Reports
  viewAllTaskReport: 'ViewAllTask',
  viewAllTaskReportExport: 'ViewAllTask/exportexcel',
  carryForwardTaskReport: 'CFTasks',
  timeSheetReport: 'TimeSheet',
  downloadCarryForwardTaskReport: 'CFTasks/Export',
  allEmployeeLeaveSummary: 'LeaveSummary/All',
  individualEmployeeLeaveSummary: 'LeaveSummary',
  viewLeaveSummary: 'LeaveSummary/view',
  allEmployeeLeaveSummaryExport: 'LeaveSummary/exportdownlinesleavesummary',
  individualLeaveSummaryExport: 'LeaveSummary/Export',

  // CF History

  cfHistory: 'CFTasks/cfhistory',
  timeSheetIndividualView: 'TimeSheet/view',
  advancedTimeSheetExport: 'TimeSheet/advancetimesheetexport',
  monthlyTimeSheetExport: 'TimeSheet/monthlytimesheetexport',
  dailyTaskStatus: '/DailyTaskStatus/DailyTiming',

  // Appreciations
  newAppreciation: 'Appreciations',
  dailyAppreciation: 'Appreciations',
  totalAppreciationsReceived: 'Appreciations/received',
  totalAppreciationsGiven: 'Appreciations/given',
  appreciationNotificationResponse: 'Appreciations/response',

  // Audit Info
  auditInfo: 'AuditInfo',

  // Chat
  chatUsers: 'Users',
  converstations: 'PrivateChat/Conversations',
  userMigration: 'Users/migration',
};
