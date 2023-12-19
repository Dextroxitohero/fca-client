import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/actions/user';

import { PrivateRoute } from './PrivateRoute';

import { HomePage } from '../pages/home/HomePage';

import { LoginPage } from '../pages/login/LoginPage';
import { SignupPage } from '../pages/signup/SignupPage';
import { ActivationPage } from '../pages/activation/ActivationPage';
import { ForgetPasswordPage } from '../pages/forgetPassword/ForgetPasswordPage';
import { FormForgetPassword } from '../pages/forgetPassword/FormForgetPassword';

import { NotFoundPage } from '../pages/notFound/NotFoundPage';

import { ToasterProvider } from '../providers/ToasterProvider';
import { PreRegistrationPage } from '../pages/preRegistration/PreRegistrationPage';
import { CandidatesPage } from '../pages/candidates/CandidatesPage';
import { TeamsPage } from '../pages/teams/TeamsPage';
import { UsersPage } from '../pages/users/UsersPage';
import { PaymentsPage } from '../pages/payments/PaymentsPage';
import { SettingPage } from '../pages/setting/SettingPage';
import { NotificationsPage } from '../pages/notifications/NotificationsPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { FormValidacionDatos } from '../pages/preRegistration/FormValidacionDatos';
import { FormValidacionPago } from '../pages/preRegistration/FormValidacionPago';
import { FormValidacionProceso } from '../pages/preRegistration/FormValidacionProceso';
import { ValidateCandidate } from '../pages/candidates/ValidateCandidate';

import { CoursesPage } from '../pages/courses/CoursesPage';
import { CreateCourse } from '../pages/courses/CreateCourse';
import { CourseEdit } from '../pages/courses/CourseEdit';
import { Persist } from '../components/auth/Persist';
import { Navigation } from '../components/auth/Navigation';

export const AppRouter = () => {

    return (
        <>
            <BrowserRouter>
                <Navigation>
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                //<PublicRoute>
                                    <SignupPage />
                               // </PublicRoute>
                            }
                        />
                        <Route
                            path="/activation/:activation_token"
                            element={<ActivationPage />}
                        />
                        <Route
                            path="/login"
                            element={<LoginPage />}
                        />
                        <Route
                            path="/pre-registro"
                            element={<PreRegistrationPage />}
                        />
                        <Route
                            path="/validacion-datos"
                            element={<FormValidacionDatos />}
                        />
                        <Route
                            path="/validacion-pago"
                            element={<FormValidacionPago />}
                        />
                        <Route
                            path="/validacion-proceso"
                            element={<FormValidacionProceso />}
                        />
                        <Route
                            path="/forget-password"
                            element={<ForgetPasswordPage />}
                        />
                        <Route
                            path="/forget-password/:token"
                            element={<FormForgetPassword />}
                        />

                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <HomePage />
                                </PrivateRoute>
                            }
                        />


                        <Route
                            path="/candidatos"
                            element={
                                <PrivateRoute>
                                    <CandidatesPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/candidatos/:id"
                            element={
                                <PrivateRoute>
                                    <ValidateCandidate />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/cursos"
                            element={
                                <PrivateRoute>
                                    <CoursesPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/nuevo-curso"
                            element={
                                <PrivateRoute>
                                    <CourseEdit isCreating={true} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/edit-curso/:idCourse"
                            element={
                                <PrivateRoute>
                                    <CourseEdit isCreating={false} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/usuarios"
                            element={
                                <PrivateRoute>
                                    <UsersPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/pagos"
                            element={
                                <PrivateRoute>
                                    <PaymentsPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/ajustes"
                            element={
                                <PrivateRoute>
                                    <SettingPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/perfil"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/notificaciones"
                            element={
                                <PrivateRoute>
                                    <NotificationsPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <NotFoundPage />
                            }
                        />



                    </Routes>
                </Navigation>

            </BrowserRouter >
            <ToasterProvider />
        </>

    );
};