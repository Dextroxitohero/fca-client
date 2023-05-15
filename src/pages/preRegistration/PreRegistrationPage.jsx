import React from 'react'
import { FormPreRegistration } from './FormPreRegistration'

export const PreRegistrationPage = () => {
    return (
        <>
            <div className="
			min-h-screen 
            bg-gray-50 
			flex flex-col 
			justify-center 
			py-12 sm:px-6 
			lg:px-8
		">
                <div className="
                    sm:mx-auto 
                    sm:w-full 
                    sm:max-w-md
                ">

                    <div className="
                        sm:mx-auto 
                        sm:w-full 
                        sm:max-w-md
                        px:sm-5
                    ">
                        <div className="
                           bg-white
                            py-8 
                            px-4
                            shadow 
                            sm:rounded-lg 
                            sm:px-10
                        ">
                            <FormPreRegistration />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
