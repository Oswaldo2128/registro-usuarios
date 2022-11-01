import { Authority } from '@/shared/security/authority';

const Login = () => import('@/account/login-form/login-form.vue');
const Register = () => import('@/account/register/register.vue');
const CreatePassword = () => import('@/account/create-password/create-password.vue');
const CheckData = () => import('@/account/check-your-data/check-your-data.vue');
const ConfirmationCode = () => import('@/account/confirmation-code/confirmation-code.vue');
const Activate = () => import('@/account/activate/activate.vue');
const ResetPasswordInit = () => import('@/account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('@/account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('@/account/change-password/change-password.vue');
const Settings = () => import('@/account/settings/settings.vue');

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/check-data',
    name: 'CheckData',
    component: CheckData,
  },
  {
    path: '/confirmation-code',
    name: 'ConfirmationCode',
    component: ConfirmationCode,
  },
  {
    path: '/create-password',
    name: 'CreatePassword',
    component: CreatePassword,
  },
  {
    path: '/account/activate',
    name: 'Activate',
    component: Activate,
  },
  {
    path: '/account/reset/request',
    name: 'ResetPasswordInit',
    component: ResetPasswordInit,
  },
  {
    path: '/account/reset/finish',
    name: 'ResetPasswordFinish',
    component: ResetPasswordFinish,
  },
  {
    path: '/account/password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/account/settings',
    name: 'Settings',
    component: Settings,
    meta: { authorities: [Authority.USER] },
  },
];
