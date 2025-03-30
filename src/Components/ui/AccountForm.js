import React, { useState } from 'react'
import { emailValidator, passwordValidator, usernameValidator } from '../../util'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../store/users'


function AccountForm({ user }) {
    const dispatch = useDispatch()
    if (!user) {
        return <div>Loading...</div>
    }
    const [isDisabled, setIsDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        password: "",
        confirmPassword: "",
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        id: user.id
    })

    const handleSaveClick = (event) => {
        event.preventDefault()
        console.log(formData)
        dispatch(updateUser({
            id: formData.id,
            data: {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                avatar: formData.avatar
            }
        }));
        setIsDisabled(true)
    }


    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
        validateForm(event)

    }

    const validateForm = (event) => {
        const { username, email, password, confirmPassword } = formData
        let passwordToCheck = event.target.name === "confirmPassword" ? event.target.value : confirmPassword
        const errors = {
            username: event.target.name === 'username' ? !usernameValidator(event.target.value) : !usernameValidator(username),
            email: !emailValidator(email),
            password: (password !== "" || confirmPassword !== "") ? !passwordValidator(password) : false,
            confirmPassword: (password !== "" || confirmPassword !== "") ? password !== passwordToCheck : false
        }
        setFormErrors(errors)
        setIsDisabled(Object.values(errors).some((error) => error === true))
    }


    const onFileChange = (event) => {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
            setFormData({ ...formData, avatar: reader.result })
        }
        reader.onerror = function (error) {
            console.log("Error: ", error)
        }
        setIsDisabled(false)

    }


    return (
        <div className="card bg-base-200 border-2 border-secondary rounded-xl shadow-2xl">
            <div className="card-body p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <h2 className="card-title flex-grow">
                        <div className="bg-gradient-to-r from-secondary to-accent bg-clip-text font-extrabold text-transparent text-xl sm:text-2xl">
                            Welcome {formData.username}
                        </div>
                    </h2>
                    <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16 sm:w-20 sm:h-20">
                            <img src={formData.avatar} alt={formData.username} />
                        </div>
                    </div>
                </div>

                <div className="text-sm sm:text-base mb-4">
                    <p className="mb-2">Edit your account and press save.</p>
                    <p className="text-base-content/70">
                        Joined: {new Date(formData.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <form
                    className="space-y-4"
                    onSubmit={(event) => handleAccountEdit(event, formData)}
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="input input-bordered w-full" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleInputChange} 
                        />
                        {formErrors.username && (
                            <div className="text-xs text-error mt-1">
                                Must be 8-30 characters long and no special characters
                            </div>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            className="input input-bordered w-full" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                        />
                        {formErrors.email && (
                            <div className="text-xs text-error mt-1">
                                Email must be valid
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Change Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="input input-bordered w-full" 
                                autoComplete="new-password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleInputChange} 
                            />
                            {formErrors.password && (
                                <div className="text-xs text-error mt-1">
                                    Must be 8-15 characters long and no special characters
                                </div>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm New Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                name="confirmPassword" 
                                autoComplete="new-password" 
                                className="input input-bordered w-full" 
                                value={formData.confirmPassword} 
                                onChange={handleInputChange} 
                            />
                            {formErrors.confirmPassword && (
                                <div className="text-xs text-error mt-1">
                                    Passwords must match
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Profile Image</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full sm:w-3/4"
                            onChange={onFileChange}
                        />
                    </div>

                    <button 
                        className="btn btn-primary w-full sm:w-auto mt-6" 
                        disabled={isDisabled} 
                        onClick={handleSaveClick}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AccountForm


