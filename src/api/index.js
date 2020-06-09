// const API_URL = 'http://www.dkstu.cn'

// const api = {
//   Login: `${API_URL}/api/Login/login`,
//   Logout: `${API_URL}/auth/logout`,
//   ForgePassword: `${API_URL}/auth/forge-password`,
//   Register: `${API_URL}/api/register`,
//   twoStepCode: `${API_URL}/auth/2step-code`,
//   SendSms: `${API_URL}/account/sms`,
//   SendSmsErr: `${API_URL}/account/sms_err`,
//   // get my info
//   UserInfo: `${API_URL}/api/getUserinfo`
// }
const api = {
  Login: '/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/sendSmsCode',
  SendSmsErr: '/account/sms_err',
  NewOrder: '/neworder',
  // get my info
  UserInfo: '/getInfo',
  // assist
  AssistList: '/assist',
  CreateAssist: '/assist',
  DetailAssist: '/assist/',
  DeleteAssist: '/assist/',
  ReplyAssist: '/assist/',
  // user
  UpdatePwd: '/update_password',
  UpdatePhone: '/update_phone',
  ForgetPwd: 'forget_password',
  GetUsersNum: '/usersnum',
  GetUserTrend: '/monthusers',
  ManageUser: '/member',
  AddManage: '/member',
  ChanageManage: '/member',
  DetailManage: '/member/',
  DeleteManage: '/member/',
  changeManagePwd: '/update_password',
  // role
  Role: '/role',
  AddRole: '/role',
  ChangeRole: '/role/',
  detailRole: '/role/',
  deleteRole: '/role/',
  RoleList: '/role_list',
  RoleAccess: '/role_access',
  DeleteHasRole: '/role_delete_access',
  // admin
  AdminLoginLog: '/admin_login_log',
  AdminControlLog: '/log',
  DetailLog: '/log/',
  // shopper
  ShopperList: '/user',
  ShopperDetail: '/user/',
  ChangeUserInfo: '/user/',
  DeleteShopper: '/user/',
  LoginLog: '/user_login_log',
  ShopperSalary: '/balance',
  // notices
  GetNotices: '/notice',
  NoticesDetail: '/notice/',
  ChangeNotice: '/notice/',
  DeleteNotice: '/notice/',
  AddNotice: '/notice',
  // made soft
  MadeSoft: '/custom',
  GetSoftList: '/custom',
  GetSoftDetail: '/custom/',
  ChangeSoft: '/custom/',
  DeleteSoft: '/custom/',
  // order
  OrderList: '/order',
  OrderDetail: '/order/',
  DeleteOrder: '/order/',
  GetProduct: '/product',
  GetOrderNum: '/orderNum',
  OrderChart: '/orderchart',
  // product
  ProductList: '/product',
  ProductDetail: '/product/',
  ChangeProduct: '/product',
  DeleteProduct: '/product/',
  AddProduct: '/product',
  // 规格
  GoodsSpces: '/product_specs',
  AddGoodsSpecs: '/product_specs',
  ChangeGoodsSpecs: '/product_specs',
  DetailGoodsSpecs: '/product_specs/',
  DeleteGoodsSpecs: '/product_specs/',
  // 属性
  AttributeList: '/sku_key',
  AddAttribute: '/sku_key',
  ChangeAttribute: '/sku_key',
  DeleteAttribute: '/sku_key/',
  DetailAttribute: '/sku_key/',
  // 属性值
  AttributeValList: '/sku_value',
  AddAttributeValue: '/sku_value',
  ChangeAttributeValue: '/sku_value/',
  DeleteAttributeValue: '/sku_value/',
  DetailAttributeValue: '/sku_value/',
  Pay: '/pay',
  // category
  CategoryList: '/category',
  AddCategory: '/category',
  CategoryDetail: '/category/',
  ChangeCategory: '/category',
  DeleteCategory: '/category/',
  // website
  WebInfo: '/webinfo',
  WebDetail: '/webinfo/',
  ChangeWebInfo: '/webinfo/',
  AddWebInfo: '/webinfo/',
  DeleteWebInfo: '/webinfo/',
  // setting
  SysCode: '/config',
  AddConfig: '/config',
  ChangeConfig: '/config/',
  DetailConfig: '/config',
  DeleteConfig: '/config/',
  SliderImg: '/ad',
  AddAd: '/ad',
  ChangeAd: '/ad/',
  DeleteAd: '/ad/',
  // menu
  MenuList: '/menu',
  AddMenu: '/menu',
  ChangeMenu: '/menu',
  DetailMenu: '/menu/',
  DeleteMenu: '/menu/',
  PushAccess: '/role_add_access',
  // teach
  CourseList: '/course',
  AddCourse: '/course',
  ChangeCourse: '/course/',
  DeleteCourse: '/course/',
  DetailCourse: '/course/',
  // teach/course cate
  CourseCate: '/ctype',
  AddCourseCate: '/ctype',
  ChangeCourseCate: '/ctype/',
  DeleteCourseCate: '/ctype/'
}
export default api
