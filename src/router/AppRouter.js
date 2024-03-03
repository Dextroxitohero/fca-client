import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter'

import { HomePage } from '../pages/home/HomePage';

import { LoginPage } from '../pages/login/LoginPage';
import { SignupPage } from '../pages/signup/SignupPage';
import { ActivationPage } from '../pages/activation/ActivationPage';
import { FormForgetPasswordEmail } from '../pages/forgetPassword/FormForgetPasswordEmail';
import { FormForgetPassword } from '../pages/forgetPassword/FormForgetPassword';
import { AddNewUserPage } from '../pages/users/AddNewUserPage';

import { NotFoundPage } from '../pages/notFound/NotFoundPage';

import { ToasterProvider } from '../providers/ToasterProvider';
import { PreRegistrationPage } from '../pages/preRegistration/PreRegistrationPage';
import { CandidatesPage } from '../pages/candidates/CandidatesPage';
import { StudentsPage } from '../pages/students/StudentsPage';
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
import { CourseEdit } from '../pages/courses/CourseEdit';
import { Navigation } from '../components/auth/Navigation';
import { SettingImageHeader } from '../pages/setting/SettingImageHeader';
import { SettingLanguages } from '../pages/setting/SettingLanguages';
import { SettingColors } from '../pages/setting/SettingColors';
import { SettingNivels } from '../pages/setting/SettingNivels';
import { ProfileUser } from '../pages/profile/ProfileUser';
import { CourseEditListStudents } from '../pages/courses/CourseEditListStudents';
import { CourseDisplay } from '../pages/courses/CourseDisplay';

export const AppRouter = () => {

    return (
        <Fragment>
            <BrowserRouter>
                <Navigation>
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <PublicRoute>
                                    <SignupPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/activation/:activation_token"
                            element={<ActivationPage />}

                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <LoginPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/pre-registro"
                            element={
                                <PublicRoute>
                                    <PreRegistrationPage />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/validacion-datos"
                            element={
                                <PublicRoute>
                                    <FormValidacionDatos />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/validacion-pago"
                            element={
                                <PublicRoute>
                                    <FormValidacionPago />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/validacion-proceso"
                            element={
                                <PublicRoute>
                                    <FormValidacionProceso />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/forget-password"
                            element={
                                <PublicRoute>
                                    <FormForgetPasswordEmail />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/forget-password/:token"
                            element={
                                <PublicRoute>
                                    <FormForgetPassword />
                                </PublicRoute>
                            }
                        />

                        <Route
                            path="/nuevo-usuario/:token"
                            element={
                                <PublicRoute>
                                    <AddNewUserPage />
                                </PublicRoute>
                            }
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
                            path="/alumnos"
                            element={
                                <PrivateRoute>
                                    <StudentsPage />
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
                            path="/curso/:idCourse"
                            element={
                                <PrivateRoute>
                                    <CourseDisplay />
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
                            path="/editar-curso/:idCourse"
                            element={
                                <PrivateRoute>
                                    <CourseEdit isCreating={false} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/editar-curso-lista/:idCourse"
                            element={
                                <PrivateRoute>
                                    <CourseEditListStudents/>
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
                            path="/ajustes/languages"
                            element={
                                <PrivateRoute>
                                    <SettingLanguages />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/ajustes/imagenes-encabezado"
                            element={
                                <PrivateRoute>
                                    <SettingImageHeader />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/ajustes/colores"
                            element={
                                <PrivateRoute>
                                    <SettingColors />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/ajustes/niveles"
                            element={
                                <PrivateRoute>
                                    <SettingNivels />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/mi-perfil"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/perfil/:id"
                            element={
                                <PrivateRoute>
                                    <ProfileUser />
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
        </Fragment>

    );
};